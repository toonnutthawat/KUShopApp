import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import SignUpPage from './src/pages/SignUpPage';
import ConfirmSignUpPage from './src/pages/ConfirmSignUpPage';
import TestPage from './src/pages/TestPage';
import Home from './src/pages/Home';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Test" component={TestPage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
