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
export default  LetUsKnow = ({ navigation }) => {
    const handleSubmit = () => {
        // Handle form submission logic here
      
         navigation.navigate('wardrobe');
        //  navigation.navigate('pickup');
        //  wardrobe
      };
    
     const  handleNoPress=()=>{
        navigation.navigate('Dashboard');
     }
      
      return (
         <View style={styles.container3}>
           <View style={styles.container3}>
          <ImageBackground
            source={require('../../assets/LetUs.png')}
            style={styles.backgroundImage}
          >
            <View style={styles.overlay}>
            
            </View>
          </ImageBackground>
        </View>
        <View style={{position: 'absolute',
         borderColor: 'black', 
         borderWidth: 1, borderTopLeftRadius:25,borderTopRightRadius:25,
        bottom: 0,
        height: '75%',width:'100%',
        backgroundColor: 'white',
           shadowColor: '#000000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow radius
        elevation: 5}} >
          <View style={{display:'flex',flexDirection:'column'}}>
        <FontAwesomeIcon icon="fa-thin fa-xmark" />
            <View style={{display:'flex',flexDirection:'row'}}>
              <Text style={{fontSize:20,fontWeight:'bold',marginTop:60,marginLeft:20}}>Let us Know that it’s you</Text>
              <Text style={{color:'#FB0B53',fontSize:11,fontWeight:'bold',marginLeft:200,marginTop:30}}>More Option</Text>
              
            </View>
            
            <Text style={{fontSize:13,marginLeft:20}}>For your security, please enter your </Text>
            <Text style={{fontSize:13,marginLeft:20,marginBottom:30}}>password </Text>
            <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 15,padding:10,width:'80%',marginLeft:40,
        borderColor: '#BABABA', // Added border color
        borderWidth: 1,marginBottom:10,marginTop:20,height:80}}>
        <View style={{display:'flex',flexDirection:'row'}}>
        <View style={{ width: 50, height: 60 }}>
      <Image
        source={require('../../assets/profile_icon.png')}
        resizeMode="contain"
        style={{ flex: 1,right:140 }}
      />
    </View>
          <Text style={{color:'#000000',fontSize:14,fontWeight:'bold',marginLeft:40,marginTop:20}}>John smith</Text>
        </View>
    
            
          </TouchableOpacity>
             {/* <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
    
             </View> */}
               {/* <Text style={{fontSize:11,marginLeft:20,marginTop:20}}>GPay UPI</Text> */}
          
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: '#3A86EC', borderRadius: 15,padding:10,width:350,marginLeft:10,
        borderColor: '#BABABA', // Added border color
        borderWidth: 1,marginBottom:10,marginTop:30,height:50}}>
                  <Text style={{color:'white',textAlign:'center',fontWeight:'bold',fontSize:11,marginTop:5}}>CONTINUE </Text>
                </TouchableOpacity>
               
              </View>
            
          </View>
        </View>
        </View>
      );
    }
