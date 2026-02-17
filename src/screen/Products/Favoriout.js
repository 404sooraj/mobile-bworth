import {FlatList, ScrollView, Text, ToastAndroid, View} from 'react-native';
import Header from '../../components/Header';
import TopHorizontal from '../../components/TopHorizontal';
import ProductListCmp from '../../components/ProductListCmp';
import {widthPrecent} from '../utils/responsive';
import {useDispatch, useSelector} from 'react-redux';
import Api from '../../redux/Api';
import {
  getProudctDetails,
  setProductDetail,
} from '../../redux/feature/featuresSlice';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import Loading from '../../custom';
import storage from '../utils/storageService';

const FavProductsList = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  // console.log('>>>>>>>>>');

  const addtofavoriotlist = async item => {
    try {
      const endPoint = 'updateFavouriteStatusById';

      const data = {
        id: item?.id,
        favouriteStatus: false,
      };
      const response = await Api.postRequest(endPoint, data);
      console.log('this is response', response);
    } catch (err) {
      console.log(err);
    }
  };
  const getProductDetail = item => {
    navigation.navigate('ProductDetails', {
      productId: item.productId,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setIsLoading(true);
      const rawUserId = await storage.getItem(storage.use_id);
      const user_id = rawUserId?.replace(/^0+/, '');
      const endPoint = `getAddFavouriteById?loginId=${user_id}`;
      const res = await Api.getRequest(endPoint);
      console.log(JSON.stringify(res, null, 2));
      if (res.message == 'API success') {
        console.log('>>>>>', JSON.stringify(res?.favourites, null, 2));
        try {
          const res = await Api.getRequest(
            `getProductDetailsById?productId=${res?.favourites.productId}`,
          );
          const data = res.data;
          console.log('>>>>', JSON.stringify(data, null, 2));
        } catch (error) {
          console.error(error.message);
        }
        setProducts(res?.favourites);
      }
      setIsLoading(false);
    } catch (eer) {
      console.log(eer);
      setIsLoading(false);
      setProducts([]);
    }
  };
  const deleteProduct = async item => {
    try {
      const rawUserId = await storage.getItem(storage.use_id);
      const user_id = rawUserId?.replace(/^0+/, '');
      const endPoint = `deleteAddFavouritesByLoginId?loginId=${user_id}&productId=${item?.productId}`;
      const response = await Api.deleteRequest(endPoint);
      if (response?.message == 'Favourites deleted successfully') {
        getData();
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(response?.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(err);

      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {isLoading && <Loading />}
      <Header title={'Favourite List'} color={true} width={'60%'} />
      <ScrollView contentContainerStyle={{paddingBottom: 15}}>
        {/* <TopHorizontal
          onPress={() => {
            null;
          }}
        /> */}
        {products?.length > 0 ? (
          <ProductListCmp
            onPressHeart={deleteProduct}
            onPress={getProductDetail}
            data={products}
          />
        ) : (
          <Text
            style={{
              color: 'black',
              alignSelf: 'center',
              fontSize: 18,
              marginTop: '80%',
            }}>
            No Products Found
          </Text>
        )}
        {/* {products?.length > 10 && (
          <View
            style={{
              alignItems: 'center',
              width: widthPrecent(100),
              // borderWidth: 1,
            }}>
            <FlatList
              data={[1, 2, 3, 4, 5]}
              horizontal
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      height: 45,
                      width: 45,
                      backgroundColor: item == 1 ? 'black' : '#ECECEC',
                      marginLeft: widthPrecent(3),
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: item == 1 ? '#fff' : '#000000',
                        fontSize: 20,
                      }}>
                      {item}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        )} */}
      </ScrollView>
    </View>
  );
};
export default FavProductsList;
