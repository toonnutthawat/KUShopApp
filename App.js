import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/Login";
import SignUpPage from "./src/pages/SignUpPage";
import ConfirmSignUpPage from "./src/pages/ConfirmSignUpPage";
import TestPage from "./src/pages/TestPage";
import Home from "./src/pages/Home";
import { store } from "./src/store/index.ts";
import { Provider } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage from "./src/pages/ProfilePage";
import Icon from "react-native-vector-icons/Ionicons";
import PostPage from "./src/pages/posts/PostPage";
import MyPosts from "./src/pages/posts/MyPosts";
import PostDetail from "./src/pages/posts/PostDetail";
import AllChats from "./src/pages/chat/AllChats";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ChatPage from "./src/pages/chat/ChatPage";
import "./global.css";
import AllProducts from "./src/pages/shop/AllProducts";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AddProduct from "./src/pages/shop/AddProduct";
import ManageRequest from "./src/pages/Admin/ManageRequest";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            return <Entypo name="home" size={24} color={color} />;
          } else if (route.name === "Chat") {
            return <Entypo name="chat" size={24} color={color} />;
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Shop") {
            return <FontAwesome5 name="shopping-cart" size={24} color={color} />
          }

          // Return empty if you want to hide the icon
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#004c27",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          width: 1000, // Adjust the height of the tab bar
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shop" component={AllProducts} />
      <Tab.Screen name="Chat" component={AllChats} />
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen
        name="Post"
        component={PostPage}
        options={{
          tabBarButton: () => null, // Hide the tab button completely
          tabBarIcon: () => <></>, // Hide the icon
          tabBarLabel: () => null, // Hide the label
        }}
      />
        <Tab.Screen
        name="ManageStatusRequest"
        component={ManageRequest}
        options={{
          tabBarButton: () => null, // Hide the tab button completely
          tabBarIcon: () => <></>, // Hide the icon
          tabBarLabel: () => null, // Hide the label
        }}
      />
      <Tab.Screen
        name="MyPosts"
        component={MyPosts}
        options={{
          tabBarButton: () => null, // Hide the tab button completely
          tabBarIcon: () => <></>, // Hide the icon
          tabBarLabel: () => null, // Hide the label
        }}
      />
      <Tab.Screen
        name="PostDetail"
        component={PostDetail}
        options={{
          tabBarButton: () => null, // Hide the tab button completely
          tabBarIcon: () => <></>, // Hide the icon
          tabBarLabel: () => null, // Hide the label
        }}
      />
      <Tab.Screen
        name="ChatPage"
        component={ChatPage}
        options={{
          tabBarButton: () => null, // Hide the tab button completely
          tabBarIcon: () => <></>, // Hide the icon
          tabBarLabel: () => null, // Hide the label
        }}
      />
        <Tab.Screen
        name="AddProduct"
        component={AddProduct}
        options={{
          tabBarButton: () => null, // Hide the tab button completely
          tabBarIcon: () => <></>, // Hide the icon
          tabBarLabel: () => null, // Hide the label
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
          <Stack.Screen
            name="Home"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUpPage} />
          <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
