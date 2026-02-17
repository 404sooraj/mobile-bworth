import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ToastAndroid,
  StyleSheet,
  Dimensions,
  Linking,
  Animated,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState, useRef, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../components/Header';
import {heightPercent} from '../utils/responsive';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import Storage from '../utils/storageService';
import Api from '../../redux/Api';
import Loading from '../../custom';
import ProductListCmp from '../../components/ProductListCmp';
import {COLORS} from '../../colorr/colors';
import {
  getProudctDetails,
  setProducts,
} from '../../redux/feature/featuresSlice';
import storage from '../utils/storageService';
const {width} = Dimensions.get('window');

// Utility function to get hex code from color name
const getColorHexCode = colorName => {
  const colorKey = colorName;
  return COLORS[colorKey] || '#FFFFFF'; // Default to white if no match found
};

export default function ProductDetails({route}) {
  const [loading, setLoading] = useState(false);
  // const route = useRoute();
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);
  const navigation = useNavigation();
  const {productDetail, products} = useSelector(state => state.feature);
  const proudct = productDetail[0];
  const [expanded, setExpanded] = useState([-1]);
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const Focused = useIsFocused();
  useEffect(() => {
    getCartQuantity();
  }, [Focused]);
  const getCartQuantity = async () => {
    try {
      const user_id = await storage.getItem(storage.use_id);
      const endPoint = `getProductCartQuantityById?loginId=${user_id}`;
      const res = await Api.getRequest(endPoint);
      setCartQuantity(res.data.length ?? 0);
    } catch (err) {
      console.log(err);
      setCartQuantity(0);
    }
  };
  const uniqueColors = Array.from(
    new Set(proudct?.details?.flatMap(item => item.Color)),
  );
  const handleCart = () => {
    navigation.navigate('cartScreen');
  };
  const addToCart = async item => {
    try {
      setLoading(true);
      const endPoint = 'https://bworth.co.in/api/bworth/addProductCartQuantity';
      // 'addProductCartQuantity';
      const user_id = await Storage.getItem(Storage.use_id);
      console.log('user idd-', user_id);
      if (!selectedColor) {
        ToastAndroid.show('Please select color', ToastAndroid.SHORT);
        setLoading(false);
        return;
      }
      if (!selectedSize) {
        ToastAndroid.show('Please select size', ToastAndroid.SHORT);
        setLoading(false);
        return;
      }
      const data = {
        loginId: user_id,
        productId: item?.id ?? item?.productId,
        Image1: item?.images?.[0],
        productName: item?.productName,
        productDescription: item?.productDescription,
        quantity: 1,
        SellingPrice: item.SellingPrice,
        subtotal: item.SellingPrice,
        Colour:
          proudct?.details?.[0]?.Colour?.length == 0
            ? proudct?.Colour
            : selectedColor,
        Size: selectedSize,
      };
      console.log('data productD', data.Image1);
      const response = await Api.postRequest(endPoint, data);
      if (response.message == 'API success' || response?.data) {
        ToastAndroid.show('Product Added to Cart', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Product Not Added to Cart', ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (err) {
      console.log(err.response);
      if (err.message == 'Request failed with status code 400') {
        navigation.navigate('cartScreen');
      } else {
        ToastAndroid.show('Some thing went wrong', ToastAndroid.SHORT);
      }
      setLoading(false);
    }
  };

  const dispatch = useDispatch();
  const addtofavoriotlist = async item => {
    try {
      const filter = products.map(items => {
        if (items.productId === item.productId) {
          return {
            ...item,
            favourite: !item?.favourite,
          };
        } else {
          return items;
        }
      });
      const endPoint = 'addFavourite';
      const user_id = await storage.getItem(storage.use_id);

      const data = {
        productId: item?.productId,
        loginId: user_id,
        favourite: true,
      };
      if (!item?.favourite) {
        const response = await Api.postRequest(endPoint, data);
        if (response?.data) {
          dispatch(setProducts(filter));

          ToastAndroid.show(
            'Product added to favourite list',
            ToastAndroid.SHORT,
          );
        } else {
          ToastAndroid.show(
            response?.message ?? 'Item Already exist',
            ToastAndroid.SHORT,
          );
        }
      } else {
        const endPoint = `deleteAddFavouritesByLoginId?loginId=${user_id}&productId=${item?.productId}`;
        const response = await Api.deleteRequest(endPoint);
        if (response?.message == 'Favourites deleted successfully') {
          dispatch(setProducts(filter));
          ToastAndroid.show(response.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(response?.message, ToastAndroid.SHORT);
        }
      }
    } catch (err) {
      console.log('this is favriout error', err);
      ToastAndroid.show('Some thing went wrong', ToastAndroid.SHORT);
    }
  };

  const getProductDetail = item => {
    navigation.navigate('ProductDetails', {
      productId: item.productId,
    });
  };

  useEffect(() => {
    if (route?.params?.productId) {
      dispatch(
        getProudctDetails({
          endPoint: `getProductDetailsById?productId=${route.params.productId}`,
          id: route.params.productId,
        }),
      );
    }
  }, [route?.params?.productId]);

  const handleScroll = event => {
    const x = event.nativeEvent.contentOffset.x;
    setCurrentIndex(Math.floor(x / width));
    scrollX.setValue(x);
  };

  // console.log(JSON.stringify(proudct, null, 2));

  return (
    <View style={{flex: 1, backgroundColor: '#ffff'}}>
      {loading && <Loading />}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <Header title={proudct?.productName} color={true} width={'90%'} />

        <TouchableOpacity onPress={handleCart}>
          <Icon name="shopping-cart" size={24} color="#777" paddingRight="50" />
          <View>
            <Text>{cartQuantity}</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity>
          <Image
            source={require('../../assets/Export.png')}
            style={{ height: 25, width: 25, marginRight: 10 }}
          />
        </TouchableOpacity> */}
      </View>
      <ScrollView>
        <View
          style={{
            height: heightPercent(50),
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}>
            {proudct?.images?.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FastImage
                    style={styles.image}
                    source={{
                      uri: image,
                      priority: FastImage.priority.high,
                      cache: FastImage.cacheControl.immutable,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                    onLoadStart={() => setLoadingIndex(index)}
                    onLoadEnd={() => setLoadingIndex(null)}
                  />

                  {loadingIndex === index && (
                    <ActivityIndicator
                      size="large"
                      color="#000"
                      style={{position: 'absolute'}}
                    />
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.dotContainer}>
            {proudct?.images?.map((_, index) => {
              const opacity = scrollX.interpolate({
                inputRange: [
                  (index - 1) * width,
                  index * width,
                  (index + 1) * width,
                ],
                outputRange: [0.1, 1, 0.1],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={index}
                  style={[styles.dot, {backgroundColor: '#1DD8E0', opacity}]}
                />
              );
            })}
          </View>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: '600'}}>
            {proudct?.productName}
          </Text>
          <Text style={{fontSize: 18, color: '#000', fontWeight: '600'}}>
            {proudct?.productDescription}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Text style={{fontSize: 18, color: '#20D1E1', fontWeight: '600'}}>
              ₹{proudct?.SellingPrice}
            </Text>
            <Text
              style={{
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
                fontSize: 16,
                color: '#ccc',
                fontWeight: '600',
              }}>
              ₹{proudct?.Mrp}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginVertical: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '35%',
              gap: 10,
            }}>
            <Text style={{fontSize: 16, color: '#000', fontWeight: '500'}}>
              Color
            </Text>
            {Array.isArray(proudct?.details) &&
              [...new Set(proudct.details.flatMap(item => item.Colour))].map(
                (color, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedColor(color)}
                    style={{
                      backgroundColor:
                        color?.trim().toUpperCase() === 'MULTI'
                          ? 'transparent'
                          : getColorHexCode(color?.trim()),
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor:
                        selectedColor === color ||
                        getColorHexCode(color?.trim())?.toUpperCase() ===
                          '#FFFFFF'
                          ? '#000'
                          : 'transparent',
                    }}>
                    {color?.trim().toUpperCase() === 'MULTI' && (
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
                    {selectedColor === color && (
                      <Text
                        style={{
                          color:
                            getColorHexCode(color?.trim())?.toUpperCase() ===
                            '#FFFFFF'
                              ? '#000'
                              : '#fff',
                          fontSize: 10,
                        }}>
                        ✔
                      </Text>
                    )}
                  </TouchableOpacity>
                ),
              )}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#1DD8E0',
              width: '100%',
            }}></TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'center',
            width: '45%',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#000',
              fontWeight: '500',
              paddingRight: '5%',
              marginBottom: 15,
            }}>
            Size
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 3,
              marginBottom: 10,
            }}>
            {Array.isArray(proudct?.details) &&
              [...new Set(proudct?.details.map(item => item.Size))].map(
                (size, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedSize(size)}
                      style={{
                        backgroundColor: selectedSize == size ? '#000' : '#fff',
                        height: 26,
                        width: 26,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#000',
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: selectedSize == size ? '#fff' : '#000',
                        }}>
                        {size}
                      </Text>
                    </TouchableOpacity>
                  );
                },
              )}
          </View>
        </View>
        <Button
          onPress={() => {
            addToCart(proudct);
          }}
          title={'+ Add to Cart'}
          textStyle={{
            fontSize: 15,
          }}
          background={true}
          style={{
            marginHorizontal: 15,
            borderRadius: 40,
          }}
        />
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: '600'}}>
            MATERIALS
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#555555',
              fontWeight: '400',
              marginTop: 10,
            }}>
            {proudct?.Fabric}
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: '600'}}>
            CARE
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#555555',
              fontWeight: '400',
              marginTop: 10,
            }}>
            {proudct?.Care}
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: '600'}}>
            SHIPMENT
          </Text>
          <FlatList
            data={shipment}
            renderItem={({item, index}) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    if (expanded.includes(index)) setExpanded([]);
                    else {
                      setExpanded([index]);
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Image source={item.icon} style={{height: 30, width: 30}} />
                  <Text
                    style={{
                      fontSize: 15,
                      width: '75%',
                      fontWeight: '500',
                      color: '#000',
                    }}>
                    {item.name}
                  </Text>

                  <Image
                    source={require('../../assets/Forward.png')}
                    style={{height: 30, width: 30}}
                  />
                </TouchableOpacity>
                {expanded.includes(index) ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingBottom: 10,
                      paddingLeft: '13%',
                    }}>
                    {item.id == '1' ? (
                      <>
                        <Text style={{fontWeight: '500', color: 'black'}}>
                          Expected Date: {fiveDaysLater.toLocaleDateString()}
                        </Text>
                        <Text style={{color: 'black'}}>
                          {proudct?.shipmentDate}
                        </Text>
                      </>
                    ) : item.id == '3' ? (
                      <Text
                        style={{color: 'blue', textDecorationLine: 'underline'}}
                        onPress={() =>
                          Linking.openURL(
                            'https://www.bworth.co.in/returnexchange',
                          )
                        }>
                        Click Here
                      </Text>
                    ) : (
                      <Text style={{color: 'black'}}>
                        {'this is COD policy'}
                      </Text>
                    )}
                  </View>
                ) : null}
              </View>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'center',
          }}>
          <View style={{borderTopWidth: 1, width: '30%'}} />
          <Text style={{fontSize: 18, color: '#000', fontWeight: '700'}}>
            YOU MAY LIKE
          </Text>
          <View style={{borderTopWidth: 1, width: '30%'}} />
        </View>
        <ProductListCmp
          onPressHeart={addtofavoriotlist}
          onPress={getProductDetail}
          data={products.slice(0, 5)}
        />
      </ScrollView>
    </View>
  );
}

const shipment = [
  {
    name: 'Free Flat Shipping',
    icon: require('../../assets/Shipping.png'),
    id: '1',
  },
  // {
  //   name: 'Terms & Conditions Policy',
  //   icon: require('../../assets/Tag.png'),
  //   id: '2',
  // },
  {
    name: 'Return Policy',
    icon: require('../../assets/Refresh.png'),
    id: '3',
  },
];

const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'center',
  // },
  image: {
    width: width,
    // * 1.4,
    // borderRadius: 50,
    height: '100%',
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    width: width, // Full screen width for the container
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20, // Margin between image and dots
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
