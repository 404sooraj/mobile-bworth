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
import {
  widthPrecent as wp,
  heightPercent as hp,
  heightPercent,
} from '../utils/responsive';
import styles from '../utils/Styles';
import Button from '../../components/Button';
import Api from '../../redux/Api';

import Loading from '../../custom';
import {fas} from '@fortawesome/free-solid-svg-icons';
import storage from '../utils/storageService';

export default pickup = ({navigation, route}) => {
  const {wardrobeData = {}} = route.params || {}; // Retrieve wardrobeData from props

  const handlepickup = async token => {
    // Handle form submission logic here
    await storage.setItem(storage.token, token);
    console.log('this from function', token);

    navigation.navigate('token', {token});
  };
  const [loading, setLoading] = useState(false);

  const handleNoPress = () => {
    navigation.navigate('Dashboard');
  };
  const handleDropRequest = async () => {
    const Did = await storage.getItem(storage.use_id);
    try {
      setLoading(true);
      const endpoint = 'addDropToken';
      const data = {
        loginId: Did,
        warmClothes: wardrobeData.warmClothes,
        bedsheets: wardrobeData.bedsheets,
        anyClothes: wardrobeData.anyClothes,
        totalQuantity: wardrobeData.totalQuantity,
        confirmation: wardrobeData.confirmation,
      };

      const response = await Api.postRequest(endpoint, data);
      if (response) {
        // console.log('Drop token generated successfully:', response);
        console.log(
          'Drop token generated successfully:',
          response.data.orderId,
        );
        ToastAndroid.show(
          `Drop token generated: ${response.data.orderId}`,
          ToastAndroid.SHORT,
        );
        return response;
      } else {
        ToastAndroid.show('Error generating drop token', ToastAndroid.SHORT);
        return null;
      }
    } catch (err) {
      console.log('API call error:', err);
      ToastAndroid.show('Error with drop token generation', ToastAndroid.SHORT);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const [pickup, setPickup] = useState(true);
  return (
    <View style={[styles.container3, {paddingHorizontal: 15}]}>
      {loading && <Loading />}
      <View
        style={{
          marginTop: hp(20),
          height: '60%',
          backgroundColor: 'white',
          borderRadius: 15,
          borderColor: 'black', // Added border color
          borderWidth: 0.5,
          shadowColor: '#000', // Shadow color
          shadowOffset: {width: 0, height: 2}, // Shadow offset
          shadowOpacity: 0.25, // Shadow opacity
          shadowRadius: 3.84, // Shadow radius
          elevation: 5, // Elevation for Android
          display: 'flex',
          justifyContent: 'center',
          padding: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {/* <Text style={styles.t1}>Would you like to Pickup Or</Text>
          <Text style={styles.t2}>Drop Your Clothes</Text> */}

          {/* <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
    
             </View> */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text style={styles.t3}>
              For doorstep service, please click the "Pickup" button. A charge
              of ₹10 will apply.
            </Text>
            {/* <Text style={{fontSize: 15,
    paddingBottom: 16,
    color: '#000000',
    fontWeight: '400',paddingLeft:12}}>To drop off your wardrobe collection, please select the "Drop" button.</Text> */}
          </View>

          <View
            style={{flexDirection: 'column', justifyContent: 'space-around'}}>
            <Button
              onPress={async () => {
                navigation.navigate('locthree', {wardrobeData: wardrobeData});
              }}
              //   navigation.navigate('locthree');
              // }}
              background={true}
              style={{
                borderRadius: 45,
                padding: 10,
                marginBottom: 10,
                width: wp(80),
                height: hp(7),
                backgroundColor: 'grey',
              }}
              title={'PICKUP'}
              textStyle={{
                fontSize: 16,
                fontWeight: '400',
              }}
            />

            {/* <Button
             onPress={async () => {
                const response = await handleDropRequest(); // Replace 36 with the actual userId
                if (response) {
                  navigation.navigate('locone');
                }
              }}
              // onPress={() => {
              //   navigation.navigate('locone');
              // }}
              background={true}
              style={{
                borderRadius: 45,
                padding: 10,
                marginBottom: 10,
                width: wp(42),
                height: hp(7),
                backgroundColor: 'grey',
              }}
              title={'DROP'}
              textStyle={{
                fontSize: 14,
                fontWeight: '400',
              }}
            /> */}
          </View>

          {/* <Text
            style={{
              marginTop: '3%',
              marginRight: 150,
              fontSize: 11,
              color: '#000000',
            }}>
            **Charges of pickup is Rs. 10
          </Text> */}
        </View>
      </View>

      {/* <Button
        onPress={async () => {
          try {
            setLoading(true);
            const endpoint = 'generateTokenNumber';
            const data = {
              generatetokenNumber: 'ABER1233',
              isActive: 0,
              createdBy: 1,
              updatedBy: 1,
            };
            const response = await Api.postRequest(endpoint, data);
            if (response) {
              // console.log(response);
              ToastAndroid.show('Token Genrated', ToastAndroid.SHORT);
              console.log('this is response');

              handlepickup(response?.generatetokenNumber);
            } else {
              handlepickup('No Token');
              ToastAndroid.show(
                'error with token genration',
                ToastAndroid.SHORT,
              );
            }
            setLoading(false);
          } catch (err) {
            ToastAndroid.show('error with token genration', ToastAndroid.SHORT);
            console.log(err);
            setLoading(false);
          }
        }}
        style={{
          backgroundColor: 'white',
          borderRadius: 5,
          borderColor: '#BABABA', // Added border color
          borderWidth: 1.5, // Added border width
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          marginTop: '60%',
        }}
        title={'Generate Token'}
        textStyle={{
          fontSize: 18,
          fontWeight: '500',
          color: '#1F8FFD',
        }}
      /> */}
    </View>
  );
};
