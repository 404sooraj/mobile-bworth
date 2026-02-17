import React, {useEffect, useState, useCallback, memo} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../screen/utils/responsive';
import Api from '../../redux/Api';

const ProductImage = memo(({uri}) => {
  const [loading, setLoading] = useState(false);

  return (
    <View
      style={{
        height: 200,
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f3f3f3',
      }}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="small" color="#1DD8E0" />
        </View>
      )}

      <FastImage
        style={{height: '100%', width: '100%'}}
        source={{
          uri,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={FastImage.resizeMode.cover}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
});

const ProductListCmp = ({data, onPress, onPressHeart, isLoading}) => {
  const [filteredData, setFilteredData] = useState([]);
  const PAGE_SIZE = 12;
  const [page, setPage] = useState(1);
  const paginatedData = filteredData.slice(0, page * PAGE_SIZE);
  const canLoadMore = paginatedData.length < filteredData.length;
  const normalizeUrl = url =>
    url?.startsWith('http://') ? url.replace('http://', 'https://') : url;
  const getPrimaryImage = item =>
    item?.images?.[0] ||
    item?.Image1 ||
    item?.productDetailsData?.Image1 ||
    null;
  const lightweightData = paginatedData.map(item => ({
    productId: item.productId,
    id: item.id,
    productName: item.productName,
    Mrp: item.Mrp,
    SellingPrice: item.SellingPrice,
    image: getPrimaryImage(item),
    favourite: item.favourite,
  }));
  useEffect(() => {
    const validImages = filteredData
      .map(item => normalizeUrl(getPrimaryImage(item)))
      .filter(uri => typeof uri === 'string' && uri.startsWith('https'));
    if (validImages.length) {
      FastImage.preload(validImages.map(uri => ({uri})));
    }
  }, [filteredData]);

  useEffect(() => {
    const fetchAvailableBrands = async () => {
      try {
        const brandsResponse = await Api.getRequest('getBrandsList');
        const available = brandsResponse?.data.filter(
          b => b.availability === true,
        );

        const availableBrandNames = available.map(b =>
          b.brandName?.toLowerCase(),
        );

        const products =
          availableBrandNames.length > 0
            ? data.filter(product =>
                availableBrandNames.includes(product.Brand?.toLowerCase()),
              )
            : [];
        setFilteredData(products);
        setPage(1);
      } catch (err) {
        console.error('Brand fetch failed:', err);
        setFilteredData(data);
      }
    };

    fetchAvailableBrands();
  }, [data]);

  const renderItem = useCallback(
    ({item}) => {
      const imageUri = normalizeUrl(item.image);
      return (
        <TouchableOpacity
          onPress={() => onPress(item)}
          style={{
            borderWidth: 1,
            borderColor: '#e8e8e8',
            width: wp(46),
            marginHorizontal: wp(1),
            marginVertical: wp(1),
            borderRadius: 10,
            padding: 10,
          }}>
          <View>
            <ProductImage uri={imageUri} />
            {/* <TouchableOpacity
              onPress={() => onPressHeart(item)}
              style={{position: 'absolute', right: 8, top: 8}}>
              <FastImage
                tintColor="#1DD8E0"
                style={{height: 22, width: 22}}
                source={
                  item?.favourite
                    ? require('../../assets/heartfill.png')
                    : require('../../assets/Heart.png')
                }
              />
            </TouchableOpacity> */}
          </View>
          <View style={{marginVertical: 5}}>
            <Text
              numberOfLines={1}
              style={{margin: 5, fontSize: 16, color: '#000'}}>
              {item.productName}
            </Text>
            <Text style={{marginLeft: 5, fontSize: 16, color: '#20D1E1'}}>
              ₹{item.SellingPrice || 'N/A'}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [onPress, onPressHeart],
  );

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#1DD8E0" />
      </View>
    );
  }

  return (
    <>
      <FlatList
        scrollEnabled={false}
        data={lightweightData}
        keyExtractor={item => (item.productId || item.id).toString()}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={renderItem}
        removeClippedSubviews={false}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
      />
      {canLoadMore && (
        <TouchableOpacity
          onPress={() => setPage(prev => prev + 1)}
          style={{
            alignSelf: 'center',
            marginVertical: 15,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
            backgroundColor: '#1DD8E0',
          }}>
          <Text style={{color: '#fff', fontWeight: '600'}}>Load More</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ProductListCmp;
