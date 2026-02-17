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
  Alert,
} from 'react-native';
import styles from '../utils/Styles';
export default PaymentMethod = ({navigation}) => {
  return (
    <ScrollView>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 20,
          }}>
          Payment Method
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#1FD3E0',
            borderRadius: 5,
            padding: 10,
            width: 120,
            marginLeft: 70,
            height: 40,
            borderColor: '#BABABA', // Added border color
            borderWidth: 2,
            marginBottom: 10,
            marginTop: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 11,
              textAlign: 'center',
              fontWeight: 'bold',
              marginTop: 0,
            }}>
            Add More
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: '#000000',
          fontSize: 11,
          fontWeight: 'bold',
          marginTop: 0,
          marginLeft: 20,
        }}>
        Arriving at 1:31 pm
      </Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={require('../../assets/cart_img.png')}
          style={{width: 50, height: 70, marginTop: 20, marginLeft: 10}}
        />
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          Men T-shirt Slim Fit
        </Text>
        <Text style={{marginTop: 40, marginLeft: 120}}>₹ 1063</Text>
      </View>
      {/* view  */}
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={require('../../assets/cart_img.png')}
          style={{width: 50, height: 70, marginTop: 20, marginLeft: 10}}
        />
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          Men T-shirt Slim Fit
        </Text>
        <Text style={{marginTop: 40, marginLeft: 120}}>₹ 1063</Text>
      </View>
      <Text
        style={{
          fontSize: 17,
          fontWeight: 'bold',
          marginTop: 20,
          marginLeft: 20,
        }}>
        Bill details
      </Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          MRP
        </Text>
        <Text style={{marginTop: 20, marginLeft: 220}}>₹ 1063</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          Product discount
        </Text>
        <Text style={{marginTop: 20, marginLeft: 120}}>₹ 103</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          Item total
        </Text>
        <Text style={{marginTop: 20, marginLeft: 120}}>₹ 143</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          Handling charge
        </Text>
        <Text style={{marginTop: 20, marginLeft: 120}}>₹ 4</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          Delivery charge
        </Text>
        <Text style={{marginTop: 20, marginLeft: 120}}>₹ 30</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          Feeding India donation
        </Text>
        <Text style={{marginTop: 20, marginLeft: 120}}>₹ 1</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          Bill total
        </Text>
        <Text style={{marginTop: 20, marginLeft: 120}}>₹ 1344</Text>
      </View>
      <Text
        style={{
          fontSize: 17,
          fontWeight: 'bold',
          marginLeft: 20,
          marginTop: 20,
        }}>
        Order details
      </Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          Order Id
        </Text>
        <Text style={{marginTop: 20, marginLeft: 220}}>0RD04823698</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          Payment
        </Text>
        <Text style={{marginTop: 20, marginLeft: 120}}>Paid online</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          Deliver to
        </Text>
        <Text style={{marginTop: 20, marginLeft: 120}}>
          Tower c, C-5986,Floor 13, Police line 2
        </Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          Order placed
        </Text>
        <Text style={{marginTop: 20, marginLeft: 120}}>
          placed on sun,26 May’24, 1:15 PM
        </Text>
      </View>
    </ScrollView>
  );
};
