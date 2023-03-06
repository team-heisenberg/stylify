import { TouchableOpacity, StyleSheet, View } from "react-native";
import React from "react";
import NormalText from "../NormalText/NormalText";

interface RadioProps {
  selected: boolean;
  onPress: (value: string) => void;
  radioValue: string;
  radioText?: string;
}

const Radio = (props: RadioProps) => {
  return (
      <View style={styles.container}>
        <NormalText normalText={props.radioText} />
        <TouchableOpacity
          onPress={() => props.onPress(props.radioValue)}
          style={styles.radioNoClicked}
        >
          {props.selected ? (
            <TouchableOpacity
              onPress={() => props.onPress(props.radioValue)}
              style={styles.radioClicked}
            />
          ) : null}
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
  radioNoClicked: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioClicked: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
});

export default Radio;
