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
import ClientFavourites from "../screens/Profile/ClientFavourites";
import ClientProfile from "../screens/Profile/ClientProfile";
import ClientSettings from "../screens/Profile/ClientSettings";
import ConfirmAppointmentBusiness from "../screens/HomeBusiness/ConfirmAppointmentBusiness";
import CreateAppointmentBusiness from "../screens/HomeBusiness/CreateAppointmentBusiness";
import SelectProfessionalBusiness from "../screens/HomeBusiness/SelectProfessionalBusiness";
import SelectServicesBusiness from "../screens/HomeBusiness/SelectServicesBusiness";
import Booking from "../screens/Booking/Booking";
import Browse from "../screens/Browse/Browse";
import Deals from "../screens/Deals/Deals";
import Profile from "../screens/Profile/Profile";
import ServiceDetail from "../screens/Browse/ServiceDetail";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import TabNavigatorBusiness from "./TabNavigatorBusiness";
import topProfessionalsDetails from "../screens/InsightsBusiness/topProfessionalsDetails";

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
            headerShown: false,
          }}
        // screenOptions={{
        //   headerBackTitle: "",
        //   headerShown: true,
        // }}
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
          <Stack.Screen name="Client Favourites" component={ClientFavourites} />
          <Stack.Screen name="Client Profile" component={ClientProfile} />
          <Stack.Screen name="Client Settings" component={ClientSettings} />
          <Stack.Screen name="Booking" component={Booking} />

          {/* Business Home Page / Create Appointment */}
          <Stack.Screen
            name="Create Appointment Business"
            component={CreateAppointmentBusiness}
          />
          <Stack.Screen
            name="Select Services Business"
            component={SelectServicesBusiness}
          />
          <Stack.Screen
            name="Select Professional Business"
            component={SelectProfessionalBusiness}
          />
          <Stack.Screen
            name="Confirm Appointment Business"
            component={ConfirmAppointmentBusiness}
          />

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
          <Stack.Screen name="Search Results" component={SearchScreen} />
          {/* <Stack.Screen
            name="Client Appointments"
            component={ClientAppointments}
          />
          <Stack.Screen name="Client Favourites" component={ClientFavourites} />
          <Stack.Screen name="Client Profile" component={ClientProfile} />
          <Stack.Screen name="Client Settings" component={ClientSettings} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default StackNav;
