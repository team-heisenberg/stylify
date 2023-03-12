import { StyleSheet, View } from "react-native";
import React from "react";
import NormalText from "../NormalText/NormalText";
import Card from "../Card/Card";

const SearchResultListItem = ({ businessName, location }) => {
  return (
    <View>
      <Card>
        <NormalText normalText={businessName} />
        <NormalText normalText={location} />
      </Card>
    </View>
  );
};

export default SearchResultListItem;

const styles = StyleSheet.create({});
