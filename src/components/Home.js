import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { initForcereactSmartStore, syncDownForcereactContacts, fetchForcereactLocalContacts, syncUpForcereactContacts } from '../services/salesforce';

const Home = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const initData = async () => {
      await initForcereactSmartStore();
      await syncDownForcereactContacts();
      const data = await fetchForcereactLocalContacts();
      setContacts(data);
    };
    initData();
  }, []);


  //syncing with local storage and slfc cloud
  const handleSyncUp = async () => {
    await syncUpForcereactContacts();
    const data = await fetchForcereactLocalContacts();
    setContacts(data);
  };

  return (
    <View style={styles.container}>
      <Button title="Sync Up Changes" onPress={handleSyncUp} />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.Id })}>
            <Text style={styles.item}>{item.Name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    fontSize: 18,
    padding: 10,
  },
});

export default Home;
