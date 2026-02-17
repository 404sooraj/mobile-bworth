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
import Button from '../../components/Button';
import styles from '../utils/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../components/Header';
import {heightPercent as hp, widthPrecent as wp} from '../utils/responsive';
export default FAQ1 = ({navigation, route}) => {
  const data = route?.params?.data;
  console.log('this is data', data);

  return (
    <View style={{flex: 1}}>
      <Button
        isChildren={true}
        style={{
          backgroundColor: '#1DD8E0',
          borderRadius: 0,
          height: hp(20),
          width: '100%',
          borderColor: '#000000',
          borderWidth: 0.5,
          marginBottom: 20,
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
        background={true}
        disabled={true}>
        <>
          <Header color tintColor={'#fff'} />
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
              marginLeft: 30,
            }}>
            FAQs
          </Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#fff',
              width: '80%',
              alignSelf: 'center',
              height: hp(5),
              marginTop: '5%',
              borderRadius: 10,
              paddingLeft: 15,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              style={{}}
              placeholder="Looking for something specific?"
              placeholderTextColor={'#8A8A8A'}
            />
            <AntDesign
              size={18}
              name="search1"
              color={'#8A8A8A'}
              style={{marginRight: '5%'}}
            />
          </View>
        </>
      </Button>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          backgroundColor: '#f2f2f2',
        }}>
        {/* <TouchableOpacity
          style={{
            backgroundColor: '#1DD8E0',
            borderRadius: 10,
            height: 150,
            width: '100%',
            borderColor: '#000000',
            borderWidth: 0.5,
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            FAQs
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              width: '80%',
              height: 40,
              marginTop: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#000000',
              borderWidth: 0.5,
            }}>
            <Text
              style={{
                color: '#8A8A8A',
                fontSize: 14,
              }}>
              Looking for something specific?
            </Text>
          </TouchableOpacity>
        </TouchableOpacity> */}

        {data?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 15,
              width: '100%',
              height: 90,
              borderColor: '#000000',
              borderWidth: 0.5,
              marginBottom: 20,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#000000',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              {item?.description}
            </Text>
            <Text
              style={{
                color: '#000000',
                fontSize: 14,
              }}>
              Payments, Shipping, Returns, etc.
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
