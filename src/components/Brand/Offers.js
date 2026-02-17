import {FlatList, Text, View} from 'react-native';
import Button from '../Button';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../screen/utils/responsive';
const data = [
  {
    title: '90%',
  },
  {
    title: '70%',
  },
  {
    title: '60%',
  },
  {
    title: '50%',
  },
];

const Offers = ({discount}) => {

  return (
    <View style={{paddingVertical: hp(2), paddingHorizontal: 15}}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#3C3C3C',
          paddingVertical: 25,
        }}>
        DISCOUNTS
      </Text>
      <FlatList
        horizontal
        data={discount}
        renderItem={({item, index}) => (
          <Button
            style={{
              height: hp(17),
              width: hp(17),
              marginLeft: 8,
            }}
            background={true}
            textStyle={{
              fontSize: 50,
            }}
            title={item?.brandDiscount?.split(' ')[0]}
          />
        )}
      />
    </View>
  );
};
export default Offers;
