import { StyleSheet, View } from "react-native";
import React from "react";
import { Star } from "../IconsComponent/IconsComponent";
import NormalText from "../NormalText/NormalText";
import { Heading4 } from "../NormalText/FontTypes";

interface RatingsInterface {
  ratings: number;
}

const Ratings = ({ ratings }: RatingsInterface) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (ratings === 0) {
      let starColor = "#E2E8F0";
      stars.push(<Star key={i} width={34} height={34} fill={starColor} />);
    } else if (0 < ratings && ratings < 1) {
      let starColor = i <= ratings ? "#F4D251" : "#E2E8F0";
      stars.push(<Star key={i} width={34} height={34} fill={starColor} />);
    } else {
      let starColor = i <= ratings - 1 ? "#F4D251" : "#E2E8F0";
      stars.push(<Star key={i} width={34} height={34} fill={starColor} />);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>{stars}</View>
      <NormalText normalText={`${ratings}/5`} fontType={Heading4} />
    </View>
  );
};

export default Ratings;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});
