import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import SignUpPage from './src/pages/SignUpPage';
import ConfirmSignUpPage from './src/pages/ConfirmSignUpPage';
import TestPage from './src/pages/TestPage';
import Home from './src/pages/Home';
import { store } from './src/store/index.ts';
import { Provider } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilePage from './src/pages/ProfilePage';
import Icon from 'react-native-vector-icons/Ionicons';
import PostPage from './src/pages/posts/PostPage';
import MyPosts from './src/pages/posts/MyPosts';
import "./global.css";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Test') {
            iconName = 'play';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Post') {
            iconName = 'paper-plane';
          }

          // Return empty if you want to hide the icon
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#004c27',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          width: 500,  // Adjust the height of the tab bar
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Post" component={PostPage} />
      <Tab.Screen name="Test" component={TestPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen
        name="MyPosts"
        component={MyPosts}
        options={{
          tabBarButton: () => null,  // Hide the tab button completely
          tabBarIcon: () => <></>,  // Hide the icon
          tabBarLabel: () => null,  // Hide the label
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Test" component={TestPage} />
          <Stack.Screen name="MyPosts" component={MyPosts} />
          <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUpPage} />
          <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
