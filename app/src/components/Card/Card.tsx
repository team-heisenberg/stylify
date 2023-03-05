import { StyleSheet, View } from "react-native";
import React from "react";

interface CardInterface {
  flex?: number;
  width?: number;
  height?: number;
  borderColor?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

const Card = ({
  flex,
  width,
  height,
  borderColor,
  backgroundColor,
  children,
}: CardInterface) => {
  return (
    <View style={{ flex: flex }}>
      <View
        style={[
          styles.card,
          {
            width: width,
            height: height,
            borderColor: borderColor,
            backgroundColor: backgroundColor,
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
  );
};

Card.defaultProps = {
  flex: 1,
  width: 300,
  height: 89,
  borderColor: "#822848",
  backgroundColor: "#FDF6E9",
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 8,
    position: "absolute",
    zIndex: 100,
    flexDirection: "row",
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
