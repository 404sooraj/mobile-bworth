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
export default   EnableTwoFactorAuthentication = ({ navigation }) => {
    return(
     <View>
       <Text style={{fontSize:20,fontWeight:'bold',marginLeft:18,marginTop:30}}>Enable two-factor authentication</Text>
      
     <Text style={{marginLeft:20,fontSize:12}}>Two-factor authentication protects your account by </Text>
    <Text style={{marginLeft:20,fontSize:12}}>requiring an additional code when you log in on a device </Text>
    <View style={{display:'flex',flexDirection:'row'}}>
     <Text style={{marginLeft:20,fontSize:12}}>that we don't recognise.</Text><Text style={{color:'#004CFF',fontSize:12,fontWeight:'bold'}}> Learn more</Text>
    </View> 
     <Text style={{fontSize:20,fontWeight:'bold',marginLeft:18,marginTop:40}}>Choose your security method</Text>
      <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 15,padding:10,width:350,marginLeft:20,width:'87%',
       borderColor: '#BABABA', // Added border color
       borderWidth: 1,marginBottom:10,marginTop:30,height:250}}>
           <Text style={{marginLeft:20,marginTop:30,fontSize:15,fontWeight:'bold'}}>Authentication app  </Text>
    <Text style={{marginLeft:20,fontSize:12}}>
   Recommended . we’ll recommend an app to </Text>
    <Text style={{marginLeft:20,fontSize:12}}>
   download if you don’t have one. it will </Text>
    <Text style={{marginLeft:20,fontSize:12}}>
   generate a code that you’ll enter when you </Text>
    <Text style={{marginLeft:20,fontSize:12}}>
   log in.</Text>
    
    
    <Text style={{marginLeft:20,marginTop:20,fontSize:15,fontWeight:'bold'}}>SMS or WhatsappApp</Text>
    <Text style={{marginLeft:20,marginBottom:0,fontSize:12}}>
   We ‘ll send a code to the mobile number that</Text>
   <Text style={{marginLeft:20,marginBottom:0,fontSize:12}}>
   you choose.</Text>
   
       </TouchableOpacity>
   
    
   
     <TouchableOpacity  style={{backgroundColor: '#1FD3E0', borderRadius: 5,padding:10,width:360,marginLeft:20,height:50,
       borderColor: '#BABABA', // Added border color
       borderWidth: 2,marginBottom:10,marginTop:20}}>
           <Text style={{color:'white',fontSize:11,textAlign:'center',fontWeight:'bold',marginTop:2,fontSize:15}}>Next</Text>
         </TouchableOpacity>
     
     </View>
    );
   }  