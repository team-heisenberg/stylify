import { View, TouchableOpacity, StyleSheet } from "react-native";
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

  console.log(route.params)

  const [professionalSelection, setProfesionalSelection] = useState({
    date: "",
    specialist: [
      {
        name: "Kaho",
        photo: "https://picsum.photos/500/350",
        timeSlots: ["9:00 am", "10:00 am", "11:00 am", "12:00 pm", "3:00 pm"],
      },
      {
        name: "Gabriel",
        photo: "https://picsum.photos/500/350",
        timeSlots: ["11:15 am", "12:00 pm", "12:45 pm", "2:45 pm", "4:00 pm"],
      },
      {
        name: "Daniel",
        photo: "https://picsum.photos/500/350",
        timeSlots: ["1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm"],
      },
      {
        name: "Diego",
        photo: "https://picsum.photos/500/350",
        timeSlots: ["2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm"],
      },
    ],
  });

  const [selectedSpecialist, setSelectedSpecialist] = useState<{
    name: string;
    timeSlots: string[];
  } | null>(null);

  const handleSpecialistSelection = (specialist: {
    name: string;
    timeSlots: string[];
  }) => {
    setSelectedSpecialist(specialist);
    console.log(specialist.name);
  };

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const setTimeSlot = (slot: string) => {
    setSelectedTimeSlot(selectedTimeSlot === slot ? "" : slot);
    console.log(slot);
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
        {professionalSelection.specialist.map((specialist, index) => (
          <TouchableOpacity
            style={styles.specialistImageText}
            key={index}
            onPress={() => handleSpecialistSelection(specialist)}
          >
            <ImageComponent
              width={100}
              height={100}
              imageURL={specialist.photo}
              borderRadius={4}
            />
            <View style={styles.specialistTextMargin}>
              <NormalText normalText={specialist.name} textAlign="center" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <NormalText
        normalText={"Available Slots"}
        textAlign="left"
        fontType={Heading5}
      />

      <View style={styles.timeSlotContainer}>
        {selectedSpecialist?.timeSlots.map((timeSlot) => (
          <View style={styles.buttonContainer}>
            <ButtonComponent
              key={timeSlot}
              height={32}
              width={96}
              backgroundColor={
                selectedTimeSlot === timeSlot
                  ? "rgba(130, 40, 72, 1)"
                  : "rgba(249, 245, 238, 1)"
              }
              buttonText={timeSlot}
              value={timeSlot}
              textColor={
                selectedTimeSlot === timeSlot
                  ? "rgba(255, 255, 255, 1)"
                  : "rgba(18, 20, 23, 1)"
              }
              onPress={() => setTimeSlot(timeSlot)}
            />
          </View>
        ))}
      </View>

      <View style={styles.button}>
        <ButtonComponent
          buttonText="Book Appointment"
          onPress={() =>
            navigation.navigate(
              "Confirm Appointment Business",
              {
                title: "Confirm Appointment",
                selectedSpecialist: selectedSpecialist?.name,
                selectedTime: selectedTimeSlot,
                ...route.params
              },
              // console.log(
              //   "Selected date:",
              //   "empty for now",
              //   "Selected specialist:",
              //   selectedSpecialist?.name,
              //   "Selected time:",
              //   selectedTimeSlot
              // )
            )
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
