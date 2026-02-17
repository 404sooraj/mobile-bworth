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
import styles from '../utils/Styles';
export default Loctwo = ({navigation}) => {
  const handleSubmit = () => {
    navigation.navigate('locthree');
  };

  return (
    <View style={styles.container3}>
      <View style={styles.container3}>
        <View style={{width: 100, height: 50}}>
          <Image source={require('../../assets/Map.png')} style={{}} />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: '#3A86EC',
            borderRadius: 15,
            padding: 10,
            width: 350,
            marginLeft: 30,
            borderColor: '#BABABA', // Added border color
            borderWidth: 1,
            marginBottom: 10,
            marginTop: 600,
            height: 50,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.halfBlackC}>
        <Text style={{marginLeft: 30, marginTop: 30, fontSize: 23}}>
          Location
        </Text>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 10,
            width: 340,
            marginLeft: 30,
            borderColor: '#000000', // Added border color
            borderWidth: 0.5,
            marginBottom: 10,
            marginTop: 20,
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 12,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            📍 C-10009, Police line 2, Raj Nagar Extension, ...
          </Text>
        </TouchableOpacity>
        <Text style={{marginLeft: 30, marginTop: 10, color: '#000000'}}>
          👁️‍🗨️ Select your current location
        </Text>
      </View>
    </View>
  );
};
