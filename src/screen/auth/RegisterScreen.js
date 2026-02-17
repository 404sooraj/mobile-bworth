import React, { useState,useEffect } from 'react';
import { Button, Modal,Image, ImageBackground,StyleSheet, input,Text, View, Pressable,TextInput,SafeAreaView, TouchableOpacity,ScrollView,ToastAndroid } from 'react-native';
import styles from '../utils/Styles'
export default  function RegisterScreen({ navigation }) {
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
          ToastAndroid.show('Registration failed. Please try again.', ToastAndroid.SHORT);
          return;
        }
  
        // Registration successful, navigate to login screen
        ToastAndroid.show('Registration successful.', ToastAndroid.SHORT);
        navigation.navigate('Login');
      } catch (error) {
        console.error('An error occurred during registration:', error);
        ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.SHORT);
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
  