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
import Entypo from 'react-native-vector-icons/Entypo';
import styles from '../utils/Styles'; //'#f0f0f0
import {heightPercent as hp, widthPrecent as wp} from '../utils/responsive';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
export default PinCode = ({navigation}) => {
  const GOOGLE_API_KEY = 'AIzaSyAB_BiabQVCPTNCPgbszH4XXypbJImS4HE';
  const [pincode, setPincode] = useState('');
  const findLocationByPincode = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=${GOOGLE_API_KEY}`,
      );
      // console.log('this is response', response.data);

      if (response.data.results.length > 0) {
        const location = response.data.results[0].formatted_address;
        // setLocationDetails(location);
        console.log('this is response', location);
      } else {
        // setLocationDetails('No results found');
      }
      navigation.navigate('currentLocation');
    } catch (error) {
      console.error(error);
      setLocationDetails('Error fetching location details');
      navigation.navigate('currentLocation');
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#f0f0f0', marginHorizontal: 15}}>
        <View style={{height: '10%'}} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: '#444',
            textAlign: 'center',
            marginBottom: 15,
          }}>
          Enter Your Pincode
        </Text>
        <View
          style={{
            height: hp(6),
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: wp(6),
            paddingHorizontal: 10,
            fontSize: 16,
            backgroundColor: '#fff',
            paddingLeft: '6%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Entypo name="location-pin" size={17} color={'#95989A'} />
          <TextInput
            style={{
              fontWeight: '500',
              color: '#000',
              width: '100%',
              height: '100%',
            }}
            value={pincode}
            placeholderTextColor={'#95989A'}
            onChangeText={setPincode}
            placeholder="Pin code"
            keyboardType="phone-pad"
          />
        </View>
        <LinearGradient
          style={{height: hp(6), borderRadius: wp(6), marginTop: 20}}
          colors={['#2AAFE5', '#4370F0']} //2AAFE5
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}>
          <TouchableOpacity
            onPress={() => {
              findLocationByPincode();
              navigation.navigate('currentLocation');
            }}
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <LocationModal navigation={navigation} />
    </View>
  );
};

const LocationModal = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleSubmit = () => {
    // Handle form submission logic here
    setModalVisible(false);
    navigation.navigate('currentLocation');
  };
  // return <Text>raju</Text>;
  return (
    <Modal visible={modalVisible} transparent={true}>
      <View
        style={{
          flex: 1,
          // background1olor: 'rgba(0,0,0,0.2)',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            elevation: 10,
            paddingHorizontal: 15,
            shadowColor: '#000',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}>
            <Image source={require('../../assets/loc_Icon.png')} style={{}} />
          </View>

          <Text
            style={{
              fontSize: 20,
              paddingTop: 40,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#000000C4',
            }}>
            Your device location is off
          </Text>
          <Text
            style={{
              fontSize: 13,
              paddingTop: 10,
              textAlign: 'center',
              color: '#000000',
            }}>
            Please enable location permission for better{' '}
          </Text>
          <Text style={{fontSize: 13, textAlign: 'center', color: '#000000'}}>
            {' '}
            delivery experience
          </Text>

          <LinearGradient
            style={{height: hp(6), borderRadius: wp(3.5), marginTop: 20}}
            colors={['#2AAFE5', '#4370F0']} //2AAFE5
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold', //background: #000000;background: #c;
                color: '#000000',
                marginTop: 20,
                marginLeft: 20,
              }}>
              Select Your Address
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#4370F0',
                // marginLeft: 120,
                marginTop: 20,
                marginRight: '2%',
              }}>
              See All{'>'}
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 20,
              marginTop: 40,
              marginBottom: 20,
              color: '#000000',
            }}>
            📍 C-10009, Police line 2,Raj Nagar Extension, ...
          </Text>
          <Text style={{marginLeft: 20, marginBottom: 20, color: '#000000'}}>
            📍 C-10009, Police line 2,Raj Nagar Extension, ...
          </Text>
          <Text style={{marginLeft: 20, marginBottom: 20, color: '#000000'}}>
            📍 C-10009, Police line 2,Raj Nagar Extension, ...
          </Text>

          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: 'white',
              borderRadius: wp(3.5),
              borderColor: '#4370F0', // Added border color
              borderWidth: 1.5,
              marginBottom: 10,
              marginTop: 20,
              height: hp(6),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#4370F0',
                fontSize: 16,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              🔎 Search Your Location
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('Dashboard');
            }}
            style={{
              // borderWidth: 1,
              height: 40,
              width: 90,
              marginBottom: 10,
              borderRadius: 20,
              backgroundColor: '#95989A',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 16}}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
