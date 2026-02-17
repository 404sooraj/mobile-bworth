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
  Linking,
  Dimensions,
} from 'react-native';
import { widthPrecent as wp, heightPercent as hp } from '../utils/responsive';

import React from 'react';
import Styles from '../utils/Styles';

export default HomeScreen = ({ navigation }) => {
  const navigateToLogin = () => {
    // navigation.navigate('PhoneVerification');
    // MyOrders

    navigation.navigate('PhoneVerification');
  };
  const navigateToRegister = () => {
    navigation.navigate('PhoneVerification');
  };
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: "center",
      padding: 20
    }}>
      <View style={{ width: "100%", height: Dimensions.get("screen").height * 0.4 }}>
        <Image style={{ width: "100%", height: "100%" }} source={require('../../assets/Home.jpeg')} />
      </View>

      <Image
        source={require('../../assets/BWORTH.jpeg')}
        style={{ width: "100%", height: Dimensions.get("screen").height * 0.1, marginTop: 20 }}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginVertical: 20,
        }}>
        Welcome
      </Text>

      <TouchableOpacity onPress={navigateToLogin} style={pageStyle.button}>
        <Text style={pageStyle.text}>Get Started</Text>
      </TouchableOpacity>

      <Pressable onPress={() => Linking.openURL("https://drive.google.com/file/d/1qs46gS7o2x0BVUR3KXB-OhxJDE1nqsHb/preview")}>
        <Text style={{ fontSize: 13, fontWeight: 'bold', marginTop: 20 }}>
          Terms & Condition
        </Text>
      </Pressable>

    </View>
  );
};
// const styles = Style
const pageStyle = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: wp(1),
    padding: hp(1.7),
    width: "100%",
    marginLeft: 10,
    borderColor: '#BABABA', // Added border color
    borderWidth: 1,
    marginBottom: 10,
  },
});
