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
  Linking,
  PermissionsAndroid,
} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import React, {useState, useEffect} from 'react';
import styles from '../utils/Styles';
import {heightPercent as hp, widthPrecent as wp} from '../utils/responsive';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import Toast from 'react-native-toast-message';
import Api from '../../redux/Api';
import Loader from '../../custom';
import Geolocation from 'react-native-geolocation-service';
import {useIsFocused} from '@react-navigation/native';

import {
  onFacebookButtonPress,
  onGoogleButtonPress,
} from '../utils/SocialSignin';
import storage from '../utils/storageService';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
const onlyDigits = s => (s || '').replace(/\D+/g, '');
export default PhoneVerification = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        console.log('User cancelled the login process');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        console.log('Something went wrong obtaining access token');
        return;
      }

      console.log('Access Token:', data.accessToken.toString());
      // Send access token to your backend for validation or further processing
      navigation.navigate('currentLocation'); // Navigate to next screen
    } catch (error) {
      console.error('Facebook Login Error:', error);
      ToastAndroid.show('Facebook Login Error', ToastAndroid.SHORT);
    }
  };
  async function requestAppPermissions() {
    try {
      // 1. Request SMS permission
      // const smsPermission = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.SEND_SMS,
      //   {
      //     title: 'Allow BWorth to send and view SMS messages?',
      //     message:
      //       'BWorth needs your permission to send verification codes via SMS.\n\n' +
      //       'Tap "Allow" to enable SMS-based login or verification.\n\n' +
      //       'Tap "Don\'t allow" to deny.',
      //     buttonPositive: 'Allow',
      //     buttonNegative: "Don't allow",
      //   },
      // );

      // If SMS permission not granted, return false
      // if (smsPermission !== PermissionsAndroid.RESULTS.GRANTED) {
      //   return false;
      // }

      // 2. Request location permission
      // const locationPermission = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      //   {
      //     title: 'Allow BWorth to access this device\'s location?',
      //     message:
      //       'BWorth needs your location to provide pickup scheduling and ' +
      //       'nearby drop-off options.\n\n' +
      //       'Tap "While using the app" to allow precise location.\n\n' +
      //       'Tap "Don\'t allow" to deny.',
      //     buttonPositive: 'While using the app',  // Shown on older Android versions
      //     buttonNegative: "Don't allow",
      //   },
      // );
      // console.log('locationPermission result =>', locationPermission);
      // If location permission not granted, return false
      // if (locationPermission !== PermissionsAndroid.RESULTS.GRANTED) {
      //   return false;
      // }

      // Both permissions were granted
      return true;
    } catch (err) {
      console.warn('Permission request error:', err);
      return false;
    }
  }
  const isFocused = useIsFocused(); // ✅ added
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Allow BWorth to access this device's location?",
            message:
              'BWorth needs your location to provide pickup scheduling and ' +
              'nearby drop-off options.\n\n' +
              'Tap "While using the app" to allow precise location.\n\n' +
              'Tap "Don\'t allow" to deny.',
            buttonPositive: 'While using the app',
            buttonNegative: "Don't allow",
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              console.log('Latitude:', position.coords.latitude);
              console.log('Longitude:', position.coords.longitude);
            },
            error => {
              console.log('Location error:', error);
              ToastAndroid.show('Failed to get location', ToastAndroid.SHORT);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          ToastAndroid.show('Location permission denied', ToastAndroid.SHORT);
        }
      })();
    }, []),
  );
  // useFocusEffect(
  //   React.useCallback(() => {
  //     (async () => {

  //       Geolocation.getCurrentPosition(
  //         async position => {
  //           const { latitude, longitude } = position.coords;
  //           const GOOGLE_API_KEY = 'AIzaSyAB_BiabQVCPTNCPgbszH4XXypbJImS4HE';
  //           console.log('Current position:', position);

  //           const geocodeResponse = await fetch(
  //             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`,
  //           );

  //           const locationData = await geocodeResponse.json();
  //           console.log('Location Data:', locationData);
  //         },
  //         error => {
  //           console.log('Location error:', error);
  //           ToastAndroid.show('Unable to get location', ToastAndroid.SHORT);
  //         },
  //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //       );
  //     })();
  //   }, [])
  // );

  const handleSubmit = async () => {
    try {
      if (!phoneNumber) {
        ToastAndroid.show(
          'Please Enter A Valid Mobile Number',
          ToastAndroid.SHORT,
        );
        return;
      }
      if (phoneNumber.length < 10) {
        ToastAndroid.show(
          'Please Enter A Valid 10 digit Mobile Number',
          ToastAndroid.SHORT,
        );
        return;
      }
      setLoading(true);
      const endpoint = 'addPhoneNumber';
      // console.log(phoneNumber);
      const data = {
        phoneNumber: phoneNumber,
      };

      try {
        const response = await Api.postRequest(endpoint, JSON.stringify(data));
        console.log(JSON.stringify(response, null, 2));
        if (response?.message === 'API successful' || response.data) {
          await storage.setItem(storage.PHONE, phoneNumber);
          const grantedAll = await requestAppPermissions();
          if (grantedAll) {
            sendSms(response?.data?.otp, phoneNumber, response?.data?.id);
          }
          // sendSms(response?.data?.otp, phoneNumber, response?.data?.id);
        } else {
          // If denied either SMS or Location => do not navigate
          setLoading(false);
          ToastAndroid.show(
            'Permission denied. Cannot proceed without SMS & Location permissions.',
            ToastAndroid.SHORT,
          );
        }
      } catch (error) {
        setLoading(false);
        console.error(error.message);
        ToastAndroid.show('addPhoneNumber Failed', ToastAndroid.SHORT);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };
  const sendSms = async (otp, number, id) => {
    try {
      // let appHash = 'fceInZIjYnG'; // Replace with your actual hash
      // let appHash = 'dKARBCC6ptW';
      let appHash = 'wW5Oq+Y/aa+';
      let encodedHash = encodeURIComponent(appHash);
      let data = new FormData();
      data.append('userid', 'bworth');
      data.append('password', 'Tech@1234');
      data.append('mobile', number);
      data.append('senderid', 'BWOTP');
      data.append('dltEntityId', '1701172561388054207');
      data.append(
        'msg',
        `<#> Hi User, Your OTP for login/registration is ${otp}. Powered by Bworth Technologies ${encodedHash}`,
      );
      data.append('sendMethod', 'quick');
      data.append('msgType', 'unicode');
      data.append('dltTemplateId', '1707176112448216411');
      data.append('output', 'json');
      data.append('duplicatecheck', 'true');

      const response = await axios.post(
        'https://alerts.cbis.in/SMSApi/send',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      // console.log(JSON.stringify(response, null, 2));
      if (
        response.data.statusCode == 200 ||
        response.data?.status == 'success'
      ) {
        navigation.navigate('OTPVerification', {otp, number, userId: id});
        ToastAndroid.show('Otp Sent', ToastAndroid.SHORT);
        setLoading(false);
      }
    } catch (errr) {
      console.log(errr);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      }}>
      {loading && <Loader />}
      <View style={{height: '20%'}} />
      <View style={{marginVertical: 10}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: '#444',
            textAlign: 'center',
            marginBottom: 15,
          }}>
          Enter Phone Number
        </Text>

        <TextInput
          style={{
            height: hp(6),
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: wp(6),
            paddingHorizontal: 10,
            fontSize: 16,
            backgroundColor: '#fff',
            paddingLeft: '6%',
            fontWeight: '500',
            color: '#000',
          }}
          value={phoneNumber}
          placeholderTextColor={'#95989A'}
          onChangeText={setPhoneNumber}
          placeholder="+91 55 99 66 33 88"
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>
      {/* <Text
        style={{
          fontSize: 15,
          textAlign: 'center',
          color: '#ABABAB',
          marginTop: 20,
        }}>
        Generate OTP
      </Text> */}
      {/* <LinearGradient
        style={{ height: hp(6), borderRadius: wp(6), marginTop: 30 }}
        colors={["#2AAFE5", "#4370F0"]}//2AAFE5
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <TouchableOpacity onPress={handleSubmit} style={{
          height: '100%', width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold'
          }}>Send</Text>
        </TouchableOpacity>
      </LinearGradient> */}
      <Button
        style={{
          marginTop: 30,
        }}
        background
        title="Generate OTP"
        onPress={handleSubmit}
      />

      <View style={{alignItems: 'center', marginVertical: 10}}>
        <Text
          style={{
            fontSize: 20,
            color: '#2AAFE5',
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          or
        </Text>
      </View>

      {/* <TouchableOpacity
         onPress={facebookLogin}
        // onPress={async () => {
        //   const data = await onFacebookButtonPress();
        //   console.log(data);
        // }}
        style={{height: hp(7), width: '60%', alignSelf: 'center'}}>
        <Image
          resizeMode="contain"
          source={require('../../assets/fbIcon.png')}
          style={{height: '100%', width: '100%'}}
        />
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={async () => {
          console.log('[GGL] Tap → starting Google sign-in');
          try {
            const data = await onGoogleButtonPress();
            const rawUid = data?.user?.uid || '';
            const loginId = onlyDigits(rawUid) || String(Date.now());
            console.log('[GGL] Success user =>', {
              uid: rawUid,
              loginIdDigits: loginId,
              email: data?.user?.email,
              name: data?.user?.displayName,
            });

            // const loginId = data?.user?.uid;

            const postdata = {
              loginId,
              fullname: data?.user?.displayName || '',
              email: data?.user?.email || '',
              image: data?.user?.photoURL || '',
            };
            console.log('[GGL] Posting to API addSocialLogin =>', postdata);

            const endpoint = 'addSocialLogin';
            const resp = await Api.postRequest(endpoint, postdata);
            console.log('[GGL] API response =>', resp);

            await storage.setItem(storage.EMAIL, data?.user?.email || '');
            await storage.setItem(storage.use_id, loginId);

            navigation.navigate('currentLocation');
          } catch (e) {
            // Log EVERYTHING we can
            console.log('[GGL][ERR] raw =>', e);
            console.log('[GGL][ERR] code =>', e?.code);
            console.log('[GGL][ERR] message =>', e?.message);
            try {
              console.log('[GGL][ERR] json =>', JSON.stringify(e));
            } catch {}

            // Friendly toast
            let hint = '';
            if (e?.code === statusCodes.SIGN_IN_CANCELLED)
              hint = ' (cancelled)';
            else if (e?.code === statusCodes.IN_PROGRESS)
              hint = ' (already in progress)';
            else if (e?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
              hint = ' (Play Services)';
            ToastAndroid.show(`Google login failed${hint}`, ToastAndroid.SHORT);
          }
        }}
        style={{height: hp(8), width: '60%', alignSelf: 'center'}}>
        <Image
          resizeMode="contain"
          source={require('../../assets/gIcon.png')}
          style={{height: '100%', width: '100%'}}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={async () => {
          const data = await onGoogleButtonPress();
          console.log("g---");
          if (data?.user) {
            const numericLoginId = data?.user?.uid.replace(/\D/g, ''); // Removes non-numeric characters
            const postdata = {
              loginId: numericLoginId,
              fullname: data?.user?.displayName,
              email: data?.user?.email,
              image:  data?.user?.photoURL
            };
            console.log('Post data:', postdata);

            const endpoint = 'addSocialLogin';
            const response = await Api.postRequest(endpoint, postdata);
            console.log("response---id",numericLoginId);
            // Save email to local storage
  await storage.setItem(storage.EMAIL, data?.user?.email);
  await storage.setItem(storage.use_id, numericLoginId);
            console.log("google login");
            navigation.navigate('currentLocation');
          }
        }}
        style={{height: hp(8), width: '60%', alignSelf: 'center'}}>
        <Image
          resizeMode="contain"
          source={require('../../assets/gIcon.png')}
          style={{height: '100%', width: '100%'}}
        />
      </TouchableOpacity> */}
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
    </View>
  );
};
