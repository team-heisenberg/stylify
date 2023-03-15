import React from "react";
import { View, StyleSheet } from "react-native";
import { Heading3, Heading5 } from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";
import CardSalon from "../../components/CardSalon/CardSalon";

interface EnumServiceItem {
  appointmentDetailsId: number;
  appointmentsId: number;
  serviceId: number;
  price: number;
}

const HomeCustomer = () => {
  //   const appointmentsArray: {
  //     customerId: number;
  //     appointmentId: number;
  //     businessId: number;
  //     serviceDetails: Array<EnumServiceItem>;
  //     professionalId: number;
  //   }[] = [
  //     {
  //       customerId: 0,
  //       businessId: 1111,
  //       serviceDetails: [
  //         {
  //           appointmentDetailsId: 1111,
  //           appointmentsId: 1111,
  //           serviceId: 1111,
  //           price: 11111,
  //         },
  //       ],
  //       professionalId: 1111
  //     }
  //   ];

  return (
    <View style={styles.page}>
      <NormalText
        normalText="Upcoming Appointment"
        fontType={Heading3}
        textAlign="left"
        marginTop={40}
      />
      <View style={{ marginTop: 20 }}>
        <NormalText
          normalText="No upcoming appointments"
          fontType={Heading5}
          textColor="#24313A"
          textAlign="left"
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <NormalText
          normalText="No upcoming appointments"
          fontType={Heading5}
          textColor="#24313A"
          textAlign="left"
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <NormalText
          normalText="No upcoming appointments"
          fontType={Heading5}
          textColor="#24313A"
          textAlign="left"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F9F5EE",
    height: "100%",
    marginLeft: 16,
  },
});

export default HomeCustomer;
