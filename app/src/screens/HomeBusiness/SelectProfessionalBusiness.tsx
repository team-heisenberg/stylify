import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import { Heading3, Heading5 } from "../../components/NormalText/FontTypes";
import {
  ArrowLeftBig,
  Check,
  DownChevronCircle,
} from "../../components/IconsComponent/IconsComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import { ScrollView } from "native-base";
import { createAxiosClient } from "../../api";
import { Calendar } from "react-native-calendars";

const SelectProfessionalBusiness = () => {
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const getProfessionals = async () => {
    const { axiosClient } = await createAxiosClient();
    const { businessID } = route.params;
    console.log("<><><><><><><><><", businessID);
    await axiosClient
      .get(`/professional/byBusinessId/${businessID}`)
      .then((res) => {
        setProfessionals(res.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  useEffect(() => {
    getProfessionals();
  }, []);

  console.log(route.params);

  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    new Date().toDateString()
  );

  const [selectedSpecialist, setSelectedSpecialist] = useState<any>({});

  const handleSpecialistSelection = (professional: any) => {
    if (selectedSpecialist === professional) {
      setSelectedSpecialist(null);
    }
    setSelectedSpecialist(professional);
    setSelectedTimeSlot("");
  };

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const setTimeSlot = (slot: string) => {
    setSelectedTimeSlot(selectedTimeSlot === slot ? "" : slot);
    console.log(slot);
  };

  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [markedDates, setMarkedDates] = useState({
    [currentDate]: { selected: true, selectedColor: "#105535" },
  });

  const handleDayPress = (day: any) => {
    setMarkedDates({
      [currentDate]: { selected: false },
      [day.dateString]: { selected: true, selectedColor: "#105535" },
    });
    setCurrentDate(day.dateString);
    setSelectedDate(new Date(day.dateString).toDateString());
    console.log(day);
  };

  const dedupeArray = (arr: any[]) => {
    arr = arr.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.slot === value.slot)
    );
    return arr;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
              markedDates={markedDates}
              onDayPress={handleDayPress}
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
                selectedDayTextColor: "#ffffff",
                dayTextColor: "#000000",
                todayTextColor: "#000000",
                textMonthFontWeight: "700",
                textMonthFontSize: 18,
              }}
            />
          ) : (
            <Calendar
              markedDates={markedDates}
              onDayPress={handleDayPress}
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
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#000000",
                arrowColor: "#000000",
                dayTextColor: "#000000",
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
            <DownChevronCircle style={styles.arrowUp} />
          ) : (
            <DownChevronCircle style={styles.arrowDown} />
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
          {professionals?.map((specialist, index) => (
            <TouchableOpacity
              style={styles.specialistImageText}
              key={index}
              onPress={() => handleSpecialistSelection(specialist)}
            >
              <ImageComponent
                width={100}
                height={100}
                imageURL={specialist.photoURL}
                borderRadius={4}
              />
              {selectedSpecialist === specialist && (
                <View style={styles.checkIcon}>
                  <Check fill="white" height={20} width={20} />
                </View>
              )}

              <View style={styles.specialistTextMargin}>
                <NormalText
                  normalText={`${specialist.firstName} ${specialist.lastName}`}
                  textAlign="center"
                />
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
          {dedupeArray(selectedSpecialist?.timeSlots || []).map(
            (timeSlot: any) => (
              <View style={styles.buttonContainer}>
                <ButtonComponent
                  key={timeSlot.id}
                  containerWidth={100}
                  height={32}
                  backgroundColor={
                    selectedTimeSlot === timeSlot.slot
                      ? "rgba(130, 40, 72, 1)"
                      : "rgba(249, 245, 238, 1)"
                  }
                  buttonText={timeSlot.slot}
                  value={timeSlot.id}
                  textColor={
                    selectedTimeSlot === timeSlot.slot
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(18, 20, 23, 1)"
                  }
                  onPress={() => setTimeSlot(timeSlot?.slot)}
                />
              </View>
            )
          )}
        </View>
      </ScrollView>

      <View style={styles.button}>
        <ButtonComponent
          buttonText="Book Appointment"
          onPress={() =>
            navigation.navigate("Confirm Appointment Business", {
              titleConfirmation: "Confirm Appointment",
              selectedSpecialist: `${selectedSpecialist?.firstName} ${selectedSpecialist?.lastName}`,
              professionalID: selectedSpecialist.professionalID,
              selectedSpecialistPhoto: selectedSpecialist?.photoURL,
              selectedTime: selectedTimeSlot,
              selectedDate: selectedDate,
              appointmentDateTime: new Date(
                selectedDate + selectedTimeSlot
              ).toString(),
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
  checkIcon: {
    backgroundColor: "#105535",
    borderRadius: 50,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 5,
    right: 5,
  },
  timeSlotContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 8,
  },
  buttonContainer: { paddingLeft: 16 },
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
  arrowDown: {
    padding: 10,
    position: "absolute",
    top: -10,
    right: "47.5%",
    borderRadius: 24,
  },
  arrowUp: {
    padding: 10,
    position: "absolute",
    top: -10,
    right: "47.5%",
    borderRadius: 24,
    transform: [{ rotate: "180deg" }],
  },
});

export default SelectProfessionalBusiness;
