import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Home from "./src/screens/Home/Home";
import StoryBoard from "./src/screens/StoryBoard/StoryBoard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        {process.env.NODE_ENV === "development" && (
          <Stack.Screen name="Storyboard" component={StoryBoard} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
