import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Modal,
  Image,
  Linking,
  ImageBackground,
  StyleSheet,
  input,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../utils/Styles';
import DashBordHeader from '../../components/DashBordHeader';
import Button from '../../components/Button';
import {heightPercent as hp, widthPrecent as wp} from '../utils/responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Api from '../../redux/Api';
import storage from '../utils/storageService';
import Loading from '../../custom';
import {onGoogleSignOut} from '../utils/SocialSignin';
export default Profile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const handleContact = () => {
    Linking.openURL(
      'https://api.whatsapp.com/send/?phone=+918826668050&text=Hello+I+would+like+to+connect+with+you&type=phone_number&app_absent=0',
    );
  };
  const handleMyOrders = async () => {
    try {
      setLoading(true);
      const user_id = await storage.getItem(storage.use_id);
      const endPoint = `getMyOrderById?loginId=${user_id}`;
      const responose = await Api.getRequest(endPoint);

      // console.log('📦 My Orders API Response:', responose);

      if (
        !responose?.data ||
        (Array.isArray(responose.data) && responose.data.length === 0) ||
        (typeof responose.data === 'object' &&
          Object.keys(responose.data).length === 0)
      ) {
        // console.log('⚠️ No orders found for this user:', user_id);
        ToastAndroid.show('No orders found', ToastAndroid.SHORT);
      } else {
        console.log('✅ Orders found:', responose.data);
        navigation.navigate('MyOrders', {
          data: responose.data,
        });
      }
    } catch (err) {
      console.log('❌ handleMyOrders error:', err);
      navigation.navigate('MyOrders', {data: []});
    } finally {
      setLoading(false);
    }
  };

  // const handleMyOrders = async () => {
  //   try {
  //     setLoading(true);
  //     const user_id = await storage.getItem(storage.use_id);
  //     const endPoint = `getMyOrderById?loginId=${user_id}`;
  //     // const endPoint = 'getMyOrders';
  //     const responose = await Api.getRequest(endPoint);
  //     console.log(responose.data);
  //     if (responose?.data) {
  //       navigation.navigate('MyOrders', {data: responose?.data});
  //     } else {
  //       ToastAndroid.show('No orders found', ToastAndroid.SHORT);
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //     navigation.navigate('MyOrders', { data: [] });
  //     // ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  //   }
  // };

  const handleTokenHistory = async () => {
    try {
      setLoading(true);
      const user_id = await storage.getItem(storage.use_id);
      const endPoint = `getTokenTransactionById?loginId=${user_id}`;
      const responose = await Api.getRequest(endPoint);
      console.log('this is respomnse', responose);
      if (responose?.data) {
        navigation.navigate('TokenTransaction', {data: responose?.data});
      } else {
        ToastAndroid.show('No data Found', ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };
  const handleBuyBackHistory = async () => {
    try {
      setLoading(true);

      const endPoint = 'getBuyBackPolicies';
      const resp = await Api.getRequest(endPoint);

      // Normalize possible shapes:
      // A) resp = { data: [...], message: 'API success' }
      // B) resp = { data: { data: [...], message: 'API success' } }
      const payload = Array.isArray(resp?.data)
        ? resp
        : resp?.data &&
          (Array.isArray(resp?.data?.data) ||
            typeof resp?.data?.data === 'object')
        ? resp.data
        : resp;

      const policies = Array.isArray(payload?.data) ? payload.data : [];

      if (policies.length === 0) {
        ToastAndroid.show('No policies found', ToastAndroid.SHORT);
      } else {
        // ✅ Navigate with clean/expected data
        navigation.navigate('BuyBackPolicies', {data: policies});
      }
    } catch (err) {
      console.log('getBuyBackPolicies error:', err);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  // const handleBuyBackHistory = async () => {
  //   try {
  //     setLoading(true);
  //     const endPoint = 'getBuyBackPolicies';
  //     const responose = await Api.getRequest(endPoint);
  //     if (responose?.data) {
  //       console.log('this is buy back policies', responose);
  //       // navigation.navigate('BuyBackPolicies', {data: responose?.data});
  //     } else {
  //       ToastAndroid.show('No policies found', ToastAndroid.SHORT);
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //     ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  //   }
  // };
  const focused = useIsFocused();
  useEffect(() => {
    if (focused) {
      handleSettings(true);
    }
  }, [focused]);
  const [profile, setProfile] = useState('');
  const [phone, setPhone] = useState('');
  const [EEmail, setEmail] = useState('');
  const handleSettings = async bool => {
    const phone = await storage.getItem(storage.PHONE);

    const EEmail = await storage.getItem(storage.EMAIL);
    if (phone) {
      setPhone(phone.toString());
    }
    if (EEmail) {
      setEmail(EEmail.toString());
    }
    try {
      setLoading(true);
      const id = await storage.getItem(storage.use_id);
      const endPoint = `getProfileSettingById?loginId=${id}`;
      const response = await Api.getRequest(endPoint);
      console.log('this is profile response,', response);
      if (response?.data) {
        if (!bool) {
          navigation.navigate('Settings', {data: response?.data});
        } else {
          setProfile(response.data);
        }
      } else {
        // ToastAndroid.show('No data found', ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (er) {
      console.log('here');
      console.log(er);
      setLoading(false);
      if (!bool) {
        navigation.navigate('Settings', {data: {}});
      } else {
        setProfile('');
      }
      // ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };
  const handleFAQ = async () => {
    try {
      setLoading(true);
      const endPoint = 'getFAQs';
      const responose = await Api.getRequest(endPoint);
      if (responose.data) {
        navigation.navigate('FAQ1', {data: responose?.data});
      } else {
        ToastAndroid.show('No FAQs found', ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (er) {
      console.log(er);
      setLoading(false);

      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };
  // https://bworth.co.in/privacypolicy
  const handlePrivacy = async () => {
    Linking.openURL('https://bworth.co.in/privacypolicy');
  };

  const handleSubmit = async type => {
    const data = {
      sellerId: 1,
      sell: 1,
      isActive: 1,
      createdBy: 1,
      updatedBy: 1,
    };
    const endpoint = 'addSellClothe';
    const response = await Api.postRequest(endpoint, JSON.stringify(data));
    if (response.message === 'Sell clothes added successfully') {
      navigation.navigate('wardrobe');
    } else {
      ToastAndroid.show('Sell clothes error', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <DashBordHeader />
      {loading && <Loading />}
      <ScrollView style={{backgroundColor: '#ffff'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            marginLeft: 20,
          }}>
          {profile == '' ? (
            <Button
              background={true}
              // isChildren={profile === ''}
              style={{
                width: 70,
                height: 70,
                overflow: 'hidden',
                // backgroundColor: '#004CFF',
                borderRadius: 35,
              }}></Button>
          ) : (
            <View style={{height: 70, width: 70, borderRadius: 35}}>
              <Image
                style={{height: '100%', width: '100%', borderRadius: 35}}
                source={{uri: profile?.profileImage}}
              />
            </View>
          )}
          <Text
            style={{
              flex: 1,
              paddingLeft: 20,
              fontWeight: 'bold',
              fontSize: 25,
              color: '#333',
            }}>
            {profile?.firstName && profile?.lastName
              ? `${profile.firstName} ${profile.lastName}`
              : EEmail
              ? EEmail
              : phone}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleSettings();
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            // borderRadius: 10,
            marginLeft: 10,
            marginRight: 20,
            // shadowColor: '#000',
            // shadowOffset: {width: 0, height: 2},
            // shadowOpacity: 0.1,
            // shadowRadius: 5,
            // elevation: 3,
            height: hp(6),
            // borderWidth: 1,
            marginTop: 20,
          }}>
          <Text style={{marginLeft: 10}}>⚙️</Text>
          <Text
            style={{
              flex: 1,
              paddingLeft: 20,
              fontWeight: 'bold',
              color: '#484848',
            }}>
            Profile Settings
          </Text>
          <AntDesign name="right" size={16} color={'#484848'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleMyOrders}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            // borderRadius: 10,
            marginLeft: 10,
            marginRight: 20,

            // shadowColor: '#000',
            // shadowOffset: {width: 0, height: 2},
            // shadowOpacity: 0.1,
            // shadowRadius: 5,
            // elevation: 3,
            height: hp(6),
            // borderWidth: 1,
            marginTop: 20,
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
          <AntDesign name="right" size={16} color={'#484848'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleTokenHistory}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            // borderRadius: 10,
            marginLeft: 10,
            marginRight: 20,
            // shadowColor: '#000',
            // shadowOffset: {width: 0, height: 2},
            // shadowOpacity: 0.1,
            // shadowRadius: 5,
            // elevation: 3,
            height: hp(6),
            // borderWidth: 1,
            marginTop: 20,
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
          <AntDesign name="right" size={16} color={'#484848'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBuyBackHistory}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            // borderRadius: 10,
            marginLeft: 10,
            marginRight: 20,
            // shadowColor: '#000',
            // shadowOffset: {width: 0, height: 2},
            // shadowOpacity: 0.1,
            // shadowRadius: 5,
            // elevation: 3,
            height: hp(6),
            // borderWidth: 1,
            marginTop: 20,
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
          <AntDesign name="right" size={16} color={'#484848'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleFAQ}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            // borderRadius: 10,
            marginLeft: 15,
            marginRight: 20,
            // shadowColor: '#000',
            // shadowOffset: {width: 0, height: 2},
            // shadowOpacity: 0.1,
            // shadowRadius: 5,
            // elevation: 3,
            height: hp(6),
            // borderWidth: 1,
            marginTop: 20,
          }}>
          <Icon name="inbox" size={18} color="black" style={{marginLeft: 10}} />
          <Text
            style={{
              flex: 1,
              paddingLeft: 20,
              fontWeight: 'bold',
              color: '#484848',
            }}>
            FAQs
          </Text>
          <AntDesign name="right" size={16} color={'#484848'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Privacy');
          }}
          // onPress={handlePrivacy}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            // borderRadius: 10,
            marginLeft: 15,
            marginRight: 20,
            // shadowColor: '#000',
            // shadowOffset: {width: 0, height: 2},
            // shadowOpacity: 0.1,
            // shadowRadius: 5,
            // elevation: 3,
            height: hp(6),
            // borderWidth: 1,
            marginTop: 20,
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
          <AntDesign name="right" size={16} color={'#484848'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Sell', {type: 'yes'});
            handleSubmit();
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            // borderRadius: 10,
            marginLeft: 15,
            marginRight: 20,
            // shadowColor: '#000',
            // shadowOffset: {width: 0, height: 2},
            // shadowOpacity: 0.1,
            // shadowRadius: 5,
            // elevation: 3,
            height: hp(6),
            // borderWidth: 1,
            marginTop: 20,
          }}>
          <Icon name="inbox" size={18} color="black" style={{marginLeft: 10}} />
          <Text
            style={{
              flex: 1,
              paddingLeft: 20,
              fontWeight: 'bold',
              color: '#484848',
            }}>
            Sell Your Old Cloths
          </Text>
          <AntDesign name="right" size={16} color={'#484848'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Confirm Logout',
              'Are you sure you want to log out?',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Logout cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: async () => {
                    await storage.clear();
                    await onGoogleSignOut();
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'PhoneVerification'}],
                    });
                  },
                },
              ],
              {cancelable: true},
            );
          }}
          // onPress={async () => {
          //   await storage.clear();
          //   await onGoogleSignOut();
          //   navigation.reset({index: 0, routes: [{name: 'PhoneVerification'}]});
          // }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            // borderRadius: 10,
            marginLeft: 15,
            marginRight: 20,
            // shadowColor: '#000',
            // shadowOffset: {width: 0, height: 2},
            // shadowOpacity: 0.1,
            // shadowRadius: 5,
            // elevation: 3,
            height: hp(6),
            // borderWidth: 1,
            marginTop: 20,
          }}>
          <Icon name="lock" size={18} color="black" style={{marginLeft: 10}} />
          <Text
            style={{
              flex: 1,
              paddingLeft: 20,
              fontWeight: 'bold',
              color: '#484848',
            }}>
            Log Out
          </Text>
          <AntDesign name="right" size={16} color={'#484848'} />
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
              //   shadowColor: '#000',
              //   shadowOffset: {width: 0, height: 2},
              //   shadowOpacity: 0.1,
              //   shadowRadius: 5,
              //   elevation: 3,
            }}
            onPress={handleContact}>
            <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}>
              📞 Contact Us
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 35,
              padding: 10,
              width: '45%',
              alignItems: 'center',
              borderColor: '#BABABA',
              borderWidth: 1,
              //   shadowColor: '#000',
              //   shadowOffset: {width: 0, height: 2},
              //   shadowOpacity: 0.1,
              //   shadowRadius: 5,
              //   elevation: 3,
            }}>
            <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}>
              ⭐ Rate Us
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};
