import React, {useState, useEffect, useRef} from 'react';
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
  Platform,
  Touchable,
} from 'react-native';
import {widthPrecent as wp, heightPercent as hp} from '../utils/responsive';
import Ionicons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../utils/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import storage from '../utils/storageService';
import Geolocation from 'react-native-geolocation-service';
import Button from '../../components/Button';
import axios from 'axios';
import Api from '../../redux/Api';
import Loading from '../../custom';
export default currentLocation = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const GOOGLE_API_KEY = 'AIzaSyAB_BiabQVCPTNCPgbszH4XXypbJImS4HE';
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pincode, setPincode] = useState(null);
  const [scrollEnbled, setScrollEnabled] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [pincodestatus, setPincodeStatus] = useState('');
  const [latlong, setLatlong] = useState({
    latitude: '',
    longitude: '',
  });

  const checkLocationPermission = async () => {
    setLoading(true);
    setModalVisible(false);
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    console.log('thi is resp');
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
      Geolocation.getCurrentPosition(
        async position => {
          const {latitude, longitude} = position.coords;
          const geocodeResponse = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`,
          );
          const geocodeData = await geocodeResponse.json();
          const address =
            geocodeData.results[0]?.formatted_address || 'Unknown location';
          setSelectedAddress(address);
          console.log('this is addess');

          getPincodeFromCoordinates(latitude, longitude);
          setLatlong({
            latitude: latitude,
            longitude: longitude,
          });
          setLoading(false);
          // navigateonOK();
        },
        error => {
          console.log(error);
          // navigateonOK();
          setLoading(false);
          setModalVisible(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      setLoading(false);
    }
  };

  
  const getCoordinatesFromAddress = async address => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            address: address,
            key: GOOGLE_API_KEY,
          },
        },
      );

      const results = response.data.results;

      if (results.length > 0) {
        const location = results[0].geometry.location;

        const latitude = location.lat;
        const longitude = location.lng;
        setLatlong({
          latitude: latitude,
          longitude: longitude,
        });

        await getPincodeFromCoordinates(latitude, longitude);
      } else {
        return {error: 'No results found'};
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setLoading(false);
      return {error: 'Error fetching coordinates'};
    }
  };
  const googlePlaceRef = useRef(null);
  const getPincodeFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            latlng: `${latitude},${longitude}`,
            key: GOOGLE_API_KEY,
          },
        },
      );

      const results = response.data.results;

      if (results.length > 0) {
        const addressComponents = results[0].address_components;
        const postalCodeComponent = addressComponents.find(component =>
          component.types.includes('postal_code'),
        );
        if (postalCodeComponent) {
          try {
            setPincode(postalCodeComponent.long_name);
            await storage.setItem(
              storage.PINCODE,
              postalCodeComponent.long_name,
            );
            const endPoint = `getSavedPinCodeById?pinCode=${postalCodeComponent.long_name}`;
            const res = await Api.getRequest(endPoint);
            setPincodeStatus(res.message);
          } catch (err) {
            console.log(err);

            setPincodeStatus(
              'sorry currently we are not serviceable for the old cloths in your area',
            );
          }
        } else {
          return 'No postal code found';
        }
      } else {
        return 'No results found';
      }
    } catch (error) {
      console.error('Error fetching postal code:', error);
      return 'Error fetching postal code';
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.navigate('Dashboard');
  };

  const navigateonOK = async endPoint => {
    const user_id = await storage.getItem(storage.use_id);
    await storage.setItem(storage.letLong, latlong);
    await storage.setItem(storage.Address, selectedAddress);
    setLoading(true);
    try {
      const data = {
        loginId: user_id,
        address: selectedAddress,
        lat: latlong.latitude,
        long: latlong.longitude,
        pinCode: pincode,
      };

      const response = await Api.postRequest(endPoint, data);
    } catch (error) {
    } finally {
      if (
        pincodestatus ==
        'sorry currently we are not serviceable for the old cloths in your area'
      ) {
        navigation.replace('Dashboard');
      } else {
        navigation.navigate('Sell');
      }
      setModalVisible(false);
      setLoading(false);
    }
  };
  return (
    <View style={{flex: 1}}>
      {loading && <Loading />}
      <Pressable
        style={{flex: 1}}
        onPress={() => {
          if (googlePlaceRef.current != null) {
            googlePlaceRef.current.clear();
          }
        }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            backgroundColor: '#f0f0f0',
            flex: 1,
          }}>
          <View style={{height: '5%'}} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: '#444',
              textAlign: 'center',
              // marginBottom: 20,
            }}>
            Your Location
          </Text>
          {!show ? (
            <TouchableOpacity
              onPress={() => {
                setShow(true), setScrollEnabled(false);
              }}
              style={{
                backgroundColor: 'white',
                borderRadius: wp(3.5),
                borderColor: '#2AAFE5', // Added border color
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
                  // marginLeft: 70,
                  fontSize: 14,
                  marginLeft: 5,
                }}>
                Search your location
              </Text>
            </TouchableOpacity>
          ) : (
            <GooglePlacesAutocomplete
              ref={googlePlaceRef}
              placeholder="Location"
              fetchDetails={true}
              keepResultsAfterBlur={true}
              keyboardShouldPersistTaps={'handled'}
              onPress={async (data, details) => {
                console.log('this is data', data?.description);

                setSelectedAddress(data?.description);
                getCoordinatesFromAddress(data?.description);

                if (googlePlaceRef.current != null) {
                  googlePlaceRef.current.clear();
                }
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
                  paddingHorizontal: 10,
                  height: hp(8), // Ensure there's enough height for the dropdown
                },
                textInputContainer: {
                  position: 'relative',
                },
                textInput: {
                  backgroundColor: 'white',
                  borderRadius: wp(3.5),
                  borderColor: '#2AAFE5', // Added border color
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
                  // left: wp(-5),
                  borderRadius: 10,
                  alignSelf: 'center',
                  fontSize: 10,
                  paddingHorizontal: 20,
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
                // borderWidth: 1,
                justifyContent: 'space-between',
                marginLeft: '0%',
                marginTop: '10%',
              }}>
              <View style={{borderWidth: 0, width: '60%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="my-location"
                    size={16}
                    color={'#2AAFE5'}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#2AAFE5',
                      fontWeight: '500',
                      marginLeft: 5,
                    }}>
                    Current location
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: '9%',
                    width: '100%',
                    color: '#000000',
                  }}>
                  Enable your current location for better services
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
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
                  Enable
                </Text>
              </TouchableOpacity>
            </View>

            {selectedAddress && (
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginTop: '15%',
                    height: 100,
                  }}>
                  <Image source={require('../../assets/loc.png')} />
                  <Text
                    style={{
                      color: '#00000099',
                      fontSize: 14,
                      marginLeft: 10,
                      marginTop: 2,
                      fontWeight: '500',
                      lineHeight: 20,
                      width: '90%',
                    }}>
                    {selectedAddress}
                  </Text>
                </View>
              </View>
            )}

            <Modal
              transparent={true}
              visible={modalVisible}
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
                    width: 300,
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
                    }}>
                    For a better experience.turn on device location. Which uses
                    Google's location service
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '60%',
                      justifyContent: 'space-between',
                      marginTop: hp(4),
                      paddingBottom: '1%',
                    }}>
                    <TouchableOpacity style={{}} onPress={handleModalClose}>
                      <Text
                        style={{
                          color: '#2AAFE5',
                          fontWeight: 'bold',
                          fontSize: 15,
                        }}>
                        No,thanks
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
          </View>
        </ScrollView>
      </Pressable>
      {pincodestatus ==
        'sorry currently we are not serviceable for the old cloths in your area' && (
        <View
          style={{
            alignSelf: 'center',
            paddingHorizontal: 30,
            paddingBottom: 10,
          }}>
          <Text style={{color: 'red'}}>{pincodestatus}</Text>
        </View>
      )}
      <Button
        onPress={() => {
          const endPoint = 'addLocationList';
          navigateonOK(endPoint);
        }}
        style={{marginBottom: '8%', marginHorizontal: 20}}
        background={true}
        title={'Submit'}
      />
    </View>
  );
};
