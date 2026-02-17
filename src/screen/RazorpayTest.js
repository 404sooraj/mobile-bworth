import {View} from 'react-native';
import Button from '../components/Button';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import base64 from 'react-native-base64';
import * as sha256 from 'react-native-sha256';
const Payment = () => {
  const evironment = 'SANDBOX';
  const merchsnttId = 'PGTESTPAYUAT77';
  let logging = false;
  const Submit = async () => {
    await PhonePePaymentSDK.init(evironment, merchsnttId, null, logging);

    const requuestBody = {
      merchantId: merchsnttId,
      merchantTransactionId: 'MT7850590068188104',
      merchantUserId: '',
      amount: 10000,
      callbackUrl: '',
      mobileNumber: '9999999999',
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };
    const payload = JSON.stringify(requuestBody);
    const apiEndPoint = '/pg/v1/pay';
    const salt_key = '14fa5465-f8a7-443f-8477-f986b8fcfde9',
      salt_index = 1;
    const data = base64.encode(payload);
    const main = data + apiEndPoint + salt_key;
    const checksum =
      (await sha256.sha256(data + apiEndPoint + salt_key)) + '###' + salt_index;
    console.log('this is checksun', checksum);

    PhonePePaymentSDK.startTransaction(data, checksum, null, null)
      .then(res => {})
      .catch(eer => {
        console.log(eer);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button
        style={{alignItems: 'center', justifyContent: 'center'}}
        background={true}
        title={'Pay'}
        onPress={Submit}
      />
    </View>
  );
};
export default Payment;
