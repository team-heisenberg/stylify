import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Card from "../Card/Card";
import NormalText from "../NormalText/NormalText";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import ImageComponent from "../ImageComponent/ImageComponent";
import { BodyBold2, Heading5, captions } from "../NormalText/FontTypes";
import { RedDot } from "../IconsComponent/IconsComponent";

interface CardInterface {
  onPress?: () => void;
  onClick?: () => void;
  salonImage: string;
  salonName: string;
  services: string;
  duration: string;
  price: string;
  favState: boolean;
}

const CardRecentAppointment = ({
  onPress,
  salonImage,
  salonName,
  services,
  duration,
  price,
}: CardInterface) => {
  return (
    <Card height={96} padding={0} width="98%" onPress={onPress}>
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
            normalText={services}
            fontType={captions}
            textColor="#24313A"
            textAlign="left"
            marginTop={4}
          />
          <View style={styles.informationContainer}>
            <NormalText
              normalText={duration}
              fontType={BodyBold2}
              textColor="#24313A"
              textAlign="left"
              marginTop={4}
              marginRight={5}
            />
            <RedDot style={{ marginRight: 5, top: 2 }} />
            <NormalText
              normalText={price}
              fontType={BodyBold2}
              textColor="#24313A"
              textAlign="left"
              marginTop={4}
              marginRight={5}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
            <ButtonComponent width={81} height={28} buttonText="Rebook" onPress={onPress} />
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
  informationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 12,
    width: 225,
  },
  buttonContainer: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    right: 0,
    height: 30,
    minWidth: 80,
  },
});

export default CardRecentAppointment;
