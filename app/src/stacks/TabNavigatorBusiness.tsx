import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Calendar,
  CalendarFilled,
  PieChart,
  PieChartFilled,
  ThreeDots,
} from "../components/IconsComponent/IconsComponent";
import HomeBusiness from "../screens/HomeBusiness/HomeBusiness";
import InsightsBusiness from "../screens/InsightsBusiness/InsightsBusiness";
import MoreBusiness from "../screens/MoreBusiness/MoreBusiness";
import React from "react";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigatorBusiness = () => {
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
        name="Home Business"
        component={HomeBusiness}
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
                <CalendarFilled width={20} height={19.27} />
              ) : (
                <Calendar
                  width={20}
                  height={19.27}
                  fill="white"
                  stroke="white"
                />
              )}
            </View>
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
            <View
              style={{
                backgroundColor: focused
                  ? "rgba(244, 210, 81, 1)"
                  : "rgba(22, 29, 35, 1)",
                padding: 20,
                borderRadius: 8,
              }}
            >
              {focused ? (
                <PieChartFilled width={18.7} height={18.7} />
              ) : (
                <PieChart
                  width={18.7}
                  height={18.7}
                  fill="white"
                  stroke="white"
                />
              )}
            </View>
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
            <View
              style={{
                backgroundColor: focused
                  ? "rgba(244, 210, 81, 1)"
                  : "rgba(22, 29, 35, 1)",
                paddingTop: 26,
                paddingBottom: 26,
                paddingLeft: 18,
                paddingRight: 18,
                borderRadius: 8,
              }}
            >
              <ThreeDots
                width={20}
                height={4}
                fill={
                  focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"
                }
                stroke={
                  focused ? "rgba(22, 29, 35, 1)" : "rgba(253, 246, 233, 1)"
                }
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigatorBusiness;
