import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ArrowLeftBig } from "../../components/IconsComponent/IconsComponent";
import NormalText from "../../components/NormalText/NormalText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Heading3 } from "../../components/NormalText/FontTypes";

const AppointmentDetails = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  return (
    <View>
      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeftBig width={24} height={17.54} fill="black" />
        </TouchableOpacity>
        <NormalText
          normalText={route.params.titleCreateAppointment}
          fontType={Heading3}
        />
      </View>
    </View>
  );
};

export default AppointmentDetails;

const styles = StyleSheet.create({
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
});
