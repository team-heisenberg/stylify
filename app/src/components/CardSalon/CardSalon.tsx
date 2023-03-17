import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Card from "../Card/Card";
import NormalText from "../NormalText/NormalText";
import { BodyBold2, Heading2, Heading5, captions } from "../NormalText/FontTypes";
import { Navigate } from "../IconsComponent/IconsComponent";
import ImageComponent from "../ImageComponent/ImageComponent";
import { Star } from "../IconsComponent/IconsComponent";
import FavButton from "../FavButton/FavButton";

interface CardInterface {
  onPress?: () => void;
  onClick?: () => void;
  salonImage: string;
  salonName: string;
  salonLocation: string;
  rating: string;
  favState: boolean;
}

const CardSalon = ({ onPress, onClick, salonImage, salonName, salonLocation, rating, favState }: CardInterface) => {
  return (
    <Card height={96} padding={0} width={375} onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.imageContainer}>
          <ImageComponent
            width={69}
            height={69}
            borderRadius={4}
            imageURL={salonImage}
          />
        </View>
        <View style={styles.textContainer}>
          <NormalText
            normalText={salonName}
            fontType={Heading5}
            textColor="#822848"
            textAlign="left"
          />
          <NormalText
            normalText={salonLocation}
            fontType={captions}
            textColor="#24313A"
            textAlign="left"
            marginTop={4}
          />
          <View style={styles.ratingContainer}>
            <NormalText
              normalText={rating}
              fontType={BodyBold2}
              textColor="#24313A"
              textAlign="left"
              marginTop={4}
              marginRight={5}
            />
            <Star width={21} height={19} />
          </View>
        </View>
        <View style={styles.favContainer}>
          <FavButton colorFill="#822848" onClick={onClick} favState={favState} />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    marginLeft: 11,
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  textContainer: {
    marginLeft: 12,
    width: 225
  },
  favContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    height: 70,
    width: 40
  }
});

export default CardSalon;
