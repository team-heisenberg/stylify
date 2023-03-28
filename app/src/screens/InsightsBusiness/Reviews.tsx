import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import NormalText from "../../components/NormalText/NormalText";
import Card from "../../components/Card/Card";
import { Heading5 } from "../../components/NormalText/FontTypes";
import Ratings from "../../components/Ratings/Ratings";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import { createAxiosClient } from "../../api";
import StarComponent from "../../components/StarComponent/StarComponent";

interface ReviewsInterface {
  appointmentRating: number;
  reviewDetails: string;
}

const Reviews = () => {
  // const [reviews, setReviews] = useState<ReviewsInterface[]>([]);

  const reviews = [
    {
      appointmentRating: 4,
      reviewDetails: "good service",
    },
    {
      appointmentRating: 2,
      reviewDetails: "very bad service",
    },
  ];

  // Get Reviews
  // const getReviews = async () => {
  //   const { axiosClient } = await createAxiosClient();
  //   await axiosClient
  //     .get("/review")
  //     .then((res) => {
  //       setReviews(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(JSON.stringify(error));
  //     });
  // };

  // Get Customer
  const getCustomer = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get("/customer")
      .then((res) => {
        // setReviews(res.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  useEffect(() => {
    // getReviews();
  }, []);

  console.log(reviews);

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.ratingsContainer}>
        <NormalText
          normalText="Ratings"
          fontType={Heading5}
          textAlign="left"
          marginBottom={10}
        />
        <Ratings ratings={4.5} />
      </View>
      <FlatList
        data={reviews}
        renderItem={({ item, index }) => {
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
                      imageURL="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2811&q=80"
                      width={50}
                      height={50}
                      borderRadius={50}
                    />
                    <NormalText normalText="Amy Adams" marginLeft={10} />
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
