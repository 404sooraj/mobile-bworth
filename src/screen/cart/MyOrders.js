import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Pressable,
  Linking,
  ActivityIndicator, // <-- Added
} from 'react-native';
import Header from '../../components/Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import {WebView} from 'react-native-webview';
import storage from '../utils/storageService';
import Api from '../../redux/Api';
import Loading from '../../custom';

export default MyOrders = ({route}) => {
  const {data, awb_number} = route?.params;
  // console.log(awb_number);
  // console.log(data);
  const navigation = useNavigation();
  // const [myOrder, setMyOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderTrack, setOrderTrack] = useState();
  const [updatedOrderData, setUpdatedOrderData] = useState([]);
  // console.log(data);

  useEffect(() => {
    if (!awb_number) return;
    setOrderTrack(awb_number);
  }, [awb_number]);

  async function updateOrdersWithStatus(orders) {
    const updatedOrders = [];
    const loginId = await storage.getItem(storage.use_id);
    for (const order of orders) {
      try {
        const response = await Api.postRequest('getOrderStatus', {
          loginId: parseInt(loginId),
          orderId: `BWO${order.orderId}`,
        });
        // console.log(response);
        const orderInfo = response.data?.[0]; // safe access
        // console.log(orderInfo);
        let finalStatus = order.orderStatus; // default
        if (orderInfo?.orderStatus === 'Cancelled') {
          finalStatus = 'Cancelled';
        } else {
          finalStatus = 'Confirmed';
        }
        updatedOrders.push({
          ...order,
          orderStatus: finalStatus,
        });
      } catch (err) {
        console.error(
          'Error fetching order status for:',
          order.orderId,
          err.message,
        );
        updatedOrders.push(order); // fallback
      }
    }
    // console.log('here', updatedOrders);
    return updatedOrders;
  }
  // console.log(updateOrdersWithStatus);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchUpdatedOrders = async () => {
        try {
          const updatedData = await updateOrdersWithStatus(data);
          // console.log(JSON.stringify(data, null, 2));
          // const priority = {
          //   Confirmed: 1,
          //   Cancelled: 2,
          // };
          // const sortedOrders = updatedData.sort(
          //   (a, b) => priority[b.orderCreatedAt] - priority[a.orderCreatedAt],
          // );
          const sortedOrders = updatedData.sort(
            (a, b) => new Date(b.orderCreatedAt) - new Date(a.orderCreatedAt),
          );
          if (isActive) {
            setUpdatedOrderData(sortedOrders);
            setLoading(false);
          }
        } catch (err) {
          console.error('Error updating orders:', err);
        }
      };
      fetchUpdatedOrders();
      return () => {
        isActive = false;
      };
    }, [data]),
  );

  // const getMyOrder = async () => {
  //   try {
  //     setLoading(true); // <-- Added
  //     const user_id = await storage.getItem(storage.use_id);
  //     // console.log('loginId---', user_id);
  //     const endPoint = `getMyOrderById?loginId=${user_id}`;
  //     const response = await Api.getRequest(endPoint);
  //     if (response.data) {
  //       // console.log('confirmation--', response?.data);
  //       setMyOrder(response?.data);
  //     } else {
  //       setMyOrder([]);
  //       ToastAndroid.show('No Data Found', ToastAndroid.SHORT);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setMyOrder([]);
  //   } finally {
  //     setLoading(false); // <-- Added
  //   }
  // };

  return (
    <View style={{flex: 1}}>
      <Header
        width={'100%'}
        title={updatedOrderData?.length == 0 ? 'Track Order' : 'My Orders'}
      />

      {loading ? (
        // Centered loader
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="blue" />
          <Text style={{marginTop: 10, fontSize: 14, color: '#555'}}>
            Please wait...
          </Text>
        </View>
      ) : !orderTrack ? (
        <>
          {updatedOrderData?.length == 0 ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>No Orders Found...</Text>
            </View>
          ) : (
            <ScrollView
              style={{marginVertical: 10, backgroundColor: '#F5F5F5'}}>
              {updatedOrderData?.length == 0
                ? null
                : updatedOrderData.map((item, index) => {
                    return (
                      <View key={index}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('MyOrders1', {
                              orderId: item.orderId,
                            })
                          }>
                          <View
                            style={{
                              borderColor: '#E0E0E0',
                              borderWidth: 1,
                              borderRadius: 15,
                              width: '90%',
                              alignSelf: 'center',
                              marginVertical: 10,
                              backgroundColor: 'white',
                              shadowColor: '#000',
                              shadowOffset: {width: 0, height: 2},
                              shadowOpacity: 0.3,
                              shadowRadius: 4,
                              elevation: 1,
                              padding: 15,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text style={{fontSize: 20, marginRight: 10}}>
                                {item.orderStatus === 'Cancelled' ? '❌' : '✅'}
                              </Text>
                              <View style={{flexDirection: 'column'}}>
                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      fontWeight: 'bold',
                                      color: '#000000',
                                    }}>
                                    BWO{item?.orderId.toUpperCase()}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      fontWeight: 'bold',
                                      color: '#000000',
                                      marginLeft: 30,
                                    }}>
                                    {item?.orderId.startsWith('RETURN')
                                      ? 'Return'
                                      : item?.orderStatus}
                                  </Text>
                                </View>
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: '#757575',
                                    marginLeft: '1%',
                                  }}>
                                  {item?.orderCreatedAt
                                    ? item.orderCreatedAt.split('T')[0]
                                    : ''}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: '#757575',
                                    marginLeft: '1%',
                                  }}>
                                  {item?.orderCreatedAt
                                    ? item.orderCreatedAt
                                        .split('T')[1]
                                        ?.split('.')[0]
                                    : ''}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: '#757575',
                                    marginLeft: '1%',
                                  }}>
                                  {item?.awb_number}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                height: 1,
                                backgroundColor: '#E0E0E0',
                                marginVertical: 10,
                              }}
                            />

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              {item?.orderStatus === 'Cancel' ? null : (
                                <Pressable
                                  onPress={() =>
                                    setOrderTrack(item?.awb_number)
                                  }>
                                  <Text
                                    style={{
                                      color: '#00A900',
                                      fontWeight: 'bold',
                                    }}>
                                    Track
                                  </Text>
                                </Pressable>
                              )}

                              {item?.orderStatus === 'Cancelled' ? null : (
                                <Pressable
                                  onPress={() => {
                                    // console.log('Invoice item:', item);
                                    Linking.openURL(item?.invociePdfUrl);
                                  }}>
                                  <Text
                                    style={{
                                      color: '#00A900',
                                      fontWeight: 'bold',
                                    }}>
                                    Invoice
                                  </Text>
                                </Pressable>
                              )}

                              {item?.orderStatus === 'Cancelled' ||
                              item?.orderId.startsWith('RETURN') ? null : (
                                <TouchableOpacity
                                  onPress={() => {
                                    navigation.navigate('CancellationScreen', {
                                      orderId: item?.orderId,
                                      awb_number: item?.awb_number,
                                      orderStatus: item?.orderStatus,
                                    });
                                  }}>
                                  <Text
                                    style={{
                                      color: '#00A900',
                                      fontWeight: 'bold',
                                    }}>
                                    Options
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>
                        {updatedOrderData.length - 1 === index && (
                          <View style={{height: 60}} />
                        )}
                      </View>
                    );
                  })}
            </ScrollView>
          )}
        </>
      ) : (
        <WebView
          source={{uri: `https://smartship.in/tracking/${orderTrack}`}}
          style={{flex: 1}}
        />
      )}

      <Button
        background={true}
        onPress={() => {
          navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
        }}
        style={{
          backgroundColor: '#1FD3E0',
          borderRadius: 50,
          padding: 10,
          width: '90%',
          marginLeft: 20,
          height: 50,
          borderColor: '#BABABA',
          position: 'absolute',
          bottom: 10,
        }}
        title={'Explore More'}
      />
    </View>
  );
};
