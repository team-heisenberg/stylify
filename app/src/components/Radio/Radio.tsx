import { TouchableOpacity, ViewStyle } from "react-native";
import React from "react";

interface RadioProps {
  style?: ViewStyle;
  selected: boolean;
  onPress: (value: string) => void;
  radioValue: string;
}

const Radio = (props: RadioProps) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.radioValue)}
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        },
        props.style,
      ]}
    >
      {props.selected ? (
        <TouchableOpacity
          onPress={() => props.onPress(props.radioValue)}
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: "#000",
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default Radio;
