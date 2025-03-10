import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/Login";
import SignUpPage from "./src/pages/SignUpPage";
import WelcomePage from "./src/pages/WelcomePage";
import ConfirmSignUpPage from "./src/pages/ConfirmSignUpPage";
import TestPage from "./src/pages/TestPage";
import Home from "./src/pages/Home";
import { store } from "./src/store/index.ts";
import { Provider } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage from "./src/pages/profile/ProfilePage";
import Icon from "react-native-vector-icons/Ionicons";
import PostPage from "./src/pages/products/PostPage";
import AllChats from "./src/pages/chat/AllChats";
import Entypo from "@expo/vector-icons/Entypo";
import ChatPage from "./src/pages/chat/ChatPage";
import "./global.css";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import ManageRequest from "./src/pages/Admin/ManageRequest";
import ProductDetail from "./src/pages/products/ProductDetail";
import MyProducts from "./src/pages/products/MyProducts";
import MyFavoriteProducts from "./src/pages/products/MyFavoriteProducts";
import MyProductsPurchased from "./src/pages/products/MyProductsPurchased";


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
          } else if (route.name === "PostPage") {
            return <FontAwesome5 name="shopping-cart" size={24} color={color} />
          }

          // Return empty if you want to hide the icon
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#004c27",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          width: 1100, // Adjust the height of the tab bar
        },
        headerShown: false, // Set headerShown to false for all tabs
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{title : "หน้าแรก"}} />
      <Tab.Screen name="PostPage" component={PostPage} options={{title : "เพิ่มสินค้า"}} />
      <Tab.Screen name="Chat" component={AllChats} options={{title : "ข้อความ"}} />
      <Tab.Screen name="Profile" component={ProfilePage} options={{title : "โปรไฟล์"}} />
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
        name="MyFavoriteProducts"
        component={MyFavoriteProducts}
        options={{
          tabBarButton: () => null, // Hide the tab button completely
          tabBarIcon: () => <></>, // Hide the icon
          tabBarLabel: () => null, // Hide the label
        }}
      />
        <Tab.Screen
        name="MyProductsPurchased"
        component={MyProductsPurchased}
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
        name="MyProducts"
        component={MyProducts}
        options={{
          tabBarButton: () => null, // Hide the tab button completely
          tabBarIcon: () => <></>, // Hide the icon
          tabBarLabel: () => null, // Hide the label
        }}
      />
      <Tab.Screen
        name="ProductDetail"
        component={ProductDetail}
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
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Test" component={TestPage} />
            <Stack.Screen name="MyProducts" component={MyProducts} />
            <Stack.Screen name="Home"component={BottomTabs} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUpPage} />
            <Stack.Screen name="Welcome" component={WelcomePage} />
            <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpPage} />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
