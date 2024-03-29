import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import { Heading3, Heading4 } from "../../components/NormalText/FontTypes";
import {
  ArrowLeftBig,
  ArrowRight,
  Edit,
  Fire,
  Plus,
} from "../../components/IconsComponent/IconsComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import TableComponent from "../../components/TableComponent/TableComponent";
import Card from "../../components/Card/Card";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import { Divider, ScrollView } from "native-base";
import { createAxiosClient } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Message from "../../components/Message/Message";

const ConfirmAppointmentBusiness = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [value, setValue] = useState("");
  const [customerID, setCustomerID] = useState("");

  const addAppointment = async () => {
    const { axiosClient } = await createAxiosClient();
    const {
      businessID,
      professionalID,
      appointmentDateTime,
      appointmentDetails,
      appointmentType,
      dateAndTime,
      isCustomer,
      customerID,
    } = route.params;
    console.log("MACARENA", dateAndTime);
    console.log("isCustomer >>>>>:", customerID);
    await axiosClient
      .post("/appointment", {
        customerID: route.params?.customerID || 1,
        businessID: businessID,
        professionalID: professionalID,
        appointmentDateTime: new Date(appointmentDateTime),
        appointmentType: appointmentType,
        appointmentDetails: appointmentDetails,
        dateAndTime: dateAndTime,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("You have an error", err);
      });
  };

  const onCloseFunction = () => {
    if (route.params?.isCustomer) {
      navigation.navigate("Home Customer");
    } else {
      navigation.navigate("Home Business", {
        ...route.params,
        appointments,
        setAppointments,
        totalCost: tableData.reduce(
          (acc: any, value: any) => acc + Number(value.price),
          0
        ),
      });
    }
  };

  console.log("CUSTOMER ID FROM BUSINESS >>>>>>>>>>>>>", customerID);
  console.log(route.params);

  const tableHeader = [
    { title: "Qty", property: "amount" },
    { title: "Services", property: "name" },
    { title: "Price", property: "price" },
  ];

  const tableData = route.params?.servicesSelected ?? [];

  const [appointments, setAppointments] = useState([]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, flexGrow: 8 }}>
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
            normalText={route.params.titleConfirmation}
            fontType={Heading3}
          />
        </View>
        <TableComponent tableHeader={tableHeader} tableData={tableData} />
        <TouchableOpacity
          style={styles.coupon}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.textIcon}>
            <Plus fill="black" />
            <NormalText normalText={"Add Service"} />
          </View>
        </TouchableOpacity>
        <View style={styles.card}>
          <Card height={182}>
            <View style={styles.cardContentContainer}>
              <View style={styles.titleIcon}>
                <NormalText normalText={"Specialist"} />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Edit fill="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.imageSpecialist}>
                <ImageComponent
                  width={40}
                  height={40}
                  imageURL={route.params.selectedSpecialistPhoto}
                  borderRadius={20}
                />
                <NormalText
                  normalText={route.params.selectedSpecialist}
                  textAlign="left"
                />
              </View>
              <Divider />
              <View style={styles.dateTime}>
                <NormalText normalText={"Date & Time"} textAlign="left" />
                <NormalText
                  normalText={`${route.params.selectedDate} at ${route.params.selectedTime}`}
                  textAlign="left"
                />
              </View>
            </View>
          </Card>
        </View>
        <TouchableOpacity style={styles.coupon}>
          <View style={styles.textIcon}>
            <Fire fill="black" />
            <NormalText normalText={"Add Coupon"} />
          </View>
          <ArrowRight width={"5.5px"} height={"9.5px"} />
        </TouchableOpacity>

        <View style={styles.total}>
          <NormalText normalText={"Total Cost"} fontType={Heading4} />
          <NormalText
            normalText={`$${tableData.reduce(
              (acc: any, value: any) => acc + Number(value.price),
              0
            )}`}
            fontType={Heading4}
          />
        </View>
      </ScrollView>
      <View style={styles.button}>
        <Message
          messageText={"Appointment successfully booked."}
          messageButtonText={"Done"}
          buttonText={"Confirm Booking"}
          onPressFunction={addAppointment}
          onCloseFunction={onCloseFunction}
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
    marginLeft: 16,
  },
  arrow: {
    paddingRight: 15,
  },
  card: {
    marginTop: 24,
    marginRight: 16,
    paddingBottom: 118,
    paddingLeft: 16,
    width: "105%",
    borderBottomWidth: 1,
    borderBottomColor: "#718096",
  },
  cardContentContainer: { flex: 1, flexDirection: "column" },
  titleIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 8,
  },
  imageSpecialist: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
    gap: 8,
  },
  dateTime: { paddingTop: 16, gap: 8 },
  coupon: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#718096",
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8.75,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 24,
  },
});

export default ConfirmAppointmentBusiness;
