import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Header from '../../components/Header';

export default BuyBackPolicies = ({navigation, route}) => {
  const data = route?.params?.data ?? [];
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = index => {
    setExpandedItems(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const renderItem = ({item, index}) => {
    const isExpanded = !!expandedItems[index];
    return (
      <TouchableOpacity disabled style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{item.policyHeading}:</Text>
          <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
        </View>
        <Text
          style={styles.itemDescription}
          numberOfLines={isExpanded ? undefined : 2}>
          {item.policyDescription}
        </Text>
        {item.policyDescription.length > 150 && (
          <TouchableOpacity onPress={() => toggleExpand(index)}>
            <Text style={styles.learnMore}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Buy Back Policy</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemTitle: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'bold',
    marginRight: 5,
  },
  itemSubtitle: {
    color: '#000',
    fontSize: 13,
  },
  itemDescription: {
    color: '#000',
    fontSize: 13,
  },
  learnMore: {
    color: '#004CFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
});
