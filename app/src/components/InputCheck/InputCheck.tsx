// Imports
import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NormalText from "../NormalText/NormalText";

// Interface
interface inputCheckInterface {
  isDisabled: boolean;
  isChecked: boolean;
  onChange: Function;
  normalText: string;
  fontType?: {};
  textColor?: string;
}

// Component function
// Props
const InputCheck = ({
  isDisabled,
  isChecked,
  onChange,
  normalText,
  fontType,
  textColor,
}: inputCheckInterface) => {
  // Return component
  return (
    <View style={styles.viewStyle}>
      <NormalText
        normalText={normalText}
        fontType={fontType}
        textColor={textColor}
        marginRight={10}
      />
      <Pressable
        disabled={isDisabled}
        style={
          isDisabled
            ? [styles.disableBase, isChecked && styles.disableChecked]
            : [styles.checkboxBase, isChecked && styles.checkboxChecked]
        }
        onPress={() => onChange(!isChecked)}
      >
        {isChecked && (
          <Ionicons
            name="checkmark"
            size={20}
            color={isChecked && isDisabled ? "#E0E5E1" : "#822848"}
          />
        )}
      </Pressable>
    </View>
  );
};

// Default props
InputCheck.defaultProps = {
  isDisabled: false,
  isChecked: false,
  onChange: "",
};

// Create stylesheet
const styles = StyleSheet.create({
  viewStyle: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  checkboxBase: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#161D23",
    backgroundColor: "transparent",
  },
  disableBase: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#E0E5E1",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#EAF1FB",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#822848",
  },
  disableChecked: {
    backgroundColor: "transparent",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E0E5E1",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "20",
  },
});

export default InputCheck;
