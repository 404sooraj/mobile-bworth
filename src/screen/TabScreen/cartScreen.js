import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import Button from '../../components/Button';
import storage from '../utils/storageService';
import Api from '../../redux/Api';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Loading from '../../custom';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {setCarts} from '../../redux/feature/featuresSlice';
import axios from 'axios';
import {COLORS} from '../../colorr/colors';

const getColorHexCode = colorName => {
  console.log('colorName', colorName);
  return COLORS[colorName];
};

export default CartScreen = ({navigation}) => {
  const navigateToCheckout = async () => {
    const ad = await storage.getItem(storage.Address2);
    // navigation.navigate('cartCheckout');
    if (ad == null) {
      navigation.navigate('Adress');
    } else {
      navigation.navigate('cartCheckout');
    }
  };

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const Focused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    getCartItem();
  }, []);

  useEffect(() => {
    calculateSubtotal();
  }, [cart]);

  const getCartItem = async query => {
    try {
      setLoading(true);
      const use_id = await storage.getItem(storage.use_id);
      const endPoint = `getProductCartQuantityById?loginId=${use_id}`;
      const response = await Api.getRequest(endPoint);

      if (response.data) {
        setCart(response.data);
      } else {
        ToastAndroid.show('No Cart Products Found', ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      ToastAndroid.show(
        query ? query : 'No Cart Products Found',
        ToastAndroid.SHORT,
        setCart([]),
      );
    }
  };
  const updateQuantity = async (index, change) => {
    const newCart = [...cart];
    const item = newCart[index];
    const updatedQuantity = item.quantity + change;
    console.log('updatedQuantity', updatedQuantity);

    if (updatedQuantity >= 0) {
      const user_id = await storage.getItem(storage.use_id);
      const endPoint = `addProductCartQuantity`;

      const requestBody = {
        loginId: user_id,
        productId: item.productId,
        Image1: item.Image1 || '',
        productName: item.productName,
        productDescription: item.productDescription,
        quantity: change, // Send only the change, not the updated quantity
        SellingPrice: item.SellingPrice,
        Size: item.Size,
        Colour: item.Colour,
      };
      console.log('requestBody++', requestBody);
      try {
        const response = await Api.postRequest(endPoint, requestBody);
        if (response.data) {
          if (updatedQuantity === 0) {
            // Remove the item from the cart
            ToastAndroid.show('Item removed from cart', ToastAndroid.SHORT);
            newCart.splice(index, 1);
          } else {
            // Update the item's quantity in the cart
            ToastAndroid.show(
              'Quantity updated successfully',
              ToastAndroid.SHORT,
            );
            newCart[index].quantity = updatedQuantity;
          }
          setCart(newCart);
          getCartItem();
        } else {
          ToastAndroid.show('Item removed from cart', ToastAndroid.SHORT);
          newCart.splice(index, 1);
          setCart(newCart);
          deleteCart(item);
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    } else {
      ToastAndroid.show('Quantity cannot be less than 1', ToastAndroid.SHORT);
    }
  };

  const calculateSubtotal = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item?.quantity * item?.SellingPrice,
      0,
    );
    return subtotal;
  };

  const aadToCheckout = async () => {
    try {
      setLoading(true);
      const user_id = await storage.getItem(storage.use_id);
      const address = await storage.getItem(storage.Address);

      const endPoint = 'addProductCheckout';
      const ProductData = cart.map(item => ({
        productId: item.productId,
        productQuantity: item.quantity,
        Size: item.Size,
        Weight: item?.Weight,
        Length: item?.Length,
        Width: item?.Width,
        SKUCode: item?.SKUCode,
        Height: item?.Height,
        price: item?.SellingPrice,
        Colour: item.Colour,
      }));
      console.log('itemQuant', ProductData);
      const productDataIdd = cart.map(item => ({productId: item.productId}));
      // console.log("--ABCD--${}",productDataIdd);
      const data = {
        loginId: Number(user_id),
        productId: Number(cart[0].productId), // make sure it's a number
        fullAddress: address || 'Some default address', // ensure non-empty
        promoCode: 'AB34TR',
        pincode: 263126, // convert to number
        subtotal: calculateSubtotal(),
        // loginId: user_id,
        // productId: productDataIdd,
        // fullAddress: address ?? "",
        // promoCode: 'AB34TR',
        // pincode: "263126",
        // subtotal: calculateSubtotal(),
        ProductData,
      };
      console.log('--data--${}', data);
      dispatch(setCarts(cart));
      // navigateToCheckout();
      setLoading(false);
      // return;
      const response = await Api.postRequest(endPoint, data);
      if (response.data) {
        navigateToCheckout();
      } else {
        ToastAndroid.show('Erorr with Proceed To Checkout', ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (errr) {
      console.log(errr);
      ToastAndroid.show('Erorr with Proceed To Checkout', ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  const deleteCart = async item => {
    // console.log(item);
    // return;
    try {
      const user_id = await storage.getItem(storage.use_id);
      const endPoint = `deleteProductCartQuantity?loginId=${user_id}&productId=${item.productId}`;
      const response = await Api.deleteRequest(endPoint);
      if (response?.message == 'Product Quantity deleted successfully')
        getCartItem(response?.message);
    } catch (errr) {
      console.log('this is err', errr);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          marginBottom: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            deleteCart(item);
          }}
          style={{position: 'absolute', right: 0, top: 50}}>
          <AntDesign name="delete" size={20} color={'grey'} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
          <Image
            resizeMode="stretch"
            source={{uri: item?.Image1}}
            style={{width: 110, height: 138, borderRadius: 6}}
          />
          <View style={{}}>
            <Text
              style={{
                color: '#000000',
                fontWeight: '600',
                width: '90%',
              }}>
              {item?.productName}
            </Text>
            <Text
              style={{
                color: '#555555',
                fontSize: 12,
              }}>
              {item?.productDescription?.substring(0, 30)}...
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 25 / 2,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => updateQuantity(index, -1)}>
                <Text style={{color: '#000000', fontSize: 16}}>{`${'-'}`}</Text>
              </TouchableOpacity>
              <Text
                style={{color: '#000000', fontSize: 18, marginHorizontal: 10}}>
                {item.quantity}
              </Text>
              <TouchableOpacity
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 25 / 2,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => updateQuantity(index, 1)}>
                <Text style={{color: '#000000', fontSize: 18}}>+</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                marginVertical: 6,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
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

              {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Text style={{ fontSize: 12, color: '#000000' }}>
                  Colour:
                </Text>
                <View style={{ fontSize: 12, color: '#000000', width: 15, height: 15, backgroundColor: item.Colour?.trim(), borderRadius: 15 / 2 }} />
              </View> */}
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
              ₹{item?.SellingPrice}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {loading && <Loading />}
      <Header width={'20%'} title={'Cart'} color={true} />
      <View style={{flex: 1, padding: 20}}>
        <FlatList
          data={cart}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        {cart.length > 0 ? (
          <>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#333333',
                }}>
                SUBTOTAL
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#1DD8E0',
                  marginLeft: 'auto',
                }}>
                ₹{calculateSubtotal()}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                marginVertical: 10,
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
              onPress={() => aadToCheckout(cart[0])}
              background={true}
              style={{
                backgroundColor: '#1FD3E0',
                borderRadius: 50,
                padding: 10,
                height: 50,
                borderColor: '#BABABA',
                marginBottom: 10,
                marginTop: 10,
                width: '100%',
                alignSelf: 'center',
              }}
              title={'Proceed to Checkout'}
            />
          </>
        ) : (
          <Text
            style={{
              color: 'grey',
              position: 'absolute',
              top: '40%',
              alignSelf: 'center',
              fontWeight: '500',
              fontSize: 20,
            }}>
            Your Cart Is Empty
          </Text>
        )}
      </View>
    </View>
  );
};
