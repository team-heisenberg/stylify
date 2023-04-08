// import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import StackNav from "./src/stacks/StackNav";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Figtree_300Light,
  Figtree_400Regular,
  Figtree_700Bold,
} from "@expo-google-fonts/figtree";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";

export default function App() {
  let [fontsLoaded] = useFonts({
    Figtree_300Light,
    Figtree_400Regular,
    Figtree_700Bold,
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <StackNav />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F5EE",
    alignItems: "center",
    justifyContent: "center",
  },
});
