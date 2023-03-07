import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView } from "react-native";
import StoryBoard from "../screens/StoryBoard/StoryBoard";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerBackTitle: "Back to List" }}>
          <Stack.Screen
            name="Navigation"
            component={TabNavigator}
            // options={{
            //   headerStyle: { backgroundColor: "#273646" },
            //   headerTitleStyle: { color: "white" },
            // }}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default StackNav;
