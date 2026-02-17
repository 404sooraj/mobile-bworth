import React, {useState, useEffect} from 'react';
import {
  Button,
  Modal,
  Image,
  ImageBackground,
  StyleSheet,
  input,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
// import styles from '../utils/Styles';
import {heightPercent as hp, widthPrecent as wp} from '../utils/responsive';
export default RenderInputField = ({
  label,
  width,
  value,
  onChangeText,
  keyboardType,
  maxLength,
}) => {
  return (
    <View>
      <Text style={{color: '#000000', marginLeft: 5}}>{label}</Text>
      <View style={[styles.container, {width: width ?? wp(42)}]}>
        <TextInput
          onChangeText={onChangeText}
          style={{color: 'black'}}
          value={value}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    height: hp(5.4),
    marginTop: 2,
    borderColor: '#000000',
    borderRadius: 8,
    paddingLeft: '2%',
    width: wp(42),
    // marginTop: '5%',
  },
});
