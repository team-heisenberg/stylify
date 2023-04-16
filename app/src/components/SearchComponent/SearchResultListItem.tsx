import { StyleSheet, View } from "react-native";
import React from "react";
import NormalText from "../NormalText/NormalText";
import Card from "../Card/Card";
import { captions, Heading5, Heading7 } from "../NormalText/FontTypes";
import FavButton from "../FavButton/FavButton";
import { useNavigation } from "@react-navigation/native";
import ImageComponent from "../ImageComponent/ImageComponent";

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
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <ImageComponent
                width={70}
                height={70}
                imageURL="https://stylify.ca/cdn/hair2.jpeg"
                borderRadius={4}
              />
              <View>
                <NormalText
                  normalText={businessName}
                  fontType={Heading7}
                  textColor="#822848"
                  textAlign="left"
                />
                <NormalText
                  normalText={location}
                  fontType={captions}
                  textAlign="left"
                />
              </View>
            </View>
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
