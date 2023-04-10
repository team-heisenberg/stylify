import { StyleSheet, View } from "react-native";
import React from "react";
import { Image } from "react-native";

const LogoScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo/LogoAnimation.gif")} />
    </View>
  );
};

export default LogoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
