import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import FontAwesome from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {heightPercent as hp, widthPrecent as wp} from '../utils/responsive';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import storage from '../utils/storageService';

export default locone = ({navigation}) => {
  const GOOGLE_API_KEY = 'AIzaSyAB_BiabQVCPTNCPgbszH4XXypbJImS4HE';
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [vendorData, setVendorData] = useState([]); // State to store API data
  const [expanded, setExpanded] = useState([]); // State to track expanded vendors

  useEffect(() => {
    requestLocationPermission();
    getVendorList(); // Fetch vendor data when the component mounts
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        setRegion({
          ...region,
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const getVendorList = async () => {
    try {
      const response = await fetch(
        'https://bworth.co.in/api/bworth/getDropLocations',
      );
      const json = await response.json();
      if (json && json.data) {
        // Update state with the data
        console.log(json.data);
        setVendorData(json.data);
      }
    } catch (error) {
      console.error('Error fetching vendor data:', error);
    }
  };

  const toggleExpand = index => {
    if (expanded.includes(index)) {
      setExpanded(expanded.filter(i => i !== index));
    } else {
      setExpanded([...expanded, index]);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f8f9fa'}}>
      <View
        style={{
          height: hp(35),
          elevation: 2,
          borderBottomEndRadius: wp(10),
          borderBottomLeftRadius: wp(10),
          zIndex: 1,
          backgroundColor: '#fffs',
        }}>
        <Header title={'Location'} color={true} bgcolor={'#fff'} />
        {!show ? (
          <TouchableOpacity
            onPress={() => {
              setShow(true);
            }}
            style={{
              height: hp(5.9),
              borderWidth: 1,
              marginTop: '15%',
              marginHorizontal: 20,
              borderRadius: wp(10),
              paddingLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome name="location-sharp" size={20} color={'#00000099'} />
            <TextInput
              editable={false}
              placeholder="C-10009, Police line 2 , Raj Nagar Extension, ..."
              style={{
                height: '100%',
                width: '82%',
              }}
              placeholderTextColor={'#00000099'}
            />
            <Ionicons color="#00000099" name="search1" size={20} />
          </TouchableOpacity>
        ) : (
          <GooglePlacesAutocomplete
            placeholder="Search Address"
            fetchDetails={true}
            keepResultsAfterBlur={true}
            keyboardShouldPersistTaps="always"
            onPress={async (data, details) => {
              // Process selected location
              console.log(data.description);

              await storage.setItem(storage.Address, data.description);
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
            }}
            textInputProps={{
              placeholderTextColor: 'grey',
            }}
            styles={{
              container: {
                paddingHorizontal: 10,
                height: hp(25),
                zIndex: 2,
              },
              textInputContainer: {
                height: hp(5.9),
                borderWidth: 1,
                marginTop: '15%',
                marginHorizontal: 20,
                borderRadius: wp(10),
                paddingLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
                overflow: 'hidden',
              },
              textInput: {
                backgroundColor: 'white',
                color: 'black',
              },
              listView: {
                zIndex: 3,
                backgroundColor: 'white',
                borderRadius: 5,
                elevation: 2,
              },
              description: {
                color: 'black',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />
        )}
        <TouchableOpacity
          onPress={getCurrentLocation}
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: '5%',
            alignItems: 'center',
            zIndex: show ? 0 : 1,
            position: 'absolute',
            bottom: '25%',
          }}>
          <MaterialIcons name="my-location" size={16} color={'#2AAFE5'} />
          <Text style={{color: '#00000099'}}>Select your current location</Text>
        </TouchableOpacity>
      </View>

      {count === 1 ? (
        <View style={{flex: 1}}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={region}
            showsUserLocation={true}
            followsUserLocation={true}
            onRegionChangeComplete={region => setRegion(region)}>
            {currentLocation && (
              <Marker
                coordinate={currentLocation}
                title="Your Location"
                description="This is where you are"
              />
            )}
          </MapView>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <Text
            style={{
              padding: 20,
              marginTop: hp(4),
              color: '#444444',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Vendor List
          </Text>
          <FlatList
            data={vendorData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => toggleExpand(index)}>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: '5%',
                    marginVertical: 5,
                    justifyContent: 'center',
                    marginTop: '2%',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('../../assets/men.png')} />
                    <Text
                      style={{
                        color: '#00000099',
                        fontSize: 18,
                        marginLeft: '5%',
                      }}>
                      {item.vendorName}
                    </Text>
                  </View>
                  {expanded.includes(index) ? (
                    <View
                      style={{
                        flexDirection: 'column',
                        paddingBottom: 10,
                        paddingLeft: '13%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingBottom: 10,
                          paddingLeft: '13%',
                        }}>
                        <Text style={{fontWeight: '500', color: 'black'}}>
                          lat:
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            marginLeft: 5,
                            marginRight: 30,
                          }}>
                          {item.lat}
                        </Text>
                        <Text style={{fontWeight: '500', color: 'black'}}>
                          long:
                        </Text>
                        <Text style={{color: 'black', marginLeft: 5}}>
                          {item.long}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          paddingBottom: 10,
                          paddingLeft: '13%',
                        }}>
                        <Text style={{fontWeight: '500', color: 'black'}}>
                          Phone Number:
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            marginLeft: 5,
                            marginLeft: 10,
                          }}>
                          {item.phone}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          paddingBottom: 10,
                          paddingLeft: '13%',
                        }}>
                        <Text style={{fontWeight: '500', color: 'black'}}>
                          Address:
                        </Text>
                        <Text style={{color: 'black', marginLeft: 10}}>
                          {item.address}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                  <View
                    style={{
                      borderBottomWidth: 1,
                      marginTop: hp(2),
                      borderColor: '#00000085',
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <Button
        background={true}
        onPress={() => {
          if (count > 1) {
            navigation.navigate('Dashboard');
          }
          setCount(prev => prev + 1);
        }}
        style={{
          position: 'absolute',
          bottom: 30,
          alignSelf: 'center',
          width: wp(90),
          borderRadius: 15,
          height: hp(7),
        }}
        title={'Continue'}
      />
    </View>
  );
};
