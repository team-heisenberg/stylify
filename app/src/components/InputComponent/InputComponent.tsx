import NormalText from "../NormalText/NormalText";
import { Input, View } from "native-base";
import { captions, captionsForInput } from "../NormalText/FontTypes";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Search } from "../IconsComponent/IconsComponent";
import { EmailAuthCredential } from "firebase/auth/react-native";

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
  isSearch?: boolean;
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
  isSearch,
}: InputComponentInterface) => {
  const [isFocused, setIsFocused] = useState(false);
  // const [isSearch, setIsSearch] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 400,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [focusAnim, isFocused]);

  return (
    <View
      style={{
        position: "relative",
        marginBottom: 25,
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
          style={[
            styles.labelContainer,
            {
              top: focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ]}
        >
          {isSearch && !isFocused && <Search />}
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
            style={{
              fontFamily: "Figtree_400Regular",
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            onFocus={() => {
              setIsFocused(true);
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
      <Animated.View
        style={[
          styles.shadow,
          {
            top: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [15, 19],
            }),
            left: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 4],
            }),
          },
        ]}
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
  labelContainer: {
    position: "absolute",
    backgroundColor: "#F9F5EE",
    zIndex: 100,
    paddingLeft: 8,
    paddingRight: 8,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  shadow: {
    width: "99%",
    height: 55,
    borderRadius: 50,
    backgroundColor: "#000000",
    position: "absolute",
  },
});
