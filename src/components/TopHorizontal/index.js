import {useState} from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import styles from '../../screen/utils/Styles';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../screen/utils/responsive';

const TopHorizontal = ({onPress, filterList}) => {
  const [selectedType, setSelectedType] = useState('All');

  const data = ['All', ...filterList];

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.menuContainer}
      data={data}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {
            setSelectedType(item);
            onPress(item === 'All' ? null : item);
          }}
          style={[
            styles.menuItem,
            {
              paddingHorizontal: wp(5),
              borderRadius: 25,
              height: hp(4.6),
              borderColor: item === selectedType ? '#000' : '#E6E6E6',
            },
          ]}>
          <Text
            style={[
              styles.menuText,
              {color: item === selectedType ? '#000' : '#777'},
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default TopHorizontal;