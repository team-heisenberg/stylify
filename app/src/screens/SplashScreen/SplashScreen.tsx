import { StyleSheet, View } from "react-native";
import React from "react";
import { Logo } from "../../components/IconsComponent/IconsComponent";
import NormalText from "../../components/NormalText/NormalText";
import { Heading2, BodyRegular } from "../../components/NormalText/FontTypes";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <NormalText normalText="Welcome to Stylify" fontType={Heading2} />
      <NormalText
        normalText="Customizing your experience"
        fontType={BodyRegular}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    top: "30%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
