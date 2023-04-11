import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import React, { ReactElement, useState } from "react";
import NormalText from "../NormalText/NormalText";
import { Link } from "../NormalText/FontTypes";

interface ButtonComponentInterface {
  flex?: number;
  width?: number;
  containerWidth?: number | string;
  height?: number;
  backgroundColor?: string;
  disabledColor?: string;
  isDisabled?: boolean;
  buttonText: string;
  icon?: ReactElement;
  rightIcon?: ReactElement;
  textColor?: string;
  value?: string;
  onPress?: () => void;
}

const ButtonComponent = ({
  flex,
  width,
  containerWidth,
  height,
  backgroundColor,
  disabledColor,
  isDisabled,
  buttonText,
  textColor,
  icon,
  rightIcon,
  onPress,
}: ButtonComponentInterface) => {
  const [positionTop, setPositionTop] = useState(4);
  const [positionLeft, setPositionLeft] = useState(4);

  return (
    <View
      style={{
        width: containerWidth,
        marginVertical: 8,
      }}
    >
      <TouchableWithoutFeedback
        onPress={onPress}
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
            width: "100%",
          }}
        >
          <View
            style={[
              styles.button,
              {
                width: "100%",
                height: height,
                backgroundColor: backgroundColor,
              },
              isDisabled && {
                backgroundColor: disabledColor,
                borderColor: disabledColor,
              },
            ]}
          >
<<<<<<< HEAD
               <View style={icon && { width: "75%" }}>
=======
            {icon && (
              <View style={{ width: "20%", alignItems: "flex-start" }}>
                {icon}
              </View>
            )}
            <View
              style={
                (icon && { width: "75%", paddingRight: "20%" }) ||
                (rightIcon && { width: "80%" })
              }
            >
>>>>>>> 0c175ba (feature/HB-218-Create-Splash-Screen)
              <NormalText
                normalText={buttonText}
                textColor={textColor}
                fontType={Link}
              />
            </View>
<<<<<<< HEAD
            {icon && (
              <View style={{ width: "5%", alignItems: "flex-end" }}>
                {icon}
=======
            {rightIcon && (
              <View style={{ width: "5%", alignItems: "flex-end" }}>
                {rightIcon}
>>>>>>> 0c175ba (feature/HB-218-Create-Splash-Screen)
              </View>
            )}
          </View>
          <View
            style={[
              styles.shadow,
              {
                width: "100%",
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
  width: "98%",
  containerWidth: "98.5%",
  height: 59,
  backgroundColor: "#105535",
  disabledColor: "#E0E5E1",
  isDisabled: false,
  buttonText: "",
  textColor: "#FFFFFF",
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
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
