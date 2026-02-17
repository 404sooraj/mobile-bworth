import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercent,
  heightPercent as hp,
  widthPrecent,
  widthPrecent as wp,
} from '../screen/utils/responsive';
import LinearGradient from 'react-native-linear-gradient';
import NewCollectionSection from './newCollection';
import Button from './Button';
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
// export default ({data, onPress}) => {
const MoreProductSection = ({
  style,
  istitle,
  imageStyle,
  moreproductsection,
  onPress,
}) => {
  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={styles.container}>
      <View style={{height: 0}} />

      <Button
        background={true}
        onPress={async () => {
          const endPoint = `getAllProductDetails`;
          // console.log('Pproduct---', endPoint);

          onPress(endPoint, 'All Products');
        }}
        style={{
          height: heightPercent(6),
          width: widthPrecent(85),
          marginBottom: 40,
          marginTop: 10,
          borderRadius: 50,
        }}
        isArrow
        title={'See All Products'}
        textStyle={{
          fontSize: 15,
        }}
      />
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    borderTopLeftRadius: wp(12),
    borderTopRightRadius: wp(12),
    elevation: 1,
    shadowColor: '#fff',
    alignItems: 'center',
  },
  brandContainer: {
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
    alignItems: 'center',
    borderRadius: 12,
  },
  image: {
    // width: 150,
    // height: 120,
    // borderRadius: 12,
    // resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
});

export default MoreProductSection;
