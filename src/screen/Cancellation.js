import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import DashBordHeader from '../components/DashBordHeader';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import storage from './utils/storageService';
import Api from '../redux/Api';
import Loading from '../custom/index';
const CancellationScreen = ({route}) => {
  const {orderId, awb_number} = route?.params;
  const [awbNumber, setAwbNumber] = useState(null); // 🟢 public AWB
  const [currentOrderDetail, setCurrentOrderDetail] = useState(null);
  // console.log('orderDetailData', currentOrderDetail);

  const [loading, setLoading] = useState(false);
  const [isDelivered, setIsDelivered] = useState();
  const [isShipped, setIsShipped] = useState();
  const navigation = useNavigation();

  console.log(isDelivered, isShipped);

  useEffect(() => {
    if (!orderId) return;
    const getTracking = async () => {
      try {
        // const user_id = await storage.getItem(storage.use_id);
        const tokenResponse = await fetch(
          'https://oauth.smartship.in/loginToken.php',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              username: 'info@bworth.co.in',
              password: 'dd67779cf5c43365385c7adcb0029ef1',
              client_id: 'VFQOQZQQR4YGXYYCBB1FI1X67ZXXAMY332G1I02',
              client_secret: 'FLJJQ7(9Q@+*K#A_O11SRS5QD1MDS$^519+$7',
              grant_type: 'password',
            }),
          },
        );
        const tokenJson = await tokenResponse.json();
        // console.log('✅ Access Token:', tokenJson.access_token);
        if (!tokenJson.access_token) {
          Alert.alert('Error', 'Failed to fetch SmartShip token');
          setLoading(false);
          return;
        } else {
          const res = await fetch(
            `https://api.smartship.in/v1/Trackorder?order_reference_ids=${orderId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenJson.access_token}`,
              },
            },
          );
          const data = await res.json();
          // console.log(JSON.stringify(data, null, 2));
          const res1 = await fetch(
            `https://api.smartship.in/v2/app/Fulfillmentservice/orderDetails`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenJson.access_token}`,
              },
              body: JSON.stringify({
                filters: {
                  filter_type: {
                    and: {
                      client_order_reference_id: orderId,
                    },
                  },
                },
              }),
            },
          );
          const data1 = await res1.json();
          // console.log(JSON.stringify(data1, null, 2));
          const ordersDetails = data1?.data?.orders_details;
          const firstOrderKey = Object.keys(data1?.data?.orders_details)[0];
          const requestOrderId =
            ordersDetails[firstOrderKey]?.order_details?.request_order_id;
          // console.log(
          //   typeof data?.data?.scans[requestOrderId].at(-1).status_code,
          // );
          // console.log(typeof 3);
          console.log(JSON.stringify(data, null, 2));
          const scans = data?.data?.scans[requestOrderId] || [];
          const hasBeenShipped = scans.some(
            scan => Number(scan.status_code) === 10,
          );
          const hasBeenDelivered = scans.some(
            scan => Number(scan.status_code) === 11,
          );
          setIsShipped(hasBeenShipped);
          setIsDelivered(hasBeenDelivered);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getTracking();
  }, [orderId]);

  useFocusEffect(
    React.useCallback(() => {
      getPaymentdata();
      // fetchShippingData();
    }, []),
  );
  const fetchShippingData = async () => {
    try {
      const userId = await storage.getItem(storage.use_id);
      const shippingBody = {
        loginId: Number(userId),
        orderId: `BWO${orderId.toUpperCase()}`,
      };

      const response = await fetch(
        'https://bworth.co.in/api/bworth/getShipping',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(shippingBody),
        },
      );

      const result = await response.json();
      console.log('🚚 Shipping Info Response:', result); // 🔴 Console the response
      if (result?.success && result?.data?.awb_number) {
        setAwbNumber(result.data.awb_number); // 🟢 store publicly
      }
    } catch (error) {
      console.error('❌ Error fetching shipping info:', error);
    }
  };

  useEffect(() => {
    if (awb_number) setAwbNumber(awb_number); // ✅ Assign prop to state
  }, [awb_number]);

  const getPaymentdata = async () => {
    try {
      setLoading(true);
      const user_ids = await storage.getItem(storage.use_id);
      // console.log('asdasd', user_ids);
      const endPoint = `getOrderDetail?loginId=${user_ids}&orderId=${orderId}`;
      // console.log('asde---');
      const response = await Api.getRequest(endPoint);
      // console.log('Responseee:', response);
      if (response?.data) {
        setCurrentOrderDetail(response.data);
        // console.log('sad--', response.data.coin);
      } else {
        setCurrentOrderDetail(null);
        ToastAndroid.show('No Data Found', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error fetching data', err);
      ToastAndroid.show('No Data Found', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const [selectedOption, setSelectedOption] = useState('Select Action');
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [comments, setComments] = useState('');
  // const [refundMode, setRefundMode] = useState('');
  let optionData = [];

  if (isDelivered) {
    optionData = [{key: 0, label: 'Return'}];
  } else if (!isShipped) {
    optionData = [{key: 0, label: 'Cancel'}];
  }

  const returnReasons = [
    {key: 0, label: 'Received wrong item'},
    {key: 1, label: 'Item defective'},
    {key: 2, label: 'Changed my mind'},
    {key: 3, label: 'Other'},
  ];

  const cancelReasons = [
    {key: 0, label: 'Ordered by mistake'},
    {key: 1, label: 'Found a better deal'},
    {key: 2, label: 'No longer needed'},
    {key: 3, label: 'Other'},
  ];

  const buyBackReasons = [
    {key: 0, label: 'Other'},
    {key: 1, label: 'Old item buy back offer'},
    {key: 2, label: 'Upgrade to new model'},
  ];

  const refundOptions = [
    {key: 0, label: 'Refund to bank account'},
    {key: 1, label: 'Refund to wallet'},
    {key: 2, label: 'Refund to credit card'},
  ];

  const handleOptionChange = option => {
    setSelectedOption(option.label);
    setSelectedReason('');
    setOtherReason('');
    // setRefundMode('');
    setComments('');
  };

  const handleReasonChange = reason => {
    setSelectedReason(reason.label);
    setOtherReason('');
  };
  const fetchReturnReasonId = async token => {
    try {
      const response = await fetch(
        'https://api.smartship.in/v2/app/Fulfillmentservice/getReturnReasons',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const json = await response.json();
      console.log('📥 Return Reasons List:', JSON.stringify(json));

      // ✅ If successful, return the first available reason ID
      if (json?.status === 1 && Array.isArray(json?.data)) {
        return json.data[0]?.return_reason_id || '1'; // fallback to 1 if empty
      }
    } catch (err) {
      console.error('❌ Failed to fetch return reasons', err);
    }

    // 🔁 Fallback reason if API fails
    return '1';
  };

  //   const fetchReturnReasons = async (accessToken) => {
  //   try {
  //     const response = await fetch("https://api.smartship.in/v2/app/Fulfillmentservice/getReturnReasons", {
  //       method: "GET",
  //       headers: {
  //         "Authorization": `Bearer ${accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const json = await response.json();
  //     console.log("📥 Return Reasons List:", JSON.stringify(json, null, 2));
  //     return json?.data?.return_reasons || []; // adjust if structure differs
  //   } catch (error) {
  //     console.error("❌ Error fetching return reasons:", error);
  //     return [];
  //   }
  // };

  function buildReturnOrderPayload(orderDetailsResponse) {
    if (
      !orderDetailsResponse ||
      !orderDetailsResponse.data ||
      !orderDetailsResponse.data.orders_details
    ) {
      throw new Error('No order data found in response');
    }
    const ordersDetails = orderDetailsResponse.data.orders_details;
    const firstKey = Object.keys(ordersDetails)[0];
    const orderBlock = ordersDetails[firstKey];
    const order = orderBlock.order_details;
    const consignee = orderBlock.consignee_details;
    const hub = orderBlock.hub_details;
    const products = orderBlock.product_details || [];
    return {
      request_info: {
        client_id: `${order.client_id}`,
        run_type: 'create',
      },
      orders: [
        {
          client_order_reference_id: `RETURN-${order.client_order_reference_id}`,
          shipment_type: 1,
          payment_type: order.payment_type,
          order_collectable_amount:
            order.payment_type === 'cod' ? order.total_order_value : '0',
          total_order_value: order.total_order_value,
          package_order_weight: order.package_order_weight || '200',
          package_order_length: order.package_order_length || '12',
          package_order_height: order.package_order_height || '5',
          package_order_width: order.package_order_width || '8',
          shipper_hub_id: hub.shipper_hub_id,
          shipper_gst_no: order.shipper_gst_no,
          order_invoice_date: order.order_invoice_date || '20-10-2025',
          order_invoice_number:
            order.order_invoice_number || `RET-${Date.now()}`,
          is_return_qc: '0',
          return_reason_id: '0',
          order_meta: {
            preferred_carriers: [1, 3, 279],
          },
          product_details: products.map((prod, index) => ({
            client_product_reference_id:
              prod.client_product_reference_id || `PROD-${index}`,
            product_name: prod.product_name,
            product_category: prod.product_category || 'general',
            product_hsn_code: prod.product_hsn_code || '61061000',
            product_quantity: prod.product_quantity,
            product_invoice_value: prod.product_invoice_value,
            product_gst_tax_rate: prod.product_gst_tax_rate || '0',
            product_taxable_value: prod.product_taxable_value || '0',
            product_sgst_amount: prod.product_sgst_amount || '0',
            product_sgst_tax_rate: prod.product_sgst_tax_rate || '0',
            product_cgst_amount: prod.product_cgst_amount || '0',
            product_cgst_tax_rate: prod.product_cgst_tax_rate || '0',
          })),
          consignee_details: {
            consignee_name: consignee.consignee_name,
            consignee_phone: consignee.consignee_phone,
            consignee_email: consignee.consignee_email || '',
            consignee_complete_address: consignee.consignee_address,
            consignee_pincode: consignee.consignee_pincode,
          },
        },
      ],
    };
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // if (selectedOption === 'Cancel') {
      console.log('🚚 Cancelling shipment via SmartShip...');
      const tokenResponse = await fetch(
        'https://oauth.smartship.in/loginToken.php',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: 'info@bworth.co.in',
            password: 'dd67779cf5c43365385c7adcb0029ef1',
            client_id: 'VFQOQZQQR4YGXYYCBB1FI1X67ZXXAMY332G1I02',
            client_secret: 'FLJJQ7(9Q@+*K#A_O11SRS5QD1MDS$^519+$7',
            grant_type: 'password',
          }),
        },
      );
      const tokenJson = await tokenResponse.json();
      // console.log('✅ Access Token:', tokenJson.access_token);
      if (!tokenJson.access_token) {
        Alert.alert('Error', 'Failed to fetch SmartShip token');
        setLoading(false);
        return;
      } else {
        // console.log('orderId', orderId);
        const user_id = await storage.getItem(storage.use_id);
        // console.log(user_id);
        const res = await fetch(
          'https://api.smartship.in/v2/app/Fulfillmentservice/orderCancellation',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${tokenJson.access_token}`,
            },
            body: JSON.stringify({
              orders: {client_order_reference_ids: [orderId]},
            }),
          },
        );
        const data = await res.json();
        // console.log(data);
        if (
          data?.data?.order_cancellation_details?.successful &&
          data.data.order_cancellation_details.successful.length > 0
        ) {
          const response = await fetch(
            'https://bworth.co.in/api/bworth/addCancelOrder',
            {
              body: JSON.stringify({
                loginId: String(user_id).replace(/^0+/, ''),
                orderId: orderId || '',
                cancelAction: selectedOption || '',
                cancelComment: comments || '',
                cancelReason: selectedReason || '',
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              Accept: 'application/json',
            },
          );
          const endPoint = `getMyOrderById?loginId=${user_id}`;
          const responose = await Api.getRequest(endPoint);
          console.log(
            'cancel resopnse',
            JSON.stringify(responose.data, null, 2),
          );
          const endPoint1 = `addOrderStatus`;
          await Api.postRequest(endPoint1, {
            loginId: parseInt(user_id),
            orderId: `BWO${orderId.toUpperCase()}`,
            orderStatus: 'Cancelled',
          });
          // console.log('new orders', responose);
          if (
            Array.isArray(responose?.data) &&
            responose.data.length > 0 &&
            selectedOption === 'Cancel'
          ) {
            Alert.alert(
              'Cancelled',
              'Your order has been cancelled successfully.',
              [
                {
                  text: 'OK',
                  onPress: () =>
                    navigation.navigate('MyOrders', {data: responose.data}),
                },
              ],
            );
          }
        } else {
          Alert.alert('Error', 'Failed to cancel order. Please try again.');
        }
      }
      // }
      if (selectedOption === 'Return') {
        const tokenResponse = await fetch(
          'https://oauth.smartship.in/loginToken.php',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              username: 'info@bworth.co.in',
              password: 'dd67779cf5c43365385c7adcb0029ef1',
              client_id: 'VFQOQZQQR4YGXYYCBB1FI1X67ZXXAMY332G1I02',
              client_secret: 'FLJJQ7(9Q@+*K#A_O11SRS5QD1MDS$^519+$7',
              grant_type: 'password',
            }),
          },
        );
        const tokenJson = await tokenResponse.json();
        if (!tokenJson.access_token) {
          Alert.alert('Error', 'Failed to fetch SmartShip token');
          setLoading(false);
          return;
        }
        const token = tokenJson.access_token;
        const returnReasonsList = await fetchReturnReasonId(token);
        if (returnReasonsList.length === 0) {
          Alert.alert('Error', 'No return reasons found. Cannot proceed.');
          setLoading(false);
          return;
        }
        const validReturnReasonId = returnReasonsList[0]?.return_reason_id; // You can improve logic here
        const res = await fetch(
          'https://api.smartship.in/v2/app/Fulfillmentservice/orderDetails',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${tokenJson.access_token}`,
            },
            body: JSON.stringify({
              filters: {
                filter_type: {
                  and: {
                    client_order_reference_id: orderId,
                  },
                },
              },
            }),
          },
        );
        const data = await res.json();
        const returnPayload = buildReturnOrderPayload(data);
        const res1 = await fetch(
          'https://api.smartship.in/v2/app/Fulfillmentservice/orderRegistrationOneStep',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(returnPayload),
          },
        );
        const data1 = await res1.json();
        // console.log('return order response', JSON.stringify(data1, null, 2));
        const returnOrder = data1?.data?.success_order_details?.orders?.[0];
        if (returnOrder) {
          const returnOrderId = returnOrder?.client_order_reference_id;
          const label_url =
            data1?.data?.success_order_details?.shipping_info?.label_url;
          const awb_number = returnOrder?.awb_number;
          // Add to orderDetails
          const user_id = await storage.getItem(storage.use_id);
          const addOrderDetailData = {
            loginId: user_id,
            itemTotal: currentOrderDetail.itemTotal ?? 0,
            orderImage: currentOrderDetail.orderImage ?? '',
            orderDescription: currentOrderDetail.orderDescription ?? '',
            color: currentOrderDetail.color ?? 'N/A',
            size: currentOrderDetail.size ?? 'N/A',
            quantity: currentOrderDetail.quantity ?? 0,
            price: currentOrderDetail.price ?? 0,
            MrpTotal: currentOrderDetail.MrpTotal ?? 0,
            coin: currentOrderDetail.coin ?? 0,
            billTotal: currentOrderDetail.billTotal ?? 0,
            orderId: returnOrderId,
            paymentMode: currentOrderDetail.paymentMode ?? 'paid online',
            deliveryAddress: currentOrderDetail.deliveryAddress ?? '',
          };
          await fetch('https://bworth.co.in/api/bworth/addOrderDetail', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(addOrderDetailData),
          });
          // Add to orderConfirmations
          const postdata = {
            loginId: user_id,
            confirmation: true,
            subtotal: currentOrderDetail.billTotal ?? 0,
            orderId: returnOrderId,
            superCoins: currentOrderDetail.coin ?? 0,
            transitionId:
              currentOrderDetail?.data?.orders_details?.[
                returnOrder.request_order_id
              ]?.order_ndr_details?.ndr_attempts?.[0]?.transition_id ?? null,
            awb_number: awb_number,
            sc_confirmation_no: returnOrder.sc_confirmation_no,
            invociePdfUrl: label_url,
          };
          // console.log('postData: ', JSON.stringify(postdata, null, 2));
          try {
            const response = await Api.postRequest(
              'addOrderConfirmation',
              JSON.stringify(postdata),
            );
            const data = response.data;
            // console.log('confirmationData', data);
          } catch (error) {
            console.error('orderConfirmation error: ', error.message);
            Alert.alert('Error', 'Something went wrong!');
          }
          // Add to orderStatuses
          const orderStatusData = {
            loginId: user_id,
            orderId: `BWO${returnOrderId.toUpperCase()}`,
            orderStatus: 'Confirmed',
          };
          await fetch('https://bworth.co.in/api/bworth/addOrderStatus', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orderStatusData),
          });
          const endPoint = `getMyOrderById?loginId=${user_id}`;
          const responose = await Api.getRequest(endPoint);
          if (
            responose?.data ||
            (Array.isArray(responose.data) && responose.data.length !== 0) ||
            (typeof responose.data === 'object' &&
              Object.keys(responose.data).length !== 0)
          ) {
            Alert.alert(
              'Marked for Return',
              'Your order has been marked for return successfully',
              [
                {
                  text: 'OK',
                  onPress: () =>
                    navigation.navigate('MyOrders', {data: responose.data}),
                },
              ],
            );
          }
        }
      }
    } catch (error) {
      console.error('❌ handleSubmit error:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  // console.log(selectedOption);

  return typeof isDelivered === 'boolean' &&
    ((!isShipped && !isDelivered) || isDelivered) ? (
    <ScrollView style={styles.container}>
      <DashBordHeader />
      {/* <Text style={styles.title}>Select Action</Text> */}
      <View style={{marginTop: 20}}>
        <ModalSelector
          data={optionData}
          initValue={selectedOption}
          onChange={option => handleOptionChange(option)}
          style={styles.selector}
          initValueTextStyle={styles.initValueText}
          selectStyle={styles.modalSelectStyle}
          cancelText="Close"
          key={isDelivered ? 'delivered' : 'not delivered'}
        />

        {/* <Text style={styles.title}>Select Reason</Text> */}
        {(selectedOption === 'Cancel' || selectedOption === 'Return') && (
          <ModalSelector
            data={
              selectedOption === 'Cancel' ? cancelReasons : returnReasons
              // : selectedOption === 'Return'
              // ? returnReasons
              // : buyBackReasons
            }
            initValue={selectedReason ? selectedReason : 'Choose a reason'}
            onChange={reason => handleReasonChange(reason)}
            style={styles.selector}
            initValueTextStyle={styles.initValueText}
            selectStyle={styles.modalSelectStyle}
            key={selectedOption}
          />
        )}
      </View>

      {selectedReason === 'Other' && (
        <TextInput
          style={styles.input}
          placeholder="Please specify other reason"
          value={otherReason}
          onChangeText={setOtherReason}
        />
      )}
      {/* <Text style={styles.title}>BWO${orderId.toUpperCase()}</Text> */}

      <Text style={styles.title}>Additional Comments</Text>
      <TextInput
        style={styles.input}
        placeholder="Add any comments"
        value={comments}
        onChangeText={setComments}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  ) : (
    typeof isDelivered === 'boolean' && (
      <View
        style={{
          padding: 16,
          margin: 12,
          backgroundColor: '#f8f9fb',
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#d0d4da',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: '#333',
            textAlign: 'center',
            marginBottom: 4,
          }}>
          No actions available right now
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#666',
            textAlign: 'center',
            lineHeight: 20,
          }}>
          Your order has been shipped but not yet delivered.{'\n'}
          You can’t cancel it now, and returns will be available after delivery.
        </Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  selector: {
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  modalSelectStyle: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderColor: '#007bff',
    borderRadius: 8,
  },
  initValueText: {
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    color: 'black',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CancellationScreen;
