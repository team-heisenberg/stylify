import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import NormalText from "../../components/NormalText/NormalText";

import servicesImage from "../../../assets/image/Services.png";
import professionalsImage from "../../../assets/image/Professionals.png";
import dealsImage from "../../../assets/image/Deals.png";
import reviewsImage from "../../../assets/image/Reviews.png";
import customersImage from "../../../assets/image/Customers.png";
import profileImage from "../../../assets/image/Profile.png";

const MoreBusiness: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
}) => {
  return (
    <View>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Service Detail", { title: "Hair cuts" })
          }
        >
          <ImageComponent
            width={90}
            height={90}
            source={servicesImage}
            borderRadius={4}
          />
          <NormalText normalText="Services"  />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Service Detail", { title: "Hair cuts" })
          }
        >
          <ImageComponent
            width={90}
            height={90}
            source={professionalsImage}
            borderRadius={4}
          />
          <NormalText normalText="Professionals"  />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("BusinessDeals", { title: "Deals" })
          }
        >
          <ImageComponent
            width={90}
            height={90}
            source={dealsImage}
            borderRadius={4}
          />
          <NormalText normalText="Deals"  />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Service Detail", { title: "Hair cuts" })
          }
        >
          <ImageComponent
            width={90}
            height={90}
            source={reviewsImage}
            borderRadius={4}
          />
          <NormalText normalText="Reviews"  />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Service Detail", { title: "Hair cuts" })
          }
        >
          <ImageComponent
            width={90}
            height={90}
            source={customersImage}
            borderRadius={4}
          />
          <NormalText normalText="Customers"  />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Service Detail", { title: "Hair cuts" })
          }
        >
          <ImageComponent
            width={90}
            height={90}
            source={profileImage}
            borderRadius={4}
          />
          <NormalText normalText="Profile"  />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    flexDirection: "column",
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingRight: 10,
    paddingLeft: 10 ,
    paddingBottom: 15,
  },
});

export default MoreBusiness;
