import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Alert,
  TextInput,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import storage from '../screen/utils/storageService';
import Button from '../components/Button';
// import {heightPercent as hp, widthPrecent as wp} from './utils/responsive';
import styles from './utils/Styles';
import Api from '../redux/Api';
import {heightPercent as hp, widthPercent as wp} from './utils/responsive';

export default function Wardrobe({navigation}) {
  const handlenext = async () => {
    if (warmclothes + warmclothes1 + warmclothes2 === 0) {
      Alert.alert(
        'Warning',
        'Please choose at least one cloth before proceeding!',
        [{text: 'OK', style: 'destructive'}],
      );
      return;
    }
    const user_id = await storage.getItem(storage.use_id);
    // console.log('user+id--**', user_id);
    const data = {
      loginId: user_id,
      warmClothes:
        // 1,
        warmclothes1,
      bedsheets:
        // 1,
        warmclothes,
      anyClothes:
        // 1,
        warmclothes2,
      totalQuantity:
        // 1,
        warmclothes + warmclothes1 + warmclothes2,
      confirmation: 1,
    };
    // const response = await Api.postRequest(endpoint, data);

    // console.log('data--', data);
    // Navigate to the 'pickup' screen and pass 'data' as props
    navigation.navigate('pickup', {wardrobeData: data});
  };
  //     if (response) {
  //       ToastAndroid.show('Success, Wardrobe items added successfully', ToastAndroid.SHORT);

  //       // ToastAndroid.show(`Success,Wardrobe items added successfully`);

  //       navigation.navigate('c');
  //       return response;
  //     } else {
  //       //  ToastAndroid.show(`Error', 'Failed to add wardrobe items. Please try again.`);

  //     }
  //   } catch (error) {
  //     // Alert.alert('Error', 'An error occurred. Please try again later.');
  //   }
  // };

  const [warmclothes, setWarmClothes] = useState(0);
  const [warmclothes1, setWarmClothes1] = useState(0);
  const [warmclothes2, setWarmClothes2] = useState(0);
  const [show, setShow] = useState(true);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container3,
        {paddingHorizontal: 25, backgroundColor: '#f5f5f5'},
      ]}>
      <View style={{height: hp(10)}} />

      <View style={localStyles.infoBox}>
        <Image
          style={{height: 40, width: 40}}
          source={require('../assets/Group2107.png')}
        />
        <Text style={localStyles.infoText}>
          Your estimated price will be confirmed after a final check by our team
        </Text>
      </View>

      {/* <View style={localStyles.pinBox}>
        <Text style={localStyles.heading}>Check Availability</Text>
        <View style={localStyles.inputContainer}>
          <Text style={localStyles.label}>Enter your pincode</Text>
          <TextInput
            style={localStyles.input}
            keyboardType="numeric"
            placeholder="123456"
            maxLength={6}
          />
        </View>
      </View> */}

      <View style={localStyles.sectionHeader}>
        <Text style={localStyles.sectionHeaderText}>Empty Your Wardrobe</Text>
      </View>

      {show && (
        <View>
          <View style={localStyles.card}>
            <ItemRow
              title="Warm Clothes/SofaCover"
              count={warmclothes1}
              setCount={setWarmClothes1}
            />
            <ItemRow
              title="Bedsheets/Curtains"
              count={warmclothes}
              setCount={setWarmClothes}
            />
            <ItemRow
              title="Any Other Clothes"
              count={warmclothes2}
              setCount={setWarmClothes2}
              additionalInfo={[
                'Note-Please Avoid Undergarments',
                'and Socks due to hygiene Reason',
              ]}
            />

            <View style={localStyles.divider} />

            <View style={localStyles.totalContainer}>
              <Text style={localStyles.totalText}>Total Quantity</Text>
              <View style={localStyles.totalBox}>
                <Text style={localStyles.totalCount}>
                  {warmclothes + warmclothes1 + warmclothes2}
                </Text>
              </View>
            </View>
          </View>

          <View style={localStyles.buttonRow}>
            <Button
              onPress={() =>
                navigation.reset({index: 0, routes: [{name: 'Dashboard'}]})
              }
              style={localStyles.button}
              textStyle={localStyles.buttonText}
              title="Skip"
            />
            <Button
              background={true}
              onPress={async () => {
                await handlenext();
              }}
              // onPress={handlenext}
              style={localStyles.button}
              textStyle={localStyles.buttonText}
              title="Next"
            />
          </View>
        </View>
      )}

      <View style={{height: 30}} />
    </ScrollView>
  );
}

function ItemRow({title, count, setCount, additionalInfo = []}) {
  return (
    <View style={localStyles.itemRow}>
      <View style={localStyles.itemInfo}>
        <Text style={localStyles.itemTitle}>{title}</Text>
        {additionalInfo.map((info, index) => (
          <Text key={index} style={localStyles.itemSubtitle}>
            {info}
          </Text>
        ))}
      </View>
      <TouchableOpacity disabled style={localStyles.counterContainer}>
        <TouchableOpacity
          onPress={() => setCount(prev => (prev > 0 ? prev - 1 : 0))}>
          <AntDesign size={20} name="minus" color={'#03692C'} />
        </TouchableOpacity>
        <Text style={localStyles.counterText}>{count}</Text>
        <TouchableOpacity onPress={() => setCount(prev => prev + 1)}>
          <AntDesign size={20} color={'#03692C'} name="plus" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const localStyles = StyleSheet.create({
  infoBox: {
    height: hp(8),
    backgroundColor: '#ECFDF3',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    elevation: 1,
    borderRadius: 10,
  },
  infoText: {
    fontStyle: 'italic',
    fontWeight: '500',
    fontSize: 12,
    color: '#000000',
    marginLeft: 10,
  },
  sectionHeader: {
    padding: 5,
    margin: 20,
    borderWidth: 0.5,
    width: '45%',
    alignSelf: 'center',
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
    borderRadius: 5,
  },
  sectionHeaderText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000000',
  },
  card: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    width: '100%',
    marginTop: 5,
    padding: 15,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemInfo: {
    flexDirection: 'column',
  },
  itemTitle: {
    color: '#000000',
    fontSize: 16,
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#000000',
    marginLeft: 20,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#03692C',
    width: '30%',
    paddingHorizontal: '3%',
    height: hp(5),
    borderRadius: 15,
    backgroundColor: 'white',
  },
  counterText: {
    color: '#03692C',
    fontSize: 16,
  },
  divider: {
    height: 0.5,
    backgroundColor: 'grey',
    width: '100%',
    marginTop: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalText: {
    color: '#000000',
    marginLeft: 10,
  },
  totalBox: {
    borderWidth: 1,
    borderColor: 'grey',
    height: hp(5),
    borderRadius: 15,
    alignItems: 'center',
    width: '30%',
    backgroundColor: 'white',
    justifyContent: 'center',
    marginRight: '0%',
  },
  totalCount: {
    color: '#000000',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    // borderWidth: 1,
    borderColor: '#95989A',
    padding: 10,
    alignItems: 'center',
    width: '45%',
    backgroundColor: '#95989A',
    height: hp(5.5),
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  pinBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 3,
    margin: 30,
  },

  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },

  inputContainer: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    alignSelf: 'flex-start',
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fafafa',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    fontSize: 16,
  },
});
