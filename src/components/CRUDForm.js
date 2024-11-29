import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { createContact, updateContact, deleteContact, syncUpContacts } from '../services/salesforce';

const CRUDForm = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { id } = route.params || {};

  const handleSubmit = async () => {
    if (id) {
      await updateContact(id, { Name: name, Phone: phone });
    } else {
      await createContact({ Name: name, Phone: phone });
    }
    await syncUpContacts();
    navigation.goBack();
  };

  const handleDelete = async () => {
    await deleteContact(id);
    await syncUpContacts();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} />
      <Button title={id ? 'Update' : 'Create'} onPress={handleSubmit} />
      {id && <Button title="Delete" color="red" onPress={handleDelete} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
  },
});

export default CRUDForm;
