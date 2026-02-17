import React, { useState, useEffect } from 'react';
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
import styles from '../utils/Styles'
export default function LoginScreen({ navigation }) {
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
      ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.SHORT);
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
      <TouchableOpacity  
      onPress={()=>{
        navigation.navigate('Dashboard')
      }}
      >
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <Text style={styles.signUp}>
        Don't have an account? <Text style={styles.signUpLink} onPress={navigateToRegister}>Sign Up</Text>
      </Text>
    </View>
  );
}