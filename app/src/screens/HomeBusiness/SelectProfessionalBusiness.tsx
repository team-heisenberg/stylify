import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import { Heading3, Heading5 } from "../../components/NormalText/FontTypes";
import {
  ArrowDown,
  ArrowLeftBig,
  ArrowUp,
} from "../../components/IconsComponent/IconsComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import { ScrollView } from "native-base";
import { createAxiosClient } from "../../api";
import { Calendar } from "react-native-calendars";

const SelectProfessionalBusiness = () => {
  const [professionals, setProfessionals] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const getProfessionals = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get("/professional")
      .then((res) => {
        console.log(res.data);
        const filteredProfessionals = res.data.filter(
          (a: { businessID: number }) => {
            return a.businessID === 2;
          }
        );
        setProfessionals(filteredProfessionals);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  useEffect(() => {
    getProfessionals();
  }, []);

  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  console.log(route.params);

  const [professionalSelection, setProfesionalSelection] = useState({
    date: "",
    specialist: [
      {
        name: "Kaho",
        photo: "https://i.pravatar.cc/300",
        timeSlots: ["9:00 am", "10:00 am", "11:00 am", "12:00 pm", "3:00 pm"],
        date: "",
      },
      {
        name: "Gabriel",
        photo: "https://i.pravatar.cc/300",
        timeSlots: ["11:15 am", "12:00 pm", "12:45 pm", "2:45 pm", "4:00 pm"],
      },
      {
        name: "Daniel",
        photo: "https://i.pravatar.cc/300",
        timeSlots: ["1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm"],
      },
      {
        name: "Diego",
        photo: "https://i.pravatar.cc/300",
        timeSlots: ["2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm"],
      },
    ],
  });

  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  const [selectedSpecialist, setSelectedSpecialist] = useState<{
    name: string;
    photo: string;
    timeSlots: string[];
  } | null>(null);

  const handleSpecialistSelection = (specialist: {
    name: string;
    photo: string;
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
        <NormalText
          normalText={route.params.titleProfessional}
          fontType={Heading3}
        />
      </View>
      <View style={styles.calendarContainer}>
        {expanded ? (
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              console.log("selected day", day);
            }}
            style={styles.calendar}
            firstDay={1}
            theme={{
              textDayFontFamily: "PlayfairDisplay_400Regular",
              textMonthFontFamily: "PlayfairDisplay_700Bold",
              textDayHeaderFontFamily: "PlayfairDisplay_700Bold",
              calendarBackground: "#F9F5EE",
              textDayFontWeight: "400",
              textDisabledColor: "#000000",
              textSectionTitleColor: "#105535",
              textDayHeaderFontWeight: "700",
              textDayHeaderFontSize: 16,
              selectedDayBackgroundColor: "#105535",
              selectedDayTextColor: "#105535",
              todayTextColor: "#ffffff",
              todayBackgroundColor: "#105535",
              textMonthFontWeight: "700",
              textMonthFontSize: 18,
            }}
          />
        ) : (
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              console.log("selected day", day);
            }}
            style={styles.expanded}
            firstDay={1}
            theme={{
              textDayFontFamily: "PlayfairDisplay_400Regular",
              textMonthFontFamily: "PlayfairDisplay_700Bold",
              textDayHeaderFontFamily: "PlayfairDisplay_700Bold",
              calendarBackground: "#F9F5EE",
              textDayFontWeight: "400",
              textDisabledColor: "#000000",
              textSectionTitleColor: "#105535",
              textDayHeaderFontWeight: "700",
              textDayHeaderFontSize: 14,
              selectedDayBackgroundColor: "#105535",
              selectedDayTextColor: "#105535",
              todayTextColor: "#ffffff",
              todayBackgroundColor: "#105535",
              arrowColor: "#000000",
              textMonthFontWeight: "700",
              textMonthFontSize: 18,
            }}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.arrowDownUpContainer}
      >
        {expanded ? (
          <ArrowUp
            width={20}
            height={24}
            fill={"black"}
            stroke={"black"}
            style={styles.arrowDownUp}
          />
        ) : (
          <ArrowDown
            width={20}
            height={20}
            fill={"black"}
            stroke={"black"}
            style={styles.arrowDownUp}
          />
        )}
      </TouchableOpacity>

      <View style={{ paddingLeft: 16 }}>
        <NormalText
          normalText={"Select Specialist"}
          textAlign="left"
          fontType={Heading5}
        />
      </View>
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

      <View style={{ paddingLeft: 16 }}>
        <NormalText
          normalText={"Available Slots"}
          textAlign="left"
          fontType={Heading5}
        />
      </View>

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
            navigation.navigate("Confirm Appointment Business", {
              titleConfirmation: "Confirm Appointment",
              selectedSpecialist: selectedSpecialist?.name,
              selectedSpecialistPhoto: selectedSpecialist?.photo,
              selectedTime: selectedTimeSlot,
              selectedDate: selectedDate,
              ...route.params,
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
    paddingLeft: 16,
    paddingRight: 16,
  },
  arrow: {
    paddingRight: 15,
  },
  specialistContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
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
    marginTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  buttonContainer: { marginRight: 16 },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 29,
    marginRight: 29,
    marginBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
  },
  calendarContainer: {
    borderTopWidth: 2,
    borderTopColor: "black",
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  calendar: {},
  expanded: {
    height: 130,
    overflow: "hidden",
  },
  arrowDownUpContainer: {
    backgroundColor: "transparent",
    paddingBottom: 5,
    paddingTop: 5,
  },
  arrowDownUp: {
    backgroundColor: "#F9F5EE",
    padding: 10,
    position: "absolute",
    top: -10,
    right: "47.5%",
    borderRadius: 24,
  },
});

export default SelectProfessionalBusiness;
