const confiPayment = async (label_url, awb_number) => {
  try {
    const endPoint = 'addOrderConfirmation';
    setLoading(true);
    const user_id = await storage.getItem(storage.use_id);
    // First API Call: addOrderDetail
    const addOrderDetailData = {
      loginId: user_id,
      itemTotal: data?.commonData?.itemTotal ?? 0,
      orderImage: data?.productPaymentData?.[0]?.productImage ?? '',
      orderDescription: data?.productPaymentData?.[0]?.productDescription ?? '',
      color: data?.productPaymentData?.[0]?.Colour ?? 'N/A',
      size: data?.productPaymentData?.[0]?.Size ?? 'N/A',
      quantity: data?.productPaymentData?.[0]?.productQuantity ?? 0,
      price: data?.productPaymentData?.[0]?.SellingPrice ?? 0,
      MrpTotal: data?.commonData?.MrpTotal ?? 0,
      // itemTotal: 2,
      // orderImage: "http...",
      // orderDescription: "abcd",
      // color: "black",
      // size: "M",
      // quantity: 36,
      // price: 36,
      // MrpTotal: 36,
      coin: data?.commonData?.superCoins,
      billTotal: data?.commonData?.toPay,
      orderId: data?.commonData?.orderId,
      paymentMode: 'paid online',
      // deliveryAddress: "abc"
      deliveryAddress: data?.commonData?.deliverAddress ?? '',
    };
    const responses = await fetch(
      'https://bworth.co.in/api/bworth/addOrderDetail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addOrderDetailData),
      },
    );

    // Check if the request was successful
    if (!responses.ok) {
      throw new Error(`HTTP error! status: ${responses.status}`);
    }

    // Process the response if needed
    const result = await responses.json();
    // console.log('Order details added successfully:', result);

    const postdata = {
      loginId: user_id,
      confirmation: true,
      subtotal: data?.commonData?.toPay,
      orderId: data?.commonData?.orderId,
      superCoins: data?.commonData?.superCoins,
      transitionId: '0RD04823698',
      awb_number: awb_number,
      sc_confirmation_no: '0RD04823698',
      invociePdfUrl: label_url,
    };
    const response = await Api.postRequest(endPoint, JSON.stringify(postdata));
    if (response?.message == 'API success') {
      //aaa---
      const orderStatusData = {
        loginId: user_id,
        orderId: `BWO${data?.commonData?.orderId.toUpperCase()}`,
        orderStatus: 'Confirmed',
      };
      // console.log('order Status  data:', orderStatusData);

      const orderStatusResponse = await fetch(
        'https://bworth.co.in/api/bworth/addOrderStatus',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderStatusData),
        },
      );
      if (orderStatusResponse.ok) {
        const orderStatusResult = await orderStatusResponse.json();
        // console.log('order Status  added successfully:', orderStatusResult);
      } else {
        console.log(
          'Failed to log order Status:',
          `HTTP status: ${orderStatusResponse.status}`,
        );
      }
      //aaa---
      ToastAndroid.show('Order confirmed', ToastAndroid.SHORT);
      navigation.navigate('cartOrderConfirm', {data: response?.data});
    } else {
      const transactionData = {
        loginId: user_id,
        orderId: `BWO${data?.commonData?.orderId.toUpperCase()}`,
        transactionDescription: 'Cashback Earned',
        transactionAmount: data?.commonData?.superCoins,
        additional: '+',
        apply: 'false',
      };
      const transactionResponse = await fetch(
        'https://bworth.co.in/api/bworth/addTransactionList',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transactionData),
        },
      );
      if (transactionResponse.ok) {
        const transactionResult = await transactionResponse.json();
        // console.log('Transaction logged successfully:', transactionResult);
      } else {
        console.log(
          'Failed to log transaction:',
          `HTTP status: ${transactionResponse.status}`,
        );
      }
    }
    setLoading(false);
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
};
