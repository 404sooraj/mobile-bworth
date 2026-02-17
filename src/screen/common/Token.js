import React, {useState, useEffect} from 'react';
import {
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
import styles from '../utils/Styles';
import Button from '../../components/Button';
import {heightPercent, widthPrecent} from '../utils/responsive';
export default Token = ({navigation, route}) => {
  const token = route.params?.token;
  console.log(token);

  const handleSubmit = () => {
    // navigation.navigate('locone');
    navigation.navigate('Dashboard');
  };

  return (
    <View style={{marginTop: 250}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          color: '#444',
          textAlign: 'center',
          marginBottom: 15,
        }}>
        Token Number
      </Text>
      <View
        style={{width: 230, marginTop: 1, marginLeft: 90, marginBottom: 80}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderColor: '#C9C9C9', // Added border color
            borderWidth: 1.5, // Added border width
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
          }}>
          <Text style={{color: '#000000', fontSize: 15}}>{token}</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        onPress={handleSubmit}
        style={{
        
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontSize: 16,
          }}>
          Let's Shop
        </Text>
      </TouchableOpacity> */}
      <Button
        onPress={handleSubmit}
        background
        style={{
          backgroundColor: '#4370F0',
          borderRadius: 45,
          padding: 10,
          width: widthPrecent(80),
          // marginLeft: 50,
          borderColor: '#BABABA', // Added border color
          borderWidth: 1,
          marginBottom: 10,
          alignSelf: 'center',
          height: heightPercent(7),
        }}
        textStyle={{
          color: 'white',
          fontSize: 18,
          textAlign: 'center',
          fontSize: 16,
        }}
        title={"Let's Shop"}
      />
    </View>
  );
};
