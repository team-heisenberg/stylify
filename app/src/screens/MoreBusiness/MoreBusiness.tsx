import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "native-base";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import NormalText from "../../components/NormalText/NormalText";

import servicesImage from "../../../assets/image/Services.png";
import professionalsImage from "../../../assets/image/Professionals.png";
import dealsImage from "../../../assets/image/Deals.png";
import reviewsImage from "../../../assets/image/Reviews.png";
import customersImage from "../../../assets/image/Customers.png";
import profileImage from "../../../assets/image/Profile.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Heading3 } from "../../components/NormalText/FontTypes";


const MoreBusiness: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
}) => {
  const [businessData, setBusinessData] = useState<{Name: string, ID: number}>()

  const getBusinessData = async () => {

    const rawUserData = await AsyncStorage.getItem("@stylify:user");

    const userData = JSON.parse(rawUserData || "{}");
    setBusinessData(userData)  
  }

  getBusinessData()

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10 }}>
        <ImageComponent
          width="100%"
          height={250}
          imageURL="https://picsum.photos/500/500"
          borderRadius={0}
          linearGradient={true}
          positionLinearGradient="bottom"
        />
        <View style={styles.salonName}>
          <NormalText normalText={businessData?.Name} fontType={Heading3} textAlign="left" textColor="white"/>
        </View>
      </View>
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
          <NormalText normalText="Services" />
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
          <NormalText normalText="Professionals" />
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
          <NormalText normalText="Deals" />
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
          <NormalText normalText="Reviews" />
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
          <NormalText normalText="Customers" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("BusinessProfile")}
        >
          <ImageComponent
            width={90}
            height={90}
            source={profileImage}
            borderRadius={4}
          />
          <NormalText normalText="Profile" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F5EE",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "40%"
  },
  card: {
    flexDirection: "column",
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 15,
  },
  salonName: {
    position: "absolute",
    bottom: 12,
    left: 12
  }
});

export default MoreBusiness;
