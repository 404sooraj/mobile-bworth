import Button from './Button';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../screen/utils/responsive';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import {useState, memo, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Api from '../redux/Api';
import {setWalletPrice} from '../redux/feature/featuresSlice';
import {useDispatch} from 'react-redux';
import storage from '../screen/utils/storageService';
const DashBoardHeader = ({cashback}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [walletPrice, setValletPrice] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    if (Focused) {
      getWallePrice(); // Re-fetch when screen gains focus
      ApiCall(); // Optional: re-fetch cashback value too
    }
    // getWallePrice();
    //       ApiCall();
  }, []);
  const ApiCall = async () => {
    try {
      const user_id = await storage.getItem(storage.use_id);
      const endPoint = `getTransactionListById`;
      const postdata = {
        loginId: user_id,
      };
      const response = await Api.postRequest(endPoint, postdata);
      if (response.data) {
        setData(response);
      } else {
        setData([]);
        ToastAndroid.show('No Data Found', ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getWallePrice = async () => {
    try {
      const endpoint = 'getWalletPrices';
      const response = await Api.getRequest(endpoint);
      if (response.message == 'API success') {
        setValletPrice(response.data[0]?.price);
        dispatch(setWalletPrice(response.data[0]?.price));
      }
    } catch (error) {}
  };
  const [cartQuantity, setCartQuantity] = useState(0);
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

  const handleCart = () => {
    navigation.navigate('cartScreen');
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      }}>
      <View style={{borderWidth: 0}}>
        <Image
          source={require('../assets/BWORTH.jpeg')}
          style={[styles.logo1, {borderWidth: 1}]}
        />
      </View>
      {!cashback ? (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Cashbacks');
            }}
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              width: '30%',
              // borderWidth: 1,
              marginRight: '-15%',
            }}>
            {/* <Image
              source={require('../assets/bwc.svg')}
              resizeMode="contain"
              style={{
                width: hp(4.5),
                height: hp(4.5),
                marginRight: '-13%',
                borderRadius: 40,
                borderColor: 'white',
                borderWidth: 1,
                alignItems: 'center',
                zIndex: 1,
              }}
            /> */}
            <Button
              background={true}
              onPress={() => navigation.navigate('Cashbacks')}
              style={{
                backgroundColor: '#4B5EF3',
                height: hp(3.7),
                width: wp(22),
                // borderRadius: 0,
                borderRadius: 50,
                // borderBottomRightRadius: 35,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 5,
                // marginLeft: '-20%',
                // borderWidth: 1,
              }}
              title={`BWC - ${data?.total ?? 0}`}
              textStyle={{color: '#fff', fontWeight: 'bold', fontSize: 14}}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('FavProductsList')}
            style={{marginLeft: '10%', padding: 10}}>
            <Image
              tintColor={'#4370F0'}
              style={{height: 24, width: 24}}
              source={require('../assets/heartfill.png')}
            />
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={handleCart}
            style={[styles.cartContainer, {marginRight: '6%'}]}>
            <Icon name="shopping-cart" size={24} color="#777" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartQuantity}</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <Image
          style={{
            height: hp(2.5),
            width: hp(2.5),
            marginRight: '5%',
          }}
          source={require('../assets/icon/Frame4.png')}
        />
      )}
    </View>
  );
};
export default memo(DashBoardHeader);
