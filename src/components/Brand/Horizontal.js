import {FlatList, Image, StyleSheet, View} from 'react-native';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../screen/utils/responsive';
const data = [
  require('../../assets/brand/Rectangle3.png'),
  require('../../assets/brand/Rectangle4.png'),
  require('../../assets/brand/Rectangle3.png'),
  require('../../assets/brand/Rectangle4.png'),
  require('../../assets/brand/Rectangle3.png'),
  require('../../assets/brand/Rectangle4.png'),
];

const Horizontal = () => {
  return (
    <View style={{paddingVertical: hp(5), paddingHorizontal: 15}}>
      <FlatList
        horizontal
        data={data}
        renderItem={({item, index}) => (
          <View style={{height: hp(17), width: hp(17), marginHorizontal: 8}}>
            <Image
              resizeMode="contain"
              source={item}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default Horizontal;
