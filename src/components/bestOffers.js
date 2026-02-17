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
import Button from './Button';
import storage from '../screen/utils/storageService';
const brands = [
  {
    name: 'Nike',
    image: require('../assets/Jacket.jpg'),
    title: 'Jackets',
  },
  {
    name: 'H&M',
    image: require('../assets/Kurti.jpg'),
    title: 'Kurti',
  },
  {
    name: 'Puma',
    image: require('../assets/eyewear.jpg'),
    title: 'Eyewear',
  },
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

  // Add more brands here
];

const BestOffersSection = ({bestOffer, onPress}) => {
  return (
    <View style={styles.container}>
      {/* <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#3C3C3C',
          paddingVertical: 20,
        }}>
        Best Offer
      </Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.scrollContainer}>
        {bestOffer.map((brand, index) => (
          <TouchableOpacity
            onPress={async () => {
              const user_id = await storage.getItem(storage.use_id);
              const endPoint = `getProductBestOfferDataById?categoryType=${brand?.categoryType}&loginId=${user_id}`;
              onPress(endPoint);
            }}
            style={{alignItems: 'center'}}>
            <View key={index} style={styles.brandContainer}>
              <Image
                resizeMode="contain"
                source={{uri: brand?.offerImage}}
                style={styles.image}
              />
              <Text style={styles.title}>{brand?.discount}</Text>
            </View>
            <Button
              disabled={true}
              background={true}
              title={brand?.discount}
              style={{
                height: hp(5),
                width: hp(17),
                borderBottomRightRadius: 12,
                // borderBottomEndRadius: 12,
                borderBottomLeftRadius: 12,
                backgroundColor: '#2F2F2F',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 2,
                borderRadius: 0,
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView> */}
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
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center', // Center align the text and image
    borderTopRightRadius: 12,
    // borderBottomEndRadius: 12,
    borderTopLeftRadius: 12,
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

export default BestOffersSection;
