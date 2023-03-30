import { View, StyleSheet, Pressable, Text } from "react-native";
import Card from "../Card/Card";
import ImageComponent from "../ImageComponent/ImageComponent";
import { Heading5, BodyBold2 } from "../NormalText/FontTypes";
import NormalText from "../NormalText/NormalText";
import { RedDot } from "../IconsComponent/IconsComponent";
import { useState } from "react";
import { Plus, Line } from "../IconsComponent/IconsComponent";

interface CardService {
  serviceName: string;
  serviceDuration: number;
  servicePrice: number;
}

const CardService = ({
  serviceName,
  serviceDuration,
  servicePrice,
}: CardService) => {
  const [amount, setAmount] = useState(0);
  // const [buttonAppear, setButtonAppear] = useState(false);

  return (
    <View>
      <Card width="100%">
        <View>
          <ImageComponent
            width={69}
            height={69}
            borderRadius={4}
            imageURL="https://picsum.photos/200/300"
          />
        </View>
        <View style={styles.textContainer}>
          <View>
            <NormalText
              normalText={serviceName}
              fontType={BodyBold2}
              textColor="#822848"
              textAlign="left"
            />
          </View>
          <View style={styles.informationContainer}>
            <NormalText
              normalText={`${serviceDuration}min`}
              fontType={Heading5}
              textAlign="left"
              marginTop={4}
              marginRight={5}
            />
            <RedDot style={{ marginRight: 5, top: 2 }} />
            <NormalText
              normalText={`$${servicePrice}`}
              fontType={Heading5}
              textAlign="left"
              marginTop={4}
              marginRight={5}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonVisible}>
            <Pressable
              style={{
                backgroundColor: "#105535",
                width: 30,
                height: 30,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 7,
              }}
              onPressIn={() => {
                amount === 0 ? setAmount(0) : setAmount(amount - 1);
              }}
            >
              <Line stroke="white" fill="white" width={15} height={15} />
            </Pressable>
            <NormalText
              normalText={amount}
              textColor="white"
              textAlign="center"
              fontType={BodyBold2}
            />
            <Pressable
              style={{
                backgroundColor: "#105535",
                width: 30,
                height: 30,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 7,
              }}
              onPressIn={() => {
                setAmount(amount + 1);
              }}
            >
              <Plus fill="white" width={15} height={15} />
            </Pressable>
          </View>
        </View>
      </Card>
    </View>
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
    justifyContent: "center",
    right: 35,
    height: 30,
    width: 80,
  },
  buttonVisible: {
    backgroundColor: "#24313A",
    borderRadius: 50,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInvisible: {
    backgroundColor: "unset",
  },
});

export default CardService;
