import {Image, View} from 'react-native';
import Styles from '../utils/Styles';
import {useEffect} from 'react';
import storage from '../utils/storageService';

const Splash = ({navigation}) => {
  useEffect(() => {
    goTo();
  }, []);
  const goTo = async () => {
    const id = await storage.getItem(storage.use_id);
    setTimeout(() => {
      if (id) {
        navigation.replace('Dashboard');
      } else {
        navigation.replace('Home');
      }
    }, 1000);
  };
  return (
    <View style={Styles.container}>
      <Image
        source={require('../../assets/BWORTH.jpeg')}
        style={{
          width: '90%',
          height: '60%',
        }}
        resizeMode="contain"
      />
    </View>
  );
};
export default Splash;
