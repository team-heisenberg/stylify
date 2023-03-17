import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import React from "react";

interface CardInterface {
  width?: number | string;
  height?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  padding?: number;
  onPress?: () => void;
  justifyContent?: "center" | "space-between"
}

const Card = ({
  width,
  height,
  borderWidth,
  borderColor,
  backgroundColor,
  children,
  flexDirection,
  padding,
  onPress,
  justifyContent,
}: CardInterface) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ height: 93 }}>
        <View
          style={[
            styles.card,
            {
              width: width,
              height: height,
              borderWidth: borderWidth,
              borderColor: borderColor,
              backgroundColor: backgroundColor,
              flexDirection: flexDirection,
              padding: padding,
              justifyContent: justifyContent,
            },
          ]}
        >
          {children}
        </View>
        <View
          style={[
            styles.shadow,
            {
              width: width,
              height: height,
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

Card.defaultProps = {
  width: "90%",
  height: 89,
  borderWidth: 2,
  borderColor: "#822848",
  backgroundColor: "#FDF6E9",
  flexDirection: "row",
  padding: 10,
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    position: "absolute",
    zIndex: 100,
    alignItems: "center",
  },
  shadow: {
    borderRadius: 8,
    backgroundColor: "#000000",
    top: 4,
    left: 4,
  },
});

export default Card;
