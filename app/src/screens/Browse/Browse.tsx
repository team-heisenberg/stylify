import { View, Button, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import { Heading3, Heading4 } from "../../components/NormalText/FontTypes";
import ImageComponent from "../../components/ImageComponent/ImageComponent";

const Browse = () => {
  const navigation = useNavigation<any>();

  return (
    <>
      <NormalText normalText="Services" fontType={Heading3} textAlign="left" />
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Service Detail", { title: "Hair cuts" })
          }
        >
          <ImageComponent
            width={100}
            height={100}
            imageURL="https://picsum.photos/500/350"
            borderRadius={4}
          />
          <NormalText normalText="Hair cuts" fontType={Heading4} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Service Detail", { title: "Hair color" })
          }
        >
          <ImageComponent
            width={100}
            height={100}
            imageURL="https://picsum.photos/500/350"
            borderRadius={4}
          />
          <NormalText normalText="Hair color" fontType={Heading4} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Service Detail", { title: "Beard" })
          }
        >
          <ImageComponent
            width={100}
            height={100}
            imageURL="https://picsum.photos/500/350"
            borderRadius={4}
          />
          <NormalText normalText="Beard" fontType={Heading4} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Service Detail", { title: "Facial" })
          }
        >
          <ImageComponent
            width={100}
            height={100}
            imageURL="https://picsum.photos/500/350"
            borderRadius={4}
          />
          <NormalText normalText="Facial" fontType={Heading4} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Service Detail", { title: "Nails" })
          }
        >
          <ImageComponent
            width={100}
            height={100}
            imageURL="https://picsum.photos/500/350"
            borderRadius={4}
          />
          <NormalText normalText="Nails" fontType={Heading4} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Service Detail", { title: "Feet" })
          }
        >
          <ImageComponent
            width={100}
            height={100}
            imageURL="https://picsum.photos/500/350"
            borderRadius={4}
          />
          <NormalText normalText="Feet" fontType={Heading4} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    flexDirection: "column",
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 15,
  },
});

export default Browse;
