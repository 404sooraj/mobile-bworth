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
import styles from '../utils/Styles';
// import renderInputField from '../common/renderInputField';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {widthPrecent as wp, heightPercent as hp} from '../utils/responsive';
import RenderInputField from '../common/renderInputField';
import storage from '../utils/storageService';
import Api from '../../redux/Api';
import Loading from '../../custom';
import {launchImageLibrary} from 'react-native-image-picker'; // Import the image picker

console.log('Width Percent Function:', wp);
console.log('Height Percent Function:', hp);
export default Settings = ({navigation, route}) => {
  const data = route?.params?.data ?? [];

  const [imageUri, setImageUri] = useState('');
  const [laoding, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [defaulInputS, setDefaultInput] = useState({
    phone: '',
    address: '',
  });
  useEffect(() => {
    fetchProfileData();
    gesome();
  }, []);

  const fetchProfileData = async () => {
    try {
      const id = await storage.getItem(storage.use_id);
      console.log('ïd--', id);
      // Fetch the profile data
      const response = await fetch(
        `https://bworth.co.in/api/bworth/getProfileSettingById?loginId=${id}`,
      );

      if (!response.ok) {
        console.error('Failed to fetch profile data:', response.status);
        return;
      }

      const profileData = await response.json();

      // Check if the profile data contains valid information
      if (profileData && profileData.data) {
        const {
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          address,
          profileImage,
        } = profileData.data;

        setInputs({
          firstName: firstName || '',
          lastName: lastName || '',
          email: emailAddress || '',
          phone: phoneNumber ? phoneNumber.toString() : '',
          address: address || '',
        });
        // Set the profile image URI
        setImageUri(profileImage || 'https://defaultimageurl.com');
        console.log('Profile data successfully fetched:', profileData.data);
      } else {
        console.log('No profile data found for the given loginId');
        ToastAndroid.show('No profile data found', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      ToastAndroid.show('Failed to fetch profile data', ToastAndroid.SHORT);
    }
  };

  const gesome = async () => {
    const phone = await storage.getItem(storage.PHONE);
    const address = await storage.getItem(storage.Address);
    console.log(phone);

    setDefaultInput({
      phone: phone.toString() ?? '',
      address: address ?? '',
    });
  };
  useEffect(() => {
    setInputs(prev => ({
      ...prev,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.emailAddress,
      phone: data?.phoneNumber
        ? data?.phoneNumber.toString()
        : defaulInputS.phone,
      address: data?.address ? data?.address : defaulInputS.address,
    }));
  }, [defaulInputS]);
  const handlePickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 300, // Optional: Resize image width
        maxHeight: 300, // Optional: Resize image height
        quality: 1, // Set quality of image
      });

      if (result?.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        console.log('Selected image:', selectedImage.uri);
        setImageUri(selectedImage.uri);
      } else {
        ToastAndroid.show('No image selected', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      ToastAndroid.show('Error picking image', ToastAndroid.SHORT);
    }
  };

  const handleOnChange = (key, value) => {
    setInputs(prev => ({...prev, [key]: value}));
  };
  const validateInputs = () => {
    const {firstName, lastName, email, phone, address} = inputs;

    if (firstName?.trim() === '' && firstName.length !== 0) {
      ToastAndroid.show('First name is required', ToastAndroid.SHORT);
      return false;
    }

    // if (lastName.trim() === '') {
    //   ToastAndroid.show('Last name is required', ToastAndroid.SHORT);
    //   return false;
    // }

    if (
      !email?.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) &&
      email
    ) {
      ToastAndroid.show('Invalid email address', ToastAndroid.SHORT);
      return false;
    }
    if (!/^\d{10}$/.test(inputs.phone) && phone) {
      ToastAndroid.show('Phone number should be 10 digits', ToastAndroid.SHORT);
      return false;
    }
    return true;
  };
  const handleOnSubmit = async () => {
    try {
      const id = await storage.getItem(storage.use_id);
      if (validateInputs()) {
        setLoading(true);
        const normalize = value =>
          value === '' || value === undefined ? null : value;
        const sendApi = {
          loginId: Number(id),
          profileImage: normalize(imageUri),
          firstName: normalize(inputs.firstName),
          lastName: normalize(inputs.lastName),
          emailAddress: normalize(inputs.email),
          phoneNumber:
            inputs.phone === '' || inputs.phone === undefined
              ? null
              : Number(inputs.phone),
          address: normalize(inputs.address),
        };
        console.log(sendApi);
        const endPoint = 'addProfileSetting';
        const res = await Api.postRequest(endPoint, sendApi);
        console.log('this issi', res);

        if (res.data) {
          ToastAndroid.show('Profile Updated', ToastAndroid.SHORT);
          navigation.goBack();
        } else {
          ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
        }
        setLoading(false);
      }
    } catch (err) {
      console.log('message', err.message);
      setLoading(false);
      ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
    }
  };
  return (
    <View style={{flex: 1}}>
      <Header />
      {laoding && <Loading />}
      <View
        style={{flex: 1, backgroundColor: '#F7F7F7', paddingHorizontal: 20}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#000000',
          }}>
          Profile Settings
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
          }}>
          <Image
            source={{
              uri:
                imageUri ||
                'data:image/png;base64,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',
            }}
            resizeMode="contain"
            style={{
              width: hp(13),
              height: hp(13),
              marginRight: 20,
              borderRadius: hp(7.5),
              borderColor: '#BABABA',
              borderWidth: 1,
              marginLeft: '-2%',
            }}
          />
          <View style={styles.imageButtons}>
            <Button
              background={true}
              style={{
                backgroundColor: '#1DD8E0',
                borderRadius: 8,
                paddingVertical: 10,
                marginBottom: 10,
                borderColor: '#BABABA',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: wp(55),
                height: hp(5.1),
              }}
              title={'Change Photo'}
              textStyle={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}
              onPress={handlePickImage}
            />
            <TouchableOpacity
              style={{
                // backgroundColor: '#1DD8E0',
                borderRadius: 8,
                paddingVertical: 10,
                marginBottom: 10,
                borderColor: '#BABABA',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: wp(55),
                height: hp(5.1),
              }}>
              <Text
                style={{color: '#000000', fontSize: 14, fontWeight: 'bold'}}>
                Delete Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: wp(90),
            borderWidth: 0,
            justifyContent: 'space-between',
          }}>
          {/* {renderInputField('First Name', undefined, data?.firstName)} */}
          <RenderInputField
            label={'First Name'}
            value={inputs.firstName}
            onChangeText={txt => {
              handleOnChange('firstName', txt);
            }}
            width={undefined}
          />
          {/* {renderInputField('Last Name', undefined, data?.lastName)} */}
          <RenderInputField
            label="Last Name"
            width={undefined}
            value={inputs.lastName}
            onChangeText={txt => {
              handleOnChange('lastName', txt);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: wp(90),
            borderWidth: 0,
            justifyContent: 'space-between',
            marginTop: '8%',
          }}>
          <RenderInputField
            label="Email"
            width={undefined}
            value={inputs.email}
            onChangeText={txt => {
              handleOnChange('email', txt);
            }}
            keyboardType={'email'}
          />
          {/* {renderInputField('Email Address', undefined, data?.emailAddress)}
          
          {renderInputField(
            'Phone No.',
            undefined,
            data?.phoneNumber?.toString(10),
          )} */}
          <RenderInputField
            label={'Phone No.'}
            width={undefined}
            value={inputs.phone}
            onChangeText={txt => {
              handleOnChange('phone', txt);
            }}
            keyboardType={'numeric'}
            maxLength={10}
          />
        </View>
        <View style={{marginTop: '8%'}}>
          {/* {renderInputField('Address', wp(90), data?.address)} */}
          <RenderInputField
            label={'Address'}
            width={wp(90)}
            value={inputs.address}
            onChangeText={txt => {
              handleOnChange('address', txt);
            }}
          />
        </View>
        <Button
          background={true}
          onPress={handleOnSubmit}
          style={{width: wp(90), borderRadius: 5, marginTop: '15%'}}
          title={'Save'}
        />
      </View>
    </View>
  );
};
