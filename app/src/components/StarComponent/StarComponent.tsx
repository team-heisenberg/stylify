import { StyleSheet, View } from "react-native";
import React from "react";
import { Star } from "../IconsComponent/IconsComponent";
import NormalText from "../NormalText/NormalText";
import { Heading4 } from "../NormalText/FontTypes";

interface StarComponentInterface {
  ratings: number;
  textColor?: string;
}

const StarComponent = ({ ratings, textColor }: StarComponentInterface) => {
  return (
    <View style={styles.container}>
      <NormalText
        normalText={ratings}
        fontType={Heading4}
        marginRight={3}
        textColor={textColor}
      />
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
