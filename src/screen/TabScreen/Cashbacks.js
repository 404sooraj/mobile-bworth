
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Text,
  View,
  ScrollView,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Button from '../../components/Button';
import { heightPercent, widthPrecent } from '../utils/responsive';
import DashBordHeader from '../../components/DashBordHeader';
import storage from '../utils/storageService';
import Api from '../../redux/Api';
import { useFocusEffect } from '@react-navigation/native';

export default Cashback = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); // Show loader when the page is focused
      ApiCall();
    }, [])
  );

  const ApiCall = async () => {
    try {
      const user_id = await storage.getItem(storage.use_id);
     const endPoint = `getTransactionListById`;
     const postdata = {
              loginId: user_id,
              
            };
      const response = await Api.postRequest(endPoint,postdata);
      if (response.data) {
        setData(response);
      } else {
        setData([]);
        ToastAndroid.show('No Data Found', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Hide loader after API call completes
    }
  };

  const TransactionItem = ({ item }) => {
    const dateTime = moment(item.updatedAt);
    const date = dateTime.format('YYYY-MM-DD');
    const updatedDateTime = dateTime.add(330, 'minutes');
    const updatedTime = updatedDateTime.format('HH:mm:ss');

    return (
      <View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={{ color: '#111111', fontSize: 16, fontWeight: '500' }}>
              {item.transactionDescription} - BW{item.orderId?.toUpperCase() || ''}
            </Text>
            <Text style={{ color: 'grey', marginTop: 5, fontWeight: '500' }}>
              {date} {updatedTime}
            </Text>
          </View>
          <Text
            style={{
              color:
                item.transactionDescription === 'Cashback Earned'
                  ? '#1DD8E0'
                  : '#E83D70',
              fontSize: 16,
              marginRight: '3%',
            }}>
            {item.transactionDescription === 'Cashback Earned'
              ? '+ ' + item.transactionAmount
              : '- ' + item.transactionAmount}
          </Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#E0E0E0',
            width: '100%',
            marginVertical: 10,
            marginTop: 20,
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <ActivityIndicator size="large" color="#4B5EF3" />
        </View>
      ) : (
        <>
          <DashBordHeader />
          <ScrollView>
            <View style={{ height: 20 }} />
            <Button
              background={true}
              style={{
                backgroundColor: '#4B5EF3',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
                alignItems: 'center',
                justifyContent: 'center',
                height: heightPercent(14),
                width: widthPrecent(90),
                alignSelf: 'center',
              }}
              title={`${!data?.total ? 0 : data?.total}`}
              textStyle={{
                fontSize: heightPercent(5),
              }}
            />
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 30 }}>
              <FlatList
                data={data?.data}
                renderItem={TransactionItem}
                keyExtractor={(item, index) => index.toString()}
              />
              {data.length === 0 ? (
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    alignSelf: 'center',
                    marginTop: '30%',
                  }}>
                  No Data Found
                </Text>
              ) : null}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};
