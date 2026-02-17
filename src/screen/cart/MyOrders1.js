import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Api from '../../redux/Api';
import storage from '../utils/storageService';
import Loading from '../../custom';
import {COLORS} from '../../colorr/colors';

const getColorHexCode = colorName => {
  console.log('colorName', colorName);
  return COLORS[colorName];
};
export default MyOrders1 = ({navigation, route}) => {
  const {orderId} = route.params;
  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getPaymentdata();
    }, [orderId]),
  );

  const Submit = async () => {
    console.log('Proceeding with payment...');
    // Implement payment logic here
  };

  const getPaymentdata = async () => {
    try {
      setLoading(true);
      let id = orderId;
      const login_id = await storage.getItem(storage.use_id);
      const endPoint = `/getOrderDetail?loginId=${login_id}&orderId=${id}&type=order`;
      const response = await Api.getRequest(endPoint);
      if (Array.isArray(response?.data)) {
        setOrderItems(response.data);
      } else {
        setOrderItems([]);
        ToastAndroid.show('No Data Found', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error fetching data', err);
      ToastAndroid.show('No Data Found', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const first = orderItems[0];

  const totalQty = orderItems.reduce(
    (sum, p) => sum + Number(p.quantity || 0),
    0,
  );

  const mrpTotal = orderItems.reduce(
    (sum, p) => sum + Number(p.MrpTotal || 0),
    0,
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {loading && <Loading />}
      <Header title={'Order Summary'} color={true} width={'100%'} />
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 10}}>
        {orderItems.length > 0 && (
          <>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: '#000'}}>
              {totalQty} items in this order
            </Text>

            <FlatList
              data={orderItems}
              keyExtractor={(item, i) => i.toString()}
              scrollEnabled={false}
              renderItem={({item}) => (
                <View style={{flexDirection: 'row', marginVertical: 10}}>
                  <Image
                    source={{uri: item.orderImage}}
                    style={{
                      width: 60,
                      height: 90,
                      backgroundColor: '#D9D9D950',
                      borderRadius: 6,
                    }}
                  />
                  <View style={{marginLeft: 15}}>
                    <Text style={{color: '#000', fontWeight: '600'}}>
                      {item.orderDescription}
                    </Text>
                    <Text style={{fontSize: 12, color: '#555'}}>
                      Size: {item.size}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      <Text style={{fontSize: 12}}>Colour:</Text>
                      <View
                        style={{
                          backgroundColor:
                            item.color?.trim().toUpperCase() === 'MULTI'
                              ? 'transparent'
                              : getColorHexCode(item.color?.trim()),
                          height: 20,
                          width: 20,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: 'black',
                        }}
                      />
                    </View>
                    <Text style={{fontSize: 12}}>
                      Quantity: {item.quantity}
                    </Text>
                    <Text style={{fontSize: 12}}>₹ {item.price}</Text>
                  </View>
                </View>
              )}
            />

            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: '#000000',
                marginTop: '8%',
              }}>
              Bill details
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 13, color: '#000000'}}>MRP Total</Text>
              <Text style={{color: '#000000'}}>₹ {mrpTotal}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 13, color: '#000000'}}>
                BWorth Smart Coin
              </Text>
              <Text style={{color: '#000000', fontWeight: '600'}}>
                ₹ {first?.coin}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 13, color: '#000000'}}>
                Handling charge
              </Text>
              <Text style={{color: '#000000', fontWeight: '600'}}>
                ₹ {first?.handlingCharge || 0}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 13, color: '#000000'}}>
                Delivery charge
              </Text>
              <Text style={{color: '#000000', fontWeight: '500'}}>
                ₹ {first?.deliveryCharge || 0}
              </Text>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: 'grey',
                width: '100%',
                marginVertical: 20,
              }}
            />

            <Text style={{fontSize: 17, fontWeight: 'bold', color: '#000000'}}>
              Order details
            </Text>

            <View
              style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
              <Text
                style={{fontSize: 13, fontWeight: 'bold', color: '#000000'}}>
                Order Id
              </Text>
              <Text style={{marginTop: 4, color: '#000000'}}>
                BWO{first?.orderId.toUpperCase()}
              </Text>
            </View>

            <View
              style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
              <Text
                style={{fontSize: 13, color: '#000000', fontWeight: 'bold'}}>
                Payment Mode
              </Text>
              <Text style={{marginTop: 10, color: '#000000'}}>
                {first?.paymentMode}
              </Text>
            </View>

            <View
              style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
              <Text
                style={{fontSize: 13, color: '#000000', fontWeight: 'bold'}}>
                Delivery Address
              </Text>
              <Text style={{marginTop: 10, color: '#000000'}}>
                {first?.deliveryAddress}
              </Text>
            </View>

            <Button
              title={'Go to Home'}
              onPress={() => {
                navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
              }}
              background={true}
              style={{
                marginTop: '10%',
                width: '100%',
                alignSelf: 'center',
                borderRadius: 10,
              }}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};
