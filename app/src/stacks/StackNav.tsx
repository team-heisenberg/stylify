import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import StoryBoard from "../screens/StoryBoard/StoryBoard";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SignUpScreen from "../screens/LoginScreen/SignUpScreen";
import SignUpBusiness from "../screens/LoginScreen/SignUpBusiness";
import SignUpCustomer from "../screens/LoginScreen/SignUpCustomer";
import TabViewComponent from "../components/TabViewComponent/TabViewComponent";
import BusinessDeals from "../screens/BusinessDeals/BusinessDeals";
import { createAxiosClient } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BusinessProfile from "../screens/BusinessProfile/BusinessProfile";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const [serviceTypes, setServiceTypes] = useState([]);

  const getServiceTypes = async () => {
    const { axiosClient } = await createAxiosClient();
    const rawUserData = await AsyncStorage.getItem("@stylify:user");
    const userData = JSON.parse(rawUserData || "{}");

    const res: any = await axiosClient
      .get(`/serviceType/servicetypebybusiness/${userData.ID}`)
      .catch((err) => ({ error: err }));

    const { data, error } = res;
    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setServiceTypes(data);
    }
  };

  useEffect(() => {
    getServiceTypes();
  }, []);

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
          <Stack.Screen
            name="TopTabNavigator"
            component={() => (
              <TabViewComponent
                routes={[
                  { key: "first", title: "First", Component: StoryBoard },
                  { key: "second", title: "Second", Component: StoryBoard },
                ]}
              />
            )}
          />
          <Stack.Screen
            name="BusinessDeals"
            component={() => (
              <TabViewComponent
                routes={[
                  { key: "all", title: "All", Component: BusinessDeals },
                  ...serviceTypes?.map((s: any) => ({
                    key: s.serviceTypeID,
                    title:
                      s.serviceType.charAt(0).toUpperCase() +
                      s.serviceType.slice(1),
                    Component: () => (
                      <BusinessDeals serviceTypeID={s.serviceTypeID} />
                    ),
                  })),
                ]}
              />
            )}
          />
          <Stack.Screen name="BusinessProfile" component={BusinessProfile} />


        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default StackNav;
