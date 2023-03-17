import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Deals from "../screens/Deals/Deals";
import HomeCustomer from "../screens/HomeCustomer/HomeCustomer";
import Profile from "../screens/Profile/Profile";
import Browse from "../screens/Browse/Browse";
import {
  Home,
  User,
  Browse as BrowseIcon,
  Fire,
} from "../components/IconsComponent/IconsComponent";

const Tab = createBottomTabNavigator();

const TabNavigatorClient = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(22, 29, 35, 1)",
          height: 98,
        },
        tabBarActiveBackgroundColor: "rgba(244, 210, 81, 1)",
        tabBarActiveTintColor: "rgba(22, 29, 35, 1)",
        tabBarInactiveTintColor: "rgba(253, 246, 233, 1)",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeCustomer}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Home
              width={16.7}
              height={18.34}
              fill={focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"}
              stroke={
                focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"
              }
            />
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
            <BrowseIcon
              width={17.76}
              height={17.77}
              fill={focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"}
              stroke={
                focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"
              }
            />
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
            <Fire
              width={14.5}
              height={20.32}
              fill={focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"}
              stroke={
                focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"
              }
            />
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
            <User
              width={18}
              height={19.72}
              fill={focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"}
              stroke={
                focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigatorClient;
