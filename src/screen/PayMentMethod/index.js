import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import {heightPercent, widthPrecent} from '../utils/responsive';
import Button from '../../components/Button';
import storage from '../utils/storageService';
import Api from '../../redux/Api';
import Loading from '../../custom';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import {COLORS} from '../../colorr/colors';
import AllInOneSDKManager from 'paytmpayments-allinone-react-native';
import {CALLBACK_URL, MID, URL_SCHEME} from '../../../Constant';
import Constants from '../../redux/Api/Constants';

const getColorHexCode = colorName => {
  return COLORS[colorName];
};
export default PayMenethod = ({navigation, route}) => {
  const {location} = route?.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const Submit = async () => {
    const orderId = data?.commonData?.orderId;
    const amount = data?.commonData?.toPay;
    if (amount == 0) {
      // If amount is zero, skip directly to shipment creation or order confirmation
      await shippment_delivery();
      return;
    }
    const response = await fetch(`${Constants.MainUrl}/generate-token`, {
      method: 'POST',
      body: JSON.stringify({
        orderId: orderId,
        amount: amount,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data1 = await response.json();
    if (!response.ok) {
      console.log('Paytm token error:', data1);
      throw new Error(data1?.error || 'Failed to generate Paytm token');
    }
    const token = data1.txnToken;
    if (token) {
      AllInOneSDKManager.startTransaction(
        orderId,
        MID,
        token,
        amount.toFixed(2),
        CALLBACK_URL + orderId,
        false, // false if staging else true
        true,
        URL_SCHEME,
      )
        .then(result => {
          console.log('result', result);
          if (result.STATUS === 'TXN_SUCCESS') {
            shippment_delivery();
          }
        })
        .catch(err => {
          console.log('paytm gateway error >>>', err);
        });
    }
  };

  const shippment_delivery = async () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      username: 'info@bworth.co.in',
      password: 'dd67779cf5c43365385c7adcb0029ef1',
      client_id: 'VFQOQZQQR4YGXYYCBB1FI1X67ZXXAMY332G1I02',
      client_secret: 'FLJJQ7(9Q@+*K#A_O11SRS5QD1MDS$^519+$7',
      grant_type: 'password',
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch('https://oauth.smartship.in/loginToken.php', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('API Response:', result);

        if (result?.access_token) {
          order_confirmed(result?.access_token);
        } else {
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  const getBrandHubInfo = async brandName => {
    try {
      const response = await fetch(
        `https://bworth.co.in/api/bworth/getBrandByName?brandName=${encodeURIComponent(
          brandName,
        )}`,
      );
      const result = await response.json();
      if (result?.data?.hub_id && result?.data?.gst_no) {
        return {
          hub_id: result.data.hub_id,
          gst_no: result.data.gst_no,
        };
      }
      // Fallback if brand not found
      return {hub_id: '139365', gst_no: '29ABCDE1234F2Z5'};
    } catch (err) {
      console.log('Error fetching brand info:', err.message);
      return {hub_id: '139365', gst_no: '29ABCDE1234F2Z5'}; // fallback
    }
  };

  const order_confirmed = async token => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
      const brandMap = {};
      data.productPaymentData.forEach(item => {
        if (!brandMap[item.Brand]) brandMap[item.Brand] = [];
        brandMap[item.Brand].push(item);
      });
      const orders = await Promise.all(
        Object.keys(brandMap).map(async (brand, index) => {
          const productData = brandMap[brand].map(item => ({
            client_product_reference_id: String(item.productId),
            product_name: String(item.productName),
            product_category: String(item.Type),
            product_hsn_code: String(item.SKUCode),
            product_quantity: String(item.productQuantity),
            product_invoice_value: String(item.SellingPrice),
            product_gst_tax_rate: '1',
            product_taxable_value: String(item.SellingPrice),
            product_sgst_amount: '1',
            product_sgst_tax_rate: '1',
            product_cgst_amount: '1',
            product_cgst_tax_rate: '1',
          }));
          const hubInfo = await getBrandHubInfo(brand);
          return {
            client_order_reference_id: `${data.commonData.orderId}_${
              index + 1
            }`,
            shipment_type: 1,
            order_collectable_amount: '0',
            total_order_value: '0',
            payment_type: 'prepaid',
            package_order_weight:
              String(data.package_order.package_order_weight) || '1',
            package_order_length: '12',
            package_order_height: '5',
            package_order_width: '8',
            shipper_hub_id: hubInfo.hub_id,
            // shipper_gst_no: hubInfo.gst_no,
            order_invoice_date: moment(new Date()).format('DD-MM-YYYY'),
            order_invoice_number: `INV_${data.commonData.orderId}_${index + 1}`,
            is_return_qc: '0',
            return_reason_id: '0',
            order_meta: {preferred_carriers: [1, 3, 279]}, // maybe change this, due to all the unserviceable pincodes issue (maybe)
            product_details: productData,
            consignee_details: {
              consignee_name: String(location?.fullName),
              consignee_phone: String(location?.phoneNumber),
              consignee_email: '',
              consignee_complete_address: `${location?.houseNumberBuildingName}, ${location?.roadNameArea}, ${location?.City}, ${location?.state}`,
              consignee_pincode: String(location?.pinCode),
            },
          };
        }),
      );
      // console.log('orders before smartship call', orders);
      const raw = JSON.stringify({
        request_info: {
          client_id: 'VFQOQZQQR4YGXYYCBB1FI1X67ZXXAMY332G1I02',
          run_type: 'create',
        },
        orders,
      });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      const response = await fetch(
        'https://api.smartship.in/v2/app/Fulfillmentservice/orderRegistrationOneStep',
        requestOptions,
      );
      const result = await response.json();
      // console.log('smartship result: ', result);
      const orders1 = result?.data?.success_order_details?.orders;
      const shippingInfo = result?.data?.success_order_details?.shipping_info;
      // console.log('orders1 from smartship response', orders1);
      // console.log('shippingInfo from smartship response', shippingInfo);
      if (orders1?.length && shippingInfo) {
        try {
          await confiPayment(orders1, shippingInfo.label_url, brandMap);
        } catch (error) {
          console.log('order_error', error);
        }
      } else {
        ToastAndroid.show(
          JSON.stringify(result?.errors ?? 'No successful orders'),
          ToastAndroid.SHORT,
        );
        setLoading(false);
      }
      console.log('Smartship result:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.log('Order creation error:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPaymentdata();
      return () => {};
    }, []),
  );

  const getPaymentdata = async () => {
    try {
      setLoading(true);
      const user_id = await storage.getItem(storage.use_id);
      const endPoint = 'getProductPaymentById';
      apibody = {
        loginId: user_id,
      };
      const response = await Api.postRequest(endPoint, apibody);
      //
      if (response?.data) {
        console.log('see here=>>', JSON.stringify(response.data, null, 2));
        setData(response.data);
      }
      setLoading(false);
    } catch (err) {
      console.log('this is error', err);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  const confiPayment = async (orders, shippingLabelUrl, brandMap) => {
    try {
      const user_id = await storage.getItem(storage.use_id);
      let orderIndex = 0;
      for (const brand of Object.keys(brandMap)) {
        const smartshipOrder = orders[orderIndex];
        for (const product of brandMap[brand]) {
          const {awb_number, client_order_reference_id, sc_confirmation_no} =
            smartshipOrder;
          // console.log(
          //   'data with productPaymentData from which product is extracted: ',
          //   data,
          // );
          // console.log('productDetails before adding it to DB', product);
          const addOrderDetailData = {
            loginId: user_id,
            itemTotal: product?.SellingPrice ?? 0,
            orderImage: product?.productImage ?? '',
            orderDescription: product?.productName ?? '',
            brandName: product?.Brand ?? '',
            productId: product?.SKUCode ?? '',
            color: product?.Colour ?? 'N/A',
            size: product?.Size ?? 'N/A',
            quantity: product?.productQuantity ?? 0,
            price: product?.SellingPrice ?? 0,
            MrpTotal: product?.Mrp ?? 0,
            coin: data?.commonData?.superCoins,
            billTotal: product?.SellingPrice ?? 0,
            orderId: client_order_reference_id,
            paymentMode: 'paid online',
            deliveryAddress: data?.commonData?.deliverAddress ?? '',
          };
          await fetch('https://bworth.co.in/api/bworth/addOrderDetail', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(addOrderDetailData),
          });
          const confirmationData = {
            loginId: user_id,
            confirmation: true,
            subtotal: product?.SellingPrice ?? 0,
            orderId: client_order_reference_id,
            superCoins: data?.commonData?.superCoins,
            transitionId: sc_confirmation_no,
            awb_number,
            sc_confirmation_no,
            invociePdfUrl: shippingLabelUrl,
          };
          const confirmRes = await Api.postRequest(
            'addOrderConfirmation',
            JSON.stringify(confirmationData),
          );
          if (confirmRes?.message === 'API success') {
            const orderStatusData = {
              loginId: user_id,
              orderId: `BWO${client_order_reference_id.toUpperCase()}`,
              orderStatus: 'Confirmed',
            };
            await fetch('https://bworth.co.in/api/bworth/addOrderStatus', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(orderStatusData),
            });
          }
          console.log(
            `✅ Order synced: ${client_order_reference_id} | AWB: ${awb_number}`,
          );
        }
        orderIndex++;
      }
      const endPoint = `getMyOrderById?loginId=${user_id}`;
      const response = await Api.getRequest(endPoint);
      if (Array.isArray(response?.data) && response.data.length > 0) {
        ToastAndroid.show('All Orders Confirmed', ToastAndroid.SHORT);
        navigation.navigate('MyOrders', {data: response.data});
      }
      setLoading(false);
    } catch (err) {
      console.log('confiPayment error:', err);
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {loading && <Loading />}
      <Header title={'Payment Method'} color={true} width={'100%'} />
      <View style={{flex: 1, padding: 20}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 12,
            }}></View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: '#000000',
            }}>
            {data?.productPaymentData?.length} items in this order
          </Text>
          <FlatList
            data={data?.productPaymentData ?? []}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                    gap: 15,
                  }}>
                  <Image
                    source={{uri: item.productImage}}
                    style={{
                      width: 60,
                      height: 90,
                      backgroundColor: '#D9D9D950',
                      borderRadius: 6,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: '#000000',
                        fontWeight: '600',
                      }}>
                      {item?.productName}
                    </Text>
                    {item?.productDescription && (
                      <Text
                        style={{
                          color: '#555555',
                          fontSize: 12,
                        }}>
                        {item?.productDescription?.substring(0, 30)}...
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 15,
                        marginVertical: 6,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <Text style={{fontSize: 12, color: '#000000'}}>
                          Colour:
                        </Text>
                        <View
                          style={{
                            backgroundColor:
                              item.Colour?.trim().toUpperCase() === 'MULTI'
                                ? 'transparent' // or any fallback color
                                : getColorHexCode(
                                    item.Colour?.trim(),
                                  )?.toUpperCase(),
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: 'black',
                          }}>
                          {item.Colour?.trim().toUpperCase() === 'MULTI' && (
                            <Image
                              source={{
                                uri: 'https://assets.ajio.com/static/img/multi_color_swatch.png',
                              }}
                              style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                                borderRadius: 10,
                              }}
                              resizeMode="cover"
                            />
                          )}
                        </View>
                      </View>
                      <Text style={{fontSize: 12, color: '#000000'}}>
                        Size: {item.Size}
                      </Text>
                      <Text style={{fontSize: 12, color: '#000'}}>
                        Quantity: {item.productQuantity}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#000000',
                      }}>
                      ₹ {item?.SellingPrice}
                    </Text>
                  </View>
                </View>
              );
            }}
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
          {/* <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
            <Text
              style={{
                fontSize: 13,
                color: '#000000',
              }}>
              MRP
            </Text>
            <Text
              style={{
                color: '#000000',
                fontWeight: '600',
              }}>
              ₹ {data?.commonData?.toPay}
            </Text>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 13,
                color: '#000000',
              }}>
              Item total
            </Text>
            <Text style={{color: '#000000'}}>
              ₹ {data?.commonData?.itemTotal}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 13,
                color: '#000000',
              }}>
              BWorth Smart Coin
            </Text>
            <Text
              style={{
                color: '#000000',
                fontWeight: '600',
                fontSize: 13,
              }}>
              ₹ {data?.commonData?.superCoins}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 13,
                color: '#000000',
              }}>
              Handling charge
            </Text>
            <Text
              style={{
                color: '#000000',
                fontWeight: '600',
              }}>
              ₹ {data?.commonData?.handlingCharge}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 13,
                color: '#000000',
              }}>
              Delivery charge
            </Text>
            <Text
              style={{
                color: '#000000',
                fontWeight: '500',
              }}>
              ₹ {data?.commonData?.deliveryCharge}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: '#000000',
              }}>
              Bill total
            </Text>
            <Text
              style={{
                color: '#000000',
                fontWeight: 'bold',
              }}>
              ₹ {data?.commonData?.billTotal}
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
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                marginTop: 20,
                color: '#000000',
              }}>
              Order Id
            </Text>
            <Text
              style={{
                marginTop: 4,
                // fontWeight: 'bold',
                color: '#000000',
              }}>
              BWO{data?.commonData?.orderId.toUpperCase()}
            </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text
              style={{
                fontSize: 13,
                marginTop: 20,
                color: '#000000',
                fontWeight: 'bold',
              }}>
              Payment Mode
            </Text>
            <Text style={{marginTop: 10, color: '#000000'}}>
              {data?.commonData?.payment}
            </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text
              style={{
                fontSize: 13,
                marginTop: 20,
                color: '#000000',
                fontWeight: 'bold',
              }}>
              Deliver to
            </Text>
            <Text style={{marginTop: 10, color: '#000000'}}>
              {data?.commonData?.deliverAddress}
            </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text
              style={{
                fontSize: 13,
                marginTop: 20,
                color: '#000000',
                fontWeight: 'bold',
              }}>
              Order placed
            </Text>
            <Text
              style={{
                marginTop: 10,
                // fontWeight: 'bold',
                color: '#000000',
              }}>
              {data?.commonData?.orderPlaced}
            </Text>
          </View>
          <Button
            title={'Continue Payment'}
            onPress={Submit}
            background={true}
            style={{
              marginTop: '10%',
              width: '100%',
              alignSelf: 'center',
              borderRadius: 50,
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};
