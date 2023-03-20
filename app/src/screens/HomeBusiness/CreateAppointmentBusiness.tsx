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
    <View style={styles.container}>
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
      <View style={styles.inputs}>
        <InputComponent
          isRequired
          placeholder="Customer Name"
          inputLabel="Customer Name"
        />
        <InputComponent isRequired placeholder="Email" inputLabel="Email" />
        <InputComponent isRequired placeholder="Mobile" inputLabel="Mobile" />
      </View>
      <View style={styles.details}>
        <View style={styles.textDetails}>
          <NormalText
            normalText="Appointment Details"
            fontType={Heading3}
            textAlign="left"
          />
        </View>
        {typeOfAppointment.map((type) => (
          <Radio
            key={type}
            radioValue={type}
            selected={selectedValue === type}
            onPress={handleRadioPress}
            radioText={type}
          />
        ))}
      </View>
      <View style={styles.button}>
        <ButtonComponent
          buttonText="Select Services"
          onPress={() =>
            navigation.navigate("Select Services Business", {
              title: "Select Services",
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F5EE",
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 16,
    marginLeft: 16,
  },
  arrow: {
    paddingRight: 15,
  },
  inputs: {
    marginLeft: 16,
    marginRight: 16,
  },
  details: {
    marginLeft: 16,
    marginRight: 16,
  },
  textDetails: {
    marginTop: 24,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 24,
  },
});

export default CreateAppointmentBusiness;