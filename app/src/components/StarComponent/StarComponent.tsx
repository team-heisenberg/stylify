import { StyleSheet, View } from "react-native";
import React from "react";
import { Star } from "../IconsComponent/IconsComponent";
import NormalText from "../NormalText/NormalText";
import {
  Heading4,
  Heading5,
  Heading6,
  Heading7,
} from "../NormalText/FontTypes";

interface StarComponentInterface {
  ratings: number;
  textColor?: string;
  fontType?: {};
}

const StarComponent = ({
  ratings,
  textColor,
  fontType,
}: StarComponentInterface) => {
  return (
    <View style={styles.container}>
      <NormalText
        normalText={ratings}
        fontType={fontType}
        marginRight={3}
        textColor={textColor}
      />
      <Star fill="#F4D251" />
    </View>
  );
};

StarComponent.defaultProps = {
  fontType: Heading4,
};

export default StarComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
