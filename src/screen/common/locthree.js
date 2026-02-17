import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../utils/responsive';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import storage from '../utils/storageService';
import Loading from '../../custom';

import {useFocusEffect} from '@react-navigation/native';
import Api from '../../redux/Api';
export default locthree = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const GOOGLE_API_KEY = 'AIzaSyAB_BiabQVCPTNCPgbszH4XXypbJImS4HE';
  const [loading, setLoading] = useState(false);
  const [addressType, setAddressType] = useState('Home');
  const [pincodeError, setPincodeError] = useState('');
  const {wardrobeData = {}} = route.params || {}; // Retrieve wardrobeData from props

  const [validPincodes, setValidPincodes] = useState([]);
  const [inputs, setInputs] = useState({
    name: undefined,
    number: undefined,
    hNo: undefined,
    roadnameArea: undefined,
    city: undefined,
    state: undefined,
    pincode: undefined,
  });

  // console.log("inputs?.pincode",inputs?.pincode)
  useFocusEffect(
    React.useCallback(() => {
      getAddress();
    }, []),
  );
  useEffect(() => {
    const fetchValidPincodes = async () => {
      try {
        const response = await fetch(
          'https://bworth.co.in/api/bworth/getValidPinCodes',
        );
        const json = await response.json();
        if (json?.data) {
          const pincodes = json.data.map(item => item.pincode);
          console.log('Valid pincodes:', pincodes);
          setValidPincodes(pincodes);
        }
      } catch (error) {
        console.log('Error fetching pincodes:', error);
      }
    };
    fetchValidPincodes();
  }, []);
  const getAddress = async () => {
    const phone = await storage.getItem(storage.PHONE);
    try {
      setLoading(true);
      const use_id = await storage.getItem(storage.use_id);
      const endPoint = `getPickupAddressById?loginId=${use_id}`;
      const response = await Api.getRequest(endPoint);
      if (response?.data?.length !== 0) {
        const data = response?.data[response?.data.length - 1];
        console.log('data?.pinCode', data?.pinCode);
        setInputs({
          ...inputs,
          hNo: data?.houseNumberBuildingName,
          number: phone,
          state: data?.state,
          city: data?.City,
          name: data?.fullName,
          roadnameArea: data?.roadNameArea,
          pincode: data?.pinCode,
        });
        setAddressType(data?.typeAddress);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const checkLocationPermission = async () => {
    setModalVisible(false);
    setLoading(true);
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

  const getAddressComponent = (components, type) => {
    const comp = components.find(c => c.types.includes(type));
    return comp ? comp.long_name : '';
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
          const result = geocodeData.results[0];
          const components = result.address_components;
          const houseNo = getAddressComponent(components, 'street_number');
          const route = getAddressComponent(components, 'route');
          const city = getAddressComponent(components, 'locality');
          const state = getAddressComponent(
            components,
            'administrative_area_level_1',
          );
          const pincode = getAddressComponent(components, 'postal_code');
          console.log('pincode', pincode);
          setInputs(prev => ({
            ...prev,
            hNo: `${houseNo} ${route}`.trim() || result.formatted_address,
            city,
            state,
            pincode,
          }));
          setLoading(false);
        },
        error => {
          console.log(error);
          setLoading(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleInputs = (key, text) => {
    setInputs(prev => ({...prev, [key]: text}));
  };

  const handlePickupRequest = async () => {
    const Pid = await storage.getItem(storage.use_id);
    try {
      const endpoint = 'addPickupToken';
      const data = {
        loginId: Pid,
        warmClothes: wardrobeData.warmClothes,
        bedsheets: wardrobeData.bedsheets,
        anyClothes: wardrobeData.anyClothes,
        totalQuantity: wardrobeData.totalQuantity,
        confirmation: wardrobeData.confirmation,
      };
      const response = await Api.postRequest(endpoint, data);
      if (response?.data?.orderId) {
        ToastAndroid.show(
          `Pickup token generated: ${response.data.orderId}`,
          ToastAndroid.SHORT,
        );
        return response;
      }
      ToastAndroid.show('Error generating pickup token', ToastAndroid.SHORT);
      return null;
    } catch (err) {
      console.log('API call error:', err);
      ToastAndroid.show(
        'Error with pickup token generation',
        ToastAndroid.SHORT,
      );
      return null;
    }
  };

  const handleSubmitPickupFlow = async () => {
    const use_id = await storage.getItem(storage.use_id);
    if (
      !inputs.name ||
      !inputs.hNo ||
      !inputs.number ||
      !inputs.roadnameArea ||
      !inputs.city ||
      !inputs.state ||
      !inputs.pincode
    ) {
      ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(inputs.number)) {
      ToastAndroid.show(
        'Enter a valid 10-digit phone number',
        ToastAndroid.SHORT,
      );
      return;
    }
    if (!validPincodes.includes(inputs.pincode)) {
      setPincodeError('Pincode not valid');
      return;
    }
    try {
      setLoading(true);
      const pickupResponse = await handlePickupRequest();
      if (!pickupResponse?.data?.orderId) {
        ToastAndroid.show('Pickup token generation failed', ToastAndroid.SHORT);
        return;
      }
      const orderId = pickupResponse.data.orderId;
      const addressEndpoint = 'addPickupAddress';
      const addressData = {
        loginId: use_id,
        orderId,
        phoneNumber: inputs.number,
        fullName: inputs.name,
        City: inputs.city,
        state: inputs.state,
        houseNumberBuildingName: inputs.hNo,
        roadNameArea: inputs.roadnameArea,
        typeAddress: addressType,
        pinCode: inputs.pincode,
      };
      const addressResponse = await Api.postRequest(
        addressEndpoint,
        addressData,
      );
      if (!addressResponse?.data) {
        ToastAndroid.show('Failed to add pickup address', ToastAndroid.SHORT);
        return;
      }
      ToastAndroid.show(
        'Pickup request created successfully',
        ToastAndroid.SHORT,
      );
      navigation.navigate('Dashboard');
    } catch (err) {
      console.log('Pickup flow error:', err);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: 17,
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#000000',
          padding: 20,
        }}>
        Add Your Pickup Details
      </Text>
      {loading && <Loading />}
      <ScrollView
        style={{padding: 25, paddingTop: 5}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            // flexDirection: 'row',
            borderWidth: 0,
            // justifyContent: 'space-between',
          }}>
          {/* <View style={{borderWidth: 0, width: '60%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="my-location" size={16} color={'#2AAFE5'} />
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
          </View> */}
          <TouchableOpacity
            onPress={checkLocationPermission}
            style={{
              borderWidth: 1,
              borderColor: '#2AAFE5',
              borderRadius: 5,
              alignItems: 'center',
              height: hp(4.5),
              justifyContent: 'center',
              paddingHorizontal: 10,
              margin: 5,
              // width: 'fit-content',
            }}>
            <Text style={{color: '#2AAFE5', fontWeight: 'bold', fontSize: 12}}>
              Use my current location
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
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
            <Text style={{color: '#2AAFE5', fontWeight: 'bold', fontSize: 12}}>
              Enable
            </Text>
          </TouchableOpacity> */}
        </View>
        <View style={{width: '100%', marginTop: 20}}>
          <Text
            style={{
              color: '#95989A',
              fontSize: 15,
              fontWeight: '400',
            }}>
            Full Name
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 12,
              paddingLeft: '2%',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(5),
              width: '100%',
            }}>
            <TextInput
              value={inputs.name}
              onChangeText={te => handleInputs('name', te)}
              style={{color: '#000', height: '100%', width: '100%'}}
              placeholder="Enter name"
              placeholderTextColor={'#95989A'}
            />
          </View>
        </View>

        <View style={{width: '100%', marginTop: 10}}>
          <Text
            style={{
              color: '#95989A',
              fontSize: 15,
              fontWeight: '400',
            }}>
            Phone Number
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 12,
              paddingLeft: '2%',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(5),
              width: '100%',
            }}>
            <TextInput
              keyboardType="numeric"
              value={inputs.number}
              onChangeText={te => handleInputs('number', te)}
              style={{color: '#000', height: '100%', width: '100%'}}
              placeholder="Enter Number"
              placeholderTextColor={'#95989A'}
            />
          </View>
        </View>
        <View style={{width: '100%', marginTop: 10}}>
          <Text
            style={{
              color: '#95989A',
              fontSize: 15,
              fontWeight: '400',
            }}>
            State
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 12,
              paddingLeft: '2%',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(5),
              width: '100%',
            }}>
            <TextInput
              value={inputs.state}
              onChangeText={te => handleInputs('state', te)}
              style={{color: '#000', height: '100%', width: '100%'}}
              placeholder="Enter State"
              placeholderTextColor={'#95989A'}
            />
          </View>
        </View>

        <View style={{width: '100%', marginTop: 10}}>
          <Text
            style={{
              color: '#95989A',
              fontSize: 15,
              fontWeight: '400',
            }}>
            City
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 12,
              paddingLeft: '2%',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(5),
              width: '100%',
            }}>
            <TextInput
              value={inputs.city}
              onChangeText={te => handleInputs('city', te)}
              style={{color: '#000', height: '100%', width: '100%'}}
              placeholder="Enter City"
              placeholderTextColor={'#95989A'}
            />
          </View>
        </View>
        <View style={{width: '100%', marginTop: 10}}>
          <Text
            style={{
              color: '#95989A',
              fontSize: 15,
              fontWeight: '400',
            }}>
            House Number, Building Name
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 12,
              paddingLeft: '2%',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(5),
              width: '100%',
            }}>
            <TextInput
              value={inputs.hNo}
              onChangeText={te => handleInputs('hNo', te)}
              style={{color: '#000', height: '100%', width: '100%'}}
              placeholder="Enter House number"
              placeholderTextColor={'#95989A'}
            />
          </View>
        </View>
        <View style={{width: '100%', marginTop: 10}}>
          <Text
            style={{
              color: '#95989A',
              fontSize: 15,
              fontWeight: '400',
            }}>
            Road name, Areas
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 12,
              paddingLeft: '2%',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(5),
              width: '100%',
            }}>
            <TextInput
              value={inputs.roadnameArea}
              onChangeText={te => handleInputs('roadnameArea', te)}
              style={{color: '#000', height: '100%', width: '100%'}}
              placeholder="Enter Area"
              placeholderTextColor={'#95989A'}
            />
          </View>
        </View>
        <View style={{width: '100%', marginTop: 10}}>
          <Text
            style={{
              color: '#95989A',
              fontSize: 15,
              fontWeight: '400',
            }}>
            Pincode
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 12,
              paddingLeft: '2%',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(5),
              width: '100%',
            }}>
            <TextInput
              keyboardType="numeric"
              value={inputs?.pincode}
              onChangeText={te => handleInputs('pincode', te)}
              style={{color: '#000', height: '100%', width: '100%'}}
              placeholder="Enter Pincode"
              placeholderTextColor={'#95989A'}
            />
          </View>
          {pincodeError ? (
            <Text
              style={{color: 'red', fontSize: 12, marginTop: 3, marginLeft: 5}}>
              {pincodeError}
            </Text>
          ) : null}
        </View>

        <View style={{width: '100%', marginTop: 10}}>
          <Text
            style={{
              color: '#95989A',
              fontSize: 15,
              fontWeight: '400',
            }}>
            Address Type
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'row',
              gap: 15,
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => setAddressType('Home')}
              style={{
                width: '25%',
                padding: 8,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: addressType == 'Home' ? '#2AAFE5' : '#000',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: addressType == 'Home' ? '#2AAFE5' : '#000',
                  fontWeight: '500',
                }}>
                Home
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setAddressType('Office')}
              style={{
                width: '25%',
                padding: 8,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: addressType == 'Office' ? '#2AAFE5' : '#000',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: addressType == 'Office' ? '#2AAFE5' : '#000',
                  fontWeight: '500',
                }}>
                Office
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setAddressType('Others')}
              style={{
                width: '25%',
                padding: 8,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: addressType == 'Others' ? '#2AAFE5' : '#000',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: addressType == 'Others' ? '#2AAFE5' : '#000',
                  fontWeight: '500',
                }}>
                Others
              </Text>
            </Pressable>
          </View>
        </View>

        <Button
          background={true}
          onPress={handleSubmitPickupFlow}
          style={{
            borderWidth: 0.6,
            borderColor: '#2AAFE5',
            marginVertical: 25,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            height: hp(5),
            width: '100%',
          }}
          title={loading ? 'Confirming Pickup...' : 'Confirm Pickup'}
          textStyle={{
            fontSize: 16,
          }}
          disabled={loading}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
                  style={{fontSize: 15, fontStyle: 'italic', color: '#000000'}}>
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
    </View>
  );
};
