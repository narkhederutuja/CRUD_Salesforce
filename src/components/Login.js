import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { SalesforceOAuth } from 'react-native-force';

const Login = ({ navigation }) => {
  const handleLogin = async () => {
    try {
      //Initiates the OAuth flow, prompting the user to authenticate with Salesforce.
      const loginInfo = await SalesforceOAuth.login();
      console.log("Login Successful: ", loginInfo);
      navigation.navigate('Home');
    } catch (error) {
      console.error("Login Failed: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Login to Salesforce" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
