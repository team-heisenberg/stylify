import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { auth } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View>
      <Text>Email: {auth.currentUser?.email} </Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
