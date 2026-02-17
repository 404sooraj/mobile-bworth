import React, {useState, useEffect} from 'react';
import {
  Modal,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import styles from './utils/Styles'; // Imported styles
import Button from '../components/Button';
import Api from '../redux/Api';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Sell = ({}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const route = useRoute();
  const {type} = route.params || '';
  useEffect(() => {
    if (route.params?.fromForward) {
      console.log('Came here by forward navigation');
    } else {
      console.log('Came here by BACK navigation');
    }
  }, [route.params]);

  useEffect(() => {
    if (type === 'yes') {
      handleSubmit('yes');
    }
  }, [type]);

  const handleSubmit = async type => {
    const data = {
      sellerId: 1,
      sell: type === 'yes' ? 1 : 0,
      isActive: 1,
      createdBy: 1,
      updatedBy: 1,
    };
    const endpoint = 'addSellClothe';
    const response = await Api.postRequest(endpoint, JSON.stringify(data));
    if (response.message === 'Sell clothes added successfully') {
      if (type === 'yes') {
        navigation.navigate('wardrobe');
      } else {
        navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
      }
    } else {
      ToastAndroid.show('Sell clothes error', ToastAndroid.SHORT);
    }
  };
  useEffect(() => {
    checkModalStatus();
  }, []);

  const checkModalStatus = async () => {
    const seen = await AsyncStorage.getItem('location_modal_seen');
    if (seen === 'true') {
      setModalVisible(false);
    }
  };
  return (
    <View style={styles.container3}>
      <View style={styles.container3}>
        <ImageBackground
          source={require('../assets/Sell.png')}
          style={styles.backgroundImage}>
          <View style={styles.overlay}></View>
        </ImageBackground>
      </View>

      {/* Modal for location permission */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={combinedStyles.modalBackground}>
          <View style={combinedStyles.modalContainer}>
            <Text style={combinedStyles.modalText}>
              BWorth collects location data to enable deliveries & pickup even
              when the app is closed or not in use to ensure seamless
              experience.
            </Text>
            <TouchableOpacity
              style={combinedStyles.okButton}
              onPress={async () => {
                await AsyncStorage.setItem('location_modal_seen', 'true');
                setModalVisible(false);
              }}>
              <Text style={combinedStyles.okButtonText}>OK</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={combinedStyles.okButton}
              onPress={() => setModalVisible(false)}>
              <Text style={combinedStyles.okButtonText}>OK</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>

      {/* Content */}
      <View style={combinedStyles.contentContainer}>
        <View style={combinedStyles.textContainer}>
          <Text style={styles.t1}>Would you like to sell your old</Text>
          <Text style={styles.t2}>clothes ?</Text>
          <View
            style={[styles.buttonContainer, {marginTop: 30, width: '100%'}]}>
            <Button
              onPress={() => handleSubmit('yes')}
              background
              style={{width: '30%', height: '43%'}}
              title={'Yes'}
              textStyle={{fontWeight: '400', fontSize: 16}}
            />
            <Button
              onPress={() => handleSubmit('no')}
              style={{
                width: '30%',
                height: '43%',
                borderWidth: 0.5,
                borderColor: '#707070',
              }}
              title={'No'}
              textStyle={{color: '#707070', fontWeight: '400', fontSize: 16}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

// Modal Styles combined with the imported styles
const combinedStyles = StyleSheet.create({
  ...styles,
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  okButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  okButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    position: 'absolute',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    bottom: 240,
    left: 30,
    right: 30,
    height: '30%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
