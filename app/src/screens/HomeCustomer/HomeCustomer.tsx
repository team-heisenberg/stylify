import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Heading3, Heading5 } from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";
import CardSalon from "../../components/CardSalon/CardSalon";
import CardAppointment from "../../components/CardAppointment/CardAppointment";

interface EnumServiceItem {
  appointmentDetailsId: number;
  appointmentsId: number;
  serviceId: number;
  price: number;
}

const HomeCustomer = () => {
  return (
    <View style={styles.page}>
      <View style={styles.containerText}>
        <NormalText
          normalText="Upcoming Appointment"
          fontType={Heading3}
          textAlign="left"
          marginTop={20}
        />
        <Text>View All</Text>
      </View>
      <View style={styles.cardAppointment}>
        <CardAppointment
          time="12:00"
          ampm="am"
          salonName="Daniel Salon"
          services="Haircut"
          professional="Diego Lara"
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <NormalText
          normalText="No upcoming appointments"
          fontType={Heading5}
          textColor="#8E9394"
          textAlign="left"
        />
      </View>
      <View style={styles.containerText}>
        <NormalText
          normalText="Recent Appointments"
          fontType={Heading5}
          textColor="#24313A"
          textAlign="left"
        />
        <Text>View All</Text>
      </View>
      <View style={styles.containerText}>
        <NormalText
          normalText="Salons near me"
          fontType={Heading5}
          textColor="#24313A"
          textAlign="left"
        />
        <Text>10km radius</Text>
      </View>
      <View style={styles.containerText}>
        <NormalText
          normalText="Favourite salons"
          fontType={Heading5}
          textColor="#24313A"
          textAlign="left"
        />
        <Text>Explore more</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F9F5EE",
    height: "100%",
    marginLeft: 16,
    marginRight: 16
  },
  cardAppointment: {
    display: "flex",
    marginTop: 16,
  },
  containerText : {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 20
  }
});

export default HomeCustomer;
