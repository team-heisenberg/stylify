import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {
  BodyBold,
  BodyRegular,
  captions,
  Heading3,
  Heading4,
  Heading5,
} from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Calendar } from "react-native-calendars";
import {
  ArrowUp,
  ArrowDown,
} from "../../components/IconsComponent/IconsComponent";
import { ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { createAxiosClient } from "../../api";
import InputComponent from "../../components/InputComponent/InputComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../../components/Card/Card";

const HomeBusiness: React.FC<NativeStackScreenProps<any>> = () => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [businessID, setBusinessID] = useState("");
  const [businessName, setbusinessName] = useState("");

  const navigation = useNavigation<any>();

  // Get Appointments by Business ID
  const getAppointments = async (businessID: string | number, value: any) => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(`/appointment/byBusiness/${businessID}`)
      .then((res) => {
        const filteredAppointments = res.data.filter(
          (a: {
            customer: { firstName: string; lastName: string };
            professional: { firstName: string; lastName: string };
            appointmentDetails: [];
          }) => {
            // Get Appointment Details
            const appointmentDetails = a.appointmentDetails.map(
              (detail: { service: { serviceName: string } }) => {
                return detail.service.serviceName
                  .toLowerCase()
                  .includes(value.toLowerCase());
              }
            );

            return (
              `${a.customer.firstName.toLowerCase()} ${a.customer.lastName.toLowerCase()}`.includes(
                value.toLowerCase()
              ) ||
              `${a.professional.firstName.toLowerCase()} ${a.professional.lastName.toLowerCase()}`.includes(
                value.toLowerCase()
              ) ||
              appointmentDetails[0]
            );
          }
        );
        setAppointments(filteredAppointments);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  // Get Business Data and Call getAppointments Function
  useEffect(() => {
    (async () => {
      const rawUserData = await AsyncStorage.getItem("@stylify:user");
      const userData = JSON.parse(rawUserData || "{}");
      getAppointments(userData?.ID, value);
      setBusinessID(userData?.ID);
      setbusinessName(userData?.Name);
    })();
  }, [value]);

  // Set Value from Search Input
  const handleChange = (value: any) => {
    setValue(value);
  };

  // Navigate to Appointment Detail
  const onPress = () => {
    navigation.navigate("BusinessProfile", {
      businessID: businessID,
      businessName: businessName,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        {expanded ? (
          <Calendar
            // initialDate={"2023-03-16"}
            onDayPress={(day) => {
              console.log("selected day", day);
            }}
            // hideArrows
            // customHeaderTitle={<NormalText normalText="" />}
            style={styles.calendar}
            firstDay={1}
            theme={{
              textDayFontFamily: "PlayfairDisplay_400Regular",
              textMonthFontFamily: "PlayfairDisplay_700Bold",
              textDayHeaderFontFamily: "PlayfairDisplay_700Bold",
              // textTodayFontFamily: "PlayfairDisplay_700Bold",
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
            // initialDate={"2023-03-16"}
            onDayPress={(day) => {
              console.log("selected day", day);
            }}
            // hideArrows
            // customHeaderTitle={<NormalText normalText="" />}
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
      <ScrollView>
        <View style={styles.searchContainer}>
          <InputComponent
            value={value}
            onChangeText={handleChange}
            inputLabel="Search"
          />
        </View>

        <View style={styles.appointments}>
          <NormalText
            normalText="Appointments"
            fontType={Heading3}
            textAlign="left"
          />
          {appointments !== [] ? (
            <ScrollView style={styles.cardAppointment}>
              <View style={styles.cardContainer}>
                <FlatList
                  data={appointments}
                  renderItem={({ item }: any) => {
                    return (
                      <Card
                        marginBottom={10}
                        width="99%"
                        padding={0}
                        onPress={onPress}
                      >
                        <View style={styles.appointmentTimeContainer}>
                          <NormalText
                            normalText={item.appointmentDateTime}
                            textColor="white"
                            fontType={Heading4}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            padding: 15,
                          }}
                        >
                          <NormalText
                            normalText={businessName}
                            textColor="#822848"
                            fontType={Heading5}
                            textAlign="left"
                          />
                          {item.appointmentDetails.map(
                            (a: { service: { serviceName: string } }) => {
                              return (
                                <NormalText
                                  normalText={a.service.serviceName}
                                  fontType={captions}
                                  textAlign="left"
                                />
                              );
                            }
                          )}
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            {item.appointmentDetails.map(
                              (a: { price: any }) => {
                                return (
                                  <NormalText
                                    normalText={`$${a.price}`}
                                    fontType={BodyBold}
                                  />
                                );
                              }
                            )}
                            <View style={{ paddingLeft: 10 }}>
                              <NormalText
                                normalText={`${item.professional.firstName} ${item.professional.lastName}`}
                                fontType={BodyRegular}
                              />
                            </View>
                          </View>
                        </View>
                      </Card>
                    );
                  }}
                />
              </View>
            </ScrollView>
          ) : (
            <View style={styles.details}>
              <NormalText
                normalText="No upcoming appointments scheduled."
                fontType={Heading5}
                textAlign="left"
              />
            </View>
          )}
        </View>
        {/* <Fab size={"lg"} icon={<Plus fill="white" stroke="white" />} /> */}
        <View style={styles.button}>
          <ButtonComponent
            buttonText="Create New Appointment"
            onPress={() =>
              navigation.navigate("Create Appointment Business", {
                titleCreateAppointment: "Create Appointment",
              })
            }
          />
          {/* <ButtonComponent onPress={handleSignOut} buttonText="Sign Out" /> */}
        </View>
      </ScrollView>
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
    // position: "absolute",
    // top: 80,
    // right: "50%",
    // borderRadius: 24,
    ////
    backgroundColor: "transparent",
    paddingBottom: 5,
    paddingTop: 5,
  },
  arrowDownUp: {
    backgroundColor: "#F9F5EE",
    ////
    padding: 10,
    position: "absolute",
    top: -10,
    right: "47.5%",
    borderRadius: 24,
  },
  searchContainer: { marginTop: 10, marginLeft: 16, marginRight: 16 },
  appointments: { marginTop: 16, marginLeft: 16, marginRight: 16 },
  cardContainer: { marginBottom: 16 },
  cardAppointment: { paddingTop: 8, paddingBottom: 16 },
  details: { marginTop: 16, marginLeft: 24, marginRight: 16 },
  appointmentTimeContainer: {
    width: "30%",
    backgroundColor: "#822848",
    height: "100%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: "center",
    padding: 15,
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 24,
  },
});

export default HomeBusiness;
