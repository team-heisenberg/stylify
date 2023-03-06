import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import NormalText from "../NormalText/NormalText";
import { Link } from "../NormalText/FontTypes";

interface ButtonComponentInterface {
  flex?: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
  disabledColor?: string;
  isDisabled?: boolean;
  buttonText: string;
  textColor?: string;
  onPress?: (value: string) => void;
}

const ButtonComponent = ({
  flex,
  width,
  height,
  backgroundColor,
  disabledColor,
  isDisabled,
  buttonText,
  textColor,
  onPress,
}: ButtonComponentInterface) => {
  const [positionTop, setPositionTop] = useState(4);
  const [positionLeft, setPositionLeft] = useState(4);

  return (
    <View
      style={{
        flex: flex,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          onPress;
        }}
        onPressIn={() => {
          setPositionTop(0);
          setPositionLeft(0);
        }}
        onPressOut={() => {
          setPositionTop(4);
          setPositionLeft(4);
        }}
        disabled={isDisabled}
      >
        <View
          style={{
            position: "relative",
          }}
        >
          <View
            style={[
              styles.button,
              {
                width: width,
                height: height,
                backgroundColor: backgroundColor,
              },
              isDisabled && {
                backgroundColor: disabledColor,
                borderColor: disabledColor,
              },
            ]}
          >
            <NormalText
              normalText={buttonText}
              textColor={textColor}
              fontType={Link}
            />
          </View>
          <View
            style={[
              styles.shadow,
              {
                width: width,
                height: height,
              },
              { top: positionTop, left: positionLeft },
              isDisabled && {
                top: 0,
                left: 0,
              },
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

ButtonComponent.defaultProps = {
  flex: 1,
  width: 300,
  height: 59,
  backgroundColor: "#105535",
  disabledColor: "#E0E5E1",
  isDisabled: false,
  buttonText: "",
  textColor: "#FFFFFF",
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000000",
    position: "absolute",
    zIndex: 100,
  },
  shadow: {
    borderRadius: 50,
    backgroundColor: "#000000",
  },
});

export default ButtonComponent;
