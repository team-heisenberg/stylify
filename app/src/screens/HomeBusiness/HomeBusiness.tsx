import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {
  BodyBold,
  BodyRegular,
  captions,
  Heading3,
  Heading5,
} from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Fab, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { createAxiosClient } from "../../api";
import InputComponent from "../../components/InputComponent/InputComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../../components/Card/Card";
import {
  ArrowRightBig,
  Plus,
} from "../../components/IconsComponent/IconsComponent";
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
      .get(`/appointment/upcomingByBusiness/${businessID}`)
      .then((res) => {
        setAppointments(res.data);
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
      console.log(userData?.ID);
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
          <View
            style={{
              alignItems: "flex-end",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8
            }}
          >
            <NormalText
              normalText="Appointments"
              fontType={Heading3}
              textAlign="left"
            />
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginRight: 8,
              }}
              onPress={() => getAppointments(businessID)}
            >
              <Text
                style={{ textDecorationLine: "underline", color: "#24313A" }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
          {appointments !== [] ? (
            <ScrollView style={styles.cardAppointment}>
              <View style={styles.cardContainer}>
                <FlatList
                  data={appointments.filter(
                    (a) =>
                      a.businessName.includes(value) ||
                      a.services.includes(value)
                  )}
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
                            normalText={item.businessName}
                            textColor="#822848"
                            fontType={Heading5}
                            textAlign="left"
                          />
                          <View style={{ flexDirection: "row", gap: 5 }}>
                            <NormalText
                              normalText={item?.services}
                              fontType={captions}
                              textAlign="left"
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <NormalText
                              normalText={`$${item?.total}`}
                              fontType={BodyBold}
                            />
                            <View style={{ paddingLeft: 10 }}>
                              <NormalText
                                normalText={item.customerName}
                                fontType={BodyRegular}
                              />
                              <Text style={{ display: "none" }}>
                                {item.professionalName}
                              </Text>
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
      {appointments == [] ? (
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
      ) : (
        <Fab
          renderInPortal={false}
          bg={"#24313a"}
          icon={<Plus fill="white" height={21} width={21} />}
          onPress={() =>
            navigation.navigate("Create Appointment Business", {
              titleCreateAppointment: "Create Appointment",
            })
          }
        />
      )}
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
    marginTop: 16,
    marginBottom: 64,
  },
});

export default HomeBusiness;
