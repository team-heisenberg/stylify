import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import {
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Heading7,
} from "../../components/NormalText/FontTypes";
import {
  ArrowLeftBig,
  Check,
} from "../../components/IconsComponent/IconsComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import { ScrollView, useDisclose, Actionsheet } from "native-base";
import { createAxiosClient } from "../../api";
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent";
import * as Linking from "expo-linking";

const SelectProfessionalBusiness = () => {
  const [professionals, setProfessionals] = useState<any[]>([]);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { isOpen, onOpen, onClose } = useDisclose();

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

  const [modalSheetSpecialist, setModalSheetSpecialist] = useState<any>({});
  const [selectedSpecialist, setSelectedSpecialist] = useState<any>({});

  const showModalSheet = (professional: any) => {
    if (modalSheetSpecialist === professional) {
      setModalSheetSpecialist(null);
    }
    setModalSheetSpecialist(professional);
  };

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

  // Handle date selection from calendar component
  const [selectedDate, setSelectedDate] = useState<string>("");
  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
  };

  const dedupeArray = (arr: any[]) => {
    arr = arr.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.slot === value.slot)
    );
    return arr;
  };

  console.log("JJJJJJJJJJ", selectedDate + " " + selectedTimeSlot);

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
        <CalendarComponent onDateSelect={handleDateSelection} />

        <View style={{ paddingLeft: 16, marginVertical: 10 }}>
          <NormalText
            normalText={"Select Specialist"}
            textAlign="left"
            fontType={Heading6}
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
              onPress={() => {
                showModalSheet(specialist);
                onOpen();
              }}
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
                  fontType={Heading6}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <View style={{ width: "90%", gap: 20 }}>
              <NormalText
                normalText={`${modalSheetSpecialist.firstName} ${modalSheetSpecialist.lastName}`}
                fontType={Heading4}
                textAlign="left"
              />
              <View style={{ width: "90%", alignSelf: "center" }}>
                <ButtonComponent
                  buttonText="Select Professional"
                  onPress={() => {
                    handleSpecialistSelection(modalSheetSpecialist);
                    onClose();
                  }}
                />
                <ButtonComponent
                  buttonText="View Portfolio"
                  backgroundColor="#F9F5EE"
                  textColor="#24313A"
                  onPress={() => {
                    Linking.openURL(
                      "https://instagram.com/explore/tags/haircut"
                    );
                  }}
                />
              </View>
            </View>
          </Actionsheet.Content>
        </Actionsheet>

        <View style={{ paddingLeft: 16, marginTop: 20, marginBottom: 10 }}>
          <NormalText
            normalText={"Available Slots"}
            textAlign="left"
            fontType={Heading6}
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
              dateAndTime: `${selectedDate} ${selectedTimeSlot}`,
              appointmentDateTime: new Date(
                selectedDate + " " + selectedTimeSlot
              ).toLocaleString(),
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
    marginBottom: 10,
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
});

export default SelectProfessionalBusiness;
