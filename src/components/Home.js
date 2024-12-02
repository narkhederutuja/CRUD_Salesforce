import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { 
  initForcereactSmartStore, 
  syncDownForcereactContacts, 
  fetchForcereactLocalContacts, 
  syncUpForcereactContacts 
} from '../services/salesforce';
import CRUDForm from '../components/CRUDForm'; // Import CRUDForm

const Home = ({ navigation }) => {
  // State variables for contacts, form visibility, and the selected contact
  const [contacts, setContacts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch initial data when the component mounts
  useEffect(() => {
    const initData = async () => {
      await initForcereactSmartStore();
      await syncDownForcereactContacts();
      const data = await fetchForcereactLocalContacts();
      setContacts(data);
    };
    initData();
  }, []);

  // Sync local changes to Salesforce cloud and refresh the list
  const handleSyncUp = async () => {
    await syncUpForcereactContacts();
    const data = await fetchForcereactLocalContacts();
    setContacts(data);
  };

  // Toggle the form visibility and set the contact for editing
  const handleToggleForm = (contact = null) => {
    setSelectedContact(contact);
    setIsFormVisible((prev) => !prev);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Sync Button */}
        <Button title="Sync Up Changes" onPress={handleSyncUp} />
        {/* FlatList to display all contacts */}
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.Id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.Id })}>
              <Text style={styles.item}>{item.Name}</Text>
            </TouchableOpacity>
          )}
        />
        {/* Button to toggle the form */}
       { /* Changes between "Hide Form" and "Create/Update Contact" depending on visibility.*/}
        <Button
          title={isFormVisible ? 'Hide Form' : 'Create/Update Contact'}
          onPress={() => handleToggleForm()}
        />
      </View>
      {/* CRUDForm section */}
      {isFormVisible && (
        <View style={styles.formContainer}>
          <CRUDForm
            route={{ params: selectedContact }}
            navigation={navigation}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    fontSize: 18,
    padding: 10,
  },
  formContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Home;
