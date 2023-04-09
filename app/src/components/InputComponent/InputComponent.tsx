import NormalText from "../NormalText/NormalText";
import { Input, View } from "native-base";
import { captions, captionsForInput } from "../NormalText/FontTypes";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Search } from "../IconsComponent/IconsComponent";

let onBlur = () => {};
let onFocus = () => {};

interface InputComponentInterface {
  value?: string;
  onChangeText?: (e: any) => void;
  inputLabel?: string;
  placeholder?: string;
  showText?: boolean;
  labelBgColor?: string;
  inputBgColor?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  error?: boolean;
}
const InputComponent = ({
  value,
  onChangeText,
  inputLabel,
  placeholder,
  showText,
  labelBgColor,
  inputBgColor,
  isDisabled,
  isRequired,
  error,
}: InputComponentInterface) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      // I took duration and easing values
      // from material.io demo page
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      // we'll come back to this later
      useNativeDriver: false,
    }).start();
  }, [focusAnim, isFocused]);

  return (
    <View
      style={{
        position: "relative",
        marginBottom: 20,
        width: "100%",
      }}
    >
      <View
        style={{
          width: "99%",
          zIndex: 100,
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            backgroundColor: "#F9F5EE",
            zIndex: 100,
            paddingLeft: 8,
            paddingRight: 8,
            left: 20,
            borderRadius: 15,
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            top: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [28, 0],
            }),
          }}
        >
          {!isFocused && isSearch && <Search />}
          <NormalText
            normalText={inputLabel}
            fontType={isFocused ? captions : captionsForInput}
          />
        </Animated.View>
        <View
          style={{
            top: 15,
          }}
        >
          <Input
            value={value}
            onChangeText={onChangeText}
            variant="rounded"
            placeholder={placeholder}
            w={{
              base: "100%",
            }}
            height={55}
            type={showText ? "text" : "password"}
            py="3"
            borderColor="#161D23"
            focusOutlineColor="#161D23"
            backgroundColor="#F9F5EE"
            borderWidth="2"
            isDisabled={isDisabled}
            isRequired={isRequired}
            // zIndex={100}
            style={{
              fontFamily: "Figtree_400Regular",
            }}
            onBlur={(event) => {
              setIsFocused(false);
              onBlur?.();
            }}
            onFocus={(event) => {
              setIsFocused(true);
              onFocus?.();
            }}
          />
          {error && (
            <NormalText
              normalText="Error text"
              textColor="#FF1C00"
              marginTop={4}
              fontType={captions}
            />
          )}
        </View>
      </View>
      <View
        style={{
          width: "99%",
          height: 55,
          borderRadius: 50,
          backgroundColor: "#000000",
          // top: -37,
          // left: 3,
          // top: focusAnim.interpolate({
          //   inputRange: [0, 1],
          //   outputRange: [28, 0],
          // }),
          // left: focusAnim.interpolate({
          //   inputRange: [0, 1],
          //   outputRange: [28, 0],
          // }),
        }}
      />
    </View>
  );
};

export default InputComponent;

InputComponent.defaultProps = {
  value: "",
  inputLabel: "",
  placeholder: "",
  showText: true,
  labelBgColor: "#F9F5EE",
  inputBgColor: "#F9F5EE",
  isDisabled: false,
  isRequired: true,
  error: false,
};

const styles = StyleSheet.create({
  shadow: {
    width: "99%",
    height: 55,
    borderRadius: 50,
    backgroundColor: "#000000",
    top: -37,
    left: 3,
  },
});
