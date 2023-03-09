import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Calendar,
  PieChart,
  ThreeDots
} from "../components/IconsComponent/IconsComponent";
import HomeBusiness from "../screens/HomeBusiness/HomeBusiness";
import InsightsBusiness from "../screens/InsightsBusiness/InsightsBusiness";
import MoreBusiness from "../screens/MoreBusiness/MoreBusiness";

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
        name="Home Business"
        component={HomeBusiness}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Calendar
              width={20}
              height={19.27}
              fill={focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"}
              stroke={
                focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsBusiness}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <PieChart
              width={18.7}
              height={18.7}
              fill={focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"}
              stroke={
                focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreBusiness}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <ThreeDots
              width={20}
              height={4}
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
