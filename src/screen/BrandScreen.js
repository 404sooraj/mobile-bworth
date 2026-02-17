import {ToastAndroid, View} from 'react-native';
import Header from '../components/Header';
import BrandSection from '../components/brand2';
import {useState} from 'react';
import Loading from '../custom';
import Api from '../redux/Api';
import {setProducts} from '../redux/feature/featuresSlice';
import {useDispatch} from 'react-redux';

const BrandScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getProductListById = async endPoint => {
    try {
      console.log('this is endpoint', endPoint);

      setLoading(true);
      const res = await Api.getRequest(endPoint);
      if (res.data.length > 0) {
        dispatch(setProducts(res.data));
        navigation.navigate('ProductList', {data: []});
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
    <View style={{flex: 1}}>
      <Header title={'Brands'} color={true} width={'90%'} />
      {loading && <Loading />}
      <BrandSection
        brandPage
        brandsas={'brand1'}
        onPress={getProductListById}
      />
    </View>
  );
};
export default BrandScreen;
