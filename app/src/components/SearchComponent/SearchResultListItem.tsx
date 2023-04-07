import { StyleSheet, View } from "react-native";
import React from "react";
import NormalText from "../NormalText/NormalText";
import Card from "../Card/Card";
import { captions, Heading5 } from "../NormalText/FontTypes";
import FavButton from "../FavButton/FavButton";
import { useNavigation } from "@react-navigation/native";

interface SearchResultListItemInterface {
  businessId: string | number;
  businessName: string;
  location: string;
}

const SearchResultListItem: React.FC<SearchResultListItemInterface> = ({
  businessId,
  businessName,
  location,
}) => {
  const navigation = useNavigation<any>();

  const onPress = () => {
    navigation.navigate("BusinessProfile", {
      id: businessId,
    });
  };

  return (
    <View style={styles.cardContainer}>
      <Card key={businessId} width="99%" onPress={onPress}>
        <View style={styles.cardContentsContainer}>
          <View>
            <NormalText
              normalText={businessName}
              fontType={Heading5}
              textColor="#822848"
            />
            <NormalText normalText={location} fontType={captions} />
          </View>
          <View style={styles.favContainer}>
            <FavButton />
          </View>
        </View>
      </Card>
    </View>
  );
};

export default SearchResultListItem;

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 10,
  },
  cardContentsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  favContainer: {
    position: "absolute",
    bottom: "30%",
    left: "85%",
  },
});
