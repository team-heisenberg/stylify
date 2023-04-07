import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import NormalText from "../NormalText/NormalText";
import { useNavigation } from "@react-navigation/native";

interface SearchListItemInterface {
  id: string | number;
  title: string;
}

const SearchListItem: React.FC<SearchListItemInterface> = ({ id, title }) => {
  const navigation = useNavigation<any>();

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
    padding: 15,
    margin: 5,
  },
});
