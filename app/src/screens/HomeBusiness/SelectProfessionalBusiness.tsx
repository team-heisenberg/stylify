import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import { Heading3 } from "../../components/NormalText/FontTypes";
import { ArrowLeftBig } from "../../components/IconsComponent/IconsComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const SelectProfessionalBusiness = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  return (
    <>
      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeftBig width={24} height={17.54} fill="black" />
        </TouchableOpacity>
        <NormalText normalText={route.params.title} fontType={Heading3} />
      </View>
      <ButtonComponent
        buttonText="Book Appointment"
        onPress={() =>
          navigation.navigate("Confirm Appointment Business", {
            title: "Confirm Appointment",
          })
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    paddingRight: 15,
  },
});

export default SelectProfessionalBusiness;
