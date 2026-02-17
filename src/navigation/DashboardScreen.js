import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../screen/TabScreen/Home';
import Brands from '../screen/TabScreen/Brands';
import Profile from '../screen/TabScreen/Profile';
import Cashbacks from '../screen/TabScreen/Cashbacks';
import CartScreen from '../screen/TabScreen/cartScreen';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsList from '../screen/Products';
import ProductDetails from '../screen/Products/ProductDetails';

export default function DashboardScreen() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        title: '',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              return focused ? (
                <Image
                  style={{marginTop: '12%'}}
                  source={require('../assets/bottumicon/Home1.png')}
                />
              ) : (
                <Image
                  style={{marginTop: '12%'}}
                  source={require('../assets/bottumicon/Home0.png')}
                />
              );
            case 'Brands':
              return focused ? (
                <Image
                  style={{marginTop: '12%'}}
                  source={require('../assets/bottumicon/brand1.png')}
                />
              ) : (
                <Image
                  style={{marginTop: '12%'}}
                  source={require('../assets/bottumicon/brand0.png')}
                />
              );
            case 'Cashbacks':
              return focused ? (
                <Image
                  style={{
                    marginTop: '12%',
                    width: 25, // Adjust width as desired
                    height: 42, // Adjust height as desired
                  }}
                  source={require('../assets/bottumicon/cashback1.png')}
                />
              ) : (
                <Image
                  style={{
                    marginTop: '12%',
                    width: 25, // Adjust width as desired
                    height: 42, // Adjust height as desired
                  }}
                  source={require('../assets/bottumicon/cashback0.png')}
                />
              );
              break;
            case 'Profile':
              return focused ? (
                <Image
                  style={{marginTop: '12%'}}
                  source={require('../assets/bottumicon/profile1.png')}
                />
              ) : (
                <Image
                  style={{marginTop: '12%'}}
                  source={require('../assets/bottumicon/profile0.png')}
                />
              ); // Changed from 'lock' to 'user' as 'lock' might not be suitable for profile
              break;
            case 'Cart':
              iconName = 'shopping-cart'; // Using 'shopping-cart' for the cart screen
              break;
            default:
              iconName = 'circle';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Homestack} />
      <Tab.Screen name="Brands" component={BrandStack} />
      <Tab.Screen name="Cashbacks" component={Cashbacks} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* <Tab.Screen name="Cart" component={CartScreen} /> */}
    </Tab.Navigator>
  );
}
const HomeStack = createStackNavigator();
const Homestack = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home1" component={Home} />
    </HomeStack.Navigator>
  );
};
const BrandStack = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Brands} />
      {/* <HomeStack.Screen name="Cancellation" component={CancellationScreen} />  */}
    </HomeStack.Navigator>
  );
};
