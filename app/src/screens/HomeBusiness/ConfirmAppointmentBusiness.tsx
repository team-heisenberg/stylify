import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Link, useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import { Heading3 } from "../../components/NormalText/FontTypes";
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

  // const showConfirmation = () => {
  //   // return <Message />;
  //   return <>hello</>;
  // };

  console.log(route.params);

  const tableHeader = [
    { title: "Services", property: "services" },
    { title: "Price", property: "price" },
  ];
  const tableData = [
    {
      services: `${route.params.servicesSelected}`,
      price: `$ ${parseFloat(route.params.servicesSelected)}`,
    },
    {
      services: (
        <Link
          to={{
            screen: "Select Services Business",
            params: { title: "Select Services" },
          }}
        >
          Add Service
        </Link>
      ),
    },
  ];

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
                imageURL="https://picsum.photos/500/350"
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
                normalText={`${"29th Mach,2023"} ${route.params.selectedTime}`}
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
        <NormalText normalText={"Total Cost"} textAlign="left" />
        <NormalText normalText={`${tableData[0].price}`} textAlign="right" />
      </View>

      <View style={styles.button}>
        <ButtonComponent
          buttonText="Confirm Booking"
          // onPress={() =>
          //   navigation.navigate("Select Services Business", {
          //     title: "Select Services",
          //   })
          // }
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
    width: "100%",
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
  total: {},
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 24,
  },
});

export default ConfirmAppointmentBusiness;
