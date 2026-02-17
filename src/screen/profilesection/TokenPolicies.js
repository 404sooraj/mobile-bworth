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

export default  TokenPolicies = ({ navigation }) => {
    return(
     <View>
       <Text style={{fontSize:24,fontWeight:'bold',marginLeft:20,marginTop:40}}>Token Policies</Text>
    <TouchableOpacity  style={{backgroundColor: 'white', borderRadius: 5,padding:10,width:360,marginLeft:20,height:100,
       borderColor: '#000000', // Added border color
       borderWidth: 0.5,marginBottom:10,marginTop:20}}>
           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}>Detailed policies regarding token expiration,</Text>
           <Text style={{color:'#000000',fontSize:11,fontWeight:'bold',marginTop:5,marginLeft:30}}>usage, and earning methods.</Text>
       
         </TouchableOpacity>
      
     </View>
    );
   }