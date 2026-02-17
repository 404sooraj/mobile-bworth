import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../screen/utils/responsive';
import {useNavigation} from '@react-navigation/native';

const Header = ({title, color, tintColor, bgcolor, width}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: hp(7),
        paddingHorizontal: 20,
        backgroundColor: !color ? '#f8f9fa' : bgcolor,
        justifyContent: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#e8e8e8'
        // borderWidth: 1,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          width: width ?? '30%',
        }}>
        <AntDesign name="arrowleft" size={22} color={tintColor ?? '#000000'} />
        {title && (
          <Text
            style={{
              color: '#000000',
              marginLeft: 20,
              fontSize: 16,
              fontWeight: '700',
            }}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default Header;
