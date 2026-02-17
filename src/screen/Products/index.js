import {useState, useEffect} from 'react';
import {FlatList, ScrollView, Text, ToastAndroid, View} from 'react-native';
import Header from '../../components/Header';
import TopHorizontal from '../../components/TopHorizontal';
import ProductListCmp from '../../components/ProductListCmp';
import {widthPrecent} from '../utils/responsive';
import {useDispatch, useSelector} from 'react-redux';
import Api from '../../redux/Api';

import {
  getProudctDetails,
  setProducts,
} from '../../redux/feature/featuresSlice';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../custom';
import storage from '../utils/storageService';

const ProductsList = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [filterList, setFilterList] = useState([]);
  const {products, productDetail, isLoading, isError} = useSelector(
    state => state.feature,
  );
  // console.log("here=>",JSON.stringify(products, null, 2));

  const [selectedFilter, setSelectedFilter] = useState(null);

  const addtofavoriotlist = async item => {
    try {
      const user_id = await storage.getItem(storage.use_id);
      console.log(user_id);
      const productId = item?.productId ?? item?.id;
      if (!productId || !user_id) return;
      dispatch(
        setProducts(
          products.map(p =>
            (p.productId ?? p.id) === productId
              ? {...p, favourite: !p.favourite}
              : p,
          ),
        ),
      );
      if (!item?.favourite) {
        const response = await Api.postRequest('addFavourite', {
          productId,
          loginId: user_id,
          favourite: !item.favourite,
        });
        if (!response || response?.message?.toLowerCase().includes('fail')) {
          throw new Error('Add favourite failed');
        }
        console.log('add response', response);
        ToastAndroid.show(
          'Product added to favourite list',
          ToastAndroid.SHORT,
        );
      } else {
        const response = await Api.deleteRequest(
          `deleteAddFavouritesByLoginId?loginId=${user_id}&productId=${productId}`,
        );
        if (!response || response?.message?.toLowerCase().includes('fail')) {
          throw new Error('Remove favourite failed');
        }
        console.log('remove response', response);
        ToastAndroid.show('Favourite removed', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.error('Favourite error:', err);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  const getProductDetail = item => {
    navigation.navigate('ProductDetails', {
      productId: item.productId,
    });
  };

  const handleFilterSelect = filter => {
    console.log('Selected filter:', filter);
    setSelectedFilter(filter);
  };

  const filteredProducts = selectedFilter
    ? products.filter(product => product.Type === selectedFilter)
    : products;

  useEffect(() => {
    const uniqueTypes = [
      ...new Set(filteredProducts.map(product => product.Type)),
    ];
    setFilterList(uniqueTypes);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {isLoading && <Loading />}
      <Header
        title={route?.params?.title || route?.params?.data?.[0]?.Brand}
        color={true}
        width={'100%'}
      />
      <ScrollView contentContainerStyle={{paddingBottom: 15}}>
        <TopHorizontal onPress={handleFilterSelect} filterList={filterList} />
        {filteredProducts && filteredProducts.length > 0 ? (
          <ProductListCmp
            onPressHeart={addtofavoriotlist}
            onPress={getProductDetail}
            data={filteredProducts}
            isLoading={isLoading}
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
      </ScrollView>
    </View>
  );
};

export default ProductsList;
