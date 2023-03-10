import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView } from "react-native";
import StoryBoard from "../screens/StoryBoard/StoryBoard";
import TabNavigatorClient from "./TabNavigatorClient";
import Browse from "../screens/Browse/Browse";
import Deals from "../screens/Deals/Deals";
import Profile from "../screens/Profile/Profile";
import ServiceDetail from "../screens/Browse/ServiceDetail";
import ClientAppointments from "../screens/Profile/ClientAppointments";
import ClientFavourites from "../screens/Profile/ClientFavourites";
import ClientProfile from "../screens/Profile/ClientProfile";
import ClientSettings from "../screens/Profile/ClientSettings";
<<<<<<< HEAD
import TabNavigatorBusiness from "./TabNavigatorBusiness";
=======
import SearchScreen from "../screens/SearchScreen/SearchScreen";
>>>>>>> 6c43072 (feature/HB-133-Implement-search-functionality)

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitle: "",
            headerTitle: "hello",
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Navigation"
            component={TabNavigatorBusiness}
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen
            name="Navigation"
            component={TabNavigatorClient}
            options={{
              headerShown: false,
            }}
          /> */}
          <Stack.Screen name="Home" component={StoryBoard} />
          <Stack.Screen name="Browse" component={Browse} />
          <Stack.Screen name="Deals" component={Deals} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Service Detail" component={ServiceDetail} />
<<<<<<< HEAD
          <Stack.Screen
            name="Client Appointments"
            component={ClientAppointments}
          />
=======
          <Stack.Screen name="Search Results" component={SearchScreen} />
          <Stack.Screen name="Client Appointments" component={ClientAppointments} />
>>>>>>> 6c43072 (feature/HB-133-Implement-search-functionality)
          <Stack.Screen name="Client Favourites" component={ClientFavourites} />
          <Stack.Screen name="Client Profile" component={ClientProfile} />
          <Stack.Screen name="Client Settings" component={ClientSettings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default StackNav;
