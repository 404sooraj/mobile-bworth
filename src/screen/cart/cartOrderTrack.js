import React, { useState, useEffect } from 'react';
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
import Header from '../../components/Header';
export default CartOrderTrack = ({ navigation }) => {
  const navigateToLogin = () => {
    navigation.navigate('cartOrderConfirm');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header width={'40%'} color={true} title={'Order Tracking'} />
      {/* <Text style={{fontSize: 14, fontWeight: 'bold'}}>Order Tracking</Text> */}
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Image
          source={require('../../assets/cart_img.png')}
          style={{ width: 100, height: 100, marginTop: 20, marginLeft: 15 }}
        />
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Text
            style={{
              color: '#000000',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            {' '}
            LAMERI
          </Text>
          <Text
            style={{
              color: '#555555',
              marginLeft: 20,
              marginBottom: 10,
              fontSize: 13,
            }}>
            {' '}
            Recycle Boucle Knit Cardigan Pink
          </Text>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 40 }}>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#1B1B1B',
            marginLeft: 20,
          }}>
          Order No. :
        </Text>

        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#585858',
            marginLeft: 10,
          }}>
          #13436656789977
        </Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#1B1B1B',
            marginLeft: 20,
          }}>
          Order ID. :
        </Text>

        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#585858',
            marginLeft: 10,
          }}>
          IDHJDO9003
        </Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#1B1B1B',
            marginLeft: 20,
          }}>
          Ordered on :
        </Text>

        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#585858',
            marginLeft: 10,
          }}>
          13-05-2024
        </Text>
      </View>
      <Image
        source={require('../../assets/checkout.png')}
        style={{ marginLeft: '5%' }}
      />

      {false && (
        <Button
          onPress={navigateToLogin}
          background={true}
          style={{
            backgroundColor: '#1FD3E0',
            borderRadius: 50,
            padding: 10,
            width: 360,
            marginLeft: 20,
            height: 50,
            borderColor: '#BABABA', // Added border color
            // borderWidth: 2,
            marginBottom: 10,
            marginTop: 30,
          }}
          title={'Proceed to Checkout'}
        />
      )}
      <TouchableOpacity
        onPress={navigateToLogin}
        style={{
          backgroundColor: 'white',
          borderRadius: 25,
          // padding: 10,
          width: 180,
          marginLeft: 15,
          height: 50,
          borderColor: '#E6E6E6', // Added border color
          borderWidth: 2,
          marginBottom: 10,
          // marginTop: 220,
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#454545',
            fontSize: 11,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          📞 Contact Us
        </Text>
      </TouchableOpacity>
    </View>
  );
};
