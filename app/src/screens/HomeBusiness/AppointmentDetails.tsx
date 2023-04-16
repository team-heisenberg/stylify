import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { ArrowLeftBig } from "../../components/IconsComponent/IconsComponent";
import NormalText from "../../components/NormalText/NormalText";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Heading3,
  Heading4,
  captions,
  Heading6,
} from "../../components/NormalText/FontTypes";
import { Divider } from "native-base";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import Card from "../../components/Card/Card";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { removeYear } from "../../utils";

const AppointmentDetails = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { appointment } = route.params;

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#F9F5EE" }}>
      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeftBig width={24} height={17.54} fill="black" />
        </TouchableOpacity>
        <NormalText normalText="Appointment" fontType={Heading3} />
      </View>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          flex: 1,
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <View style={styles.card}>
          <Card height={260} width="100%">
            <View style={styles.cardContentContainer}>
              <View style={styles.cardSection}>
                <NormalText
                  normalText={"Customer Name"}
                  textAlign="left"
                  fontType={captions}
                />
                <View style={styles.cardSectionContent}>
                  <NormalText
                    normalText={`${appointment.customerName}`}
                    fontType={Heading4}
                    textAlign="left"
                  />
                </View>
              </View>
              <Divider />
              <View style={styles.cardSection}>
                <NormalText
                  normalText={"Date & time"}
                  textAlign="left"
                  fontType={captions}
                />
                <View style={styles.cardSectionContent}>
                  <NormalText
                    normalText={removeYear(appointment.dateAndTime || "")}
                    fontType={Heading6}
                    textAlign="left"
                  />
                </View>
              </View>
              <Divider />
              <View style={styles.cardSection}>
                <NormalText
                  normalText={"Services Booked"}
                  textAlign="left"
                  fontType={captions}
                />
                <View style={styles.cardSectionContent}>
                  <NormalText
                    normalText={appointment.services}
                    fontType={Heading6}
                    textAlign="left"
                  />
                </View>
              </View>
              <Divider />
              <View style={styles.cardSection}>
                <NormalText
                  normalText={"Total Cost"}
                  textAlign="left"
                  fontType={captions}
                />
                <View style={styles.cardSectionContent}>
                  <NormalText
                    normalText={`$${appointment.total}`}
                    fontType={Heading6}
                    textAlign="left"
                  />
                </View>
              </View>
            </View>
          </Card>
          <View style={styles.imageSpecialist}>
            <NormalText
              normalText="Specialist"
              textAlign="left"
              fontType={Heading6}
            />
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <ImageComponent
                width={40}
                height={40}
                imageURL={appointment.professionalImage}
                borderRadius={20}
              />
              <NormalText
                normalText={appointment.professionalName}
                fontType={Heading6}
                textAlign="left"
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            justifyContent: "flex-end",
          }}
        >
          <ButtonComponent buttonText="Edit Appointment" />
          <ButtonComponent
            buttonText="Cancel Appointment"
            backgroundColor="#F9F5EE"
            textColor="#105535"
          />
        </View>
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
  card: {
    height: 360,
    marginTop: 15,
    justifyContent: "space-between",
  },
  cardContentContainer: {
    width: "100%",
  },
  cardSection: {
    width: "100%",
    gap: 5,
    paddingVertical: 5,
  },
  cardSectionContent: {
    paddingHorizontal: 10,
  },
  imageSpecialist: {
    width: "100%",
    alignItems: "flex-start",
    paddingBottom: 16,
    gap: 8,
  },
});
