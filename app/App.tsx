import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";
import { SafeAreaViewBase, StyleSheet, Text, View } from "react-native";
import StoryBoard from "./src/screens/StoryBoard/StoryBoard";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import SignUpCustomer from "./src/screens/LoginScreen/SignUpCustomer";
import SignUpBusiness from "./src/screens/LoginScreen/SignUpBusiness";
import SignUpScreen from "./src/screens/LoginScreen/SignUpScreen";
import StackNav from "./src/stacks/StackNav";
import { SafeAreaView } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       options={{ headerShown: false }}
    //       name="Login"
    //       component={LoginScreen}
    //     />
    //     <Stack.Screen name="SignUp" component={SignUpScreen} />
    //     <Stack.Screen name="SignUpBusiness" component={SignUpBusiness} />
    //     <Stack.Screen name="SignUpCustomer" component={SignUpCustomer} />
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // <View style={styles.container}>
    //   <StatusBar style="auto" />
    //   <StoryBoard />
    // </View>
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <StackNav />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
