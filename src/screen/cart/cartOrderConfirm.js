import React, {useEffect, useState} from 'react';
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import Header from '../../components/Header';
import Button from '../../components/Button';
import storage from '../utils/storageService';
import Api from '../../redux/Api';
import {useFocusEffect, CommonActions} from '@react-navigation/native';

export default CartOrderConfirm = ({navigation, route}) => {
  const {data} = route.params;
  console.log(data);
  // const [orderData, setOrderData] = useState([]);

  const navigateToMyOrders = () => {
    navigation.navigate('MyOrders', {data: [], awb_number: data.awb_number});
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const doConfirm = async () => {
  //       // await orderConfirm(); // wait for confirmation
  //       navigation.dispatch(
  //         CommonActions.reset({
  //           index: 1, // nth route will be active i.e. 'cartOrderConfirm'
  //           routes: [{name: 'MyOrders', name: 'cartOrderConfirm'}],
  //         }),
  //       );
  //     };
  //     doConfirm();
  //   }, []),
  // );

  // const orderConfirm = async () => {
  //   try {
  //     const user_id = await storage.getItem(storage.use_id);
  //     // console.log(typeof parseInt(user_id), typeof data?.orderId);
  //     const endPoint = `getOrderConfirmationById?loginId=${parseInt(
  //       user_id,
  //     )}&orderId=${data?.orderId}`;
  //     const response = await Api.getRequest(endPoint);
  //     if (response.data) {
  //       setOrderData(response.data.productPaymentData || []); // Default to empty array
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <Header color={true} width={'50%'} title={'Order Confirmation'} />
        <Image
          style={{alignSelf: 'center', marginTop: '5%'}}
          source={require('../../assets/orderconfirmation.png')}
        />
        <View
          style={{
            height: 0.5,
            backgroundColor: 'gray',
            width: '100%',
            marginTop: 20,
          }}
        />
        {/* <View style={{flex: 1, padding: 20}}>
          {orderData.length > 0 ? (
            orderData.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                    marginBottom: 15,
                  }}>
                  <Image
                    resizeMode="stretch"
                    source={{uri: item?.Image1}}
                    style={{width: 100, height: 120, borderRadius: 6}}
                  />
                  <View style={{display: 'flex', flexDirection: 'column'}}>
                    <Text
                      style={{
                        color: '#000000',
                        marginBottom: 10,
                      }}>
                      {item?.productName || 'LAMERI'}
                    </Text>
                    {item?.productDescription && (
                      <Text
                        style={{
                          color: '#555555',
                          marginBottom: 10,
                          fontSize: 13,
                        }}>
                        {item?.productDescription}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={{textAlign: 'center', marginTop: 20}}>
              No order data found
            </Text>
          )}
        </View> */}
      </ScrollView>
      <View style={{position: 'fixed', bottom: 0, padding: 20}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginVertical: 20,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 15,
              color: '#333333',
            }}>
            TOTAL ORDER AMOUNT
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: '#1DD8E0',
            }}>
            ₹ {data.subtotal || 0}
          </Text>
        </View>

        <Button
          background={true}
          onPress={navigateToMyOrders}
          style={{
            backgroundColor: '#1FD3E0',
            borderRadius: 50,
            padding: 10,
            width: '100%',
            height: 50,
          }}
          title={'Track Order'}
        />
      </View>
    </View>
  );
};
