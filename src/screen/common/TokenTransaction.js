import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import storage from '../utils/storageService';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons'; // for location/calendar icons

export default TokenTransaction = ({navigation}) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      const user_id = await storage.getItem(storage.use_id);
      try {
        const dropResponse = await fetch(
          `https://bworth.co.in/api/bworth/getDropTokens?loginId=${user_id}`,
        );
        const dropData = await dropResponse.json();
        const pickupResponse = await fetch(
          `https://bworth.co.in/api/bworth/getPickupTokens?loginId=${user_id}`,
        );
        const pickupData = await pickupResponse.json();

        const dropTokens = Array.isArray(dropData.data)
          ? dropData.data
          : [dropData.data];
        const pickupTokens = Array.isArray(pickupData.data)
          ? pickupData.data
          : [pickupData.data];

        const combinedTokens = [
          ...(dropTokens.length
            ? dropTokens.map(item => ({...item, type: 'DROP'}))
            : []),
          ...(pickupTokens.length
            ? pickupTokens.map(item => ({...item, type: 'PICKUP'}))
            : []),
        ];
        // console.log(combinedTokens);
        const sortedTokens = combinedTokens.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        setTokens(sortedTokens);
      } catch (error) {
        console.error('Error fetching token data:', error);
      }
    };

    fetchTokens();
  }, []);

  const formatDate = dateStr => {
    const date = new Date(dateStr || new Date());
    return date.toDateString(); // e.g., "Today, 11 May 2024"
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Header />
      <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 10}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#333',
          }}>
          Token Transactions
        </Text>

        {tokens.length === 0 ? (
          <Text style={{fontSize: 18, color: '#999'}}>No token available</Text>
        ) : (
          <ScrollView contentContainerStyle={{paddingBottom: 30}}>
            {tokens.map((item, index) =>
              item.orderId ? (
                <View
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 12,
                    width: '95%',
                    backgroundColor: '#fff',
                    padding: 15,
                    marginBottom: 15,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      borderColor: '#ccc',
                      borderRadius: 10,
                      padding: 10,
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <Text style={{color: '#000', fontSize: 16, marginTop: 5}}>
                      {item.type} : {item.orderId}
                    </Text>
                  </View>

                  <Text
                    style={{fontSize: 12.5, color: '#777', marginBottom: 10}}>
                    Your token has been successfully generated. Our team is
                    currently processing your request and will get in touch with
                    you within the next 2–3 working days. Thank you for your
                    patience!
                    {/* Lorem ipsum dolor sit amet consectetur. Est in vestibulum placerat nisl facilisis netus. Duis scelerisque tristique id fermentum. */}
                  </Text>

                  {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="location-on" size={16} color="#2f80ed" />
                    <Text style={{ marginLeft: 5, color: '#333' }}>
                      Rajnagar, extension, near shiv mandir kwdc.
                    </Text>
                  </View> */}

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="calendar-today" size={16} color="#2f80ed" />
                    <Text style={{marginLeft: 5, color: '#2f80ed'}}>
                      {item.orderId
                        ? formatDate(item.createdAt)
                        : 'No date available'}
                    </Text>
                  </View>
                </View>
              ) : null,
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
// ./gradlew bundleRelease
