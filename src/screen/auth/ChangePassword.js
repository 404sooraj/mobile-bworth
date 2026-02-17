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
export default ChangePassword = ({ navigation }) => {
    return(
     <View>
       <Text style={{fontSize:20,fontWeight:'bold',marginLeft:18,marginTop:20}}>Change password</Text>
      
     <Text style={{marginLeft:20,fontSize:12}}>Your password must be at least 6 characters and should </Text>
    <Text style={{marginLeft:20,fontSize:12}}>include a combination of number, letters and special</Text>
    <Text style={{marginLeft:20,fontSize:12}}>characters (!$@%).</Text>
    
      <View style={{
         borderWidth: 1.5,
         borderColor: '#000000',borderRadius:12,
         padding: 12,
         flexDirection: 'row',
         alignItems: 'center',
         marginLeft:20,marginRight:20,marginBottom:20,height:50,marginTop:40
       }}>
       <Text style={{color:'#95989A'}}>Current password (Update 01-...</Text>
         {/* <Ionicons name="ios-search" size={24} color="black" /> */}
       </View>
       <View style={{
         borderWidth: 1.5,
         borderColor: '#000000',borderRadius:12,
         padding: 12,
         flexDirection: 'row',
         alignItems: 'center',
         marginLeft:20,marginRight:20,marginBottom:20,height:50
       }}>
       <Text style={{color:'#95989A'}}>New password</Text>
         {/* <Ionicons name="ios-search" size={24} color="black" /> */}
       </View>
       <View style={{
         borderWidth: 1.5,
         borderColor: '#000000',borderRadius:12,
         padding: 12,
         flexDirection: 'row',
         alignItems: 'center',
         marginLeft:20,marginRight:20,marginBottom:20,height:50
       }}>
       <Text style={{color:'#95989A'}}>Retype new password</Text>
         {/* <Ionicons name="ios-search" size={24} color="black" /> */}
       </View>
        <Text style={{marginLeft:20,fontSize:17,color:'#004CFF',marginBottom:10}}>Forgotten your password? </Text>
      <Text style={{marginLeft:35,fontSize:14,fontWeight:'bold'}}>Log out of other device. choose this if someone</Text>
      <Text style={{marginLeft:35,fontSize:14,fontWeight:'bold',marginBottom:30}}>else used your account. </Text>
    <TouchableOpacity  style={{backgroundColor: '#1FD3E0', borderRadius: 5,padding:10,width:360,marginLeft:20,height:50,
       borderColor: '#BABABA', // Added border color
       borderWidth: 2,marginBottom:10,marginTop:20}}>
           <Text style={{color:'white',fontSize:11,textAlign:'center',fontWeight:'bold',marginTop:2,fontSize:15}}>Change password</Text>
         </TouchableOpacity>
     
     </View>
    );
   }