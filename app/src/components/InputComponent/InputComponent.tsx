import NormalText from "../NormalText/NormalText";
import { Input, NativeBaseProvider, View } from "native-base";
import { captions } from "../NormalText/FontTypes";

interface InputComponentInterface {
  value?: string;
  onChangeText?: () => void;
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
    <NativeBaseProvider>
      <View
        style={{
          position: "relative",
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
              base: "90%",
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
    </NativeBaseProvider>
  );
};

export default InputComponent;

InputComponent.defaultProps = {
  value: "",
  inputLabel: "",
  placeholder: "",
  showText: true,
  labelBgColor: "#FDF6E9",
  inputBgColor: "#FDF6E9",
  isDisabled: false,
  isRequired: true,
  error: false,
};
