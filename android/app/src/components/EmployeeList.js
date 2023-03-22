import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const EmployeeList = ({ employees, onSelectEmployee }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.employeeContainer} onPress={() => onSelectEmployee(item)}>
        <Text style={styles.employeeName}>{item.name}</Text>
        <Text style={styles.employeePosition}>{item.position}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={employees}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.employeeListContainer}
      ListEmptyComponent={() => <View style={styles.emptyList}><Text>No employees found.</Text></View>}
    />
  );
};

export default EmployeeList;
