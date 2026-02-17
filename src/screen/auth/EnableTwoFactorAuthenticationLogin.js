import React, {useState, useEffect} from 'react';
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
export default  EnableTwoFactorAuthenticationLogin = ({ navigation }) => {
    return (
       <View style={{marginTop:180}}>
      
        
         <Image
           source={require('../../assets/BWORTH.jpeg')}
           style={{
     width: 300,
       height: 100,
       marginBottom: 0,
      marginLeft:60,
       marginRight: 8, // Add right margin
   
           }}
         />
         <View style={{display:'flex',flexDirection:'row'}}>
          <View style={{}}>
               <Image
           source={require('../../assets/icon_image_john_smith_before.png')}
           style={{
     width: 100,
       height: 100,
       marginBottom: 0,marginTop:30,
      marginLeft:60,
       marginRight: 8, // Add right margin
   
           }}
         />
          </View>
       
           <Text style={{fontWeight:'bold',fontSize:15,marginLeft:0,marginTop:70}}>John smith</Text>
          </View>
       
      <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 15,padding:10,width:'80%',marginLeft:40,
       borderColor: '#BABABA', // Added border color
       borderWidth: 1,marginBottom:10,marginTop:20,height:50}}>
           <Text style={{color:'#000000',fontSize:14,fontWeight:'bold'}}>Password</Text>
         </TouchableOpacity>
      <Text style={{marginLeft:200,fontSize:11,color:'#004CFF'}}>Forgotten your password?</Text> 
        
          <TouchableOpacity  style={{backgroundColor: '#004CFF', borderRadius: 15,padding:0,width:'80%',marginLeft:40,marginTop:40,height:50,
       borderColor: '#BABABA', // Added border color
       borderWidth: 1,marginBottom:10}}>
           <Text style={{color:'white',fontSize:16,textAlign:'center',fontWeight:'bold',marginTop:10}}>Login</Text>
         </TouchableOpacity>
        
       <Text style={{fontSize:11,marginLeft:80}}>If you signed up with Facebook,you’ll need to</Text>
       <Text style={{fontSize:11,marginLeft:100}}>create a password and log back in.</Text>
         
       </View>
     );
   }