import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView } from "react-native";
import StoryBoard from "../screens/StoryBoard/StoryBoard";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SignUpScreen from "../screens/LoginScreen/SignUpScreen";
import SignUpBusiness from "../screens/LoginScreen/SignUpBusiness";
import SignUpCustomer from "../screens/LoginScreen/SignUpCustomer";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitle: "",
            headerShown: true,
          }}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />

          <Stack.Screen name="SignUpBusiness" component={SignUpBusiness} />
          <Stack.Screen name="SignUpCustomer" component={SignUpCustomer} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="StoryBook" component={StoryBoard} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default StackNav;
