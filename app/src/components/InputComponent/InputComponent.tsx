import NormalText from "../NormalText/NormalText";
import { Input, NativeBaseProvider, View } from "native-base";
import { captions } from "../NormalText/FontTypes";
import { Dimensions, Platform } from "react-native";

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
  return (
    <View
      style={{
        position: "relative",
        marginBottom: 20,
        width: "100%"
      }}
    >
      <View
        style={{
          position: "absolute",
          backgroundColor: labelBgColor,
          zIndex: 100,
          paddingLeft: 8,
          paddingRight: 8,
          left: 20,
        }}
      >
        <NormalText normalText={inputLabel} fontType={captions} />
      </View>
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
          size="2xl"
          type={showText ? "text" : "password"}
          py="3"
          borderColor="#161D23"
          focusOutlineColor="#161D23"
          backgroundColor={inputBgColor}
          borderWidth="2"
          isDisabled={isDisabled}
          isRequired={isRequired}
        />
        {error && (
          <NormalText
            normalText="Error text"
            textColor="#FF1C00"
            marginTop={4}
          />
        )}
      </View>
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
