import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import NormalText from "../NormalText/NormalText";
import { useNavigation } from "@react-navigation/native";

const SearchListItem = ({ id, title }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Search Results", {
      pageTitle: "Search results",
      id: id,
      title: title,
    });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <NormalText normalText={title} />
    </TouchableOpacity>
  );
};

export default SearchListItem;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 20,
  },
});
