import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { ArrowRight } from "../../components/IconsComponent/IconsComponent";
import NormalText from "../../components/NormalText/NormalText";
import { Heading4, BodyRegular } from "../../components/NormalText/FontTypes";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useNavigation } from "@react-navigation/native";

const GetStarted = () => {
  const navigation = useNavigation<any>();
  const onPressCustomer = () => {
    navigation.navigate("LoginScreen", { account: "customer" });
  };
  const onPressBusiness = () => {
    navigation.navigate("LoginScreen", { account: "business" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={{ width: 250, height: 200 }}
          source={require("../../../assets/logo/LogoAnimationFull.gif")}
        />
        <NormalText
          normalText="Your one-stop beauty destination"
          fontType={Heading4}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={{ width: "90%" }}>
          <ButtonComponent
            buttonText="Continue as a Customer"
            backgroundColor="#F9F5EE"
            textColor="#24313A"
            rightIcon={<ArrowRight width={13} height={13} fill="#24313A" />}
            onPress={onPressCustomer}
          />
        </View>
        <View style={styles.borderContainer}>
          <View style={styles.border} />
          <View style={styles.borderTextContainer}>
            <NormalText normalText="Or" fontType={BodyRegular} />
          </View>
        </View>
        <View style={{ width: "90%" }}>
          <ButtonComponent
            buttonText="Continue as a Business"
            backgroundColor="#F9F5EE"
            textColor="#24313A"
            rightIcon={<ArrowRight width={13} height={13} fill="#24313A" />}
            onPress={onPressBusiness}
          />
        </View>
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: "#F9F5EE",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  buttonsContainer: { width: "90%", alignItems: "center", marginBottom: 50 },
  borderContainer: {
    width: "100%",
    position: "relative",
    marginTop: 30,
  },
  border: { borderBottomWidth: 1, borderColor: "#24313A" },
  borderTextContainer: {
    backgroundColor: "#F9F5EE",
    alignSelf: "center",
    justifyContent: "center",
    bottom: 15,
    width: 40,
  },
});
