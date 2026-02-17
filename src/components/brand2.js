// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import {
//   heightPercent as hp,
//   widthPrecent as wp,
// } from '../screen/utils/responsive';
// import Api from '../redux/Api';
// import storage from '../screen/utils/storageService';
// const BrandSection = ({ onPress, brandPage }) => {
//   const [brands, setBrands] = useState([]);

//   useEffect(() => {
//     getBrands();
//   }, []);
//   const getBrands = async () => {
//     try {
//       const response = await Api.getRequest('getBrandsList');

//       setBrands(response?.data);
//     } catch (error) {
//       console.log('this is error', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {!brandPage && (
//         <Text
//           style={{
//             fontSize: 18,
//             fontWeight: 'bold',
//             textAlign: 'center',
//             color: '#3C3C3C',
//             paddingVertical: 20,
//           }}>
//           BRANDS
//         </Text>
//       )}
//       <ScrollView
//         scrollEnabled={false}
//         horizontal
//         contentContainerStyle={styles.scrollContainer}>
//         <FlatList
//           data={brandPage ? brands : brands.slice(0, 6)}
//           numColumns={3}
//           contentContainerStyle={{ paddingBottom: hp(4) }}
//           renderItem={({ item, index }) => (
//             <TouchableOpacity
//               onPress={async () => {
//                 const user_id = await storage.getItem(storage.use_id);
//                 const endPoint = `getProductBrandDataById?Brand=${encodeURIComponent(
//                   item?.brandName,
//                 )}&loginId=${encodeURIComponent(user_id)}`;
//                 onPress(endPoint);
//               }}
//               style={styles.brandContainer}>
//               <Image
//                 source={{
//                   uri: item?.brandImage,
//                 }}
//                 style={styles.image}
//                 onError={e =>
//                   console.log('Error loading image:', e.nativeEvent.error)
//                 }
//               />
//             </TouchableOpacity>
//           )}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: wp(2.5),
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   scrollContainer: {
//     flexDirection: 'row',
//     paddingVertical: 10,
//   },
//   brandContainer: {
//     marginHorizontal: wp(1),
//     borderRadius: 12,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     marginBottom: 20,
//   },
//   image: {
//     width: hp(14),
//     height: hp(14),
//     borderRadius: 12,
//   },
//   text: {
//     marginTop: 8,
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default BrandSection;

import React, {useEffect, useState} from 'react';
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
import storage from '../screen/utils/storageService';

const BrandSection = ({onPress, brandPage}) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = async () => {
    try {
      const response = await Api.getRequest('getBrandsList');

      // Filter only brands with availability: true
      const availableBrands = response?.data?.filter(
        brand => brand.availability,
      );

      setBrands(availableBrands);
    } catch (error) {
      console.log('this is error', error);
    }
  };

  return (
    <View style={styles.container}>
      {!brandPage && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#3C3C3C',
            paddingTop: 20,
          }}>
          BRANDS
        </Text>
      )}
      {/* <ScrollView
        scrollEnabled={false}
        horizontal
        contentContainerStyle={styles.scrollContainer}> */}
      <FlatList
        data={brands}
        numColumns={3}
        contentContainerStyle={{paddingBottom: hp(4)}}
        columnWrapperStyle={{
          justifyContent: 'center', // centers items horizontally in each row
          alignItems: 'center',
        }}
        renderItem={({item, index}) => (
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
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(2.5),
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandContainer: {
    marginHorizontal: wp(1),
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 20,
    overflow: 'hidden',
  },
  image: {
    width: hp(13),
    height: hp(13),
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
