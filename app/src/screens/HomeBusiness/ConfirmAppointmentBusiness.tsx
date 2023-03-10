import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import { Heading3 } from "../../components/NormalText/FontTypes";
import { ArrowLeftBig } from "../../components/IconsComponent/IconsComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Message from "../../components/Message/Message";

const ConfirmAppointmentBusiness = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // const showConfirmation = () => {
  //   return <Message />;
  // };

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
      <Message />
      {/* <ButtonComponent
        buttonText="Confirm Booking"
        onPress={showConfirmation}
        // onPress={() => navigation.navigate("Select Professional Business")}
      /> */}
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

export default ConfirmAppointmentBusiness;
