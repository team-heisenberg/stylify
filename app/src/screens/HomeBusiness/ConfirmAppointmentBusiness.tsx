import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Link, useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import {
  Heading3,
  Heading4,
  Heading5,
} from "../../components/NormalText/FontTypes";
import {
  ArrowLeftBig,
  Edit,
  Fire,
} from "../../components/IconsComponent/IconsComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import TableComponent from "../../components/TableComponent/TableComponent";
import Card from "../../components/Card/Card";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import { Divider } from "native-base";

const ConfirmAppointmentBusiness = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  console.log(route.params);

  const tableHeader = [
    { title: "Services", property: "name" },
    { title: "Price", property: "price" },
  ];

  const tableData = route.params?.servicesSelected ?? [];

  const [appointments, setAppointments] = useState([]);

  const handleConfirmBooking = () => {
    const newAppointment = {
      id: Date.now().toString(),
      specialist: route.params.selectedSpecialist,
      specialistPhoto: route.params.selectedSpecialistPhoto,
      date: route.params.selectedDate,
      time: route.params.selectedTime,
      services: route.params.servicesSelected,
      customer: route.params.customerName,
      totalCost: tableData.reduce(
        (acc: any, value: any) => acc + Number(value.price),
        0
      ),
    };

    setAppointments([...appointments, newAppointment]);

    // const appoData = {
    //   appointments: [...appointments, newAppointment],
    //   cardData: {},
      
    // };

    // navigation.navigate("Home Business", appoData);

    navigation.navigate("Home Business", {
      ...route.params,
      appointments,
      setAppointments,
      totalCost: tableData.reduce(
        (acc: any, value: any) => acc + Number(value.price),
        0
      ),
    });
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
          normalText={route.params.titleConfirmation}
          fontType={Heading3}
        />
      </View>
      {/* {route.params.services.map(() => ( */}
      <TableComponent tableHeader={tableHeader} tableData={tableData} />
      {/* ))} */}
      <View style={styles.card}>
        <Card height={182}>
          <View style={styles.cardContentContainer}>
            <View style={styles.titleIcon}>
              <NormalText normalText={"Specialist"} />
              <Edit fill="black" />
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
        <NormalText normalText={">"} />
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

      <View style={styles.button}>
        <ButtonComponent
          buttonText="Confirm Booking"
          onPress={handleConfirmBooking}
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
