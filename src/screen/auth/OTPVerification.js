import React, {useState, useEffect, useRef} from 'react';
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
  FlatList,
  Linking,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
// import SmsListener from 'react-native-android-sms-listener';
import SmsRetriever from 'react-native-sms-retriever';
import styles from '../utils/Styles';
import {heightPercent as hp, widthPrecent as wp} from '../utils/responsive';
import LinearGradient from 'react-native-linear-gradient';
import OTPTextView from 'react-native-otp-textinput';
import Api from '../../redux/Api';
import Loading from '../../custom';
import Geolocation from 'react-native-geolocation-service';

import {
  onFacebookButtonPress,
  onGoogleButtonPress,
} from '../utils/SocialSignin';

import storage from '../utils/storageService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import RNOtpVerify from 'react-native-otp-verify';

export default OTPVerification = ({route}) => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const {otp, number, userId} = route.params;
  const input = useRef(null);

  /***************************** */

  useEffect(() => {
    RNOtpVerify.getHash()
      .then(hash => {
        console.log('✅ App Hash:', hash); // This should match the one added in SMS
      })
      .catch(err => console.log('❌ Hash Error:', err));
  }, []);

  /***************************** */
  // async function requestAppPermissions() {
  //   try {
  //     console.log('Requesting app permissions...');

  //     // You can request location or camera here if needed,
  //     // but SMS permission is NOT required for OTP auto-read.
  //     // Example (if needed later):
  //     // const locationPermission = await PermissionsAndroid.request(
  //     //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     //   {
  //     //     title: 'Allow BWorth to access location?',
  //     //     message:
  //     //       'BWorth uses your location for pickup scheduling and nearby options.',
  //     //     buttonPositive: 'Allow',
  //     //     buttonNegative: 'Deny',
  //     //   },
  //     // );

  //     // Initialize SMS Retriever
  //     const smsRetrieverStarted = await SmsRetriever.startSmsRetriever();
  //     if (!smsRetrieverStarted) {
  //       console.warn('Failed to start SMS Retriever');
  //       ToastAndroid.show('Unable to start OTP listener', ToastAndroid.SHORT);
  //       return false;
  //     }

  //     console.log('SMS Retriever started successfully');

  //     // Listen for incoming SMS
  //     const subscription = SmsRetriever.addSmsListener(event => {
  //       const otpRegex = /\b\d{4,6}\b/; // 4-6 digit OTP pattern
  //       const otp = event.message.match(otpRegex)?.[0];

  //       if (otp) {
  //         console.log('OTP received:', otp);
  //         setPhoneNumber(otp);
  //         input?.current?.setValue(otp);
  //         ToastAndroid.show('OTP auto-filled', ToastAndroid.SHORT);
  //       }
  //     });

  //     // Clean up on unmount
  //     return () => {
  //       subscription.remove();
  //     };
  //   } catch (err) {
  //     console.warn('Permission request error:', err);
  //     ToastAndroid.show('Error initializing permissions', ToastAndroid.SHORT);
  //     return false;
  //   }
  // }
  // // const requestSmsPermission = async () => {
  // //   try {
  // //     const granted = await PermissionsAndroid.request(
  // //       PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
  // //       {
  // //         title: 'Receive SMS Permission',
  // //         message: 'App needs access to read SMS to auto-detect OTP',
  // //         buttonPositive: 'Allow',
  // //         buttonNegative: 'Deny',
  // //       },
  // //     );
  // //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  // //       return true;
  // //     } else {
  // //       ToastAndroid.show('SMS read permission denied', ToastAndroid.SHORT);
  // //       return false;
  // //     }
  // //   } catch (err) {
  // //     console.warn('Permission request error:', err);
  // //     return false;
  // //   }
  // // };

  // useEffect(() => {
  //   requestAppPermissions();
  // }, []);

  useEffect(() => {
    console.log('📡 useEffect triggered - setting up SMS Retriever');
    const setupRetriever = async () => {
      try {
        const started = await SmsRetriever.startSmsRetriever();
        console.log('🔌 SMS Retriever started:', started);
        if (!started) {
          console.log('⚠️ SMS Retriever could NOT start.');
          return;
        }

        SmsRetriever.addSmsListener(event => {
          if (!event || !event.message) {
            return;
          }
          console.log('📩 SMS Received:', event.message);
          const otp = event.message.match(/\b\d{4,6}\b/)?.[0];
          if (!otp) {
          } else {
            input.current?.setValue(otp);
            ToastAndroid.show('OTP auto-filled', ToastAndroid.SHORT);
          }
          try {
            SmsRetriever.removeSmsListener();
          } catch (removeErr) {}
        });
      } catch (error) {
        console.log('❌ Error in SMS Retriever:', error);
      }
    };
    setupRetriever();
    return () => {
      try {
        SmsRetriever.removeSmsListener();
      } catch (err) {
        alert();
        console.warn('Failed to remove SMS listener', err);
      }
    };
  }, []);

  const handleSubmit = async () => {
    try {
      if (!phoneNumber) {
        ToastAndroid.show('Please Enter Valid Opt', ToastAndroid.SHORT);
        return;
      }
      if (phoneNumber.length < 4) {
        ToastAndroid.show('Please Enter Valid Opt', ToastAndroid.SHORT);
        return;
      }
      setLoading(true);
      const data = {
        loginId: userId,
        otp: phoneNumber,
      };
      const endpoint = 'addOtp';
      const res = await Api.postRequest(endpoint, JSON.stringify(data));
      if (res?.message === 'OTP log created successfully') {
        await storage.setItem(storage.use_id, userId);
        //----c
        navigation.reset({
          index: 0,
          routes: [{name: 'Sell'}],
        });
      } else {
        ToastAndroid.show(res?.message, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      ToastAndroid.show('Invalid otp', ToastAndroid.SHORT);
    }
  };

  const resendOpt1 = async () => {
    setLoading(true);
    const endpoint = 'addPhoneNumber';
    const data = {
      phoneId: 1,
      phoneNumber: number,
      isActive: 1,
      createdBy: 1,
      updatedBy: 1,
    };

    const response = await Api.postRequest(endpoint, JSON.stringify(data));
    // console.log('this is response', response);
    if (response?.message === 'API successful') {
      navigation.navigate('OTPVerification', {phone: phoneNumber});
      ToastAndroid.show('Opt sent', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('failed to send otp', ToastAndroid.SHORT);
    }
    setLoading(false);
  };
  const resendOpt = async () => {
    await AsyncStorage.clear();
    try {
      if (!number) {
        ToastAndroid.show(
          'Please Enter A Valid Mobile Number',
          ToastAndroid.SHORT,
        );
        return;
      }
      if (number.length < 10) {
        ToastAndroid.show(
          'Please Enter A Valid 10 digit Mobile Number',
          ToastAndroid.SHORT,
        );
        return;
      }
      setLoading(true);
      const endpoint = 'addPhoneNumber';
      const data = {
        phoneNumber: number,
      };

      const response = await Api.postRequest(endpoint, JSON.stringify(data));
      if (response?.message === 'API successful' || response.data) {
        await storage.setItem(storage.PHONE, number);
        sendSms(response?.data?.otp, number, response?.data?.id);
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
      data.append('msgType', 'text');
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
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1, padding: 20, backgroundColor: '#f5f5f5'}}>
      {loading && <Loading />}
      <View style={{height: '20%'}} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          color: '#444',
          textAlign: 'center',
          marginBottom: 15,
        }}>
        Enter OTP Number
      </Text>

      <View style={{marginBottom: 20, width: '100%', alignItems: 'center'}}>
        <OTPTextView
          ref={input}
          containerStyle={{}}
          textInputStyle={{
            height: hp(6),
            width: hp(6),
            borderWidth: 1,
            marginLeft: wp(5),
            borderColor: '#444444',
            borderRadius: hp(3),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          handleTextChange={ter => {
            setPhoneNumber(ter);
          }}
          handleCellTextChange={() => {
            'ok';
          }}
          offTintColor={'#444444'}
          tintColor={'#444444'}
          inputCount={4}
          keyboardType="numeric"
        />
      </View>

      <Text style={{textAlign: 'center', color: '#4444', marginBottom: 20}}>
        If you didn't receive a code,{' '}
        <Text
          onPress={resendOpt}
          style={{color: '#007bff', fontWeight: 'bold'}}>
          Resend
        </Text>
      </Text>

      <LinearGradient
        style={{height: hp(6), borderRadius: wp(6), marginTop: 20}}
        colors={['#2AAFE5', '#4370F0']} //2AAFE5
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
