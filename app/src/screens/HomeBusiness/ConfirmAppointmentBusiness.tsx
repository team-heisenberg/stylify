// import { View, TouchableOpacity, StyleSheet } from "react-native";
// import React from "react";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import NormalText from "../../components/NormalText/NormalText";
// import { Heading3 } from "../../components/NormalText/FontTypes";
// import { ArrowLeftBig } from "../../components/IconsComponent/IconsComponent";
// import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
// import Message from "../../components/Message/Message";

// const ConfirmAppointmentBusiness = () => {
//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();

//   // const showConfirmation = () => {
//   //   return <Message />;
//   // };

//   return (
//     <>
//       <View style={styles.navigation}>
//         <TouchableOpacity
//           style={styles.arrow}
//           onPress={() => {
//             navigation.goBack();
//           }}
//         >
//           <ArrowLeftBig width={24} height={17.54} fill="black" />
//         </TouchableOpacity>
//         <NormalText normalText={route.params.title} fontType={Heading3} />
//       </View>
//       {/* <Message /> */}
//       {/* <ButtonComponent
//         buttonText="Confirm Booking"
//         onPress={showConfirmation}
//         // onPress={() => navigation.navigate("Select Professional Business")}
//       /> */}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   navigation: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   arrow: {
//     paddingRight: 15,
//   },
// });

// export default ConfirmAppointmentBusiness;

import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Link, useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import { Heading3 } from "../../components/NormalText/FontTypes";
import {
  ArrowLeftBig,
  Fire,
} from "../../components/IconsComponent/IconsComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import TableComponent from "../../components/TableComponent/TableComponent";
import Card from "../../components/Card/Card";

const ConfirmAppointmentBusiness = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const showConfirmation = () => {
    // return <Message />;
    return <>hello</>;
  };

  const tableHeader = [
    { title: "Services", property: "services" },
    { title: "Price", property: "price" },
  ];
  const tableData = [
    {
      services: "Hair Cut",
      price: "$24",
    },
    {
      services: "Hair Color",
      price: "$24",
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
      <TableComponent tableHeader={tableHeader} tableData={tableData} />
      <View style={styles.card}>
        <Card />
      </View>
      <TouchableOpacity style={styles.coupon}>
        <View style={styles.textIcon}>
          <Fire fill="black" />
          <NormalText normalText={"Add Coupon"} />
        </View>
        <NormalText normalText={">"} />
      </TouchableOpacity>

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
    paddingBottom: 24,
    marginLeft: 16,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#718096",
  },
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
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 24,
  },
});

export default ConfirmAppointmentBusiness;
