import React, {useState, useEffect} from 'react';
import {AppRegistry} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
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
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import BottomImageBar from './components/bottomImageBar';
import BrandSection from './components/brand';
import NewCollectionSection from './components/newCollection';
import BestOffersSection from './components/bestOffers';
// import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
const Stack = createStackNavigator();
import {Ionicons} from '@expo/vector-icons';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: ''}}
        />

        <Stack.Screen
          name="cartScreen"
          component={cartScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="cartCheckout"
          component={cartCheckout}
          options={{title: ''}}
        />
        <Stack.Screen
          name="cartOrderTrack"
          component={cartOrderTrack}
          options={{title: ''}}
        />
        <Stack.Screen
          name="cartOrderConfirm"
          component={cartOrderConfirm}
          options={{title: ''}}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="PhoneVerification"
          component={PhoneVerification}
          options={{title: ''}}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerification}
          options={{title: ''}}
        />
        <Stack.Screen
          name="PinCode"
          component={PinCode}
          options={{title: ''}}
        />
        <Stack.Screen name="Sell" component={Sell} options={{title: ''}} />
        <Stack.Screen
          name="wardrobe"
          component={wardrobe}
          options={{title: ''}}
        />
        <Stack.Screen
          name="currentLocation"
          component={currentLocation}
          options={{title: ''}}
        />
        <Stack.Screen name="token" component={token} options={{title: ''}} />
        <Stack.Screen name="locone" component={locone} options={{title: ''}} />
        <Stack.Screen name="loctwo" component={loctwo} options={{title: ''}} />
        <Stack.Screen
          name="locthree"
          component={locthree}
          options={{title: ''}}
        />
        <Stack.Screen
          name="locfour"
          component={locfour}
          options={{title: ''}}
        />
        <Stack.Screen
          name="MyOrders"
          component={MyOrders}
          options={{title: ''}}
        />

        <Stack.Screen
          name="MyOrders1"
          component={MyOrders1}
          options={{title: ''}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{title: ''}}
        />
        <Stack.Screen
          name="LetUsKnow"
          component={LetUsKnow}
          options={{title: ''}}
        />
        <Stack.Screen
          name="TokenPolicies"
          component={TokenPolicies}
          options={{title: ''}}
        />
        <Stack.Screen
          name="BuyBackPolicies"
          component={BuyBackPolicies}
          options={{title: ''}}
        />
        <Stack.Screen
          name="PrivacyPolicyy"
          component={PrivacyPolicyy}
          options={{title: ''}}
        />
        <Stack.Screen name="FAQ1" component={FAQ1} options={{title: ''}} />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{title: ''}}
        />
        <Stack.Screen
          name="PaymentMethodBlur"
          component={PaymentMethodBlur}
          options={{title: ''}}
        />

        <Stack.Screen
          name="TokenTransaction"
          component={TokenTransaction}
          options={{title: ''}}
        />
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileSettings}
          options={{title: ''}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{title: ''}}
        />
        <Stack.Screen
          name="EnableTwoFactorAuthentication"
          component={EnableTwoFactorAuthentication}
          options={{title: ''}}
        />
        <Stack.Screen
          name="EnableTwoFactorAuthenticationLogin"
          component={EnableTwoFactorAuthenticationLogin}
          options={{title: ''}}
        />
        <Stack.Screen name="pickup" component={pickup} options={{title: ''}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//currentlocation
// navigateonOK
const currentLocation = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);

  const navigateonOK = () => {
    // Handle form submission logic here

    navigation.navigate('Sell');
  };
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    };

    const getCurrentLocation = async () => {
      try {
        await requestLocationPermission();
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setLocation(location.coords);
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getCurrentLocation();
  }, []); // Empty dependency array ensures useEffect runs only once

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={{}}>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          marginTop: 20,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        Your Location
      </Text>
      <View
        style={{
          borderWidth: 1.3,
          borderColor: '#2AAFE5',
          borderRadius: 12,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 40,
          marginRight: 40,
          marginBottom: 20,
        }}>
        {/* <Ionicons name="ios-search" size={24} color="black" /> */}
        <Text
          style={{
            color: '#4370F0',
            fontWeight: 'bold',
            marginLeft: 70,
            fontSize: 14,
          }}>
          Search your location
        </Text>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 40,
          marginRight: 40,
        }}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Icon.Button
              name="inbox"
              size={15}
              color="black"
              backgroundColor="transparent"
              style={{marginLeft: 0}}
            />

            <Text
              style={{
                color: '#4370F0',

                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Current Location
            </Text>
          </View>
          <Text
            style={{
              color: '#000000',
              fontSize: 11,
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            Enable your current location for
          </Text>
          <Text
            style={{
              color: '#000000',
              // '#2AAFE5'
              fontSize: 11,
              fontWeight: 'bold',
            }}>
            better services
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            borderWidth: 1,
            borderColor: '#4370F0',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginLeft: 110,
          }}>
          <Text style={{color: '#4370F0', fontWeight: 'bold', fontSize: 12}}>
            Enable
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: '#4370F0',
          fontSize: 16,
          fontWeight: 'bold',
          marginLeft: 30,
          marginTop: 20,
        }}>
        Saved Location
      </Text>

      <Text
        style={{
          color: 'black',
          fontSize: 15,
          fontWeight: 'bold',
          marginLeft: 40,
          marginTop: 20,
        }}>
        other
      </Text>

      <View style={{display: 'flex', flexDirection: 'row'}}></View>
      <Text style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 2}}>
        📍 C-10009, Police line 2, Raj Nagar Extension,
      </Text>
      <Text style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 1}}>
        {' '}
        Ghaziabad,Uttar Pradesh
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: 15,
          fontWeight: 'bold',
          marginLeft: 40,
          marginTop: 20,
        }}>
        other
      </Text>

      <View style={{display: 'flex', flexDirection: 'row'}}></View>
      <Text style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 2}}>
        📍 C-10009, Police line 2, Raj Nagar Extension,
      </Text>
      <Text style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 1}}>
        {' '}
        Ghaziabad,Uttar Pradesh
      </Text>
      <View
        style={{
          height: 0.7,
          backgroundColor: 'grey',
          width: '90%',
          marginTop: 20,
          marginLeft: 20,
        }}
      />

      <Text
        style={{
          color: 'black',
          fontSize: 15,
          fontWeight: 'bold',
          marginLeft: 40,
          marginTop: 20,
        }}>
        other
      </Text>

      <View style={{display: 'flex', flexDirection: 'row'}}></View>
      <Text style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 2}}>
        📍 C-10009, Police line 2, Raj Nagar Extension,
      </Text>
      <Text style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 1}}>
        {' '}
        Ghaziabad,Uttar Pradesh
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: 15,
          fontWeight: 'bold',
          marginLeft: 40,
          marginTop: 20,
        }}>
        other
      </Text>

      <View style={{display: 'flex', flexDirection: 'row'}}></View>
      <Text style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 2}}>
        📍 C-10009, Police line 2, Raj Nagar Extension,
      </Text>
      <Text style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 1}}>
        {' '}
        Ghaziabad,Uttar Pradesh
      </Text>
      <View
        style={{
          height: 0.7,
          backgroundColor: 'grey',
          width: '90%',
          marginTop: 20,
          marginLeft: 20,
        }}
      />
      <Text
        style={{
          color: 'black',
          fontSize: 15,
          fontWeight: 'bold',
          marginLeft: 40,
          marginTop: 20,
        }}>
        other
      </Text>

      <View style={{display: 'flex', flexDirection: 'row'}}></View>
      <Text style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 2}}>
        📍 C-10009, Police line 2, Raj Nagar Extension,
      </Text>
      <Text style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 1}}>
        {' '}
        Ghaziabad,Uttar Pradesh
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: 15,
          fontWeight: 'bold',
          marginLeft: 40,
          marginTop: 20,
        }}>
        other
      </Text>

      <View style={{display: 'flex', flexDirection: 'row'}}></View>
      <Text style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 2}}>
        📍 C-10009, Police line 2, Raj Nagar Extension,
      </Text>
      <Text style={{color: 'grey', fontSize: 12, marginLeft: 20, marginTop: 1}}>
        {' '}
        Ghaziabad,Uttar Pradesh
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <TouchableOpacity 
        style={{
          borderWidth: 1,
          borderColor: '#2AAFE5',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginLeft: 110
        }} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: '#2AAFE5' }}>Enable</Text>
      </TouchableOpacity> */}

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
              <Text style={{fontSize: 15, fontStyle: 'italic'}}>
                For a better experience.turn on device location. Which uses
                Google's location service
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'baseline',
                  // backgroundColor: '#2AAFE5',
                  display: 'flex',
                  flexDirection: 'row',
                }}
                onPress={handleModalClose}>
                <Text
                  style={{
                    color: '#2AAFE5',
                    marginRight: 20,
                    marginLeft: 140,
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  No,thanks
                </Text>
                <Text
                  onPress={navigateonOK}
                  style={{color: '#2AAFE5', fontWeight: 'bold', fontSize: 16}}>
                  OK
                </Text>
              </TouchableOpacity>
              {/* {location && (
        <Text style={{ marginTop: 20,
    color: 'black',
    fontWeight: 'bold',}}>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )} */}
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};
//currentlocation
//wardrobe
const wardrobe = ({navigation}) => {
  const handlenext = () => {
    // Handle form submission logic here

    //  navigation.navigate('token');

    navigation.navigate('pickup');
  };

  return (
    <ScrollView style={styles.container3}>
      <View
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
          right: 30,
          height: '10%',
          backgroundColor: '#E1F9E9',
        }}>
        <Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>
          Your estimated price will be confirmed after a final check by our team
        </Text>
        <View style={styles.buttonContainer}></View>
      </View>
      <View>
        <Text style={{fontSize: 14, marginTop: 105, textAlign: 'center'}}>
          {' '}
          Empty Your Wardrobe
        </Text>
      </View>
      <View
        style={{
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 15,
          width: '90%',
          left: 20,
          marginTop: 40,
          height: 280,
          backgroundColor: 'white',
          shadowColor: '#000000', // Shadow color
          shadowOffset: {width: 0, height: 2}, // Shadow offset
          shadowOpacity: 0.25, // Shadow opacity
          shadowRadius: 3.84, // Shadow radius
          elevation: 5,
        }}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{marginTop: 20, marginLeft: 20, marginRight: 10}}>
              Warm Cloths/SofaCover
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                borderWidth: 1,
                borderColor: '#95989A',
                padding: 10,
                borderRadius: 15,
                alignItems: 'center',
                width: '20%',
                marginTop: 20,
                backgroundColor: 'white',
                marginLeft: 50,
              }}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{color: '#000000', marginRight: 10}}>--</Text>
                <Text style={{color: '#000000', marginRight: 10}}>1</Text>
                <Text style={{color: '#000000'}}>+</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{marginTop: 20, marginLeft: 20, marginRight: 40}}>
              Bedsheets/Curtains
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                borderWidth: 1,
                borderColor: '#95989A',
                padding: 10,
                borderRadius: 15,
                alignItems: 'center',
                width: '20%',
                marginTop: 20,
                backgroundColor: 'white',
                marginLeft: 50,
              }}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{color: '#000000', marginRight: 10}}>--</Text>
                <Text style={{color: '#000000', marginRight: 10}}>1</Text>
                <Text style={{color: '#000000'}}>+</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginRight: 0,
              }}>
              <Text style={{marginTop: 20, marginLeft: 20}}>
                Any Other Cloths
              </Text>

              <Text style={{marginLeft: 20, fontSize: 10}}>
                Note-Please Avoid Undergarments
              </Text>

              <Text style={{marginLeft: 20, fontSize: 10}}>
                and Socks due to hygiene Reason
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                borderWidth: 1,
                borderColor: '#95989A',
                padding: 10,
                height: 40,
                borderRadius: 15,
                alignItems: 'center',
                width: '20%',
                marginTop: 20,
                backgroundColor: 'white',
                marginLeft: 50,
              }}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{color: '#000000', marginRight: 10}}>--</Text>
                <Text style={{color: '#000000', marginRight: 10}}>1</Text>
                <Text style={{color: '#000000'}}>+</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: 0.5,
              backgroundColor: 'grey',
              width: '90%',
              marginTop: 10,
              marginLeft: 20,
            }}
          />

          <View style={{}}>
            <Text style={{marginTop: 20, marginLeft: 20}}>Total Quantity</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 15,
          width: '90%',
          left: 20,
          marginTop: 40,
          height: 280,
          backgroundColor: 'white',
          shadowColor: '#000000', // Shadow color
          shadowOffset: {width: 0, height: 2}, // Shadow offset
          shadowOpacity: 0.25, // Shadow opacity
          shadowRadius: 3.84, // Shadow radius
          elevation: 5,
        }}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{marginTop: 20, marginLeft: 20, marginRight: 10}}>
              Warm Cloths/SofaCover
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                borderWidth: 1,
                borderColor: '#95989A',
                padding: 10,
                borderRadius: 15,
                alignItems: 'center',
                width: '20%',
                marginTop: 20,
                backgroundColor: 'white',
                marginLeft: 50,
              }}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{color: '#000000', marginRight: 10}}>--</Text>
                <Text style={{color: '#000000', marginRight: 10}}>1</Text>
                <Text style={{color: '#000000'}}>+</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{marginTop: 20, marginLeft: 20, marginRight: 40}}>
              Bedsheets/Curtains
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                borderWidth: 1,
                borderColor: '#95989A',
                padding: 10,
                borderRadius: 15,
                alignItems: 'center',
                width: '20%',
                marginTop: 20,
                backgroundColor: 'white',
                marginLeft: 50,
              }}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{color: '#000000', marginRight: 10}}>--</Text>
                <Text style={{color: '#000000', marginRight: 10}}>1</Text>
                <Text style={{color: '#000000'}}>+</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginRight: 0,
              }}>
              <Text style={{marginTop: 20, marginLeft: 20}}>
                Any Other Cloths
              </Text>

              <Text style={{marginLeft: 20, fontSize: 10}}>
                Note-Please Avoid Undergarments
              </Text>

              <Text style={{marginLeft: 20, fontSize: 10}}>
                and Socks due to hygiene Reason
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                borderWidth: 1,
                borderColor: '#95989A',
                padding: 10,
                height: 40,
                borderRadius: 15,
                alignItems: 'center',
                width: '20%',
                marginTop: 20,
                backgroundColor: 'white',
                marginLeft: 50,
              }}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{color: '#000000', marginRight: 10}}>--</Text>
                <Text style={{color: '#000000', marginRight: 10}}>1</Text>
                <Text style={{color: '#000000'}}>+</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: 0.5,
              backgroundColor: 'grey',
              width: '90%',
              marginTop: 10,
              marginLeft: 20,
            }}
          />

          <View style={{}}>
            <Text style={{marginTop: 20, marginLeft: 20}}>Total Quantity</Text>
          </View>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            borderWidth: 1,
            borderColor: '#95989A',
            padding: 10,
            borderRadius: 15,
            alignItems: 'center',
            width: '20%',
            marginTop: 30,
            backgroundColor: '#95989A',
            marginLeft: 20,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlenext}
          style={{
            borderWidth: 1,
            borderColor: '#95989A',
            padding: 10,
            borderRadius: 15,
            alignItems: 'center',
            width: '20%',
            marginTop: 30,
            backgroundColor: '#4370F0',
            marginLeft: 200,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
//wardrobe

// const Sell = ({ navigation }) => {
//   const handleSubmit = () => {
//     navigation.navigate('wardrobe');
//   };

//   const handleNoPress = () => {
//     navigation.navigate('Dashboard');
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <ImageBackground
//         source={require('./assets/Sell.png')}
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <View style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         }} />
//       </ImageBackground>
//       <View style={{
//         position: 'absolute',
//         borderColor: '#ddd',
//         borderWidth: 1,
//         borderRadius: 15,
//         bottom: 240,
//         left: 30,
//         right: 30,
//         height: '30%',
//         backgroundColor: '#fff',
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 10 },
//         shadowOpacity: 0.3,
//         shadowRadius: 20,
//         elevation: 10,
//       }}>
//         <View style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           marginBottom: 20,
//         }}>
//           <Text style={{
//             fontSize: 18,
//             color: '#333',
//             textAlign: 'center',
//           }}>Would you like to sell your old</Text>
//           <Text style={{
//             fontSize: 20,
//             color: '#000',
//             fontWeight: 'bold',
//             textAlign: 'center',
//           }}>clothes?</Text>
//         </View>
//         <View style={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'space-around',
//           width: '100%',
//         }}>
//           <TouchableOpacity
//             style={{
//               width: '40%',
//               padding: 15,
//               borderRadius: 25,
//               alignItems: 'center',
//               backgroundColor: '#4CAF50',
//             }}
//             onPress={handleSubmit}
//           >
//             <Text style={{
//               color: '#fff',
//               fontSize: 16,
//               textAlign: 'center',
//             }}>Yes</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               width: '40%',
//               padding: 15,
//               borderRadius: 25,
//               alignItems: 'center',
//               backgroundColor: '#FFC107',
//             }}
//             onPress={handleNoPress}
//           >
//             <Text style={{
//               color: '#fff',
//               fontSize: 16,
//               textAlign: 'center',
//             }}>No</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

const Sell = ({navigation}) => {
  const handleSubmit = () => {
    // Handle form submission logic here

    navigation.navigate('wardrobe');
    //  navigation.navigate('pickup');
    //  wardrobe
  };

  const handleNoPress = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container3}>
      <View style={styles.container3}>
        <ImageBackground
          source={require('./assets/Sell.png')}
          style={styles.backgroundImage}>
          <View style={styles.overlay}></View>
        </ImageBackground>
      </View>
      <View
        style={{
          position: 'absolute',
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 15,
          bottom: 240,
          left: 30,
          right: 30,
          height: '30%',
          backgroundColor: 'white',
          shadowColor: '#000', // Shadow color
          shadowOffset: {width: 0, height: 10}, // Shadow offset
          shadowOpacity: 0.3, // Shadow opacity
          shadowRadius: 20, // Shadow radius
          elevation: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text style={styles.t1}>Would you like to sell your old</Text>
          <Text style={styles.t2}>clothes ?</Text>
          {/* <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>

         </View> */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.yesButton]}
              // onPress={handleYesPress}
              onPress={handleSubmit}>
              <Text style={{color: 'white', textAlign: 'center'}}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.noButton]}
              onPress={handleNoPress}>
              <Text style={{color: 'black', textAlign: 'center'}}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
//sell
const token = ({navigation}) => {
  const handleSubmit = () => {
    navigation.navigate('locone');
  };

  return (
    <View style={{marginTop: 250}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          color: '#4444',
          textAlign: 'center',
          marginBottom: 15,
        }}>
        Token Number
      </Text>
      <View
        style={{width: 230, marginTop: 1, marginLeft: 90, marginBottom: 80}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderColor: '#C9C9C9', // Added border color
            borderWidth: 1.5, // Added border width
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 15,
            }}>
            BW11OHP01
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: '#4370F0',
          borderRadius: 45,
          padding: 10,
          width: 320,
          marginLeft: 50,
          borderColor: '#BABABA', // Added border color
          borderWidth: 1,
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontSize: 16,
          }}>
          Let's Shop
        </Text>
      </TouchableOpacity>
    </View>
  );
};
//token
const locone = ({navigation}) => {
  const handleSubmit = () => {
    navigation.navigate('loctwo');
  };

  return (
    <View style={styles.container3}>
      <View style={styles.container3}>
        <Text style={{fontSize: 18, marginLeft: 30, marginTop: 260}}>
          Vendor List
        </Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Image
            source={require('./assets/men.png')}
            style={{
              width: 80, // Adjust the width as needed
              height: 50,
              marginLeft: 40,
              marginTop: 30,
            }}
          />
          <Text style={{marginTop: 30}}>Thomas</Text>
        </View>
        <View
          style={{
            height: 0.5,
            backgroundColor: 'grey',
            width: '85%',
            marginTop: 20,
            marginLeft: 20,
          }}
        />

        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Image
            source={require('./assets/men.png')}
            style={{
              width: 80, // Adjust the width as needed
              height: 50,
              marginLeft: 40,
              marginTop: 20,
            }}
          />
          <Text style={{marginTop: 30}}>Thomas</Text>
        </View>

        <View
          style={{
            height: 0.5,
            backgroundColor: 'grey',
            width: '85%',
            marginTop: 20,
            marginLeft: 20,
          }}
        />

        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Image
            source={require('./assets/men.png')}
            style={{
              width: 80, // Adjust the width as needed
              height: 50,
              marginLeft: 40,
              marginTop: 20,
            }}
          />
          <Text style={{marginTop: 30}}>Thomas</Text>
        </View>
        <View
          style={{
            height: 0.5,
            backgroundColor: 'grey',
            width: '85%',
            marginTop: 20,
            marginLeft: 20,
          }}
        />

        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Image
            source={require('./assets/men.png')}
            style={{
              width: 80, // Adjust the width as needed
              height: 50,
              marginLeft: 40,
              marginTop: 20,
            }}
          />
          <Text style={{marginTop: 30}}>Thomas</Text>
        </View>
        <View
          style={{
            height: 0.5,
            backgroundColor: 'grey',
            width: '85%',
            marginTop: 20,
            marginLeft: 20,
          }}
        />

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
            marginTop: 30,
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
        <Text
          style={{
            marginLeft: 10,
            marginTop: 30,
            fontSize: 23,
            fontWeight: 'bold',
          }}>
          ←Location
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
              fontSize: 10,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 11,
            }}>
            📍 C-10009, Police line 2, Raj Nagar Extension, ... 🔍
          </Text>
        </TouchableOpacity>
        <Text style={{marginLeft: 30, marginTop: 10, color: '#000000'}}>
          👁️‍🗨️ Select your current location
        </Text>
      </View>
    </View>
  );
};
const locthree = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);

  const navigateonOK = () => {
    // Handle form submission logic here

    navigation.navigate('Sell');
  };
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    };

    const getCurrentLocation = async () => {
      try {
        await requestLocationPermission();
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setLocation(location.coords);
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getCurrentLocation();
  }, []); // Empty dependency array ensures useEffect runs only once

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const handleSubmit = () => {
    navigation.navigate('locfour');
  };

  return (
    <View style={{}}>
      <Text
        style={{
          fontSize: 17,
          textAlign: 'center',
          marginTop: 20,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        Select your Pickup Location
      </Text>

      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 40,
          marginRight: 40,
        }}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text
            style={{
              color: '#4370F0',
              // ''
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Current Location
          </Text>
          <Text
            style={{
              color: '#000000',
              // '#2AAFE5'
              fontSize: 11,
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            Enable your current location for
          </Text>
          <Text
            style={{
              color: '#000000',
              // '#2AAFE5'
              fontSize: 11,
              fontWeight: 'bold',
            }}>
            better services
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            borderWidth: 1,
            borderColor: '#4370F0',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginLeft: 110,
          }}>
          <Text style={{color: '#4370F0', fontWeight: 'bold'}}>Enable</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: '#4370F0',
          fontSize: 16,
          fontWeight: 'bold',
          marginLeft: 30,
          marginTop: 20,
        }}>
        Add New Address
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: 14,
          fontWeight: 'bold',
          marginLeft: 30,
          marginTop: 10,
        }}>
        Update based on your exact map Pin
      </Text>

      <Text
        style={{
          color: '#95989A',
          fontSize: 13,
          fontWeight: 'bold',
          marginLeft: 40,
          marginTop: 40,
        }}>
        House Number
      </Text>

      <View
        style={{
          borderWidth: 0.6,
          borderColor: '#666668',
          borderRadius: 12,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 40,
          marginRight: 40,
          marginBottom: 20,
          height: 50,
        }}>
        <Text style={{color: '#95989A'}}>D_10097</Text>
        {/* <Ionicons name="ios-search" size={24} color="black" /> */}
      </View>
      <Text
        style={{
          color: '#95989A',
          fontSize: 13,
          fontWeight: 'bold',
          marginLeft: 40,
          marginTop: 2,
        }}>
        Floor
      </Text>

      <View
        style={{
          borderWidth: 0.6,
          borderColor: '#666668',
          borderRadius: 12,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 40,
          marginRight: 40,
          marginBottom: 20,
          height: 50,
        }}>
        <Text style={{color: '#95989A'}}>13</Text>
        {/* <Ionicons name="ios-search" size={24} color="black" /> */}
      </View>
      <Text
        style={{
          color: '#95989A',
          fontSize: 13,
          fontWeight: 'bold',
          marginLeft: 40,
          marginTop: 2,
        }}>
        Tower Block (optional)
      </Text>

      <View
        style={{
          borderWidth: 0.6,
          borderColor: '#666668',
          borderRadius: 12,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 40,
          marginRight: 40,
          marginBottom: 20,
          height: 50,
        }}>
        <Text style={{color: '#95989A'}}>Rajnagar Extension</Text>
        {/* <Ionicons name="ios-search" size={24} color="black" /> */}
      </View>

      <Text
        style={{
          color: '#95989A',
          fontSize: 13,
          fontWeight: 'bold',
          marginLeft: 40,
          marginTop: 2,
        }}>
        Near by
      </Text>

      <View
        style={{
          borderWidth: 0.6,
          borderColor: '#666668',
          borderRadius: 12,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 40,
          marginRight: 40,
          marginBottom: 20,
          height: 50,
        }}>
        <Text style={{color: '#95989A'}}>Shiv Mandir</Text>
        {/* <Ionicons name="ios-search" size={24} color="black" /> */}
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
          marginTop: 40,
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

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <TouchableOpacity 
        style={{
          borderWidth: 1,
          borderColor: '#2AAFE5',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginLeft: 110
        }} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: '#2AAFE5' }}>Enable</Text>
      </TouchableOpacity> */}

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
              <Text style={{fontSize: 15, fontStyle: 'italic'}}>
                For a better experience.turn on device location. Which uses
                Google's location service
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'baseline',
                  // backgroundColor: '#2AAFE5',
                  display: 'flex',
                  flexDirection: 'row',
                }}
                onPress={handleModalClose}>
                <Text
                  style={{
                    color: '#2AAFE5',
                    marginRight: 20,
                    marginLeft: 140,
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  No,thanks
                </Text>
                <Text
                  onPress={navigateonOK}
                  style={{color: '#2AAFE5', fontWeight: 'bold', fontSize: 16}}>
                  OK
                </Text>
              </TouchableOpacity>
              {/* {location && (
        <Text style={{ marginTop: 20,
    color: 'black',
    fontWeight: 'bold',}}>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )} */}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
const loctwo = ({navigation}) => {
  const handleSubmit = () => {
    navigation.navigate('locthree');
  };

  return (
    <View style={styles.container3}>
      <View style={styles.container3}>
        <View style={{width: 100, height: 50}}>
          <Image source={require('./assets/Map.png')} style={{}} />
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
const PinCode = ({navigation}) => {
  const handleSubmit = () => {
    // Handle form submission logic here

    navigation.navigate('currentLocation');
  };

  return (
    <View style={{flex: 2}}>
      <View style={{flex: 5}}>
        <ImageBackground
          source={require('./assets/enter_enter_pin.png')}
          style={styles.backgroundImage}>
          <View style={styles.overlay}></View>
        </ImageBackground>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundColor: 'white',
        }}></View>
      <View style={{width: 150, height: 100, marginTop: 50, marginLeft: 150}}>
        <Image source={require('./assets/loc_Icon.png')} style={{}} />
      </View>

      <Text style={{fontSize: 20, paddingTop: 40, textAlign: 'center'}}>
        Your device location is off
      </Text>
      <Text style={{fontSize: 13, paddingTop: 10, textAlign: 'center'}}>
        Please enable location permission for better{' '}
      </Text>
      <Text style={{fontSize: 13, textAlign: 'center'}}>
        {' '}
        delivery experience
      </Text>

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
          marginTop: 20,
        }}>
        <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
          Continue
        </Text>
      </TouchableOpacity>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'space-evenly',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 30,
          }}>
          Select Your Address
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#4370F0',
            marginLeft: 120,
            marginTop: 20,
          }}>
          See All
        </Text>
      </View>
      <Text style={{marginLeft: 40, marginTop: 40, marginBottom: 20}}>
        📍 C-10009, Police line 2,Raj Nagar Extension, ...
      </Text>
      <Text style={{marginLeft: 40, marginBottom: 20}}>
        📍 C-10009, Police line 2,Raj Nagar Extension, ...
      </Text>
      <Text style={{marginLeft: 40, marginBottom: 20}}>
        📍 C-10009, Police line 2,Raj Nagar Extension, ...
      </Text>

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 10,
          width: 350,
          marginLeft: 30,
          borderColor: '#4370F0', // Added border color
          borderWidth: 1.5,
          marginBottom: 10,
          marginTop: 20,
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
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}></View>
    </View>
  );
};

const OTPVerification = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    console.log('Phone number:', phoneNumber);
    navigation.navigate('PinCode');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          textAlign: 'center',
        }}>
        Enter OTP Number
      </Text>

      <View style={{marginBottom: 20}}>
        {/* Your OTP input fields can go here */}
      </View>

      <Text style={{textAlign: 'center', color: '#007bff', marginBottom: 20}}>
        If you didn't receive a code, Resend
      </Text>

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: '#007bff',
          padding: 15,
          borderRadius: 30,
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text style={{color: '#ffffff', fontSize: 16, fontWeight: 'bold'}}>
          Submit
        </Text>
      </TouchableOpacity>

      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Text style={{color: '#888'}}>or</Text>
      </View>

      <View style={{alignItems: 'center', marginBottom: 20}}>
        <Image
          source={require('./assets/fbIcon.png')}
          style={{width: 290, height: 60, marginBottom: 10}}
        />
        <Image
          source={require('./assets/gIcon.png')}
          style={{width: 310, height: 70}}
          resizeMode="contain"
        />
      </View>

      <View style={{alignItems: 'center', marginBottom: 10}}>
        <Text style={{color: '#888'}}>Do you have an account?</Text>
      </View>

      <TouchableOpacity
        onPress={navigateToLogin}
        style={{
          backgroundColor: '#ffffff',
          padding: 15,
          borderRadius: 30,
          borderColor: '#ccc',
          borderWidth: 1,
          alignItems: 'center',
        }}>
        <Text style={{color: '#007bff', fontSize: 16, fontWeight: 'bold'}}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// const OTPVerification = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');

//   // const handlePhoneNumberChange = (text) => {
//   //   setPhoneNumber(text);
//   // };

//   const handleSubmit = () => {
//     // Handle form submission logic here
//     console.log('Phone number:', phoneNumber);
//      navigation.navigate('PinCode');
//       // currentLocation');
//   };

//   const navigateToLogin = () => {
//     navigation.navigate('Login');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title1}>Enter OTP Number</Text>
//       <View style={styles.otpinputcontainer}>

//       </View>
//       <Text style={styles.title2}>If you didn't receive a code,Resend</Text>
//       <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 55,
//     alignItems: 'center',width:355}}>
//         <Text style={styles.buttonText1}>Submit</Text>
//       </TouchableOpacity>
//       {/* <TouchableOpacity onPress={handleSubmit} style={styles.button1}>
//         <Text style={styles.buttonText1}>Submit</Text>
//       </TouchableOpacity> */}
//       <View style={styles.or1}>
//         <Text>or</Text>
//       </View>
//        <View style={{
//     justifyContent: 'center',
//     alignItems: 'center'}}><Image
//         source={require('./assets/fbIcon.png')}
//         style={{width: 290, // Adjust the width as needed
//     height: 60,}}
//       />

//        <View style={{
//     justifyContent: 'center',
//     alignItems: 'center',}}>
//       <Image
//         source={require('./assets/gIcon.png')}
//         style={{ width: 310, // Adjust the width as needed
//     height: 70, }}
//         resizeMode="contain" // Adjust this value based on your requirement
//       />
//     </View>

//       </View>

//       <View style={styles.signup1}>
//         <Text>Do you have an account?</Text>

//       </View>
//          <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: 'white',
//     padding: 10,width:355,
//     borderRadius: 55,
//     alignItems: 'center',
//     marginTop:10,
//      borderColor:'grey',
//     borderWidth:1}}>
//         <Text style={styles.buttonTexts1}>Sign Up</Text>
//       </TouchableOpacity>

//     </View>
//   );
// };

//pickup
const pickup = ({navigation}) => {
  const handlepickup = () => {
    // Handle form submission logic here

    navigation.navigate('token');
  };

  const handleNoPress = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container3}>
      <View
        style={{
          marginTop: 150,
          marginLeft: 25,
          marginRight: 25,
          height: '40%',
          backgroundColor: 'white',
          borderRadius: 15,
          borderColor: 'black', // Added border color
          borderWidth: 0.5,
          shadowColor: '#000', // Shadow color
          shadowOffset: {width: 0, height: 2}, // Shadow offset
          shadowOpacity: 0.25, // Shadow opacity
          shadowRadius: 3.84, // Shadow radius
          elevation: 5, // Elevation for Android
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text style={styles.t1}>Would you like to Pickup Or</Text>
          <Text style={styles.t2}>Drop Your Clothes</Text>

          {/* <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>

         </View> */}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4370F0',
                borderRadius: 45,
                padding: 10,
                borderColor: '#BABABA', // Added border color
                borderWidth: 1,
                marginBottom: 10,
              }}
              // onPress={handleYesPress}
              onPress={handlepickup}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  textAlign: 'center',
                }}>
                Pickup**
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#4370F0',
                borderRadius: 45,
                padding: 10,
                borderColor: '#BABABA', // Added border color
                borderWidth: 1,
              }}
              onPress={handleNoPress}>
              <Text style={{color: 'white', textAlign: 'center', fontSize: 13}}>
                Drop
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{marginTop: 40, marginRight: 150, fontSize: 11}}>
            **Charges of pickup is Rs. 10
          </Text>
        </View>
      </View>

      <View style={{width: 350, marginTop: 200, marginLeft: 30}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            borderColor: '#BABABA', // Added border color
            borderWidth: 1.5, // Added border width
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: '#4370F0',
              fontSize: 18,
            }}>
            Generate Token
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
//pickup
const PhoneVerification = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async () => {
    try {
      navigation.navigate('OTPVerification');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
          textAlign: 'center',
          marginVertical: 20,
        }}>
        Enter Phone Number
      </Text>
      <View style={{marginVertical: 20}}>
        <TextInput
          style={{
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            fontSize: 16,
            backgroundColor: '#fff',
          }}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="+91 55 99 66 33 88"
          keyboardType="phone-pad"
        />
        <Text
          style={{
            fontSize: 15,
            textAlign: 'center',
            color: '#ABABAB',
            marginTop: 20,
          }}>
          Generate OTP
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: '#007bff',
          paddingVertical: 15,
          borderRadius: 10,
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Send
        </Text>
      </TouchableOpacity>
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <Text>or</Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <TouchableOpacity>
          <Image
            source={require('./assets/fbIcon.png')}
            style={{width: 290, height: 60, marginVertical: 10}}
          />
        </TouchableOpacity>
        {/* Uncomment the following section if Google login is enabled */}
        {/* <Pressable onPress={googleLogin}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#4285F4',
            padding: 10,
            borderRadius: 5,
            marginVertical: 10
          }}>
            <Text style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 18,
              marginLeft: 10
            }}>Login with Google</Text>
          </View>
        </Pressable> */}
        <Image
          source={require('./assets/gIcon.png')}
          style={{width: 310, height: 70}}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            color: '#ABABAB',
            fontSize: 16,
          }}>
          Do you have an account?
        </Text>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: '#28a745',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginTop: 10,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const PhoneVerification = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   // useEffect(()=>{
//   //       GoogleSignin.configure({
//   // webClientId: '183045945215-8frl0vqg1etjpi5vmu6plrhfei3fmrfg.apps.googleusercontent.com',
//   //   })
//   //   },[])
// //fun
// //  const googleLogin = async () => {
// //         try {
// //             await GoogleSignin.hasPlayServices();
// //             const userInfo = await GoogleSignin.signIn();
// //             console.log("userinfo", userInfo);

// //         } catch (error) {
// //             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
// //                 console.log(error)
// //             } else if (error.code === statusCodes.IN_PROGRESS) {
// //                 console.log(error)
// //             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
// //                 console.log(error)
// //             } else {
// //             }
// //         }
// //       };
// //fun

//   const handleSubmit =async () => {

//    try {
//     navigation.navigate('OTPVerification');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container1}>
//       <Text style={styles.titlep}>Enter Phone Number</Text>
//       <View style={styles.formGroup1}>

//         <TextInput
//           style={styles.input1}
//           value={phoneNumber}

//           placeholder="+91 55 99 66 33 88"
//           keyboardType="phone-pad"
//         />
//          <Text style={{fontSize:15,textAlign:'center',color:'#ABABAB',marginTop:20}}>Generate OTP</Text>
//       </View>
//       <TouchableOpacity onPress={handleSubmit} style={styles.button1}>
//         <Text style={styles.buttonText1}>Send</Text>
//       </TouchableOpacity>
//       <View style={styles.or1}>
//         <Text>or</Text>
//       </View>
//     <View style={{
//     justifyContent: 'center',
//     alignItems: 'center'}}>

//    <TouchableOpacity >

//       <Image
//         source={require('./assets/fbIcon.png')}
//         style={{width: 290, // Adjust the width as needed
//     height: 60,}}
//       />
//    </TouchableOpacity>

//  </View>
//   {/* <Pressable onPress={googleLogin}>
//               <View style={styles.loginButton}>
//                 <View style={{marginLeft:5}}>
//                     <Text style={{color: '#222222',fontWeight:'400',fontSize:18}}>
//                         Login with Google
//                     </Text>
//                 </View>
//               </View>
//           </Pressable> */}
//        <View style={{
//     justifyContent: 'center',
//     alignItems: 'center',}}>
//       <Image
//         source={require('./assets/gIcon.png')}
//         style={{ width: 310, // Adjust the width as needed
//     height: 70, }}
//         resizeMode="contain" // Adjust this value based on your requirement
//       />
//     </View>

//       <View style={styles.signup1}>
//         <Text style={{color:'#ABABAB',marginTop:20}}>Do you have an account?</Text>

//       </View>
//        <TouchableOpacity onPress={handleSubmit} style={styles.buttons1}>
//         <Text style={styles.buttonTexts1}>Sign in</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// -----------------------------------------------------
// cartScreen
// function cartScreen() {
const cartScreen = ({navigation}) => {
  const navigateToLogin = () => {
    navigation.navigate('cartCheckout');
  };

  return (
    <View style={{}}>
      <Text style={{fontSize: 14, fontWeight: 'bold'}}>Cart</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={require('./assets/cart_img.png')}
          style={{width: 150, height: 150, marginTop: 20, marginLeft: 10}}
        />
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text
            style={{
              color: '#000000',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            {' '}
            LAMERI
          </Text>
          <Text
            style={{
              color: '#555555',
              marginLeft: 20,
              marginBottom: 10,
              fontSize: 13,
            }}>
            {' '}
            Recycle Boucle Knit Cardigan Pink
          </Text>
          <View
            style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
            <Text style={{color: '#000000', fontSize: 18, marginLeft: 20}}>
              -
            </Text>
            <Text style={{color: '#000000', fontSize: 18, marginLeft: 25}}>
              1
            </Text>
            <Text style={{color: '#000000', fontSize: 18, marginLeft: 25}}>
              +
            </Text>
          </View>
          <Text style={{color: '#1DD8E0', fontSize: 18, marginLeft: 20}}>
            ₹120
          </Text>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={require('./assets/cart_img.png')}
          style={{width: 150, height: 150, marginTop: 20, marginLeft: 10}}
        />
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text
            style={{
              color: '#000000',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            {' '}
            LAMERI
          </Text>
          <Text
            style={{
              color: '#555555',
              marginLeft: 20,
              marginBottom: 10,
              fontSize: 13,
            }}>
            {' '}
            Recycle Boucle Knit Cardigan Pink
          </Text>
          <View
            style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
            <Text style={{color: '#000000', fontSize: 18, marginLeft: 20}}>
              -
            </Text>
            <Text style={{color: '#000000', fontSize: 18, marginLeft: 25}}>
              1
            </Text>
            <Text style={{color: '#000000', fontSize: 18, marginLeft: 25}}>
              +
            </Text>
          </View>
          <Text style={{color: '#1DD8E0', fontSize: 18, marginLeft: 20}}>
            ₹120
          </Text>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={require('./assets/cart_img.png')}
          style={{width: 150, height: 150, marginTop: 20, marginLeft: 10}}
        />
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text
            style={{
              color: '#000000',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            {' '}
            LAMERI
          </Text>
          <Text
            style={{
              color: '#555555',
              marginLeft: 20,
              marginBottom: 10,
              fontSize: 13,
            }}>
            {' '}
            Recycle Boucle Knit Cardigan Pink
          </Text>
          <View
            style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
            <Text style={{color: '#000000', fontSize: 18, marginLeft: 20}}>
              -
            </Text>
            <Text style={{color: '#000000', fontSize: 18, marginLeft: 25}}>
              1
            </Text>
            <Text style={{color: '#000000', fontSize: 18, marginLeft: 25}}>
              +
            </Text>
          </View>
          <Text style={{color: '#1DD8E0', fontSize: 18, marginLeft: 20}}>
            ₹120
          </Text>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 30,
            color: '#333333',
            marginLeft: 20,
          }}>
          SUB TOTAL
        </Text>

        <Text
          style={{
            fontSize: 18,
            marginBottom: 30,
            color: '#1DD8E0',
            marginLeft: 160,
          }}>
          ₹ 2,976
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          marginBottom: 10,
          marginLeft: 20,
          color: '#888888',
        }}>
        *shipping charges, taxes and discount codes
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginBottom: 10,
          marginLeft: 20,
          color: '#888888',
        }}>
        are calculated at the time of accounting.
      </Text>

      <TouchableOpacity
        onPress={navigateToLogin}
        style={{
          backgroundColor: '#1FD3E0',
          borderRadius: 5,
          padding: 10,
          width: 360,
          marginLeft: 20,
          height: 50,
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
            marginTop: 5,
          }}>
          PROCEED TO CHECKOUT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// --------------------------------------------------
// cartOrderConfirm
const cartOrderConfirm = ({navigation}) => {
  const navigateToMyOrders = () => {
    navigation.navigate('MyOrders');
  };

  return (
    <View style={{}}>
      <Text style={{fontSize: 14, fontWeight: 'bold'}}>Order Confirmation</Text>
      {/* <View style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',}}> */}
      <View
        style={{
          width: 80,
          height: 80,
          marginLeft: 150,
          marginTop: 20,
          borderRadius: 50, // half of the width/height to make it a circle
          backgroundColor: '#4176EF',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            marginTop: 15,
            fontSize: 30,
          }}>
          ✔
        </Text>
      </View>

      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 10,
        }}>
        Order Placed Successfully
      </Text>

      <View
        style={{
          height: 0.5,
          backgroundColor: 'gray',
          width: '100%',
          marginTop: 40,
        }}
      />
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={require('./assets/cart_img.png')}
          style={{width: 100, height: 100, marginTop: 20, marginLeft: 10}}
        />
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text
            style={{
              color: '#000000',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            {' '}
            LAMERI
          </Text>

          <Text
            style={{
              color: '#555555',
              marginLeft: 20,
              marginBottom: 10,
              fontSize: 13,
            }}>
            {' '}
            Recycle Boucle Knit Cardigan
          </Text>
          <Text
            style={{
              color: '#555555',
              marginLeft: 20,
              marginBottom: 10,
              fontSize: 13,
            }}>
            {' '}
            Pink
          </Text>
        </View>
        <Text
          style={{
            fontSize: 14,
            marginBottom: 0,
            color: '#1DD8E0',
            marginTop: 10,
          }}>
          ₹ 2,400
        </Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={require('./assets/cart_img.png')}
          style={{width: 100, height: 100, marginTop: 20, marginLeft: 10}}
        />
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text
            style={{
              color: '#000000',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            {' '}
            LAMERI
          </Text>
          <Text
            style={{
              color: '#555555',
              marginLeft: 20,
              marginBottom: 10,
              fontSize: 13,
            }}>
            {' '}
            Recycle Boucle Knit Cardigan
          </Text>
          <Text
            style={{
              color: '#555555',
              marginLeft: 20,
              marginBottom: 10,
              fontSize: 13,
            }}>
            {' '}
            Pink
          </Text>
        </View>
        <Text
          style={{
            fontSize: 14,
            marginBottom: 0,
            color: '#1DD8E0',
            marginTop: 10,
          }}>
          ₹ 2,400
        </Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={require('./assets/cart_img.png')}
          style={{width: 100, height: 100, marginTop: 20, marginLeft: 10}}
        />
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text
            style={{
              color: '#000000',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            {' '}
            LAMERI
          </Text>

          <Text
            style={{
              color: '#555555',
              marginLeft: 20,
              marginBottom: 10,
              fontSize: 13,
            }}>
            {' '}
            Recycle Boucle Knit Cardigan
          </Text>
          <Text
            style={{
              color: '#555555',
              marginLeft: 20,
              marginBottom: 10,
              fontSize: 13,
            }}>
            {' '}
            Pink
          </Text>
        </View>
        <Text
          style={{
            fontSize: 14,
            marginBottom: 0,
            color: '#1DD8E0',
            marginTop: 10,
          }}>
          ₹ 2,400
        </Text>
      </View>

      <View
        style={{
          height: 0.5,
          backgroundColor: 'gray',
          width: '100%',
          marginTop: 40,
        }}
      />
      <View style={{display: 'flex', flexDirection: 'row', marginTop: 40}}>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#333333',
            marginLeft: 20,
          }}>
          SUB TOTAL
        </Text>

        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#1DD8E0',
            marginLeft: 160,
          }}>
          ₹ 2,400
        </Text>
      </View>
      <TouchableOpacity
        onPress={navigateToMyOrders}
        style={{
          backgroundColor: '#1FD3E0',
          borderRadius: 5,
          padding: 10,
          width: 360,
          marginLeft: 20,
          height: 50,
          borderColor: '#BABABA', // Added border color
          borderWidth: 2,
          marginBottom: 10,
          marginTop: 10,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 11,
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 5,
          }}>
          Track Order
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const MyOrders1 = ({navigation}) => {
  const navigateToMyOrders = () => {
    // navigation.navigate('MyOrders');
  };

  return (
    <ScrollView style={{flex: 1, marginBottom: 20}}>
      <Text style={{fontSize: 17, fontWeight: 'bold'}}>Order Summary</Text>
      <Text style={{fontSize: 12, fontWeight: 'bold', marginLeft: 20}}>
        Arriving at 1:31 pm
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: '#00A900',
          marginBottom: 20,
          marginLeft: 20,
        }}>
        Download Invoice
      </Text>
      <Text style={{fontSize: 17, fontWeight: 'bold'}}>
        3 items in this order
      </Text>

      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={require('./assets/cart_img.png')}
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
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={require('./assets/cart_img.png')}
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

      <View
        style={{
          height: 1,
          backgroundColor: 'grey',
          width: '100%',
          marginTop: 10,
        }}
      />
      <Text style={{fontSize: 17, fontWeight: 'bold'}}>Bill details</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={{fontSize: 13, marginTop: 20, marginLeft: 16}}>MRP</Text>
        <Text style={{marginTop: 20, marginLeft: 280}}>₹ 1063</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            marginTop: 20,
            marginLeft: 16,
            color: '#00A900',
          }}>
          Product discount
        </Text>
        <Text style={{marginTop: 20, marginLeft: 200}}>₹ 103</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={{fontSize: 13, marginTop: 20, marginLeft: 16}}>
          Item total
        </Text>
        <Text style={{marginTop: 20, marginLeft: 245}}>₹ 143</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={{fontSize: 13, marginTop: 20, marginLeft: 16}}>
          Handling charge
        </Text>
        <Text style={{marginTop: 20, marginLeft: 200}}>₹ 4</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={{fontSize: 13, marginTop: 20, marginLeft: 16}}>
          Delivery charge
        </Text>
        <Text style={{marginTop: 20, marginLeft: 210}}>₹ 30</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={{fontSize: 13, marginTop: 20, marginLeft: 16}}>
          Feeding India donation
        </Text>
        <Text style={{marginTop: 20, marginLeft: 160}}>₹ 1</Text>
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
        <Text style={{marginTop: 20, marginLeft: 250}}>₹ 1344</Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: 'grey',
          width: '100%',
          marginTop: 10,
          marginBottom: 20,
        }}
      />
      <Text style={{fontSize: 17, fontWeight: 'bold'}}>Order details</Text>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 16,
          }}>
          order id
        </Text>
        <Text style={{marginTop: 10, marginLeft: 20, fontWeight: 'bold'}}>
          0RD04823698
        </Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text style={{fontSize: 13, marginTop: 20, marginLeft: 16}}>
          Payment
        </Text>
        <Text style={{marginTop: 10, marginLeft: 20}}>Paid online</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text style={{fontSize: 13, marginTop: 20, marginLeft: 16}}>
          Deliver to
        </Text>
        <Text style={{marginTop: 10, marginLeft: 20}}>
          Tower c, C-5986,Floor 13, Police line 2
        </Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text style={{fontSize: 13, marginTop: 20, marginLeft: 16}}>
          Order placed
        </Text>
        <Text style={{marginTop: 10, marginLeft: 20, fontWeight: 'bold'}}>
          placed on sun,26 May’24, 1:15 PM
        </Text>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: 'grey',
          width: '100%',
          marginTop: 10,
          marginBottom: 20,
        }}
      />
      <View style={{width: 50, height: 100, marginLeft: 30, marginTop: 30}}>
        <Image
          source={require('./assets/profile_icon.png')}
          resizeMode="contain"
          style={{flex: 1, right: 140}}
        />
      </View>

      <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20}}>
        Need help with your order?
      </Text>
      <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 50}}>
        Chat with us
      </Text>
      <Text style={{fontSize: 12, marginLeft: 50}}>
        About any issues related to your order
      </Text>
    </ScrollView>
  );
};
// FAQ1
const FAQ1 = ({navigation}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: '#f2f2f2',
      }}>
      <TouchableOpacity
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
      </TouchableOpacity>

      {[...Array(6)].map((_, index) => (
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
            What Group questions by categories like Orders,
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
  );
};
// const FAQ1 = ({ navigation }) => {
//  return(
//   <ScrollView >
//   <TouchableOpacity  style={{backgroundColor: '#1DD8E0', borderRadius: 5,padding:0,marginLeft:0,height:'20%',width:'100%',
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:0}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'white',fontSize:11,fontWeight:'bold',marginTop:25,marginLeft:30,fontSize:23}}>FAQs</Text>

//         </View>
//          <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,width:'80%',height:40,marginLeft:50,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:5}}>

//         <Text style={{color:'#8A8A8A',fontSize:12,marginTop:9,marginLeft:30}}>Looking for something specific? </Text>
//     </TouchableOpacity>
//            {/* <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text> */}

//       </TouchableOpacity>
//  <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:70,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}></Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}>What Group questions by categories like Orders,  </Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>Payments, Shipping, Returns, etc.</Text>
//            {/* <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text> */}

//       </TouchableOpacity>
//   <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:70,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}></Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}>What Group questions by categories like Orders,  </Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>Payments, Shipping, Returns, etc.</Text>
//            {/* <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text> */}

//       </TouchableOpacity>

//      <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:70,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}></Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}>What Group questions by categories like Orders,  </Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>Payments, Shipping, Returns, etc.</Text>
//            {/* <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text> */}

//       </TouchableOpacity>
//  <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:70,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}></Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}>What Group questions by categories like Orders,  </Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>Payments, Shipping, Returns, etc.</Text>
//            {/* <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text> */}

//       </TouchableOpacity>
//    <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:70,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}></Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}>What Group questions by categories like Orders,  </Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>Payments, Shipping, Returns, etc.</Text>
//            {/* <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text> */}

//       </TouchableOpacity>
//       <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:70,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}></Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}>What Group questions by categories like Orders,  </Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>Payments, Shipping, Returns, etc.</Text>
//            {/* <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text> */}

//       </TouchableOpacity>

//   </ScrollView>
//  );
// }
const PrivacyPolicyy = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#f9f9f9', padding: 20}}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 20,
        }}>
        Privacy Policy
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 15,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#333',
              marginRight: 10,
            }}>
            Introduction:
          </Text>
          <Text style={{fontSize: 14, color: '#333'}}>
            Overview of the company's
          </Text>
        </View>
        <Text style={{fontSize: 14, color: '#666', marginLeft: 20}}>
          commitment to privacy.
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#004CFF',
            textAlign: 'right',
            marginTop: 10,
          }}>
          Learn More
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 15,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#333',
              marginRight: 10,
            }}>
            Data Collection:
          </Text>
          <Text style={{fontSize: 14, color: '#333'}}>
            Detailed information on what data
          </Text>
        </View>
        <Text style={{fontSize: 14, color: '#666', marginLeft: 20}}>
          is collected and how it is used
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 15,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#333',
              marginRight: 10,
            }}>
            User Rights:
          </Text>
          <Text style={{fontSize: 14, color: '#333'}}>
            Explanation of users' rights regarding
          </Text>
        </View>
        <Text style={{fontSize: 14, color: '#666', marginLeft: 20}}>
          their data.
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#004CFF',
            textAlign: 'right',
            marginTop: 10,
          }}>
          Learn More
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 15,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#333',
              marginRight: 10,
            }}>
            Data Sharing:
          </Text>
          <Text style={{fontSize: 14, color: '#333'}}>
            Information on with whom and why
          </Text>
        </View>
        <Text style={{fontSize: 14, color: '#666', marginLeft: 20}}>
          data may be shared.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 15,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#333',
              marginRight: 10,
            }}>
            Security Measures
          </Text>
          <Text style={{fontSize: 14, color: '#333'}}>
            Description of how data is
          </Text>
        </View>
        <Text style={{fontSize: 14, color: '#666', marginLeft: 20}}>
          protected.
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#004CFF',
            textAlign: 'right',
            marginTop: 10,
          }}>
          Learn More
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// const PrivacyPolicyy = ({ navigation }) => {
//  return(
//   <View>
//     <Text style={{fontSize:24,fontWeight:'bold',marginLeft:20,marginTop:40}}>Privacy Policy</Text>
//  <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:100,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}>Introduction:</Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}> Overview of the company's </Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>commitment to privacy.</Text>
//            <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text>

//       </TouchableOpacity>
//     <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:100,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}>Data Collection:</Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}> Detailed information on what data</Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>is collected and how it is used</Text>
//            {/* <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text> */}

//       </TouchableOpacity>

//         <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:100,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}>User Rights:</Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}>Explanation of users' rights regarding</Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>their data.</Text>
//            <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text>

//       </TouchableOpacity>
//            <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:100,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}>Data Sharing:</Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}> Information on with whom and why </Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>data may be shared.</Text>
//            {/* <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text> */}

//       </TouchableOpacity>
//         <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:100,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}>Security Measures</Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}> Description of how data is </Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>protected.</Text>
//            <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text>

//       </TouchableOpacity>

//   </View>
//  );
// }
const BuyBackPolicies = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5', padding: 20}}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: '#333',
        }}>
        Buy Back Policy
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#FFF',
          borderRadius: 8,
          padding: 15,
          marginBottom: 15,
          elevation: 2,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: {width: 0, height: 5},
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              fontWeight: 'bold',
              marginRight: 5,
            }}>
            Introduction:
          </Text>
          <Text style={{color: '#000', fontSize: 13}}>
            {' '}
            Overview of the company's{' '}
          </Text>
        </View>
        <Text style={{color: '#000', fontSize: 13, marginTop: 5}}>
          commitment to privacy.
        </Text>
        <Text
          style={{
            color: '#004CFF',
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 10,
            textAlign: 'right',
          }}>
          Learn More
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#FFF',
          borderRadius: 8,
          padding: 15,
          marginBottom: 15,
          elevation: 2,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: {width: 0, height: 5},
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              fontWeight: 'bold',
              marginRight: 5,
            }}>
            Data Collection:
          </Text>
          <Text style={{color: '#000', fontSize: 13}}>
            {' '}
            Detailed information on what data
          </Text>
        </View>
        <Text style={{color: '#000', fontSize: 13, marginTop: 5}}>
          is collected and how it is used
        </Text>
        {/* <Text style={{ color: '#004CFF', fontSize: 13, fontWeight: 'bold', marginTop: 10, textAlign: 'right' }}>Learn More</Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#FFF',
          borderRadius: 8,
          padding: 15,
          marginBottom: 15,
          elevation: 2,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: {width: 0, height: 5},
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              fontWeight: 'bold',
              marginRight: 5,
            }}>
            User Rights:
          </Text>
          <Text style={{color: '#000', fontSize: 13}}>
            Explanation of users' rights regarding
          </Text>
        </View>
        <Text style={{color: '#000', fontSize: 13, marginTop: 5}}>
          their data.
        </Text>
        <Text
          style={{
            color: '#004CFF',
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 10,
            textAlign: 'right',
          }}>
          Learn More
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#FFF',
          borderRadius: 8,
          padding: 15,
          marginBottom: 15,
          elevation: 2,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: {width: 0, height: 5},
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              fontWeight: 'bold',
              marginRight: 5,
            }}>
            Data Sharing:
          </Text>
          <Text style={{color: '#000', fontSize: 13}}>
            {' '}
            Information on with whom and why{' '}
          </Text>
        </View>
        <Text style={{color: '#000', fontSize: 13, marginTop: 5}}>
          data may be shared.
        </Text>
        {/* <Text style={{ color: '#004CFF', fontSize: 13, fontWeight: 'bold', marginTop: 10, textAlign: 'right' }}>Learn More</Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#FFF',
          borderRadius: 8,
          padding: 15,
          marginBottom: 15,
          elevation: 2,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: {width: 0, height: 5},
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              fontWeight: 'bold',
              marginRight: 5,
            }}>
            Data Collection:
          </Text>
          <Text style={{color: '#000', fontSize: 13}}>
            {' '}
            Detailed information on what data
          </Text>
        </View>
        <Text style={{color: '#000', fontSize: 13, marginTop: 5}}>
          is collected and how it is used
        </Text>
        <Text
          style={{
            color: '#004CFF',
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 10,
            textAlign: 'right',
          }}>
          Learn More
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// const BuyBackPolicies = ({ navigation }) => {
//  return(
//   <View>
//     <Text style={{fontSize:24,fontWeight:'bold',marginLeft:20,marginTop:40}}>Buy Back Policy</Text>
//  <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:100,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}>Introduction:</Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}> Overview of the company's </Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>commitment to privacy.</Text>
//            <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text>

//       </TouchableOpacity>
//     <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:100,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}>Data Collection:</Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}> Detailed information on what data</Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>is collected and how it is used</Text>
//            {/* <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text> */}

//       </TouchableOpacity>

//         <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:100,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}>User Rights:</Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}>Explanation of users' rights regarding</Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>their data.</Text>
//            <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text>

//       </TouchableOpacity>
//            <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:100,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}>Data Sharing:</Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}> Information on with whom and why </Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>data may be shared.</Text>
//            {/* <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text> */}

//       </TouchableOpacity>
//         <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:100,
//     borderColor: '#000000', // Added border color
//     borderWidth: 0.5,marginBottom:10,marginTop:20}}>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}>Data Collection:</Text>
//       <Text style={{color:'#000000',fontSize:11,marginTop:5}}> Detailed information on what data</Text>
//         </View>
//         <Text style={{color:'#000000',fontSize:11,marginTop:5,marginLeft:30}}>is collected and how it is used</Text>
//            <Text style={{color:'#004CFF',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:250}}>Learn More</Text>

//       </TouchableOpacity>

//   </View>
//  );
// }

const TokenPolicies = ({navigation}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginLeft: 20,
          marginTop: 40,
        }}>
        Token Policies
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 5,
          padding: 10,
          width: 360,
          marginLeft: 20,
          height: 100,
          borderColor: '#000000', // Added border color
          borderWidth: 0.5,
          marginBottom: 10,
          marginTop: 20,
        }}>
        <Text
          style={{
            color: '#000000',
            fontSize: 11,
            fontWeight: 'bold',
            marginTop: 5,
            marginLeft: 30,
          }}>
          Detailed policies regarding token expiration,
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 11,
            fontWeight: 'bold',
            marginTop: 5,
            marginLeft: 30,
          }}>
          usage, and earning methods.
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const LetUsKnow = ({navigation}) => {
  const handleSubmit = () => {
    // Handle form submission logic here

    navigation.navigate('wardrobe');
    //  navigation.navigate('pickup');
    //  wardrobe
  };

  const handleNoPress = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container3}>
      <View style={styles.container3}>
        <ImageBackground
          source={require('./assets/LetUs.png')}
          style={styles.backgroundImage}>
          <View style={styles.overlay}></View>
        </ImageBackground>
      </View>
      <View
        style={{
          position: 'absolute',
          borderColor: 'black',
          borderWidth: 1,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          bottom: 0,
          height: '75%',
          width: '100%',
          backgroundColor: 'white',
          shadowColor: '#000000', // Shadow color
          shadowOffset: {width: 0, height: 2}, // Shadow offset
          shadowOpacity: 0.25, // Shadow opacity
          shadowRadius: 3.84, // Shadow radius
          elevation: 5,
        }}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <FontAwesomeIcon icon="fa-thin fa-xmark" />
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 60,
                marginLeft: 20,
              }}>
              Let us Know that it’s you
            </Text>
            <Text
              style={{
                color: '#FB0B53',
                fontSize: 11,
                fontWeight: 'bold',
                marginLeft: 200,
                marginTop: 30,
              }}>
              More Option
            </Text>
          </View>

          <Text style={{fontSize: 13, marginLeft: 20}}>
            For your security, please enter your{' '}
          </Text>
          <Text style={{fontSize: 13, marginLeft: 20, marginBottom: 30}}>
            password{' '}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 15,
              padding: 10,
              width: '80%',
              marginLeft: 40,
              borderColor: '#BABABA', // Added border color
              borderWidth: 1,
              marginBottom: 10,
              marginTop: 20,
              height: 80,
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={{width: 50, height: 60}}>
                <Image
                  source={require('./assets/profile_icon.png')}
                  resizeMode="contain"
                  style={{flex: 1, right: 140}}
                />
              </View>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: 40,
                  marginTop: 20,
                }}>
                John smith
              </Text>
            </View>
          </TouchableOpacity>
          {/* <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>

         </View> */}
          {/* <Text style={{fontSize:11,marginLeft:20,marginTop:20}}>GPay UPI</Text> */}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: '#3A86EC',
                borderRadius: 15,
                padding: 10,
                width: 350,
                marginLeft: 10,
                borderColor: '#BABABA', // Added border color
                borderWidth: 1,
                marginBottom: 10,
                marginTop: 30,
                height: 50,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 11,
                  marginTop: 5,
                }}>
                CONTINUE{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const PaymentMethodBlur = ({navigation}) => {
  const handleSubmit = () => {
    // Handle form submission logic here

    navigation.navigate('wardrobe');
    //  navigation.navigate('pickup');
    //  wardrobe
  };

  const handleNoPress = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container3}>
      <View style={styles.container3}>
        <ImageBackground
          source={require('./assets/payBlur.png')}
          style={styles.backgroundImage}>
          <View style={styles.overlay}></View>
        </ImageBackground>
      </View>
      <View
        style={{
          position: 'absolute',
          borderColor: 'black',
          borderWidth: 1,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          bottom: 0,
          height: '25%',
          width: '100%',
          backgroundColor: 'white',
          shadowColor: '#000000', // Shadow color
          shadowOffset: {width: 0, height: 2}, // Shadow offset
          shadowOpacity: 0.25, // Shadow opacity
          shadowRadius: 3.84, // Shadow radius
          elevation: 5,
        }}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginTop: 20,
                marginLeft: 20,
              }}>
              Pay ₹ 1344
            </Text>
            <Text
              style={{
                color: '#FB0B53',
                fontSize: 11,
                fontWeight: 'bold',
                marginLeft: 200,
                marginTop: 30,
              }}>
              More Option
            </Text>
          </View>

          <Text style={{fontSize: 11, marginLeft: 20}}>
            Last Used Payment Option
          </Text>
          {/* <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>

         </View> */}
          <Text style={{fontSize: 11, marginLeft: 20, marginTop: 20}}>
            GPay UPI
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: '#3A86EC',
                borderRadius: 15,
                padding: 10,
                width: 350,
                marginLeft: 10,
                borderColor: '#BABABA', // Added border color
                borderWidth: 1,
                marginBottom: 10,
                marginTop: 30,
                height: 50,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 11,
                  marginTop: 5,
                }}>
                CONTINUE PAYMENT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const PaymentMethod = ({navigation}) => {
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
          source={require('./assets/cart_img.png')}
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
          source={require('./assets/cart_img.png')}
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
          order id
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
const Settings = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#F7F7F7', padding: 20}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
        Profile Settings
      </Text>

      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30}}>
        <Image
          source={require('./assets/profile_icon.png')}
          resizeMode="contain"
          style={{
            width: 80,
            height: 80,
            marginRight: 20,
            borderRadius: 40,
            borderColor: '#BABABA',
            borderWidth: 1,
          }}
        />

        <View style={{flexDirection: 'column', flex: 1}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#1DD8E0',
              borderRadius: 15,
              paddingVertical: 10,
              marginBottom: 10,
              borderColor: '#BABABA',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 14, fontWeight: 'bold'}}>
              Change Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 15,
              paddingVertical: 10,
              borderColor: '#BABABA',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold'}}>
              Delete Photo
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderInputField('First Name')}
      {renderInputField('Last Name')}
      {renderInputField('Email Address')}
      {renderInputField('Phone No.')}

      <Text style={{color: '#000000', fontSize: 14, marginBottom: 10}}>
        Address
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 15,
          paddingVertical: 10,
          borderColor: '#BABABA',
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{color: '#000000', fontSize: 14, fontWeight: 'bold'}}></Text>
      </TouchableOpacity>
    </View>
  );
};

const renderInputField = label => (
  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
    <Text style={{color: '#000000', fontSize: 14, flex: 1}}>{label}</Text>
    <TouchableOpacity
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        paddingVertical: 10,
        flex: 1,
        marginLeft: 20,
        borderColor: '#BABABA',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold'}}></Text>
    </TouchableOpacity>
  </View>
);
// const Settings = ({ navigation }) => {
//  return(
//   <View>
//     <Text style={{fontSize:20,fontWeight:'bold',marginLeft:20,marginTop:30}}>Profile Setting</Text>
// <View style={{display:'flex',flexDirection:'row'}}>
//   <View style={{ width: 50, height: 100 ,marginLeft:30,marginTop:30}}>
//   <Image
//     source={require('./assets/profile_icon.png')}
//     resizeMode="contain"
//     style={{ flex: 1,right:140 }}
//   />
// </View>
// <View style={{display:'flex',flexDirection:'column'}}>
//  <TouchableOpacity style={{backgroundColor: '#1DD8E0', borderRadius: 15,padding:10,width:'50%',marginLeft:135,
//     borderColor: '#BABABA', // Added border color
//     borderWidth: 1,marginBottom:10,marginTop:60,height:50}}>
//         <Text style={{color:'white',fontSize:12,fontWeight:'bold',textAlign:'center'}}>Change photo</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 15,padding:10,width:'50%',marginLeft:140,
//     borderColor: '#BABABA', // Added border color
//     borderWidth: 1,marginBottom:10,marginTop:0,height:50}}>
//         <Text style={{color:'#000000',fontSize:14,fontWeight:'bold',textAlign:'center'}}>Delete photo</Text>
//       </TouchableOpacity>
// </View>
// </View>

//   <View style={{display:'flex',flexDirection:'row'}}><Text style={{color:'#000000',fontSize:14,marginLeft:20}}>First name</Text>
//   <Text style={{color:'#000000',fontSize:14,marginLeft:110}}>Last name</Text>
//   </View>

//    <View style={{display:'flex',flexDirection:'row'}}>

//    <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 15,padding:10,width:'40%',marginLeft:20,
//     borderColor: '#BABABA', // Added border color
//     borderWidth: 1,marginBottom:10,marginTop:0,height:50}}>
//         <Text style={{color:'#000000',fontSize:14,fontWeight:'bold'}}></Text>
//       </TouchableOpacity>
//        <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 15,padding:10,width:'40%',marginLeft:20,
//     borderColor: '#BABABA', // Added border color
//     borderWidth: 1,marginBottom:10,marginTop:0,height:50}}>
//         <Text style={{color:'#000000',fontSize:14,fontWeight:'bold'}}></Text>
//       </TouchableOpacity>
//   </View>
//    <View style={{display:'flex',flexDirection:'row'}}><Text style={{color:'#000000',fontSize:14,marginLeft:20}}>Email address</Text>
//   <Text style={{color:'#000000',fontSize:14,marginLeft:90}}>Phone no.</Text>
//   </View>
//    <View style={{display:'flex',flexDirection:'row'}}>

//    <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 15,padding:10,width:'40%',marginLeft:20,
//     borderColor: '#BABABA', // Added border color
//     borderWidth: 1,marginBottom:10,marginTop:0,height:50}}>
//         <Text style={{color:'#000000',fontSize:14,fontWeight:'bold'}}></Text>
//       </TouchableOpacity>
//        <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 15,padding:10,width:'40%',marginLeft:20,
//     borderColor: '#BABABA', // Added border color
//     borderWidth: 1,marginBottom:10,marginTop:0,height:50}}>
//         <Text style={{color:'#000000',fontSize:14,fontWeight:'bold'}}></Text>
//       </TouchableOpacity>
//   </View>

//     <Text style={{fontSize:14,color:'#000000',marginLeft:20}}>Address</Text>
//     <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 15,padding:10,width:'80%',marginLeft:20,
//     borderColor: '#BABABA', // Added border color
//     borderWidth: 1,marginBottom:10,marginTop:0,height:50}}>
//         <Text style={{color:'#000000',fontSize:14,fontWeight:'bold'}}></Text>
//       </TouchableOpacity>
//   </View>
//  );
// }
// const TokenTransaction = ({ navigation }) => {
//  return(
//   <View>
//   <Text style={{fontSize:18,fontWeight:'bold'}}>Token Transaction</Text>
//           <View style={{
//      borderColor: 'black',
//      borderWidth: 1, borderRadius: 15,
//     width:'90%',
//     left:20,marginTop:40,
//     height: 200,
//     backgroundColor: 'white',
//        shadowColor: '#000000', // Shadow color
//     shadowOffset: { width: 0, height: 2 }, // Shadow offset
//     shadowOpacity: 0.25, // Shadow opacity
//     shadowRadius: 3.84, // Shadow radius
//     elevation: 5}} >
//     <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 15,padding:10,width:270,marginLeft:20,
//     borderColor: '#BABABA', // Added border color
//     borderWidth: 1,marginBottom:0,marginTop:20,height:50}}>
//         <Text style={{color:'#000000',fontSize:16,textAlign:'center'}}>BW11OHP01</Text>
//       </TouchableOpacity>

//         <Text style={{marginTop:20,marginLeft:20,fontSize:11}}>Lorem ipsum dolor sit amet consectetur. Elit pellentesque  </Text>
//         <Text style={{marginTop:0,marginLeft:20,fontSize:11}}>aliquam habitant venenatis. Mauris massa risus maecenas</Text>
//          <Text style={{marginTop:0,marginLeft:20,fontSize:11}}>mauris tortor sed lacinia nunc.</Text>
//          <Text style={{marginTop:0,marginLeft:20,fontSize:13}}>Rajnagar, extension, near shiv mandir kwdc. </Text>
//          <Text style={{marginTop:0,marginLeft:20,fontSize:13,color:'#004CFF'}}>Today, 11, May,2024 </Text>

//     </View>
//          <View style={{
//      borderColor: 'black',
//      borderWidth: 1, borderRadius: 15,
//     width:'90%',
//     left:20,marginTop:40,
//     height: 200,
//     backgroundColor: 'white',
//        shadowColor: '#000000', // Shadow color
//     shadowOffset: { width: 0, height: 2 }, // Shadow offset
//     shadowOpacity: 0.25, // Shadow opacity
//     shadowRadius: 3.84, // Shadow radius
//     elevation: 5}} >
//     <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 15,padding:10,width:270,marginLeft:20,
//     borderColor: '#BABABA', // Added border color
//     borderWidth: 1,marginBottom:0,marginTop:20,height:50}}>
//         <Text style={{color:'#000000',fontSize:16,textAlign:'center'}}>BW11OHP01</Text>
//       </TouchableOpacity>

//         <Text style={{marginTop:20,marginLeft:20,fontSize:11}}>Lorem ipsum dolor sit amet consectetur. Elit pellentesque  </Text>
//         <Text style={{marginTop:0,marginLeft:20,fontSize:11}}>aliquam habitant venenatis. Mauris massa risus maecenas</Text>
//          <Text style={{marginTop:0,marginLeft:20,fontSize:11}}>mauris tortor sed lacinia nunc.</Text>
//          <Text style={{marginTop:0,marginLeft:20,fontSize:13}}>Rajnagar, extension, near shiv mandir kwdc. </Text>
//          <Text style={{marginTop:0,marginLeft:20,fontSize:13,color:'#004CFF'}}>Today, 11, May,2024 </Text>

//     </View>
//           <View style={{
//      borderColor: 'black',
//      borderWidth: 1, borderRadius: 15,
//     width:'90%',
//     left:20,marginTop:40,
//     height: 200,
//     backgroundColor: 'white',
//        shadowColor: '#000000', // Shadow color
//     shadowOffset: { width: 0, height: 2 }, // Shadow offset
//     shadowOpacity: 0.25, // Shadow opacity
//     shadowRadius: 3.84, // Shadow radius
//     elevation: 5}} >
//     <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 15,padding:10,width:270,marginLeft:20,
//     borderColor: '#BABABA', // Added border color
//     borderWidth: 1,marginBottom:0,marginTop:20,height:50}}>
//         <Text style={{color:'#000000',fontSize:16,textAlign:'center'}}>BW11OHP01</Text>
//       </TouchableOpacity>

//         <Text style={{marginTop:20,marginLeft:20,fontSize:11}}>Lorem ipsum dolor sit amet consectetur. Elit pellentesque  </Text>
//         <Text style={{marginTop:0,marginLeft:20,fontSize:11}}>aliquam habitant venenatis. Mauris massa risus maecenas</Text>
//          <Text style={{marginTop:0,marginLeft:20,fontSize:11}}>mauris tortor sed lacinia nunc.</Text>
//          <Text style={{marginTop:0,marginLeft:20,fontSize:13}}>Rajnagar, extension, near shiv mandir kwdc. </Text>
//          <Text style={{marginTop:0,marginLeft:20,fontSize:13,color:'#004CFF'}}>Today, 11, May,2024 </Text>

//     </View>
//   </View>
//  );
// }
const TokenTransaction = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        padding: 20,
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: '#333',
        }}>
        Token Transaction
      </Text>

      {[...Array(3)].map((_, index) => (
        <View
          key={index}
          style={{
            borderColor: '#ddd',
            borderWidth: 1,
            borderRadius: 15,
            width: '90%',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginBottom: 20,
            padding: 15,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 15,
              padding: 10,
              borderColor: '#BABABA',
              borderWidth: 1,
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
              }}>
              BW11OHP01
            </Text>
          </TouchableOpacity>

          <View style={{marginTop: 10}}>
            <Text
              style={{
                fontSize: 12,
                color: '#666',
                marginBottom: 5,
              }}>
              Lorem ipsum dolor sit amet consectetur. Elit pellentesque aliquam
              habitant venenatis.
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#666',
                marginBottom: 5,
              }}>
              Mauris massa risus maecenas mauris tortor sed lacinia nunc.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#333',
                marginBottom: 5,
              }}>
              Rajnagar, extension, near shiv mandir kwdc.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#004CFF',
              }}>
              Today, 11, May, 2024
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
const EnableTwoFactorAuthenticationLogin = ({navigation}) => {
  return (
    <View style={{marginTop: 180}}>
      <Image
        source={require('./assets/BWORTH.jpeg')}
        style={{
          width: 300,
          height: 100,
          marginBottom: 0,
          marginLeft: 60,
          marginRight: 8, // Add right margin
        }}
      />
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={{}}>
          <Image
            source={require('./assets/icon_image_john_smith_before.png')}
            style={{
              width: 100,
              height: 100,
              marginBottom: 0,
              marginTop: 30,
              marginLeft: 60,
              marginRight: 8, // Add right margin
            }}
          />
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            marginLeft: 0,
            marginTop: 70,
          }}>
          John smith
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 10,
          width: '80%',
          marginLeft: 40,
          borderColor: '#BABABA', // Added border color
          borderWidth: 1,
          marginBottom: 10,
          marginTop: 20,
          height: 50,
        }}>
        <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold'}}>
          Password
        </Text>
      </TouchableOpacity>
      <Text style={{marginLeft: 200, fontSize: 11, color: '#004CFF'}}>
        Forgotten your password?
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#004CFF',
          borderRadius: 15,
          padding: 0,
          width: '80%',
          marginLeft: 40,
          marginTop: 40,
          height: 50,
          borderColor: '#BABABA', // Added border color
          borderWidth: 1,
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Login
        </Text>
      </TouchableOpacity>

      <Text style={{fontSize: 11, marginLeft: 80}}>
        If you signed up with Facebook,you’ll need to
      </Text>
      <Text style={{fontSize: 11, marginLeft: 100}}>
        create a password and log back in.
      </Text>
    </View>
  );
};
const EnableTwoFactorAuthentication = ({navigation}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 18,
          marginTop: 30,
        }}>
        Enable two-factor authentication
      </Text>

      <Text style={{marginLeft: 20, fontSize: 12}}>
        Two-factor authentication protects your account by{' '}
      </Text>
      <Text style={{marginLeft: 20, fontSize: 12}}>
        requiring an additional code when you log in on a device{' '}
      </Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={{marginLeft: 20, fontSize: 12}}>
          that we don't recognise.
        </Text>
        <Text style={{color: '#004CFF', fontSize: 12, fontWeight: 'bold'}}>
          {' '}
          Learn more
        </Text>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 18,
          marginTop: 40,
        }}>
        Choose your security method
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 10,
          width: 350,
          marginLeft: 20,
          width: '87%',
          borderColor: '#BABABA', // Added border color
          borderWidth: 1,
          marginBottom: 10,
          marginTop: 30,
          height: 250,
        }}>
        <Text
          style={{
            marginLeft: 20,
            marginTop: 30,
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          Authentication app{' '}
        </Text>
        <Text style={{marginLeft: 20, fontSize: 12}}>
          Recommended . we’ll recommend an app to{' '}
        </Text>
        <Text style={{marginLeft: 20, fontSize: 12}}>
          download if you don’t have one. it will{' '}
        </Text>
        <Text style={{marginLeft: 20, fontSize: 12}}>
          generate a code that you’ll enter when you{' '}
        </Text>
        <Text style={{marginLeft: 20, fontSize: 12}}>log in.</Text>

        <Text
          style={{
            marginLeft: 20,
            marginTop: 20,
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          SMS or WhatsappApp
        </Text>
        <Text style={{marginLeft: 20, marginBottom: 0, fontSize: 12}}>
          We ‘ll send a code to the mobile number that
        </Text>
        <Text style={{marginLeft: 20, marginBottom: 0, fontSize: 12}}>
          you choose.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#1FD3E0',
          borderRadius: 5,
          padding: 10,
          width: 360,
          marginLeft: 20,
          height: 50,
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
            marginTop: 2,
            fontSize: 15,
          }}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const ChangePassword = ({navigation}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 18,
          marginTop: 20,
        }}>
        Change password
      </Text>

      <Text style={{marginLeft: 20, fontSize: 12}}>
        Your password must be at least 6 characters and should{' '}
      </Text>
      <Text style={{marginLeft: 20, fontSize: 12}}>
        include a combination of number, letters and special
      </Text>
      <Text style={{marginLeft: 20, fontSize: 12}}>characters (!$@%).</Text>

      <View
        style={{
          borderWidth: 1.5,
          borderColor: '#000000',
          borderRadius: 12,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
          height: 50,
          marginTop: 40,
        }}>
        <Text style={{color: '#95989A'}}>Current password (Update 01-...</Text>
        {/* <Ionicons name="ios-search" size={24} color="black" /> */}
      </View>
      <View
        style={{
          borderWidth: 1.5,
          borderColor: '#000000',
          borderRadius: 12,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
          height: 50,
        }}>
        <Text style={{color: '#95989A'}}>New password</Text>
        {/* <Ionicons name="ios-search" size={24} color="black" /> */}
      </View>
      <View
        style={{
          borderWidth: 1.5,
          borderColor: '#000000',
          borderRadius: 12,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
          height: 50,
        }}>
        <Text style={{color: '#95989A'}}>Retype new password</Text>
        {/* <Ionicons name="ios-search" size={24} color="black" /> */}
      </View>
      <Text
        style={{
          marginLeft: 20,
          fontSize: 17,
          color: '#004CFF',
          marginBottom: 10,
        }}>
        Forgotten your password?{' '}
      </Text>
      <Text style={{marginLeft: 35, fontSize: 14, fontWeight: 'bold'}}>
        Log out of other device. choose this if someone
      </Text>
      <Text
        style={{
          marginLeft: 35,
          fontSize: 14,
          fontWeight: 'bold',
          marginBottom: 30,
        }}>
        else used your account.{' '}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#1FD3E0',
          borderRadius: 5,
          padding: 10,
          width: 360,
          marginLeft: 20,
          height: 50,
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
            marginTop: 2,
            fontSize: 15,
          }}>
          Change password
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const ProfileSettings = ({navigation}) => {
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
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{marginLeft: 30, marginTop: 40, fontSize: 17}}>
            Two-factor authentication
          </Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{marginLeft: 30, marginTop: 40, fontSize: 17}}>
            Managing login method
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const MyOrders = ({navigation}) => {
  const navigateToMyOrders = () => {
    navigation.navigate('MyOrders');
  };

  return (
    <ScrollView style={{marginBottom: 20, backgroundColor: '#F5F5F5'}}>
      {Array(4)
        .fill()
        .map((_, index) => (
          <View
            key={index}
            style={{
              borderColor: '#E0E0E0',
              borderWidth: 1,
              borderRadius: 15,
              width: '90%',
              alignSelf: 'center',
              marginVertical: 10,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
              padding: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 22, marginRight: 10}}>✅</Text>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                  Arrived in 15 minutes
                </Text>
                <Text style={{fontSize: 12, color: '#757575'}}>
                  178 26 May, 1:15 PM
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              {Array(4)
                .fill()
                .map((_, imgIndex) => (
                  <Image
                    key={imgIndex}
                    source={require('./assets/cart_img.png')}
                    style={{width: 50, height: 70, marginHorizontal: 5}}
                  />
                ))}
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#E0E0E0',
                marginVertical: 10,
              }}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: '#00A900', fontWeight: 'bold'}}>
                Reorder
              </Text>
              <Text style={{color: '#00A900', fontWeight: 'bold'}}>
                Support
              </Text>
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

// const MyOrders = ({ navigation }) => {
//   const navigateToMyOrders = () => {
//     navigation.navigate('MyOrders');
//   };

//   return (
//     <ScrollView style={{marginBottom:20}}>

//   <View style={{
//      borderColor: 'black',
//      borderWidth: 1, borderRadius: 15,
//     width:'90%',
//     left:20,marginTop:40,
//     height: 200,
//     backgroundColor: 'white',
//        shadowColor: '#000000', // Shadow color
//     shadowOffset: { width: 0, height: 2 }, // Shadow offset
//     shadowOpacity: 0.25, // Shadow opacity
//     shadowRadius: 3.84, // Shadow radius
//     elevation: 5}} >
//     <View style={{display:'flex',flexDirection:'row'}}>
//     <Text style={{fontSize:22,marginLeft:15,marginTop:10}}>✅</Text>
//      <View style={{display:'flex',flexDirection:'column'}}>
//           <Text style={{fontSize:17,fontWeight:'bold',marginLeft:10,marginTop:4}}>Arrived in 15 minutes</Text>

//     <Text style={{fontSize:11,marginLeft:20}}>178 26 May, 1:15Pm</Text>
//      </View>

//     </View>
//        <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginTop: 10 }} />

//       <View style={{display:'flex',flexDirection:'row'}}>
//         <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//          <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//         <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//         <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//          {/* <Text style={{marginTop:20,marginLeft:6}}>Any Other Cloths</Text> */}

//       </View>
//       <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginTop: 10}} />

//           <View style={{display:'flex',flexDirection:'row'}}>

//         <Text style={{color:'#00A900',fontWeight:'bold',marginLeft:60,marginTop:10}}>Reorder</Text>

//         <Text  style={{color:'#00A900',fontWeight:'bold',marginLeft:110,marginTop:10}}>Support</Text>

//       </View>
//     </View>
//      <View style={{
//      borderColor: 'black',
//      borderWidth: 1, borderRadius: 15,
//     width:'90%',
//     left:20,marginTop:40,
//     height: 200,
//     backgroundColor: 'white',
//        shadowColor: '#000000', // Shadow color
//     shadowOffset: { width: 0, height: 2 }, // Shadow offset
//     shadowOpacity: 0.25, // Shadow opacity
//     shadowRadius: 3.84, // Shadow radius
//     elevation: 5}} >
//      <View style={{display:'flex',flexDirection:'row'}}>
//     <Text style={{fontSize:22,marginLeft:15,marginTop:10}}>✅</Text>
//      <View style={{display:'flex',flexDirection:'column'}}>
//           <Text style={{fontSize:17,fontWeight:'bold',marginLeft:10,marginTop:4}}>Arrived in 15 minutes</Text>

//     <Text style={{fontSize:11,marginLeft:20}}>178 26 May, 1:15Pm</Text>
//      </View>

//     </View>
//     {/* <Text style={{fontSize:17,fontWeight:'bold',marginLeft:40,marginTop:4}}>Arrived in 15 minutes</Text>
//     <Text style={{fontSize:11,marginLeft:40}}>178 26 May, 1:15Pm</Text> */}
//        <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginTop: 10 }} />

//       <View style={{display:'flex',flexDirection:'row'}}>
//         <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//          <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//         <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//         <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//          {/* <Text style={{marginTop:20,marginLeft:6}}>Any Other Cloths</Text> */}

//       </View>
//       <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginTop: 10}} />

//           <View style={{display:'flex',flexDirection:'row'}}>

//         <Text style={{color:'#00A900',fontWeight:'bold',marginLeft:60,marginTop:10}}>Reorder</Text>

//         <Text  style={{color:'#00A900',fontWeight:'bold',marginLeft:110,marginTop:10}}>Support</Text>

//       </View>
//     </View>
//      <View style={{
//      borderColor: 'black',
//      borderWidth: 1, borderRadius: 15,
//     width:'90%',
//     left:20,marginTop:40,
//     height: 200,
//     backgroundColor: 'white',
//        shadowColor: '#000000', // Shadow color
//     shadowOffset: { width: 0, height: 2 }, // Shadow offset
//     shadowOpacity: 0.25, // Shadow opacity
//     shadowRadius: 3.84, // Shadow radius
//     elevation: 5}} >
//      <View style={{display:'flex',flexDirection:'row'}}>
//     <Text style={{fontSize:22,marginLeft:15,marginTop:10}}>✅</Text>
//      <View style={{display:'flex',flexDirection:'column'}}>
//           <Text style={{fontSize:17,fontWeight:'bold',marginLeft:10,marginTop:4}}>Arrived in 15 minutes</Text>

//     <Text style={{fontSize:11,marginLeft:20}}>178 26 May, 1:15Pm</Text>
//      </View>

//     </View>
//     {/* <Text style={{fontSize:17,fontWeight:'bold',marginLeft:40,marginTop:4}}>Arrived in 15 minutes</Text>
//     <Text style={{fontSize:11,marginLeft:40}}>178 26 May, 1:15Pm</Text> */}
//        <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginTop: 10 }} />

//       <View style={{display:'flex',flexDirection:'row'}}>
//         <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//          <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//         <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//         <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//          {/* <Text style={{marginTop:20,marginLeft:6}}>Any Other Cloths</Text> */}

//       </View>
//       <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginTop: 10}} />

//           <View style={{display:'flex',flexDirection:'row'}}>

//         <Text style={{color:'#00A900',fontWeight:'bold',marginLeft:60,marginTop:10}}>Reorder</Text>

//         <Text  style={{color:'#00A900',fontWeight:'bold',marginLeft:110,marginTop:10}}>Support</Text>

//       </View>
//     </View>
//      <View style={{
//      borderColor: 'black',
//      borderWidth: 1, borderRadius: 15,
//     width:'90%',
//     left:20,marginTop:40,
//     height: 200,
//     backgroundColor: 'white',
//        shadowColor: '#000000', // Shadow color
//     shadowOffset: { width: 0, height: 2 }, // Shadow offset
//     shadowOpacity: 0.25, // Shadow opacity
//     shadowRadius: 3.84, // Shadow radius
//     elevation: 5}} >
//      <View style={{display:'flex',flexDirection:'row'}}>
//     <Text style={{fontSize:22,marginLeft:15,marginTop:10}}>✅</Text>
//      <View style={{display:'flex',flexDirection:'column'}}>
//           <Text style={{fontSize:17,fontWeight:'bold',marginLeft:10,marginTop:4}}>Arrived in 15 minutes</Text>

//     <Text style={{fontSize:11,marginLeft:20}}>178 26 May, 1:15Pm</Text>
//      </View>

//     </View>
//     {/* <Text style={{fontSize:17,fontWeight:'bold',marginLeft:40,marginTop:4}}>Arrived in 15 minutes</Text>
//     <Text style={{fontSize:11,marginLeft:40}}>178 26 May, 1:15Pm</Text> */}
//        <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginTop: 10 }} />

//       <View style={{display:'flex',flexDirection:'row'}}>
//         <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//          <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//         <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//         <Image
//         source={require('./assets/cart_img.png')}
//         style={{width:50,height:70,marginTop:20,marginLeft:10}}
//       />
//          {/* <Text style={{marginTop:20,marginLeft:6}}>Any Other Cloths</Text> */}

//       </View>
//       <View style={{ height: 1, backgroundColor: 'grey', width: '100%', marginTop: 10}} />

//           <View style={{display:'flex',flexDirection:'row'}}>

//         <Text style={{color:'#00A900',fontWeight:'bold',marginLeft:60,marginTop:10}}>Reorder</Text>

//         <Text  style={{color:'#00A900',fontWeight:'bold',marginLeft:110,marginTop:10}}>Support</Text>

//       </View>
//     </View>
//     </ScrollView>
//   );
// }
// --------------------------------------------
const cartOrderTrack = ({navigation}) => {
  const navigateToLogin = () => {
    navigation.navigate('cartOrderConfirm');
  };
  <View
    style={{
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 15,
      width: '90%',
      left: 20,
      marginTop: 40,
      height: 200,
      backgroundColor: 'white',
      shadowColor: '#000000', // Shadow color
      shadowOffset: {width: 0, height: 2}, // Shadow offset
      shadowOpacity: 0.25, // Shadow opacity
      shadowRadius: 3.84, // Shadow radius
      elevation: 5,
    }}>
    <Text
      style={{fontSize: 17, fontWeight: 'bold', marginLeft: 40, marginTop: 4}}>
      Arrived in 15 minutes
    </Text>
    <Text style={{fontSize: 11, marginLeft: 40}}>178 26 May, 1:15Pm</Text>
    <View
      style={{height: 1, backgroundColor: 'grey', width: '100%', marginTop: 10}}
    />

    <View style={{display: 'flex', flexDirection: 'row'}}>
      <Image
        source={require('./assets/cart_img.png')}
        style={{width: 50, height: 70, marginTop: 20, marginLeft: 10}}
      />
      <Image
        source={require('./assets/cart_img.png')}
        style={{width: 50, height: 70, marginTop: 20, marginLeft: 10}}
      />
      <Image
        source={require('./assets/cart_img.png')}
        style={{width: 50, height: 70, marginTop: 20, marginLeft: 10}}
      />
      <Image
        source={require('./assets/cart_img.png')}
        style={{width: 50, height: 70, marginTop: 20, marginLeft: 10}}
      />
      {/* <Text style={{marginTop:20,marginLeft:6}}>Any Other Cloths</Text> */}
    </View>
    <View
      style={{height: 1, backgroundColor: 'grey', width: '100%', marginTop: 10}}
    />

    <View style={{display: 'flex', flexDirection: 'row'}}>
      <Text
        style={{
          color: '#00A900',
          fontWeight: 'bold',
          marginLeft: 60,
          marginTop: 10,
        }}>
        Reorder
      </Text>

      <Text
        style={{
          color: '#00A900',
          fontWeight: 'bold',
          marginLeft: 110,
          marginTop: 10,
        }}>
        Support
      </Text>
    </View>
  </View>;

  return (
    <View style={{}}>
      <Text style={{fontSize: 14, fontWeight: 'bold'}}>Order Tracking</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={require('./assets/cart_img.png')}
          style={{width: 100, height: 100, marginTop: 20, marginLeft: 10}}
        />
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text
            style={{
              color: '#000000',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            {' '}
            LAMERI
          </Text>
          <Text
            style={{
              color: '#555555',
              marginLeft: 20,
              marginBottom: 10,
              fontSize: 13,
            }}>
            {' '}
            Recycle Boucle Knit Cardigan Pink
          </Text>
        </View>
      </View>

      <View style={{display: 'flex', flexDirection: 'row', marginTop: 40}}>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#1B1B1B',
            marginLeft: 20,
          }}>
          Order No. :
        </Text>

        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#585858',
            marginLeft: 10,
          }}>
          #13436656789977
        </Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#1B1B1B',
            marginLeft: 20,
          }}>
          Order ID. :
        </Text>

        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#585858',
            marginLeft: 10,
          }}>
          IDHJDO9003
        </Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#1B1B1B',
            marginLeft: 20,
          }}>
          Ordered on :
        </Text>

        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#585858',
            marginLeft: 10,
          }}>
          13-05-2024
        </Text>
      </View>

      <TouchableOpacity
        onPress={navigateToLogin}
        style={{
          backgroundColor: 'white',
          borderRadius: 25,
          padding: 10,
          width: 200,
          marginLeft: 20,
          height: 50,
          borderColor: '#E6E6E6', // Added border color
          borderWidth: 2,
          marginBottom: 10,
          marginTop: 220,
        }}>
        <Text
          style={{
            color: '#454545',
            fontSize: 11,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          📞 Contact Us
        </Text>
      </TouchableOpacity>
    </View>
  );
};
// cartCheckout
const cartCheckout = ({navigation}) => {
  const navigateToLogin = () => {
    navigation.navigate('cartOrderTrack');
  };

  return (
    <View style={{}}>
      <Text style={{fontSize: 14, fontWeight: 'bold'}}>Checkout</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={require('./assets/cart_img.png')}
          style={{width: 150, height: 150, marginTop: 20, marginLeft: 10}}
        />
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text
            style={{
              color: '#000000',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            {' '}
            LAMERI
          </Text>
          <Text
            style={{
              color: '#555555',
              marginLeft: 20,
              marginBottom: 10,
              fontSize: 13,
            }}>
            {' '}
            Recycle Boucle Knit Cardigan Pink
          </Text>
          <View
            style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
            <Text style={{color: '#000000', fontSize: 18, marginLeft: 20}}>
              -
            </Text>
            <Text style={{color: '#000000', fontSize: 18, marginLeft: 25}}>
              1
            </Text>
            <Text style={{color: '#000000', fontSize: 18, marginLeft: 25}}>
              +
            </Text>
          </View>
          <Text style={{color: '#1DD8E0', fontSize: 18, marginLeft: 20}}>
            ₹120
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 0.5,
          backgroundColor: 'gray',
          width: '90%',
          marginTop: 30,
          marginLeft: 20,
        }}
      />

      <Text
        style={{
          fontSize: 15,
          marginBottom: 30,
          color: '#333333',
          marginLeft: 20,
          marginTop: 20,
        }}>
        📩 Add promo code
      </Text>
      <View
        style={{
          height: 0.5,
          backgroundColor: 'gray',
          width: '90%',
          marginTop: 0,
          marginBottom: 10,
          marginLeft: 20,
        }}
      />

      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#333333',
            marginLeft: 20,
          }}>
          🚪 Delivery
        </Text>

        <Text
          style={{
            fontSize: 15,
            marginBottom: 30,
            color: '#333333',
            marginLeft: 190,
          }}>
          Free
        </Text>
      </View>
      <View
        style={{
          height: 0.5,
          backgroundColor: 'gray',
          width: '90%',
          marginTop: 0,
          marginBottom: 40,
          marginLeft: 20,
        }}
      />

      <View style={{display: 'flex', flexDirection: 'row', marginTop: 30}}>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 30,
            color: '#333333',
            marginLeft: 20,
          }}>
          SUB TOTAL
        </Text>

        <Text
          style={{
            fontSize: 18,
            marginBottom: 30,
            color: '#1DD8E0',
            marginLeft: 160,
          }}>
          ₹ 2,976
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          marginBottom: 10,
          marginLeft: 20,
          color: '#888888',
        }}>
        *shipping charges, taxes and discount codes
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginBottom: 10,
          marginLeft: 20,
          color: '#888888',
        }}>
        are calculated at the time of accounting.
      </Text>

      <TouchableOpacity
        onPress={navigateToLogin}
        style={{
          backgroundColor: '#1FD3E0',
          borderRadius: 5,
          padding: 10,
          width: 360,
          marginLeft: 20,
          height: 50,
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
            marginTop: 5,
          }}>
          PROCEED TO CHECKOUT
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const locfour = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const handleChange = () => {
    navigation.navigate('cartScreen');
  };

  const navigateonOK = () => {
    // Handle form submission logic here

    navigation.navigate('Sell');
  };
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    };

    const getCurrentLocation = async () => {
      try {
        await requestLocationPermission();
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setLocation(location.coords);
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getCurrentLocation();
  }, []); // Empty dependency array ensures useEffect runs only once

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={{}}>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          marginTop: 20,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        Select your Pickup Location
      </Text>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#666668',
          borderRadius: 12,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 40,
          marginRight: 40,
          marginBottom: 20,
        }}>
        {/* <Ionicons name="ios-search" size={24} color="black" /> */}
        <Text
          style={{
            color: '#4370F0',
            fontWeight: 'bold',
            marginLeft: 70,
            fontSize: 15,
          }}>
          Search your location
        </Text>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            borderWidth: 0.5,
            borderColor: '#666668',
            padding: 10,
            borderRadius: 15,
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text
              style={{
                color: '#4370F0',
                // ''
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              Change Address
            </Text>
            <Text
              style={{
                color: 'grey',
                // '#2AAFE5'
                fontSize: 11,
                fontWeight: 'bold',
                marginTop: 5,
              }}>
              C-10009, Police line 2 , Raj
            </Text>
            <Text
              style={{
                color: 'grey',
                // '#2AAFE5'
                fontSize: 11,
                fontWeight: 'bold',
              }}>
              Nagar Extension,
            </Text>
            <Text
              style={{
                color: 'grey',
                // '#2AAFE5'
                fontSize: 11,
                fontWeight: 'bold',
              }}>
              Ghaziabad, Uttar Pradesh
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleChange}
          style={{
            borderWidth: 0.5,
            borderColor: '#666668',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginLeft: 60,
          }}>
          <Text style={{color: '#4370F0', fontWeight: 'bold'}}>Change</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: '#4370F0',
          fontSize: 17,
          fontWeight: 'bold',
          marginLeft: 30,
          marginTop: 20,
        }}>
        Saved Location
      </Text>

      <Text
        style={{
          color: 'black',
          fontSize: 17,
          fontWeight: 'bold',
          marginLeft: 30,
          marginTop: 20,
        }}>
        other
      </Text>
      <Text style={{color: 'grey', fontSize: 13, marginLeft: 30, marginTop: 2}}>
        C-10009, Police line 2, Raj Nagar Extension,
      </Text>
      <Text style={{color: 'grey', fontSize: 13, marginLeft: 30, marginTop: 1}}>
        Ghaziabad,Uttar Pradesh
      </Text>
      {/* <View style={{ height: 1, backgroundColor: 'grey', width: '85%', marginTop: 20,marginLeft:20 }} /> */}

      <Text
        style={{
          color: 'black',
          fontSize: 17,
          fontWeight: 'bold',
          marginLeft: 30,
          marginTop: 20,
        }}>
        other
      </Text>
      <Text style={{color: 'grey', fontSize: 13, marginLeft: 30, marginTop: 2}}>
        C-10009, Police line 2, Raj Nagar Extension,
      </Text>
      <Text style={{color: 'grey', fontSize: 13, marginLeft: 30, marginTop: 1}}>
        Ghaziabad,Uttar Pradesh
      </Text>

      <View
        style={{
          height: 0.5,
          backgroundColor: '#666668',
          width: '90%',
          marginTop: 20,
          marginLeft: 20,
        }}
      />
      <Text
        style={{
          color: 'black',
          fontSize: 17,
          fontWeight: 'bold',
          marginLeft: 30,
          marginTop: 20,
        }}>
        other
      </Text>
      <Text style={{color: 'grey', fontSize: 13, marginLeft: 30, marginTop: 2}}>
        C-10009, Police line 2, Raj Nagar Extension,
      </Text>
      <Text style={{color: 'grey', fontSize: 13, marginLeft: 30, marginTop: 1}}>
        Ghaziabad,Uttar Pradesh
      </Text>

      {/* <View style={{ height: 1, backgroundColor: 'grey', width: '85%', marginTop: 20,marginLeft:20 }} /> */}

      <Text
        style={{
          color: 'black',
          fontSize: 17,
          fontWeight: 'bold',
          marginLeft: 30,
          marginTop: 20,
        }}>
        other
      </Text>
      <Text style={{color: 'grey', fontSize: 13, marginLeft: 30, marginTop: 2}}>
        C-10009, Police line 2, Raj Nagar Extension,
      </Text>
      <Text style={{color: 'grey', fontSize: 13, marginLeft: 30, marginTop: 1}}>
        Ghaziabad,Uttar Pradesh
      </Text>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <TouchableOpacity 
        style={{
          borderWidth: 1,
          borderColor: '#2AAFE5',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginLeft: 110
        }} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: '#2AAFE5' }}>Enable</Text>
      </TouchableOpacity> */}

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
              <Text style={{fontSize: 15, fontStyle: 'italic'}}>
                For a better experience.turn on device location. Which uses
                Google's location service
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'baseline',
                  // backgroundColor: '#2AAFE5',
                  display: 'flex',
                  flexDirection: 'row',
                }}
                onPress={handleModalClose}>
                <Text
                  style={{
                    color: '#2AAFE5',
                    marginRight: 20,
                    marginLeft: 140,
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  No,thanks
                </Text>
                <Text
                  onPress={navigateonOK}
                  style={{color: '#2AAFE5', fontWeight: 'bold', fontSize: 16}}>
                  OK
                </Text>
              </TouchableOpacity>
              {/* {location && (
        <Text style={{ marginTop: 20,
    color: 'black',
    fontWeight: 'bold',}}>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )} */}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
// -----------------------------------------------------
function HomeScreen({navigation}) {
  const navigateToLogin = () => {
    // navigation.navigate('PhoneVerification');
    // MyOrders

    navigation.navigate('PhoneVerification');
  };

  return (
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Image
          source={require('./assets/12.png')}
          style={{width: 350, height: 100}}
        />
        <Image
          source={require('./assets/12.png')}
          style={{width: 350, height: 100}}
        />
        <Image
          source={require('./assets/12.png')}
          style={{width: 350, height: 100}}
        />
      </View>

      <Image source={require('./assets/BWORTH.jpeg')} style={styles.image} />

      <Text
        style={{
          fontSize: 30,
          marginRight: 200,
          fontWeight: 'bold',
          marginBottom: 30,
        }}>
        Welcome
      </Text>

      <TouchableOpacity
        onPress={navigateToLogin}
        style={{
          backgroundColor: 'black',
          borderRadius: 15,
          padding: 10,
          width: 350,
          marginLeft: 10,
          borderColor: '#BABABA', // Added border color
          borderWidth: 1,
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 10,
          width: 350,
          marginLeft: 10,
          borderColor: '#BABABA', // Added border color
          borderWidth: 2,
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Register
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize: 13, fontWeight: 'bold', marginLeft: 20}}>
        Terms & Condition
      </Text>
    </View>
  );
}
function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      //   const response = await fetch('http://192.168.1.2/login', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       email: email,
      //       password: password,
      //     }),
      //   });

      //  console.log('Response status:', response.status);
      // const data = await response.json();
      // console.log('Response data:', data);

      // if (!response.ok) {
      //   // Assuming error data contains a message or similar
      //   const errorMessage = data.message || 'Wrong credentials';
      //   console.log('Error:', errorMessage);
      //   ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      //   return;
      // }

      // console.log('Login successful:', data);
      navigation.navigate('PhoneVerification');
    } catch (error) {
      ToastAndroid.show(
        'An error occurred. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <Text style={styles.signUp}>
        Don't have an account?{' '}
        <Text style={styles.signUpLink} onPress={navigateToRegister}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}
// function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = () => {
//     // Handle sign-in logic here
//     navigation.navigate('Dashboard');
//   };

//   const navigateToRegister = () => {
//     navigation.navigate('Register');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={text => setEmail(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry={true}
//         value={password}
//         onChangeText={text => setPassword(text)}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleSignIn}>
//         <Text style={styles.buttonText}>Sign In</Text>
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Text style={styles.forgotPassword}>Forgot Password?</Text>
//       </TouchableOpacity>
//       <Text style={styles.signUp}>
//         Don't have an account? <Text style={styles.signUpLink} onPress={navigateToRegister}>Sign Up</Text>
//       </Text>
//     </View>
//   );
// }

function DashboardScreen() {
  // return (
  //   <Tab.Navigator>
  //     <Tab.Screen name="Home" component={Screen1} />
  //     <Tab.Screen name="Brands" component={Screen2} />
  //     <Tab.Screen name="Cashbacks" component={Screen3} />
  //      <Tab.Screen name="Profile" component={Screen4} />
  //   </Tab.Navigator>
  // );
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Brands') {
            // iconName = focused ? 'pricetags' : 'pricetags-outline';
            iconName = focused ? 'star' : 'star';
          } else if (route.name === 'Cashbacks') {
            // iconName = focused ? 'cash' : 'cash-outline';
            iconName = focused ? 'credit-card' : 'credit-card';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'lock' : 'lock';
          }

          // Return the icon component
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={Screen1} />
      <Tab.Screen name="Brands" component={Screen2} />
      <Tab.Screen name="Cashbacks" component={Screen3} />
      <Tab.Screen name="Profile" component={Screen4} />
      {/* <Tab.Screen name="cartScreen" component={cartScreen} /> */}
    </Tab.Navigator>
  );
}

//screen1
function Screen1() {
  const handleCart = () => {
    //  navigation.navigate('cartScreen');
  };
  return (
    <SafeAreaView style={styles.container2}>
      <ScrollView>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 16,
              backgroundColor: '#fff',
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
            }}>
            <Image
              source={require('./assets/BWORTH.jpeg')}
              style={styles.logo1}
            />
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Image
                source={require('./assets/Coin.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  marginRight: 0,
                  borderRadius: 40,
                  borderColor: 'white',
                  borderWidth: 1,
                }}
              />
              <View
                style={{
                  backgroundColor: '#4B5EF3',
                  padding: 8,
                  width: 100,
                  // borderRadius: 0,
                  borderTopRightRadius: 35,
                  borderBottomRightRadius: 35,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    marginLeft: 5,
                    fontWeight: 'bold',
                  }}>
                  ₹ 2,000
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={handleCart} style={styles.cartContainer}>
              <Icon name="shopping-cart" size={24} color="#777" />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>12</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal contentContainerStyle={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <Text>🈂️</Text>
              {/* <Icon name="filter-list" size={24} color="#000" /> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Men</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Women</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Best Deals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>New Arrivals</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <BottomImageBar />
        <BrandSection />
        <NewCollectionSection />
        <BestOffersSection />
      </ScrollView>
    </SafeAreaView>
  );
}
//screen1
function Screen2() {
  return (
    <SafeAreaView style={styles.container2}>
      <ScrollView>
        {/* <View>
          <View style={styles.container1}>
            <Image
              source={require('./assets/loogo.png')}
              style={styles.logo1}
            />
            <View style={styles.balanceContainer}>
              <Icon name="attach-money" size={20} color="#fff" />
              <Text style={styles.balanceText}>₹2,000</Text>
            </View>
            <TouchableOpacity style={styles.cartContainer}>
              <Icon name="shopping-cart" size={24} color="#777" />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>12</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal contentContainerStyle={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <Icon name="filter-list" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Men</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Women</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Best Deals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>New Arrivals</Text>
            </TouchableOpacity>
          </ScrollView>
        </View> */}
        {/* <BottomImageBar /> */}
        <BrandSection />
        {/* <NewCollectionSection /> */}
        {/* <BestOffersSection /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
function Screen3() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
      }}>
      <View
        style={{
          backgroundColor: '#4B5EF3',
          padding: 20,
          marginVertical: 20,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 36}}>
          ₹2,000
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text
          style={{flex: 1, textAlign: 'center', fontSize: 16, color: '#333'}}>
          Cashback Earned
        </Text>
        <Text
          style={{flex: 1, textAlign: 'center', fontSize: 16, color: 'green'}}>
          + ₹5,000
        </Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: '#E0E0E0',
          width: '100%',
          marginVertical: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text
          style={{flex: 1, textAlign: 'center', fontSize: 16, color: '#333'}}>
          Order placed
        </Text>
        <Text
          style={{flex: 1, textAlign: 'center', fontSize: 16, color: 'red'}}>
          - ₹1,000
        </Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: '#E0E0E0',
          width: '100%',
          marginVertical: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text
          style={{flex: 1, textAlign: 'center', fontSize: 16, color: '#333'}}>
          Cashback Earned
        </Text>
        <Text
          style={{flex: 1, textAlign: 'center', fontSize: 16, color: 'green'}}>
          + ₹5,000
        </Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: '#E0E0E0',
          width: '100%',
          marginVertical: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text
          style={{flex: 1, textAlign: 'center', fontSize: 16, color: '#333'}}>
          Order placed
        </Text>
        <Text
          style={{flex: 1, textAlign: 'center', fontSize: 16, color: 'red'}}>
          - ₹1,000
        </Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: '#E0E0E0',
          width: '100%',
          marginVertical: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text
          style={{flex: 1, textAlign: 'center', fontSize: 16, color: '#333'}}>
          Cashback Earned
        </Text>
        <Text
          style={{flex: 1, textAlign: 'center', fontSize: 16, color: 'green'}}>
          + ₹5,000
        </Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: '#E0E0E0',
          width: '100%',
          marginVertical: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text
          style={{flex: 1, textAlign: 'center', fontSize: 16, color: '#333'}}>
          Order placed
        </Text>
        <Text
          style={{flex: 1, textAlign: 'center', fontSize: 16, color: 'red'}}>
          - ₹1,000
        </Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: '#E0E0E0',
          width: '100%',
          marginVertical: 10,
        }}
      />
    </View>
  );
}

// function Screen3() {
//   return (
//     <View style={{ flex: 1,  alignItems: 'center' }}>
//       <View style={{ flexDirection: 'column', width: '95%' }}>
//        <View style={{ backgroundColor: '#4B5EF3', paddingLeft: 20, paddingTop: 20, paddingRight: 20, paddingBottom:20,marginTop: 20,height:100 }}>
//           <Text style={{ color: 'white' ,textAlign: 'center',fontWeight:'bold',fontSize: 40}}>₹2,000</Text>
//         </View>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 ,marginTop:50}}>
//           <Text style={{ flex: 1, textAlign: 'center' }}>Cashback Earned</Text>
//           <Text style={{ flex: 1, textAlign: 'center' ,color:'green' }}>+ ₹5,000</Text>
//         </View>
//           <View style={{ height: 1, backgroundColor: 'gray', width: '100%', marginTop: 20 }} />
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 ,marginTop: 10}}>
//           <Text style={{ flex: 1, textAlign: 'center' }}>Order placed</Text>
//           <Text style={{ flex: 1, textAlign: 'center' ,color:'red' }}>- ₹1,000</Text>
//         </View>
//           <View style={{ height: 1, backgroundColor: 'gray', width: '100%', marginTop: 20, }} />
//          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,marginTop: 10 }}>
//           <Text style={{ flex: 1, textAlign: 'center' }}>Cashback Earned</Text>
//           <Text style={{ flex: 1, textAlign: 'center'  ,color:'green' }}>+ ₹5,000</Text>
//         </View>
//           <View style={{ height: 0.5, backgroundColor: 'gray', width: '100%', marginTop: 20 }} />
//          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,marginTop: 10 }}>
//           <Text style={{ flex: 1, textAlign: 'center' }}>Order placed</Text>
//           <Text style={{ flex: 1, textAlign: 'center' ,color:'red' }}>- ₹1,000</Text>
//         </View>
//           <View style={{ height: 0.5, backgroundColor: 'gray', width: '100%', marginTop: 20 }} />
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 ,marginTop: 10}}>
//           <Text style={{ flex: 1, textAlign: 'center' }}>Cashback Earned</Text>
//           <Text style={{ flex: 1, textAlign: 'center'  ,color:'green'}}>+ ₹5,000</Text>
//         </View>
//           <View style={{ height: 0.5, backgroundColor: 'gray', width: '100%', marginTop: 20 }} />
//          <View style={{ flexDirection: 'row', justifyContent: 'space-between' , marginBottom: 20,marginTop: 10}}>
//           <Text style={{ flex: 1, textAlign: 'center' }}>Order placed</Text>
//           <Text style={{ flex: 1, textAlign: 'center' ,color:'red' }}>- ₹1,000</Text>
//         </View>
//           <View style={{ height: 0.5, backgroundColor: 'gray', width: '100%', marginTop: 20 }} />
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,marginTop: 10 }}>
//           <Text style={{ flex: 1, textAlign: 'center' }}>Cashback Earned</Text>
//           <Text style={{ flex: 1, textAlign: 'center'  ,color:'green' }}>+ ₹5,000</Text>
//         </View>
//           <View style={{ height: 0.5, backgroundColor: 'grey', width: '100%', marginTop: 20 }} />

//       </View>
//     </View>
//   );
// }

function Screen4() {
  const navigation = useNavigation();

  const handleMyOrders = () => {
    navigation.navigate('MyOrders');
  };
  const handleTokenHistory = () => {
    navigation.navigate('TokenTransaction');
  };
  const handleBuyBackHistory = () => {
    navigation.navigate('BuyBackPolicies');
  };
  const handleSettings = () => {
    navigation.navigate('Settings');
  };
  const handleFAQ = () => {
    navigation.navigate('FAQ1');
  };
  const handlePrivacy = () => {
    navigation.navigate('PrivacyPolicyy');
  };

  return (
    <ScrollView style={{backgroundColor: '#f5f5f5'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 20,
          marginTop: 50,
        }}>
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: '#004CFF',
            borderRadius: 35,
          }}
        />
        <Text
          style={{
            flex: 1,
            paddingLeft: 30,
            fontWeight: 'bold',
            fontSize: 30,
            color: '#333',
          }}>
          Vivek Singh
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleMyOrders}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
          marginHorizontal: 20,
          marginVertical: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}>
        <Icon name="inbox" size={18} color="black" style={{marginLeft: 10}} />
        <Text
          style={{
            flex: 1,
            paddingLeft: 20,
            fontWeight: 'bold',
            color: '#484848',
          }}>
          My Orders
        </Text>
        {/* <Text style={{color: '#484848', fontSize: 20}}>></Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleTokenHistory}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
          marginHorizontal: 20,
          marginVertical: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}>
        <Icon name="inbox" size={18} color="black" style={{marginLeft: 10}} />
        <Text
          style={{
            flex: 1,
            paddingLeft: 20,
            fontWeight: 'bold',
            color: '#484848',
          }}>
          Token History
        </Text>
        {/* <Text style={{color: '#484848', fontSize: 20}}>></Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleBuyBackHistory}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
          marginHorizontal: 20,
          marginVertical: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}>
        <Icon
          name="bitbucket"
          size={18}
          color="black"
          style={{marginLeft: 10}}
        />
        <Text
          style={{
            flex: 1,
            paddingLeft: 20,
            fontWeight: 'bold',
            color: '#484848',
          }}>
          Buy Back Policy
        </Text>
        {/* <Text style={{color: '#484848', fontSize: 20}}>></Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSettings}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
          marginHorizontal: 20,
          marginVertical: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}>
        <Text style={{marginLeft: 10}}>⚙️</Text>
        <Text
          style={{
            flex: 1,
            paddingLeft: 20,
            fontWeight: 'bold',
            color: '#484848',
          }}>
          Settings
        </Text>
        {/* <Text style={{color: '#484848', fontSize: 20}}>></Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleFAQ}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
          marginHorizontal: 20,
          marginVertical: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}>
        <Icon
          name="questioncircleo"
          size={18}
          color="black"
          style={{marginLeft: 10}}
        />
        <Text
          style={{
            flex: 1,
            paddingLeft: 20,
            fontWeight: 'bold',
            color: '#484848',
          }}>
          FAQs
        </Text>
        {/* <Text style={{color: '#484848', fontSize: 20}}>></Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePrivacy}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
          marginHorizontal: 20,
          marginVertical: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}>
        <Icon name="lock" size={18} color="black" style={{marginLeft: 10}} />
        <Text
          style={{
            flex: 1,
            paddingLeft: 20,
            fontWeight: 'bold',
            color: '#484848',
          }}>
          Privacy Policy
        </Text>
        {/* <Text style={{color: '#484848', fontSize: 20}}>></Text> */}
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 20,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 35,
            padding: 10,
            width: '45%',
            alignItems: 'center',
            borderColor: '#BABABA',
            borderWidth: 1,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
          }}>
          <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}>
            📞 Contact Us
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 35,
            padding: 10,
            width: '45%',
            alignItems: 'center',
            borderColor: '#BABABA',
            borderWidth: 1,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
          }}>
          <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}>
            ⭐ Rate Us
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// function Screen4() {
//    const navigation = useNavigation();
//   const handleMyOrders=()=>{
//           navigation.navigate('MyOrders');
//   }
//   const handleTokenHistory=()=>{
//        navigation.navigate('TokenTransaction');
//   }
//    const handleBuyBackHistory=()=>{
//        navigation.navigate('BuyBackPolicies');
//   }
//    const handleSettings=()=>{
//        navigation.navigate('Settings');
//   }
//   const handleFAQ=()=>{
//        navigation.navigate('FAQ1');
//   }
//   // handlePrivacy
//    const handlePrivacy=()=>{
//        navigation.navigate('PrivacyPolicyy');
//   }
//   return (
//      <ScrollView style={{  }}>
//       <View style={{ flexDirection: 'column', width: '95%' }}>
//      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 ,marginTop:50}}>
//   <View style={{width: 70,
//     height: 70,
//     backgroundColor: '#004CFF',
//     borderRadius: 50,
//     marginRight: 10,marginLeft:30}} />
//  <Text style={{ flex: 1,paddingLeft:30,fontWeight:'bold' ,fontSize:30,paddingTop:20 }}>Vivek Singh</Text>

//         </View>

//           {/* <View style={{ height: 1, backgroundColor: '#FFFFFF', width: '100%', marginTop: 20 }} /> */}
//          <TouchableOpacity

//               // onPress={handleMyOrders}
//               onPress={handleMyOrders}
//             >
//                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 ,marginTop: 10}}>
//                       <Icon.Button  name="inbox" size={18} color='black'  backgroundColor='transparent' style={{marginLeft:30}} />

//           <Text style={{ flex: 1,paddingLeft:20 ,fontWeight:'bold' ,color:'#484848'}}>My Orders</Text>

//                     <Text style={{ flex: 1,paddingLeft:170,fontSize:20,color:'##484848' }}>></Text>
//         </View>
//             </TouchableOpacity>

//           <View style={{ height: 1, backgroundColor: '#FFFFFF', width: '100%', marginTop: 20, }} />
//          <TouchableOpacity

//               // onPress={handleMyOrders}
//               onPress={handleTokenHistory}
//             >
//                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,marginTop: 10 }}>
//                      <Icon.Button  name="inbox" size={18} color='black'  backgroundColor='transparent' style={{marginLeft:30}} />

//           <Text style={{ flex: 1,paddingLeft:20 ,fontWeight:'bold' ,color:'#484848'}}>Token History</Text>

//                     <Text style={{ flex: 1,paddingLeft:170,fontSize:20,color:'##484848' }}>></Text>
//         </View>
//             </TouchableOpacity>

//           <View style={{ height: 0.5, backgroundColor: '#FFFFFF', width: '100%', marginTop: 20 }} />
//           <TouchableOpacity

//               // onPress={handleMyOrders}
//               onPress={handleBuyBackHistory}
//             >
//                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,marginTop: 10 }}>
//                        <Icon.Button  name="bitbucket" size={18} color='black'  backgroundColor='transparent' style={{marginLeft:30}} />

//           <Text style={{ flex: 1,paddingLeft:20,fontWeight:'bold' ,color:'#484848' }}>Buy Back Policy</Text>

//                     <Text style={{ flex: 1,paddingLeft:170,fontSize:20,color:'##484848' }}>></Text>
//         </View>
//             </TouchableOpacity>

//           <View style={{ height: 0.5, backgroundColor: '#FFFFFF', width: '100%', marginTop: 20 }} />
//      <TouchableOpacity

//               // onPress={handleMyOrders}
//               onPress={handleSettings}
//             >
//                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 ,marginTop: 10}}>
//        <Text style={{marginLeft:30,marginRight:10,fontWeight:'bold',fontSize:18}}>⚙️</Text>
//           <Text style={{ flex: 1,paddingLeft:20,fontWeight:'bold',color:'#484848'  }}>Settings</Text>

//                     <Text style={{ flex: 1,paddingLeft:170,fontSize:20,color:'##484848' }}>></Text>
//         </View>
//             </TouchableOpacity>

//           <View style={{ height: 0.5, backgroundColor: '#FFFFFF', width: '100%', marginTop: 20 }} />
//       <TouchableOpacity

//               // onPress={handleMyOrders}
//               onPress={handleFAQ}
//             >
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between' , marginBottom: 20,marginTop: 10}}>
//             <Icon.Button  name="questioncircleo" size={18} color='black'  backgroundColor='transparent' style={{marginLeft:30}}/>

//           <Text style={{ flex: 1,paddingLeft:20,fontWeight:'bold',color:'#484848'  }}>FAQs</Text>

//                     <Text style={{ flex: 1,paddingLeft:170,fontSize:20,color:'##484848' }}>></Text>
//         </View>
//             </TouchableOpacity>

//           <View style={{ height: 0.5, backgroundColor: '#FFFFFF', width: '100%', marginTop: 20 }} />
//       <TouchableOpacity

//               // onPress={handleMyOrders}
//               onPress={handlePrivacy}
//             >
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,marginTop: 10 }}>
//              {/* <Image
//           source={require('./assets/favicon.png')}
//           style={{width:15,height:15,}}
//         /> */}
//         <Icon.Button  name="lock" size={18} color='black'  backgroundColor='transparent'  style={{marginLeft:30}}/>
//           <Text style={{ flex: 1,paddingLeft:20,fontWeight:'bold' ,color:'#484848'}}>Privacy Policy</Text>

//                     <Text style={{ flex: 1,paddingLeft:170,fontSize:20,color:'##484848' }}>></Text>
//         </View>
//             </TouchableOpacity>

//           <View style={{ height: 0.5, backgroundColor: '#FFFFFF', width: '100%', marginTop: 20 }} />

//          <View style={{display:'flex',flexDirection:'row'}}>

//    <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 35,padding:10,width:'40%',marginLeft:30,
//     borderColor: '#BABABA', // Added border color
//     borderWidth: 1,marginBottom:10,marginTop:0,height:50}}>
//         <Text style={{color:'#000000',fontSize:14,fontWeight:'bold',textAlign:'center'}}>📞 Contact Us</Text>
//       </TouchableOpacity>
//        <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 35,padding:10,width:'40%',marginLeft:20,
//     borderColor: '#BABABA', // Added border color
//     borderWidth: 1,marginBottom:10,marginTop:0,height:50}}>
//         <Text style={{color:'#000000',fontSize:14,fontWeight:'bold',textAlign:'center'}}>⭐ Rate Us</Text>
//       </TouchableOpacity>
//   </View>
//       </View>
//     </ScrollView>

//   );
// }
function RegisterScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.1.2/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        // Registration failed
        ToastAndroid.show(
          'Registration failed. Please try again.',
          ToastAndroid.SHORT,
        );
        return;
      }

      // Registration successful, navigate to login screen
      ToastAndroid.show('Registration successful.', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } catch (error) {
      console.error('An error occurred during registration:', error);
      ToastAndroid.show(
        'An error occurred. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 100,
    marginBottom: 0,
    marginLeft: 0, // Add left margin
    marginRight: 100, // Add right margin
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    width: '80%',
    height: 48,
    backgroundColor: 'blue',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: 'blue',
    fontSize: 14,
    marginBottom: 16,
  },
  signUp: {
    fontSize: 14,
    marginTop: 16,
  },
  //////////////////css
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo1: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    padding: 8,
    width: 100,
    borderRadius: 5,
  },
  balanceText: {
    color: '#fff',
    marginLeft: 5,
  },
  cartContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  menuItem: {
    marginHorizontal: 8,
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: 'white',
  },
  menuText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  container2: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 5,
  },
  //////////////////css
  signUpLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
  // ..css for phone verification
  container1: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titlep: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  titleps: {
    fontSize: 13,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  title1: {
    fontSize: 24,
    marginBottom: 20,
  },
  title2: {
    fontSize: 15,
    marginBottom: 20,
  },
  formGroup1: {
    marginBottom: 20,
  },
  label1: {
    marginBottom: 5,
  },
  label2: {
    marginBottom: 5,
    textAlign: 'center',
  },
  title3: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
  },

  input1: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 55,
  },
  button1: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 55,
    alignItems: 'center',
  },
  buttons1: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 55,
    alignItems: 'center',
    marginTop: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
  buttontoken1: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 55,
    alignItems: 'center',
  },
  buttonText1: {
    color: '#fff',
    fontSize: 16,
  },

  buttonTexts1: {
    color: 'grey',
    fontSize: 16,
  },
  buttonText2: {
    color: '#fff',
    fontSize: 16,
  },
  buttonTextt2: {
    color: '#fff',
    fontSize: 16,
  },

  or1: {
    marginVertical: 20,
    alignItems: 'center',
  },
  socialLogin1: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 50,
  },
  socialButton1: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  facebook1: {
    backgroundColor: '#3b5998',
  },
  google1: {
    backgroundColor: '#db4a39',
  },
  instagram1: {
    backgroundColor: '#e4405f',
  },
  socialButtonText1: {
    color: '#fff',
  },
  signup1: {
    alignItems: 'center',
  },
  signupButton1: {
    marginTop: 10,
  },
  signupButtonText1: {
    color: '#007bff',
  },
  //css otp verif
  otpinputcontainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  //css for pin code
  container3: {
    flex: 2,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // optional: to add a semi-transparent overlay
  },
  halfBlackContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'white',
  },
  halfBlackC: {
    position: 'absolute',
    //  borderColor: 'grey',
    borderBottomColor: '#BABABA',
    borderBottomWidth: 1,
    borderLeftColor: '#BABABA',
    borderLeftWidth: 1,
    borderRightColor: '#BABABA',
    borderRightWidth: 1,
    //  borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'white',
    shadowColor: '#000000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5,
  },
  halfBlackContainer1: {
    position: 'absolute',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    bottom: 240,
    left: 30,
    right: 30,
    height: '30%',
    backgroundColor: 'white',
    shadowColor: '#000000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5,
  },
  // textpincode: {
  //   color: 'white',
  //   fontSize: 24,
  //   fontWeight: 'bold',
  // },
  modalButton: {
    backgroundColor: '#2AAFE5',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  yesButton: {
    width: 60,
    marginRight: 40,
    backgroundColor: '#2AAFE5', // Green for "Yes"
    borderRadius: 35,
    //         borderWidth: 1,
  },
  noButton: {
    width: 60,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 35,
    borderWidth: 1, // Add a border width
    borderColor: 'grey', // Set the border color
  },
  t1: {
    paddingTop: 70,
    fontSize: 18,
  },
  t2: {
    // paddingTop:20
    fontSize: 18,
    paddingBottom: 16,
  },
});
