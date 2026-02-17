import React, {useState, useEffect} from 'react';
import {
  Button,
  Modal,
  Image,
  ImageBackground,
  StyleSheet,
  input,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  TouchableOpacityBase,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BrandSection from '../../components/brand2';
import DashBordHeader from '../../components/DashBordHeader';
import BottomImageBar from '../../components/bottomImageBar';
import Favorioties from '../../components/Brand/Favorioties';
import Horizontal from '../../components/Brand/Horizontal';
import Styles from '../utils/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {heightPercent as hp, widthPrecent as wp} from '../utils/responsive';
import Offers from '../../components/Brand/Offers';
import Api from '../../redux/Api';
import Loading from '../../custom';
import {useDispatch} from 'react-redux';
import {setProducts} from '../../redux/feature/featuresSlice';
import {useNavigation, useIsFocused} from '@react-navigation/native';

export default Brands = () => {
  const [favorioties, setFavorities] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused(); // ✅ added
  useEffect(() => {
    if (isFocused) {
      apiCall();
    }
  }, [isFocused]);
  // useEffect(() => {
  //   apiCall();
  // }, []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const apiCall = async () => {
    try {
      setLoading(true);
      const endpoint = 'getFavouriteBrandsList';
      const endpoint2 = 'getBrandDiscount';
      const Fvt = await Api.getRequest(endpoint);
      const discount = await Api.getRequest(endpoint2);
      console.log('this is fvt', Fvt);
      if (Fvt?.data) {
        setFavorities(Fvt?.data);
      } else {
        ToastAndroid.show('No Brands Found', ToastAndroid.SHORT);
      }
      if (discount?.data) {
        setDiscount(discount.data);
      } else {
        ToastAndroid.show('No Discount Found', ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getProductListById = async endPoint => {
    try {
      setLoading(true);
      const res = await Api.getRequest(endPoint);
      if (res.data.length > 0) {
        dispatch(setProducts(res.data));
        navigation.navigate('ProductList', {data: res.data});
      } else {
        ToastAndroid.show('No Product Found', ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (err) {
      ToastAndroid.show('No Product Found', ToastAndroid.SHORT);
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={Styles.container2}>
      <DashBordHeader />
      {loading && <Loading />}
      <ScrollView>
        {/* <Favorioties onPress={getProductListById} fvt={favorioties} /> */}
        <BrandSection brandsas={'brand1'} onPress={getProductListById} />

        {/* <Horizontal /> */}
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('BrandScreen');
          }}
          style={{
            marginTop: 360,
            height: hp(6),
            width: wp(90),
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            // marginTop: '5%',
          }}>
          <Text style={{color: 'grey', fontSize: 14, fontWeight: 500}}>
            See All
          </Text>
          <AntDesign
            style={{marginLeft: 5}}
            name="right"
            size={15}
            color={'grey'}
          />
        </TouchableOpacity> */}
        {/* <Offers discount={discount} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};
