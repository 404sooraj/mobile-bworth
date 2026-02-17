import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import DashBordHeader from '../../components/DashBordHeader';
import BottomImageBar from '../../components/bottomImageBar';
import BrandSection from '../../components/brand';
import NewCollectionSection from '../../components/newCollection';
import MoreProductSection from '../../components/MoreProductSection';
import Loading from '../../custom';
import styles from '../utils/Styles';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setProducts} from '../../redux/feature/featuresSlice';
import Api from '../../redux/Api';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // State Variables
  const [loading, setLoading] = useState(true); // Initially set to true
  const [newcollection, setNewCollection] = useState([]);
  const [fnewcollection, setNewfCollection] = useState([]);
  const [bestOffer, setBestOffer] = useState([]);
  const [fbestOffer, setfBestOffer] = useState([]);
  const [benner, setBenner] = useState([]);
  const [underBwallets, setUnderBwallets] = useState([]);
  const [funderBwallets, fsetUnderBwallets] = useState([]);
  const [brands, setBrands] = useState([]);
  const [fbrands, setfBrands] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [moreproductsection, setmoreproductsection] = useState([]);
  const isFocused = useIsFocused(); // ✅ added

  // useEffect(() => {
  //   // Trigger all API calls
  useEffect(() => {
    if (isFocused) {
      fetchAllData();
    }
  }, [isFocused]);
  const fetchAllData = async () => {
    try {
      setLoading(true); // Show loader

      // Fetch data from all APIs concurrently
      const [
        bannerResponse,
        collectionResponse,
        bestOffersResponse,
        underBwalletsResponse,
        brandsResponse,
        allProductsResponse,
      ] = await Promise.all([
        Api.getRequest('getHomeBanners'),
        Api.getRequest('getNewCollections'),
        Api.getRequest('getBestOffers'),
        Api.getRequest('getUnderBwallets'),
        Api.getRequest('getBrandsList'),
        Api.getRequest('getAllProductDetails'),
      ]);
      const availableBrands = brandsResponse?.data.filter(
        brand => brand.availability === true,
      );

      console.log('✅ Available Brands Only:', availableBrands);

      // Set data into respective states
      setBenner(bannerResponse?.data);
      setNewCollection(collectionResponse?.data);
      setNewfCollection(collectionResponse?.data);
      setBestOffer(bestOffersResponse?.data);
      setfBestOffer(bestOffersResponse?.data);
      setUnderBwallets(underBwalletsResponse?.data);
      fsetUnderBwallets(underBwalletsResponse?.data);
      // setBrands(brandsResponse?.data);
      // setfBrands(brandsResponse?.data);
      setBrands(availableBrands);
      setfBrands(availableBrands);
      setAllProducts(allProductsResponse?.data);
      setmoreproductsection(allProductsResponse?.data);

      setLoading(false); // Hide loader after all data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Hide loader even in case of error
      ToastAndroid.show('Error loading data', ToastAndroid.SHORT);
    }
  };

  //   fetchAllData();
  // }, []);

  const getProductListById = async (endPoint, title) => {
    try {
      setLoading(true);
      const res = await Api.getRequest(endPoint);

      if (res.data.length > 0) {
        console.log('Fetched products:', res.data);
        console.log('+++++:');

        dispatch(setProducts(res.data));
        navigation.navigate('ProductList', {data: res.data, title: title});
      } else {
        ToastAndroid.show('No Product Found', ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (err) {
      ToastAndroid.show('No Product Found', ToastAndroid.SHORT);
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container2}>
      <DashBordHeader />
      <ScrollView style={{paddingTop: 20}}>
        <BottomImageBar banner={benner} />
        <BrandSection brands={fbrands} onPress={getProductListById} />
        <NewCollectionSection
          onPress={getProductListById}
          newcollection={fnewcollection ?? []}
        />
        <MoreProductSection
          onPress={getProductListById}
          moreproductsection={moreproductsection ?? []}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
