import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

const PrivacyPolicy = ({navigation, route}) => {
  const data = route?.params?.data ?? [];
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({item}) => {
    const isExpanded = expandedItems[item.id];

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{item?.policyHeading}:</Text>
          <Text
            style={styles.itemDescription}
            numberOfLines={isExpanded ? undefined : 3}>
            {item.policyDescription}
          </Text>
        </View>
        {item.policyDescription.length > 150 && (
          <TouchableOpacity onPress={() => toggleExpand(item.id)}>
            <Text style={styles.learnMore}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#000000',
          paddingLeft: 20,
          paddingBottom: '2%',
          fontSize: 24,
        }}>
        Privacy Policy
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listContent: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  itemHeader: {
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 20,
  },
  learnMore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#004CFF',
    textAlign: 'right',
    marginTop: 10,
  },
});

export default PrivacyPolicy;
