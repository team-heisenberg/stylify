import { View, TouchableOpacity, StyleSheet, Touchable } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import { Heading3, Heading5 } from "../../components/NormalText/FontTypes";
import { ArrowLeftBig } from "../../components/IconsComponent/IconsComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Agenda } from "react-native-calendars";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import { ScrollView } from "native-base";

const SelectProfessionalBusiness = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [time, setTime] = useState(false);
  const setTimeSlot = () => {
    setTime(!time);
    console.log("hello");
  };

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
      {/* <Agenda  theme={{}} /> */}
      <Agenda />

      <NormalText
        normalText={"Select Specialist"}
        textAlign="left"
        fontType={Heading5}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.specialistContainer}
      >
        <TouchableOpacity style={styles.specialistImageText}>
          <ImageComponent
            width={100}
            height={100}
            imageURL="https://picsum.photos/500/350"
            borderRadius={4}
          />
          <View style={styles.specialistTextMargin}>
            <NormalText normalText={"Mary Jane"} textAlign="center" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.specialistImageText}>
          <ImageComponent
            width={100}
            height={100}
            imageURL="https://picsum.photos/500/350"
            borderRadius={4}
          />
          <View style={styles.specialistTextMargin}>
            <NormalText normalText={"Mary Jane"} textAlign="center" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.specialistImageText}>
          <ImageComponent
            width={100}
            height={100}
            imageURL="https://picsum.photos/500/350"
            borderRadius={4}
          />
          <View style={styles.specialistTextMargin}>
            <NormalText normalText={"Mary Jane"} textAlign="center" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.specialistImageText}>
          <ImageComponent
            width={100}
            height={100}
            imageURL="https://picsum.photos/500/350"
            borderRadius={4}
          />
          <View style={styles.specialistTextMargin}>
            <NormalText normalText={"Mary Jane"} textAlign="center" />
          </View>
        </TouchableOpacity>
      </ScrollView>

      <NormalText
        normalText={"Available Slots"}
        textAlign="left"
        fontType={Heading5}
      />
      <View style={styles.timeSlotContainer}>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            height={32}
            width={96}
            backgroundColor={
              time ? "rgba(249, 245, 238, 1)" : "rgba(130, 40, 72, 1)"
            }
            buttonText="9:00 am"
            value={"9:00 am"}
            textColor={time ? "rgba(18, 20, 23, 1)" : "rgba(255, 255, 255, 1)"}
            onPress={setTimeSlot}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            height={32}
            width={96}
            backgroundColor={
              time ? "rgba(249, 245, 238, 1)" : "rgba(130, 40, 72, 1)"
            }
            buttonText="9:00 am"
            value={"9:00 am"}
            textColor={time ? "rgba(18, 20, 23, 1)" : "rgba(255, 255, 255, 1)"}
            onPress={setTimeSlot}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            height={32}
            width={96}
            backgroundColor={
              time ? "rgba(249, 245, 238, 1)" : "rgba(130, 40, 72, 1)"
            }
            buttonText="9:00 am"
            value={"9:00 am"}
            textColor={time ? "rgba(18, 20, 23, 1)" : "rgba(255, 255, 255, 1)"}
            onPress={setTimeSlot}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            height={32}
            width={96}
            backgroundColor={
              time ? "rgba(249, 245, 238, 1)" : "rgba(130, 40, 72, 1)"
            }
            buttonText="9:00 am"
            value={"9:00 am"}
            textColor={time ? "rgba(18, 20, 23, 1)" : "rgba(255, 255, 255, 1)"}
            onPress={setTimeSlot}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            height={32}
            width={96}
            backgroundColor={
              time ? "rgba(249, 245, 238, 1)" : "rgba(130, 40, 72, 1)"
            }
            buttonText="9:00 am"
            value={"9:00 am"}
            textColor={time ? "rgba(18, 20, 23, 1)" : "rgba(255, 255, 255, 1)"}
            onPress={setTimeSlot}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            height={32}
            width={96}
            backgroundColor={
              time ? "rgba(249, 245, 238, 1)" : "rgba(130, 40, 72, 1)"
            }
            buttonText="9:00 am"
            value={"9:00 am"}
            textColor={time ? "rgba(18, 20, 23, 1)" : "rgba(255, 255, 255, 1)"}
            onPress={setTimeSlot}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            height={32}
            width={96}
            backgroundColor={
              time ? "rgba(249, 245, 238, 1)" : "rgba(130, 40, 72, 1)"
            }
            buttonText="9:00 am"
            value={"9:00 am"}
            textColor={time ? "rgba(18, 20, 23, 1)" : "rgba(255, 255, 255, 1)"}
            onPress={setTimeSlot}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            height={32}
            width={96}
            backgroundColor={
              time ? "rgba(249, 245, 238, 1)" : "rgba(130, 40, 72, 1)"
            }
            buttonText="9:00 am"
            value={"9:00 am"}
            textColor={time ? "rgba(18, 20, 23, 1)" : "rgba(255, 255, 255, 1)"}
            onPress={setTimeSlot}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            height={32}
            width={96}
            backgroundColor={
              time ? "rgba(249, 245, 238, 1)" : "rgba(130, 40, 72, 1)"
            }
            buttonText="9:00 am"
            value={"9:00 am"}
            textColor={time ? "rgba(18, 20, 23, 1)" : "rgba(255, 255, 255, 1)"}
            onPress={setTimeSlot}
          />
        </View>
      </View>

      <View style={styles.button}>
        <ButtonComponent
          buttonText="Book Appointment"
          onPress={() =>
            navigation.navigate("Confirm Appointment Business", {
              title: "Confirm Appointment",
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
    marginLeft: 16,
    marginRight: 16,
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 16,
  },
  arrow: {
    paddingRight: 15,
  },
  specialistContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 21,
  },
  specialistImageText: {
    alignItems: "center",
    alignSelf: "flex-start",
    marginRight: 16,
  },
  specialistTextMargin: { marginTop: 8 },
  timeSlotContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 21,
  },
  buttonContainer: { marginRight: 16 },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 29,
    marginRight: 29,
    marginBottom: 24,
  },
});

export default SelectProfessionalBusiness;
