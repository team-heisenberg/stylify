import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Card from "../Card/Card";
import NormalText from "../NormalText/NormalText";
import { captions, Heading2, Heading5 } from "../NormalText/FontTypes";
import { Navigate } from "../IconsComponent/IconsComponent";

interface CardInterface {
  onPress?: () => void;
  time: string;
  ampm: string;
  salonName: string;
  services: string;
  professional: string;
}

const CardAppointment = ({
  onPress,
  time,
  ampm,
  salonName,
  services,
  professional,
}: CardInterface) => {
  return (
    <Card height={96} padding={0} width={375} onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.clock}>
          <NormalText
            normalText={time}
            fontType={Heading2}
            textColor="white"
            textAlign="center"
          />
          <NormalText
            normalText={ampm}
            fontType={Heading5}
            textColor="white"
            textAlign="center"
          />
        </View>
        <View style={styles.information}>
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
          <NormalText
            normalText={professional}
            fontType={captions}
            textColor="#24313A"
            textAlign="left"
            marginTop={4}
          />
        </View>
        <View style={styles.navigator}>
            <Navigate width={27} height={27} fill="black" />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
  },
  clock: {
    backgroundColor: "#822848",
    height: 96,
    width: 94,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  information: {
    marginLeft: 8,
    marginTop: 10,
    width: 225,
  },
  navigator: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardAppointment;