import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  TextInput,
  BackHandler,
  Alert,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import Button from '../../components/Button';
import storage from '../utils/storageService';
import Api from '../../redux/Api';
import {useSelector} from 'react-redux';
import Loading from '../../custom';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {COLORS} from '../../colorr/colors';

const getColorHexCode = colorName => {
  console.log('colorName', colorName);
  return COLORS[colorName];
};
export default CartCheckout = ({navigation}) => {
  const [checkout, setCheckout] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [promoCode, setPromoCode] = useState('AB34TR');
  const {cart} = useSelector(state => state.feature);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState();

  useEffect(() => {
    setCheckout(cart);
    calculateSubtotal();
  }, []);

  useEffect(() => {
    calculateSubtotal();
  }, [checkout]);

  useFocusEffect(
    React.useCallback(() => {
      getAddress();
    }, []),
  );

  const getAddress = async () => {
    try {
      setLoading(true);
      const use_id = await storage.getItem(storage.use_id);
      const endPoint = `getPickupAddressById?loginId=${use_id}`;
      const response = await Api.getRequest(endPoint);
      if (response?.data?.length !== 0) {
        setLocation(response?.data[response?.data.length - 1]);
      } else {
        setLocation();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    const total = checkout.reduce(
      (acc, item) => acc + item.quantity * item?.SellingPrice,
      0,
    );
    setSubtotal(total);
  };

  const renderItem = ({item, index}) => (
    <View
      style={{
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        marginBottom: 15,
      }}>
      <Image
        resizeMode="contain"
        source={{uri: item?.Image1}}
        style={{
          width: 100,
          height: 105,
          borderRadius: 6,
          backgroundColor: '#D9D9D960',
        }}
      />
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text
          style={{
            color: '#000000',
            fontSize: 16,
            fontWeight: '500',
            width: '90%',
          }}>
          {item.productName}
        </Text>
        {item.productDescription && (
          <Text
            style={{
              color: '#555555',
              fontSize: 12,
              marginVertical: 15,
            }}>
            {item.productDescription?.substring(0, 60)}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 6,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={{fontSize: 12, color: '#000000'}}>Colour:</Text>
            <View
              style={{
                backgroundColor:
                  item.Colour?.trim().toUpperCase() === 'MULTI'
                    ? 'transparent' // or any fallback color
                    : getColorHexCode(item.Colour?.trim())?.toUpperCase(),
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
            Quantity: {item.quantity}
          </Text>
        </View>
        <Text
          style={{
            color: '#1DD8E0',
            fontSize: 16,
          }}>
          ₹{item.SellingPrice}
        </Text>
      </View>
    </View>
  );

  const navigateToLogin = data => {
    navigation.navigate('PaymentMethod', {data, location});
  };

  const changeAddress = () => {
    navigation.navigate('Adress');
  };

  const aadToCheckout = async () => {
    try {
      setLoading(true);
      const user_id = await storage.getItem(storage.use_id);
      const endPoint = 'addProductCheckout';
      const ProductData = cart.map(item => ({
        productId: item.productId,
        productQuantity: item.quantity,
        Size: item.Size,
        Weight: Number(item?.Weight),
        Length: Number(item?.Length),
        Width: Number(item?.Width),
        SKUCode: item?.SKUCode,
        Height: Number(item?.Height),
        price: parseInt(item?.SellingPrice),
        Colour: item.Colour,
      }));

      // const productDataIdd=cart.map(item => ({productId: item.productId}));
      const productDataIdd = cart.map(item => item.productId);
      console.log(productDataIdd);
      for (const productId of productDataIdd) {
        const data = {
          loginId: user_id,
          productId: productId, // Send one productId at a time
          fullAddress: `${location?.fullName}, ${location?.houseNumberBuildingName}, ${location?.roadNameArea}, ${location?.City}, ${location?.state}`,
          promoCode: promoCode,
          pincode: location?.pinCode,
          subtotal: parseInt(subtotal),
          ProductData,
        };

        const response = await Api.postRequest(endPoint, JSON.stringify(data));
        if (response.data) {
          console.log(response.data);
          ToastAndroid.show('Proceed To Checkout', ToastAndroid.SHORT);
          navigateToLogin(response.data);
        } else {
          ToastAndroid.show(
            'Erorr with Proceed To Checkout',
            ToastAndroid.SHORT,
          );
        }
        setLoading(false);
      }
    } catch (errr) {
      console.log(errr);
      ToastAndroid.show('Erorr with Proceed To Checkout', ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header color={true} title={'Checkout'} />
      {loading && <Loading />}
      <ScrollView style={{flex: 1, padding: 20}}>
        <FlatList
          data={checkout}
          scrollEnabled={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* <View style={{ marginVertical: 10, paddingVertical: 15, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#ccc" }}>
          <Text style={{ fontSize: 15, color: '#333333' }}>
            📩 Add promo code
          </Text>
          <TextInput
            style={{
              borderColor: '#BABABA',
              borderWidth: 1,
              padding: 10,
              marginTop: 10,
              borderRadius: 5,
              height: 40,
              color: 'black',
            }}
            placeholderTextColor={'grey'}
            placeholder="Enter promo code"
            value={promoCode}
            onChangeText={setPromoCode}
          />
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderColor: '#ccc',
          }}>
          <Text style={{fontSize: 15, color: '#333333'}}>🚪 Delivery</Text>
          <Text style={{fontSize: 15, color: '#333333'}}>Free</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#333',
            }}>
            📍 Delivery To
          </Text>
          <TouchableOpacity onPress={changeAddress} style={{}}>
            <Text style={{color: '#1DD8E0', fontSize: 16}}>Change</Text>
          </TouchableOpacity>
        </View>
        {!location ? null : (
          <View
            style={{
              paddingBottom: 30,
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  color: '#00000099',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                {`${location?.fullName}`}
              </Text>
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                  backgroundColor: '#D9D9D950',
                }}>
                <Text
                  style={{
                    color: '#00000099',
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  {`${location?.typeAddress?.toUpperCase()}`}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: '#00000099',
                fontSize: 16,
                fontWeight: '400',
              }}>
              {`${location?.houseNumberBuildingName}, ${location?.roadNameArea}, ${location?.City}, ${location?.state}, ${location?.pinCode}`}
            </Text>
            <Text
              style={{
                color: '#00000099',
                fontSize: 16,
                fontWeight: '400',
                marginTop: 10,
              }}>
              {`${location?.phoneNumber}`}
            </Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          marginVertical: 10,
          padding: 20,
          paddingBottom: 0,
          borderTopWidth: 1,
          borderColor: '#ccc',
          alignSelf: 'center',
          width: '100%',
          position: 'fixed',
          bottom: 0,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Text style={{fontSize: 18, color: '#333333'}}>SUBTOTAL</Text>
          <Text style={{fontSize: 18, color: '#1DD8E0', marginLeft: 'auto'}}>
            ₹{subtotal}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            marginTop: 5,
            color: '#888888',
          }}>
          *shipping charges, taxes, and discount codes
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 10,
            color: '#888888',
          }}>
          are calculated at the time of accounting.
        </Text>
        <Button
          onPress={aadToCheckout}
          background={true}
          style={{
            backgroundColor: '#1FD3E0',
            borderRadius: 50,
            padding: 10,
            width: '100%',
            alignSelf: 'center',
            height: 50,
            borderColor: '#BABABA',
            marginTop: 10,
          }}
          title={'Place Order'}
        />
      </View>
    </View>
  );
};
