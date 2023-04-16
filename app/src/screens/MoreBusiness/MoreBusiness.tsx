import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "native-base";
import React, { useEffect, useState } from "react";
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
import {
  captions,
  Heading3,
  BodyRegular,
} from "../../components/NormalText/FontTypes";
import { createAxiosClient } from "../../api";
import StarComponent from "../../components/StarComponent/StarComponent";

const MoreBusiness: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
}) => {
  const [businessData, setBusinessData] = useState<{
    Name: string;
    ID: number;
  }>();
  const [businessDetails, setBusinessDetails] = useState<{
    businessID: number;
    businessName: string;
    businessType: string;
    description: string;
    email: string;
    location: string;
    password: string;
  }>();
  const [ratings, setRatings] = useState<number>(0);

  const getBusinessData = async () => {
    const rawUserData = await AsyncStorage.getItem("@stylify:user");

    const userData = JSON.parse(rawUserData || "{}");
    setBusinessData(userData);
  };

  // Get Business Details
  const getBusinessDetails = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(`/business/${businessData?.ID}`)
      .then((res) => {
        setBusinessDetails(res.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  // Get Ratings
  const getReviews = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(`/review/byBusiness/${businessData?.ID}`)
      .then((res) => {
        const rating =
          res.data.reduce(
            (acc: number, value: { appointmentRating: any }) =>
              acc + Number(value.appointmentRating),
            0
          ) / res.data.length;
        setRatings((rating === NaN ? 3 : rating).toFixed(1));
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  useEffect(() => {
    getBusinessData();
    getBusinessDetails();
    getReviews();
  }, []);

  useEffect(() => {
    getBusinessDetails();
    getReviews();
  }, [businessData]);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        <ImageComponent
          width="100%"
          height={250}
          imageURL="https://picsum.photos/500/500"
          borderRadius={0}
          linearGradient={true}
          positionLinearGradient="bottom"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
            position: "absolute",
            width: "90%",
            bottom: 10,
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          <View>
            <NormalText
              normalText={businessData?.Name}
              fontType={Heading3}
              textAlign="left"
              textColor="white"
            />
            <NormalText
              normalText={businessDetails?.location}
              fontType={captions}
              textColor="white"
              textAlign="left"
            />
          </View>
          <View style={styles.ratingContainer}>
            <StarComponent ratings={ratings} textColor="white" />
          </View>
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
          <NormalText normalText="Services" fontType={BodyRegular} />
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
          <NormalText normalText="Professionals" fontType={BodyRegular} />
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
          <NormalText normalText="Deals" fontType={BodyRegular} />
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
          <NormalText normalText="Reviews" fontType={BodyRegular} />
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
          <NormalText normalText="Customers" fontType={BodyRegular} />
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
          <NormalText normalText="Profile" fontType={BodyRegular} />
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
    width: "90%",
    alignSelf: "center",
  },
  card: {
    flexDirection: "column",
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingRight: 12,
    paddingLeft: 12,
    paddingBottom: 15,
  },
  ratingContainer: {
    bottom: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MoreBusiness;
