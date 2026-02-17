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
export default ProfileSettings = ({navigation}) => {
  return (
    <View>
      <Text style={{fontSize: 22, fontWeight: 'bold', marginLeft: 20}}>
        Password and security
      </Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 20,
          }}>
          Login & recovery
        </Text>
      </View>
      <Text style={{marginLeft: 20}}>
        Manage your passwords, login preferences and
      </Text>
      <Text style={{marginLeft: 20}}>recovery method</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 10,
          width: 350,
          marginLeft: 30,
          width: '87%',
          borderColor: '#BABABA', // Added border color
          borderWidth: 1,
          marginBottom: 10,
          marginTop: 30,
          height: 250,
        }}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{marginLeft: 30, marginTop: 40, fontSize: 17}}>
            Change password
          </Text>
          {/* <Text style={{marginLeft: 130, marginTop: 40, fontSize: 22}}>></Text> */}
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{marginLeft: 30, marginTop: 40, fontSize: 17}}>
            Two-factor authentication
          </Text>
          {/* <Text style={{marginLeft: 63, marginTop: 40, fontSize: 22}}>></Text> */}
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{marginLeft: 30, marginTop: 40, fontSize: 17}}>
            Managing login method
          </Text>
          {/* <Text style={{marginLeft: 78, marginTop: 40, fontSize: 22}}>></Text> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};
