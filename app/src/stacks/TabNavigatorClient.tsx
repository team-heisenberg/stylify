import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Deals from "../screens/Deals/Deals";
import Profile from "../screens/Profile/Profile";
import Browse from "../screens/Browse/Browse";
import {
  Home,
  User,
  Browse as BrowseIcon,
  Fire,
  HomeFilled,
  BrowseIconFilled,
  FireFilled,
  UserFilled,
} from "../components/IconsComponent/IconsComponent";
import HomeCustomer from "../screens/HomeCustomer/HomeCustomer";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigatorClient = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(22, 29, 35, 1)",
          height: 98,
          paddingBottom: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home Customer"
        component={HomeCustomer}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? "rgba(244, 210, 81, 1)"
                  : "rgba(22, 29, 35, 1)",
                padding: 19,
                borderRadius: 8,
              }}
            >
              {focused ? (
                <HomeFilled width={16.7} height={18.34} />
              ) : (
                <Home fill="white" />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={Browse}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? "rgba(244, 210, 81, 1)"
                  : "rgba(22, 29, 35, 1)",
                padding: 19,
                borderRadius: 8,
              }}
            >
              {focused ? (
                <BrowseIconFilled width={17.76} height={17.77} />
              ) : (
                <BrowseIcon width={17.76} height={17.77} fill="white" />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Deals"
        component={Deals}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? "rgba(244, 210, 81, 1)"
                  : "rgba(22, 29, 35, 1)",
                paddingTop: 19,
                paddingBottom: 19,
                paddingLeft: 21,
                paddingRight: 21,
                borderRadius: 8,
              }}
            >
              {focused ? (
                <FireFilled width={14.5} height={20.32} />
              ) : (
                <Fire width={14.5} height={20.32} fill="white" />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? "rgba(244, 210, 81, 1)"
                  : "rgba(22, 29, 35, 1)",
                padding: 19,
                borderRadius: 8,
              }}
            >
              {focused ? (
                <UserFilled width={18} height={19.72} />
              ) : (
                <User width={18} height={19.72} fill="white" />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigatorClient;
