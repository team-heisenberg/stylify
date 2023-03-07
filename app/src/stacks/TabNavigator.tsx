import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Browse from "../screens/Browse/Browse";
import Deals from "../screens/Deals/Deals";
import Profile from "../screens/Profile/Profile";
import StoryBoard from "../screens/StoryBoard/StoryBoard";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
        component={StoryBoard}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Browse"
        component={Browse}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Deals"
        component={Deals}
        options={{ headerShown: false, tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, tabBarShowLabel: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
