import { View, StyleSheet, Pressable } from "react-native";
import Card from "../Card/Card";
import ImageComponent from "../ImageComponent/ImageComponent";
import { Heading5, BodyBold2 } from "../NormalText/FontTypes";
import NormalText from "../NormalText/NormalText";
import { RedDot } from "../IconsComponent/IconsComponent";
import { useState } from "react";
import { Plus } from "../IconsComponent/IconsComponent";

const CardService = () => {
  const [amount, setAmount] = useState(0);
  const [buttonAppear, setButtonAppear] = useState(false);

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
              normalText="Men's Haircut"
              fontType={BodyBold2}
              textColor="#822848"
              textAlign="left"
            />
          </View>
          <View style={styles.informationContainer}>
            <NormalText
              normalText="45min"
              fontType={Heading5}
              textAlign="left"
              marginTop={4}
              marginRight={5}
            />
            <RedDot style={{ marginRight: 5, top: 2 }} />
            <NormalText
              normalText="$27.50"
              fontType={Heading5}
              textAlign="left"
              marginTop={4}
              marginRight={5}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View>
            <Pressable
              style={{
                backgroundColor: "#105535",
                width: 30,
                height: 30,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "60%"
              }}
              onPressIn={() => {
                setButtonAppear(true)
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
});

export default CardService;
