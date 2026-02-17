import React, {useState, useEffect} from 'react';
import {
  Modal,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Platform,
} from 'react-native';
import {widthPrecent as wp, heightPercent as hp} from '../utils/responsive';
import Ionicons from 'react-native-vector-icons/AntDesign';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import storage from '../utils/storageService';
import Geolocation from 'react-native-geolocation-service';
import Button from '../../components/Button';

export default currentLocation = ({navigation}) => {
  const GOOGLE_API_KEY = 'AIzaSyAB_BiabQVCPTNCPgbszH4XXypbJImS4HE';
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const navigateonOK = () => {
    // Handle form submission logic here
    setModalVisible(false);
    navigation.navigate('Sell');
  };

  const checkLocationPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    console.log('this is resp');
    const result = await check(permission);
    console.log(result);

    if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      handlePermissionResult(requestResult);
    } else {
      handlePermissionResult(result);
    }
  };

  const handlePermissionResult = result => {
    if (result === RESULTS.GRANTED) {
      console.log('Location permission granted');
      // You can now use Geolocation
      Geolocation.getCurrentPosition(
        async position => {
          console.log(position);
          await storage.setItem(storage.letLong, position);
          navigateonOK();
        },
        error => {
          console.log(error);
          navigateonOK();
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      console.log('Location permission denied');
      navigateonOK();
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          backgroundColor: '#f0f0f0',
        }}
        scrollEnabled={scrollEnabled}>
        <View style={{height: hp(5)}} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: '#444',
            textAlign: 'center',
          }}>
          Select your Pickup Location
        </Text>
        {!show ? (
          <TouchableOpacity
            onPress={() => {
              setShow(true);
              setScrollEnabled(false);
            }}
            style={{
              backgroundColor: 'white',
              borderRadius: wp(3.5),
              borderColor: '#2AAFE5',
              borderWidth: 1.5,
              marginBottom: 10,
              marginTop: 20,
              height: hp(6),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Ionicons color="#2AAFE5" name="search1" size={15} />
            <Text
              style={{
                color: '#2AAFE5',
                fontWeight: 'bold',
                fontSize: 14,
                marginLeft: 5,
              }}>
              Search your location
            </Text>
          </TouchableOpacity>
        ) : (
          <GooglePlacesAutocomplete
            placeholder="Location"
            fetchDetails={true}
            keepResultsAfterBlur={true}
            keyboardShouldPersistTaps={'handled'}
            onPress={async (data, details) => {
              console.log('this is data', data?.description);
              await storage.setItem(storage.Address);
              navigateonOK();
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
            }}
            textInputProps={{
              placeholderTextColor: '#2AAFE5',
              fontWeight: 'bold',
            }}
            styles={{
              container: {
                flex: 1,
              },
              textInputContainer: {
                paddingHorizontal: 0,
                height: 'auto',
              },
              textInput: {
                backgroundColor: 'white',
                borderRadius: wp(3.5),
                borderColor: '#2AAFE5',
                borderWidth: 1.5,
                marginBottom: 10,
                marginTop: 20,
                height: hp(6),
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                paddingLeft: 20,
                color: '#2AAFE5',
              },
              description: {
                color: 'black',
              },
              listView: {
                position: 'absolute',
                zIndex: 1,
                top: hp(8.5),
                width: wp(90),
                borderRadius: 10,
                alignSelf: 'center',
              },
              listItem: {
                color: 'red',
              },
            }}
          />
        )}
        <View style={{marginTop: 15, paddingLeft: 10}}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 0,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 1,
                width: '60%',
                borderColor: '#2AAFE5',
                borderRadius: 5,
                paddingLeft: 5,
                paddingTop: 5,
                paddingBottom: 5,
              }}>
              <Text style={{fontSize: 20, color: '#2AAFE5', fontWeight: '500'}}>
                Change Address
              </Text>
              <Text
                style={{
                  color: '#00000099',
                  fontSize: 12,
                  width: '90%',
                  marginLeft: 5,
                }}>
                C-10009, Police line 2 , Raj Nagar Extension, Ghaziabad, Uttar
                Pradesh
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                borderWidth: 1,
                borderColor: '#2AAFE5',
                borderRadius: 5,
                alignItems: 'center',
                height: hp(4.5),
                justifyContent: 'center',
                width: '30%',
              }}>
              <Text
                style={{color: '#2AAFE5', fontWeight: 'bold', fontSize: 12}}>
                Change
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: '#2AAFE5',
              fontSize: 16,
              fontWeight: 'bold',
              marginVertical: 20,
            }}>
            Saved Location
          </Text>

          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 16,
              marginTop: 0,
            }}>
            Other
          </Text>
          <View style={{display: 'flex', flexDirection: 'row'}}></View>
          <Text
            style={{color: 'grey', fontSize: 12, marginLeft: 0, marginTop: 2}}>
            📍 C-10009, Police line 2, Raj Nagar Extension,
          </Text>
          <Text
            style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 1}}>
            {' '}
            Ghaziabad,Uttar Pradesh
          </Text>

          <View
            style={{
              height: 0.7,
              backgroundColor: 'grey',
              width: '90%',
              marginTop: 20,
            }}
          />

          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 16,
              marginTop: 20,
            }}>
            Other
          </Text>

          <View style={{display: 'flex', flexDirection: 'row'}}></View>
          <Text
            style={{color: 'grey', fontSize: 12, marginLeft: 0, marginTop: 2}}>
            📍 C-10009, Police line 2, Raj Nagar Extension,
          </Text>
          <Text
            style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 1}}>
            {' '}
            Ghaziabad,Uttar Pradesh
          </Text>
          <View
            style={{
              height: 0.7,
              backgroundColor: 'grey',
              width: '90%',
              marginTop: 20,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 16,
              marginTop: 20,
            }}>
            Other
          </Text>

          <View style={{display: 'flex', flexDirection: 'row'}}></View>
          <Text
            style={{color: 'grey', fontSize: 12, marginLeft: 0, marginTop: 2}}>
            📍 C-10009, Police line 2, Raj Nagar Extension,
          </Text>
          <Text
            style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 1}}>
            {' '}
            Ghaziabad,Uttar Pradesh
          </Text>
          <View
            style={{
              height: 0.7,
              backgroundColor: 'grey',
              width: '90%',
              marginTop: 20,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 16,
              marginTop: 20,
            }}>
            Other
          </Text>

          <View style={{display: 'flex', flexDirection: 'row'}}></View>
          <Text
            style={{color: 'grey', fontSize: 12, marginLeft: 0, marginTop: 2}}>
            📍 C-10009, Police line 2, Raj Nagar Extension,
          </Text>
          <Text
            style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 1}}>
            {' '}
            Ghaziabad,Uttar Pradesh
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Button
              onPress={() => {
                navigation.navigate('pickup');
              }}
              background={true}
              style={{
                width: '90%',
                borderRadius: 10,
                height: hp(5.5),
                alignSelf: 'center',
              }}
              title={'Continue'}
              textStyle={{
                fontSize: 15,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              width: '85%',
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontStyle: 'italic',
                color: '#000000',
                textAlign: 'center',
              }}>
              For a better experience, turn on device location. Which uses
              Google's location service
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
                marginTop: hp(4),
              }}>
              <TouchableOpacity style={{}} onPress={handleModalClose}>
                <Text
                  style={{
                    color: '#2AAFE5',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  No, thanks
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={checkLocationPermission}>
                <Text
                  style={{
                    color: '#2AAFE5',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
