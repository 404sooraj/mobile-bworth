import React, {useState, useEffect} from 'react';
import {
  PermissionsAndroid,
  Platform,
  Pressable,
  BackHandler,
  Alert,
} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from './utils/responsive';
import {
  Modal,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import storage from './utils/storageService';
import Loading from '../custom';
import Api from '../redux/Api';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
export default locthree = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const GOOGLE_API_KEY = 'AIzaSyAB_BiabQVCPTNCPgbszH4XXypbJImS4HE';
  const [loading, setLoading] = useState(false);
  const [addressType, setAddressType] = useState('Home');

  const [inputs, setInputs] = useState({
    name: undefined,
    number: undefined,
    hNo: undefined,
    roadnameArea: undefined,
    city: undefined,
    state: undefined,
    pincode: undefined,
  });

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getAddress()
  //   }, [])
  // )

  useFocusEffect(
    React.useCallback(() => {
      getAddress();

      //     const handleBackPress = async () => {
      //       const loginId = await storage.getItem(storage.use_id);
      //       if (loginId) {
      //         try {
      //           setLoading(true);
      //           const response = await Api.postRequest(
      //             'https://71d5-2401-4900-1c63-7fdf-942a-854d-b73e-208e.ngrok-free.app/bworth/deleteProductCheckout',
      //             { loginId: loginId }
      //           );
      //           console.log('Delete API Response:', response);
      //         } catch (error) {
      //           console.error('Error while hitting delete API:', error);
      //         } finally {
      //           setLoading(false);
      //         }
      //       }

      //       navigation.goBack();
      //       return true;
      //     };

      //     BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      //     return () => {
      //       BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      //     };
      //   }, [navigation])
      // );
    }, []),
  );

  const getAddress = async () => {
    const phone = await storage.getItem(storage.PHONE);
    try {
      setLoading(true);
      const use_id = await storage.getItem(storage.use_id);
      // addLocationList
      const endPoint = `getPickupAddressById?loginId=${use_id}`;
      const response = await Api.getRequest(endPoint);
      if (response?.data?.length !== 0) {
        const data = response?.data[response?.data.length - 1];
        // console.log('data?.pinCode', data?.pinCode);
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
        Add Your Shippment Details
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
          <View style={{borderWidth: 0, width: '60%'}}>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="my-location" size={16} color={'#2AAFE5'} />
              <Text
                style={{
                  fontSize: 16,
                  color: '#2AAFE5',
                  fontWeight: '500',
                  marginLeft: 5,
                }}>
                Use my current location
              </Text>
            </View> */}
            {/* <Text
              style={{
                fontSize: 12,
                marginLeft: '9%',
                width: '100%',
                color: '#000000',
              }}>
              Enable your current location for better services
            </Text> */}
          </View>
          <TouchableOpacity
            // onPress={() => setModalVisible(true)}
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
        </View>
        <View style={{width: '100%', marginTop: 20}}>
          <Text
            style={{
              color: '#95989A',
              fontSize: 15,
              fontWeight: '400',
            }}>
            Full Name <Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 5,
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
            Phone Number <Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 5,
              paddingLeft: '2%',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(5),
              width: '100%',
            }}>
            <TextInput
              keyboardType="number-pad"
              maxLength={10}
              value={inputs.number}
              onChangeText={te => {
                // Remove any non-digit characters
                const cleaned = te.replace(/[^0-9]/g, '');
                handleInputs('number', cleaned);
              }}
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
            State <Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 5,
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
            City <Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 5,
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
            House Number, Building Name <Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 5,
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
            Road name, Areas <Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 5,
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
            Pincode <Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#2AAFE5',
              marginTop: 5,
              borderRadius: 5,
              paddingLeft: '2%',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(5),
              width: '100%',
            }}>
            <TextInput
              keyboardType="numer-pad"
              maxLength={6} // only 6 digits allowed
              value={inputs?.pincode}
              onChangeText={te => {
                const cleaned = te.replace(/[^0-9]/g, ''); // only numbers
                handleInputs('pincode', cleaned);
              }}
              style={{color: '#000', height: '100%', width: '100%'}}
              placeholder="Enter Pincode"
              placeholderTextColor="#95989A"
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
                borderRadius: 5,
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
          onPress={async () => {
            const use_id = await storage.getItem(storage.use_id);
            if (
              !inputs.name ||
              !inputs?.hNo ||
              !inputs?.number ||
              !inputs?.roadnameArea ||
              !inputs?.city ||
              !inputs?.state ||
              !inputs?.pincode
            ) {
              ToastAndroid.show('All Fields Are Required', ToastAndroid.SHORT);
              return;
            }
            if (inputs?.number?.length < 10) {
              ToastAndroid.show('Enter valid phone number', ToastAndroid.SHORT);
              return;
            }
            try {
              setLoading(true);
              const endPoint = 'addPickupAddress';
              const data = {
                loginId: use_id,
                phoneNumber: inputs.number,
                fullName: inputs.name,
                City: inputs?.city,
                state: inputs?.state,
                houseNumberBuildingName: inputs.hNo,
                roadNameArea: inputs?.roadnameArea,
                typeAddress: addressType,
                pinCode: inputs?.pincode,
              };
              const response = await Api.postRequest(endPoint, data);
              if (response.data) {
                navigation.navigate('cartCheckout', {inputs});
                ToastAndroid.show('Address updated', ToastAndroid.SHORT);
              }
              setLoading(false);
            } catch (err) {
              console.log(err);
              setLoading(false);
            } finally {
              setLoading(false);
            }
          }}
          style={{
            borderWidth: 0.6,
            borderColor: '#2AAFE5',
            marginVertical: 25,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            height: hp(5),
            width: '100%',
          }}
          title={'Continue'}
          textStyle={{
            fontSize: 16,
          }}
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
