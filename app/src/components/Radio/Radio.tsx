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
      <NormalText normalText={props.radioText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8
  },
  radioNoClicked: {
    height: 16,
    width: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(130, 40, 72, 1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioClicked: {
    height: 8,
    width: 8,
    borderRadius: 6,
    backgroundColor: "rgba(130, 40, 72, 1)",
  },
});

export default Radio;
