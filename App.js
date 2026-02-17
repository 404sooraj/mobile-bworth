import React, {useState, useEffect} from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
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
  // SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screen/auth/HomeScreen';
import LoginScreen from './src/screen/auth/LoginScreen';
import PhoneVerification from './src/screen/auth/PhoneVerification';
import OTPVerification from './src/screen/auth/OTPVerification';
import currentLocation from './src/screen/common/currentLocation';
import RegisterScreen from './src/screen/auth/RegisterScreen';
import PinCode from './src/screen/common/PinCode';
import Sell from './src/screen/Sell';
import wardrobe from './src/screen/wardrobe';
import pickup from './src/screen/common/pickup';
import Token from './src/screen/common/Token';
import locone from './src/screen/common/locone';
import Loctwo from './src/screen/common/loctwo';
import locthree from './src/screen/common/locthree';
import locfour from './src/screen/common/locfour';
import {LogBox} from 'react-native';
import DashboardScreen from './src/navigation/DashboardScreen';
import MyOrders from './src/screen/cart/MyOrders';
import PrivacyPolicy from './src/screen/profilesection/PrivacyPolicy';
import CartScreen from './src/screen/TabScreen/cartScreen';
import CartCheckout from './src/screen/cart/cartCheckout';
import Settings from './src/screen/profilesection/Settings';
import EnableTwoFactorAuthenticationLogin from './src/screen/auth/EnableTwoFactorAuthenticationLogin';
import EnableTwoFactorAuthentication from './src/screen/auth/EnableTwoFactorAuthentication';
import ChangePassword from './src/screen/auth/ChangePassword';
import ProfileSettings from './src/screen/profilesection/ProfileSettings';
import TokenTransaction from './src/screen/common/TokenTransaction';
import PaymentMethodBlur from './src/screen/cart/PaymentMethodBlur';
import FAQ1 from './src/screen/profilesection/FAQ1';
import BuyBackPolicies from './src/screen/profilesection/BuyBackPolicies';
import TokenPolicies from './src/screen/profilesection/TokenPolicies';
import LetUsKnow from './src/screen/profilesection/LetUsKnow';
import MyOrders1 from './src/screen/cart/MyOrders1';
import CartOrderConfirm from './src/screen/cart/cartOrderConfirm';
import CartOrderTrack from './src/screen/cart/cartOrderTrack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {persistor, store} from './src/redux/Store';
import toastConfig from '../MyPr1/src/custom/customToast';
import Toast from 'react-native-toast-message';
import PayMentMethod from './src/screen/PayMentMethod';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Splash from './src/screen/auth/SplashScreen';
import Adsress from './src/screen/addAdress';
import ProductsList from './src/screen/Products';
import ProductDetails from './src/screen/Products/ProductDetails';
import BrandScreen from './src/screen/BrandScreen';
import FavProductsList from './src/screen/Products/Favoriout';
import Payment from './src/screen/RazorpayTest';
import CancellationScreen from './src/screen/Cancellation';
import Privacy from './src/screen/Privacy';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
GoogleSignin.configure({
  webClientId:
    '474644404915-go5mppund2klg35ior512mcmpne70ocv.apps.googleusercontent.com',
});

export default function App() {
  // return <Payment />;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
              <NavigationContainer>
                <Toast config={toastConfig} />
                <Stack.Navigator
                  // initialRouteName="locone"
                  screenOptions={{
                    headerShown: false,
                  }}>
                  <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="PhoneVerification"
                    component={PhoneVerification}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="OTPVerification"
                    component={OTPVerification}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="currentLocation"
                    component={currentLocation}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{title: ''}}
                  />

                  <Stack.Screen
                    name="PinCode"
                    component={PinCode}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="Sell"
                    component={Sell}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="Privacy"
                    component={Privacy}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="wardrobe"
                    component={wardrobe}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="pickup"
                    component={pickup}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="token"
                    component={Token}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="locone"
                    component={locone}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="loctwo"
                    component={Loctwo}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="locthree"
                    component={locthree}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="locfour"
                    component={locfour}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={{title: ''}}
                  />

                  <Stack.Screen
                    name="MyOrders"
                    component={MyOrders}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="PrivacyPolicyy"
                    component={PrivacyPolicy}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="cartScreen"
                    component={CartScreen}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{title: ''}}
                  />

                  <Stack.Screen
                    name="cartCheckout"
                    component={CartCheckout}
                    options={{title: ''}}
                  />

                  <Stack.Screen
                    name="cartOrderTrack"
                    component={CartOrderTrack}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="cartOrderConfirm"
                    component={CartOrderConfirm}
                    options={{title: ''}}
                  />

                  <Stack.Screen
                    name="MyOrders1"
                    component={MyOrders1}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="CancellationScreen"
                    component={CancellationScreen}
                    options={{title: ''}}
                  />

                  <Stack.Screen
                    name="LetUsKnow"
                    component={LetUsKnow}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="TokenPolicies"
                    component={TokenPolicies}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="BuyBackPolicies"
                    component={BuyBackPolicies}
                    options={{title: ''}}
                  />

                  <Stack.Screen
                    name="FAQ1"
                    component={FAQ1}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="PaymentMethod"
                    component={PayMentMethod}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="PaymentMethodBlur"
                    component={PaymentMethodBlur}
                    options={{title: ''}}
                  />

                  <Stack.Screen
                    name="TokenTransaction"
                    component={TokenTransaction}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="ProfileSettings"
                    component={ProfileSettings}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="EnableTwoFactorAuthentication"
                    component={EnableTwoFactorAuthentication}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="Adress"
                    component={Adsress}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="EnableTwoFactorAuthenticationLogin"
                    component={EnableTwoFactorAuthenticationLogin}
                    options={{title: ''}}
                  />
                  <Stack.Screen name="ProductList" component={ProductsList} />
                  <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetails}
                  />
                  <Stack.Screen
                    name="FavProductsList"
                    component={FavProductsList}
                  />
                  <Stack.Screen name="BrandScreen" component={BrandScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaView>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
