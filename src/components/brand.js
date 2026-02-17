
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../screen/utils/responsive';
import Api from '../redux/Api';
import { useNavigation } from '@react-navigation/native';
import storage from '../screen/utils/storageService';
const BrandSection = ({ onPress, brandss, brands }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text
       ss style={{
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#3C3C3C',
          paddingVertical: 10,
        }}>
        BRANDS
      </Text>

      <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.scrollContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={brands?.length > 0 ? brands : []}
          horizontal
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={async () => {
                const user_id = await storage.getItem(storage.use_id);
                const endPoint = `getProductBrandDataById?Brand=${encodeURIComponent(
                  item?.brandName,
                )}&loginId=${encodeURIComponent(user_id)}`;
                onPress(endPoint);
              }}
              style={styles.brandContainer}>
              <Image
                source={{
                  uri: item?.brandImage,
                }}
                style={styles.image}
                onError={e =>
                  console.log('Error loading image:', e.nativeEvent.error)
                }
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  brandContainer: {
    margin: wp(2),
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
     overflow: 'hidden',
  },
  image: {
    width: hp(17),
    height: hp(17),
    borderRadius: 12,
    resizeMode: 'contain',
     padding: 10, 
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
  },
});
export default BrandSection;