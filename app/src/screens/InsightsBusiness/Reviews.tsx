import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import NormalText from "../../components/NormalText/NormalText";
import Card from "../../components/Card/Card";
import { Heading5 } from "../../components/NormalText/FontTypes";
import Ratings from "../../components/Ratings/Ratings";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import { createAxiosClient } from "../../api";
import StarComponent from "../../components/StarComponent/StarComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ReviewsInterface {
  appointmentRating: number;
  reviewDetails: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<ReviewsInterface[]>([]);
  const [overallRatings, setOverallRatings] = useState<number>(0);

  // Get Reviews
  const getReviews = async (businessID: string | number) => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(`/review/byBusiness/${businessID}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  // Get Overall Ratings
  const getOverallRatings = () => {
    const rating =
      reviews.reduce((acc, value) => acc + Number(value.appointmentRating), 0) /
      reviews.length;
    setOverallRatings((rating === NaN ? 3 : rating).toFixed(1));
  };

  useEffect(() => {
    (async () => {
      const rawUserData = await AsyncStorage.getItem("@stylify:user");
      const userData = JSON.parse(rawUserData || "{}");
      getReviews(userData?.ID);
    })();
  }, []);

  useEffect(() => {
    if (reviews && reviews.length > 0 && overallRatings === 0) {
      getOverallRatings();
    }
  }, [reviews]);

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.ratingsContainer}>
        <NormalText
          normalText="Ratings"
          fontType={Heading5}
          textAlign="left"
          marginBottom={10}
        />
        <Ratings ratings={overallRatings} />
      </View>
      <FlatList
        data={reviews}
        renderItem={({ item }: any) => {
          return (
            <View style={styles.renderItemContainer}>
              <Card
                flexDirection="column"
                height={138}
                justifyContent="space-around"
                width={340}
              >
                <View style={styles.cardViewStyles}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <ImageComponent
                      imageURL={item?.appointment?.customer?.avatarURL}
                      width={50}
                      height={50}
                      borderRadius={50}
                    />
                    <NormalText
                      normalText={`${item?.appointment?.customer?.firstName} ${item?.appointment?.customer?.lastName}`}
                      marginLeft={10}
                    />
                  </View>
                  <StarComponent ratings={item.appointmentRating} />
                </View>
                <View style={{ width: "100%" }}>
                  <NormalText
                    normalText={item.reviewDetails}
                    textAlign="left"
                  />
                </View>
              </Card>
            </View>
          );
        }}
        horizontal={true}
        style={styles.flatlist}
      />
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  ratingsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  renderItemContainer: {
    marginRight: 20,
  },
  cardViewStyles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "30%",
  },
  flatlist: {
    height: 150,
  },
});
