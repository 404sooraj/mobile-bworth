import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../screen/utils/responsive';
import storage from 'redux-persist/lib/storage';
const data = [
  {
    img: require('../../assets/pumaa.png'),
  },
  {
    img: require('../../assets/pumaa.png'),
  },
  {
    img: require('../../assets/pumaa.png'),
  },
  {
    img: require('../../assets/pumaa.png'),
  },
];
const Favorioties = ({fvt, onPress}) => {
  console.log(fvt);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#3C3C3C',
          paddingVertical: 20,
        }}>
        Favorioties
      </Text>
      <FlatList
        horizontal
        data={fvt}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={async () => {
              const user_id = await storage.getItem(storage.use_id);
              const endPoint = `getProductBrandDataById?brandName=${item?.brandName}&loginId=${user_id}`;
              onPress(endPoint);
            }}
            style={{
              height: hp(14),
              width: hp(14),
              marginHorizontal: 8,
              borderRadius: hp(7),
              overflow: 'hidden',
              // borderWidth: 1,
            }}>
            {console.log(item)}
            <Image
              style={{height: '100%', width: '100%'}}
              source={{uri: item?.brandImage}}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFFFFB',
    paddingVertical: wp(10),
    paddingHorizontal: 15,
  },
});
export default Favorioties;
