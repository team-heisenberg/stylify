import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Heading3, Heading5 } from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import { Calendar } from "react-native-calendars";
import {
  ArrowUp,
  ArrowDown,
  Plus,
} from "../../components/IconsComponent/IconsComponent";
import { ScrollView } from "native-base";
import CardAppointment from "../../components/CardAppointment/CardAppointment";
import { Fab } from "native-base";

const HomeBusiness: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        {expanded ? (
          <Calendar
            initialDate={"2023-03-16"}
            onDayPress={(day) => {
              console.log("selected day", day);
            }}
            // hideArrows
            // customHeaderTitle={<NormalText normalText="" />}
            style={styles.calendar}
            firstDay={1}
            theme={{
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
            initialDate={"2023-03-16"}
            onDayPress={(day) => {
              console.log("selected day", day);
            }}
            // hideArrows
            // customHeaderTitle={<NormalText normalText="" />}
            style={styles.expanded}
            firstDay={1}
            theme={{
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
        // style={styles.arrowDownUpContainer}
      >
        {expanded ? (
          <ArrowUp
            width={20}
            height={24}
            fill={"white"}
            stroke={"white"}
            style={styles.arrowDownUp}
          />
        ) : (
          <ArrowDown
            width={20}
            height={20}
            fill={"white"}
            stroke={"white"}
            style={styles.arrowDownUp}
          />
        )}
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <SearchComponent />
      </View>

      <View style={styles.appointments}>
        <NormalText
          normalText="Appointments"
          fontType={Heading3}
          textAlign="left"
        />
        <ScrollView style={styles.cardAppointment}>
          <View style={styles.cardContainer}>
            <CardAppointment
              time={"2:00"}
              ampm={"pm"}
              salonName={"Bruce Wayne"}
              services={"Hair Cut, Beard Styling"}
              professional={"Mike Adams"}
            />
          </View>
          <View style={styles.cardContainer}>
            <CardAppointment
              time={"2:00"}
              ampm={"pm"}
              salonName={"Bruce Wayne"}
              services={"Hair Cut, Beard Styling"}
              professional={"Mike Adams"}
            />
          </View>
        </ScrollView>
        {/* <View style={styles.details}>
          <NormalText
            normalText="No upcoming appointments scheduled."
            fontType={Heading5}
            textAlign="left"
          />
        </View> */}
      </View>
        {/* <Fab size={"lg"} icon={<Plus fill="white" stroke="white" />} /> */}
      <View style={styles.button}>
        <ButtonComponent
          buttonText="Create New Appointment"
          onPress={() =>
            navigation.navigate("Create Appointment Business", {
              title: "Create Appointment",
            })
          }
        />
        {/* <ButtonComponent onPress={handleSignOut} buttonText="Sign Out" /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F5EE",
  },
  calendarContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  calendar: {},
  expanded: {
    height: 130,
    overflow: "hidden",
  },
  arrowDownUpContainer: {
    // padding: 10,
    // backgroundColor: "black",
    // position: "absolute",
    // top: 80,
    // right: "50%",
    // borderRadius: 24,
    ////
    padding: 10,
    backgroundColor: "red",
  },
  arrowDownUp: {
    backgroundColor: "black",
    ////
    padding: 10,
    position: "absolute",
    top: -10,
    right: "50%",
    borderRadius: 24,
  },
  searchContainer: { marginTop: 10, marginLeft: 16, marginRight: 16 },
  appointments: { marginTop: 16, marginLeft: 16, marginRight: 16 },
  cardContainer: { marginBottom: 16 },
  cardAppointment: { paddingTop: 8, paddingBottom: 16 },
  details: { marginTop: 16, marginLeft: 24, marginRight: 16 },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 24,
  },
});

export default HomeBusiness;
