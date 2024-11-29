import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Home from '../components/Home';
import Detail from '../components/Detail';
import CRUDForm from '../components/CRUDForm';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Detail" component={Detail} />
    <Stack.Screen name="CRUDForm" component={CRUDForm} />
  </Stack.Navigator>
);

export default AppNavigator;
