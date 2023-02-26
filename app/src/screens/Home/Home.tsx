import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";
import { defaultStyles } from "../../styles";

const Home = ({ navigation }: NativeStackScreenProps<any>) => {
  return (
    <View style={defaultStyles.container}>
      <Text>Home</Text>

      {process.env.NODE_ENV === "development" && (
        <TemporaryButton
          title="Storyboard"
          onPress={() => navigation.push("Storyboard")}
        />
      )}
    </View>
  );
};

const TemporaryButton = ({ title, onPress }: any) => {
  return (
    <TouchableOpacity
      style={{
        shadowColor: "#d6d6d6", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: "#fff",
        elevation: 10, // Android
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderBottomColor: "red",
        borderBottomWidth: 3,
        borderRightColor: "red",
        borderRightWidth: 3
      }}
      onPress={onPress}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default Home;
