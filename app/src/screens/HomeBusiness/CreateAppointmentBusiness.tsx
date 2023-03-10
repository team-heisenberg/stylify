import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import { Heading3 } from "../../components/NormalText/FontTypes";
import { ArrowLeftBig } from "../../components/IconsComponent/IconsComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import Radio from "../../components/Radio/Radio";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const CreateAppointmentBusiness = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [selectedValue, setSelectedValue] = useState("");
  const handleRadioPress = (value: string) => {
    setSelectedValue(value);
  };
  const typeOfAppointment = ["Walk-in", "Call Appointment"];

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
      <>
        <InputComponent
          isRequired
          placeholder="Customer Name"
          inputLabel="Customer Name"
        />
        <InputComponent isRequired placeholder="Email" inputLabel="Email" />
        <InputComponent isRequired placeholder="Mobile" inputLabel="Mobile" />
      </>
      <>
        <NormalText normalText="Appointment Details" fontType={Heading3} />
        {typeOfAppointment.map((type) => (
          <Radio
            key={type}
            radioValue={type}
            selected={selectedValue === type}
            onPress={handleRadioPress}
            radioText={type}
          />
        ))}
      </>
      <ButtonComponent
        buttonText="Select Services"
        onPress={() =>
          navigation.navigate("Select Services Business", {
            title: "Select Services",
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

export default CreateAppointmentBusiness;
