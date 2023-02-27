import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();

  const businessSignUp = () => {
    navigation.navigate("SignUpBusiness");
  };

  const customerSignUp = () => {
    navigation.navigate("SignUpCustomer");
  };

  return (
    <View>
      <TouchableOpacity onPress={businessSignUp}>
        <Text>Business</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={customerSignUp}>
        <Text>Customer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
