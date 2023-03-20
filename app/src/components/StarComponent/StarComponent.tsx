import { StyleSheet, View } from "react-native";
import React from "react";
import { Star } from "../IconsComponent/IconsComponent";
import NormalText from "../NormalText/NormalText";
import { Heading5 } from "../NormalText/FontTypes";

interface StarComponentInterface {
  ratings: number;
}

const StarComponent = ({ ratings }: StarComponentInterface) => {
  return (
    <View style={styles.container}>
      <NormalText normalText={ratings} fontType={Heading5} marginRight={3} />
      <Star fill="#F4D251" />
    </View>
  );
};

export default StarComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
