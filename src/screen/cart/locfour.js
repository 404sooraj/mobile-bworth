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
export default  locfour = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [location, setLocation] = useState(null);
  const handleChange = () => {
  
       navigation.navigate('cartScreen');
  };
  
  const navigateonOK = () => {
      // Handle form submission logic here
    
       navigation.navigate('Sell');
    };
    useEffect(() => {
      const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
        }
      };
  
      const getCurrentLocation = async () => {
        try {
          await requestLocationPermission();
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
          } else {
            console.log('Location permission denied');
          }
        } catch (error) {
          console.error('Error getting location:', error);
        }
      };
  
      getCurrentLocation();
    }, []); // Empty dependency array ensures useEffect runs only once
  
    const handleModalClose = () => {
      setModalVisible(false);
    };
  
      return (
       <View style={{}}>
     <Text style={{fontSize:20,textAlign:'center',marginTop:20,fontWeight:'bold',marginBottom:20}}>Select your Pickup Location</Text> 
   <View style={{
        borderWidth: 0.5,
        borderColor: '#666668',borderRadius:12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:40,marginRight:40,marginBottom:20
      }}>
        {/* <Ionicons name="ios-search" size={24} color="black" /> */}
        <Text style={{color:'#4370F0',fontWeight:'bold' ,marginLeft:70,fontSize:15}}>Search your location</Text>
      </View>
     <View style={{
       
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
        
      }}>
      
       <TouchableOpacity
      onPress={() => setModalVisible(true)}
    style={{
        borderWidth: 0.5,
        borderColor: '#666668',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',marginLeft:20
      }}>
       
      <View style={{display:'flex',flexDirection:'column'}}>
         <Text style={{color:'#4370F0'
      // ''
      ,fontSize:17,fontWeight:'bold'}}>Change Address</Text>
       <Text style={{color:'grey'
      // '#2AAFE5'
      ,fontSize:11,fontWeight:'bold',marginTop:5}}>C-10009, Police line 2 , Raj  
  </Text>
     <Text style={{color:'grey'
      // '#2AAFE5'
      ,fontSize:11,fontWeight:'bold'}}>Nagar Extension,</Text>
      <Text style={{color:'grey'
      // '#2AAFE5'
      ,fontSize:11,fontWeight:'bold'}}>Ghaziabad, Uttar Pradesh</Text>
      </View>
      </TouchableOpacity>
    
   <TouchableOpacity
      onPress={handleChange}
    style={{
        borderWidth: 0.5,
        borderColor: '#666668',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',marginLeft:60
      }}>
        <Text style={{ color: '#4370F0',fontWeight:'bold' }}>Change</Text>
      </TouchableOpacity>
  
      </View>
      <Text style={{color:'#4370F0',fontSize:17,fontWeight:'bold',marginLeft:30,marginTop:20}}>Saved Location</Text>
    
      <Text style={{color:'black',fontSize:17,fontWeight:'bold',marginLeft:30,marginTop:20}}>other</Text>
     <Text style={{color:'grey',fontSize:13,marginLeft:30,marginTop:2}}>C-10009, Police line 2, Raj Nagar Extension,</Text>
     <Text style={{color:'grey',fontSize:13,marginLeft:30,marginTop:1}}>Ghaziabad,Uttar Pradesh</Text>
         {/* <View style={{ height: 1, backgroundColor: 'grey', width: '85%', marginTop: 20,marginLeft:20 }} /> */}
        
     <Text style={{color:'black',fontSize:17,fontWeight:'bold',marginLeft:30,marginTop:20}}>other</Text>
     <Text style={{color:'grey',fontSize:13,marginLeft:30,marginTop:2}}>C-10009, Police line 2, Raj Nagar Extension,</Text>
     <Text style={{color:'grey',fontSize:13,marginLeft:30,marginTop:1}}>Ghaziabad,Uttar Pradesh</Text>
     
         <View style={{ height: 0.5, backgroundColor: '#666668', width: '90%', marginTop: 20,marginLeft:20 }} />
     <Text style={{color:'black',fontSize:17,fontWeight:'bold',marginLeft:30,marginTop:20}}>other</Text>
     <Text style={{color:'grey',fontSize:13,marginLeft:30,marginTop:2}}>C-10009, Police line 2, Raj Nagar Extension,</Text>
     <Text style={{color:'grey',fontSize:13,marginLeft:30,marginTop:1}}>Ghaziabad,Uttar Pradesh</Text>
     
         {/* <View style={{ height: 1, backgroundColor: 'grey', width: '85%', marginTop: 20,marginLeft:20 }} /> */}
   
     <Text style={{color:'black',fontSize:17,fontWeight:'bold',marginLeft:30,marginTop:20}}>other</Text>
     <Text style={{color:'grey',fontSize:13,marginLeft:30,marginTop:2}}>C-10009, Police line 2, Raj Nagar Extension,</Text>
     <Text style={{color:'grey',fontSize:13,marginLeft:30,marginTop:1}}>Ghaziabad,Uttar Pradesh</Text>
   
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* <TouchableOpacity 
          style={{
            borderWidth: 1,
            borderColor: '#2AAFE5',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginLeft: 110
          }} 
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: '#2AAFE5' }}>Enable</Text>
        </TouchableOpacity> */}
  
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
            <View style={{
              width: 300,
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
              alignItems: 'center',
            }}>
              <Text style={{fontSize:15,fontStyle:'italic'}}>For a better experience.turn on device location. Which uses Google's location service</Text>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'baseline',
                  // backgroundColor: '#2AAFE5',
                  display:'flex',flexDirection:'row'
                }}
                onPress={handleModalClose}
              >
              
            <Text style={{ color: '#2AAFE5' ,marginRight:20,marginLeft:140,fontWeight:'bold',fontSize:15}}>No,thanks</Text>
                <Text   
                onPress={navigateonOK}
                style={{ color: '#2AAFE5' ,fontWeight:'bold',fontSize:16}}>OK</Text>
              </TouchableOpacity>
              {/* {location && (
          <Text style={{ marginTop: 20,
      color: 'black',
      fontWeight: 'bold',}}>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </Text>
        )} */}
            </View>
          </View>
        </Modal>
      </View>
      </View>
    );
  };