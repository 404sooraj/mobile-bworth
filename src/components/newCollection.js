import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../screen/utils/responsive';
import storage from '../screen/utils/storageService';
const brands = [
  {
    name: 'Puma',
    image: require('../assets/Shirt.jpg'),
    title: 'Shirt',
  },
  {
    name: 'Nike',
    image: require('../assets/Jeans.jpg'),
    title: 'Jeans',
  },
  {
    name: 'H&M',
    image: require('../assets/Kids.jpg'),
    title: 'Kids',
  },
  {
    name: 'Puma',
    image: require('../assets/eyewear.jpg'),
    title: 'Eyewear',
  },
  {
    name: 'Nike',
    image: require('../assets/Jacket.jpg'),
    title: 'Jackets',
  },
  {
    name: 'H&M',
    image: require('../assets/Kurti.jpg'),
    title: 'Kurti',
  }, // Add more brands here
];

const NewCollectionSection = ({
  style,
  istitle,
  imageStyle,
  newcollection,
  onPress,
}) => {
  return (
    <View style={[styles.container, style]}>
      {!istitle && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#3C3C3C',
            paddingVertical: 20,
          }}>
          New Collection
        </Text>
      )}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.scrollContainer}>
        {newcollection.map((brand, index) => (
          <TouchableOpacity
            onPress={async () => {
              const user_id = await storage.getItem(storage.use_id);
              const endPoint = `getProductNewCollectionDataById?Type=${encodeURIComponent(
                brand?.productType,
              )}&loginId=${encodeURIComponent(user_id)}`;
              // const endPoint = `getProductNewCollectionDataById?productType=${brand?.productType}&loginId=${user_id}`;
              console.log('endpoint for new collection', endPoint);
              console.log('userid for new collection', user_id);
              onPress(endPoint, brand?.productType);
            }}
            style={{alignItems: 'center'}}>
            <View key={index} style={[styles.brandContainer, imageStyle]}>
              <Image
                resizeMode="cover"
                source={{uri: brand?.productImage}}
                style={styles.image}
              />
              <Text style={styles.title}>{brand?.productType}</Text>
            </View>
            {!imageStyle && (
              <View
                style={{
                  height: hp(4),
                  width: hp(17),
                  borderBottomRightRadius: 10,
                  // borderBottomEndRadius: 12,
                  borderBottomLeftRadius: 10,
                  backgroundColor: '#2F2F2F',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // marginLeft: 2,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#fff',
                    width: 100,
                    textAlign: 'center',
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {brand?.productType}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  brandContainer: {
    // padding: 10,
    marginLeft: 10,
    overflow: 'hidden',
    width: hp(17),
    marginHorizontal: wp(2),
    height: hp(24),
    // backgroundColor: '#fff',
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
    alignItems: 'center', // Center align the text and image
    borderTopRightRadius: 10,
    // borderBottomEndRadius: 12,
    borderTopLeftRadius: 10,
  },
  image: {
    // width: 150,
    // height: 120,
    // borderRadius: 12,
    // resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NewCollectionSection;
