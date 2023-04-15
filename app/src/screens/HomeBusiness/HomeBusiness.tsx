import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
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
import { ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { createAxiosClient } from "../../api";
import InputComponent from "../../components/InputComponent/InputComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../../components/Card/Card";
import { ArrowRightBig } from "../../components/IconsComponent/IconsComponent";
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent";
import { removeYear } from "../../utils";

const HomeBusiness: React.FC<NativeStackScreenProps<any>> = () => {
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

  // Handle date selection from calendar component
  const [selectedDate, setSelectedDate] = useState<string>("");
  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    console.log("date here: ", date);
  };


  return (
    <View style={styles.container}>
      <CalendarComponent onDateSelect={handleDateSelection} />
      <ScrollView>
        <View style={styles.searchContainer}>
          <InputComponent
            value={value}
            onChangeText={handleChange}
            inputLabel="Search"
            isSearch
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
                            normalText={removeYear(item?.dateAndTime || "")}
                            textColor="white"
                            fontType={Heading5}
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
      </ScrollView>
      <View style={styles.button}>
        <ButtonComponent
          buttonText="Create New Appointment"
          rightIcon={<ArrowRightBig fill="white" />}
          onPress={() =>
            navigation.navigate("Create Appointment Business", {
              titleCreateAppointment: "Create Appointment",
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
