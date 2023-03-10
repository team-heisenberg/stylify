// import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import StackNav from "./src/stacks/StackNav";
import { SafeAreaView } from "react-native";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
import { NativeBaseProvider } from "native-base";


export default function App() {
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
