import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchRecordDetail } from '../services/salesforce';

const Detail = ({ route }) => {
  const [record, setRecord] = useState(null);
  const { id } = route.params;

  useEffect(() => {
    const getRecordDetail = async () => {
      const data = await fetchRecordDetail(id);
      setRecord(data);
    };
    getRecordDetail();
  }, [id]);

  return (
    <View style={styles.container}>
      {record ? (
        <>
          <Text style={styles.label}>Name: {record.Name}</Text>
          <Text style={styles.label}>Phone: {record.Phone}</Text>
          <Text style={styles.label}>Email: {record.Email}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default Detail;
