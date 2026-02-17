import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../screen/utils/responsive';
import {TouchableOpacity, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default ({
  style,
  title,
  onPress,
  background,
  textStyle,
  isArrow,
  disabled,
  children,
  isChildren,
}) => {
  return background ? (
    <LinearGradient
      style={[{height: hp(6), borderRadius: wp(6)}, style]}
      colors={['#2AAFE5', '#4370F0']} //2AAFE5
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}>
      {!isChildren ? (
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              {
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
              },
              textStyle,
            ]}>
            {title}
          </Text>
          {isArrow && (
            <AntDesign
              name="arrowright"
              size={20}
              style={{marginTop: 5, marginLeft: 5, color: '#fff'}}
            />
          )}
        </TouchableOpacity>
      ) : (
        {...children}
      )}
    </LinearGradient>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          height: hp(6),
          borderRadius: wp(6),
        },
        style,
      ]}>
      <Text
        style={[
          {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          },
          textStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
