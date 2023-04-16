import { View, StyleSheet } from "react-native";
import Card from "../Card/Card";
import NormalText from "../NormalText/NormalText";
import { captions, Heading6, Heading7 } from "../NormalText/FontTypes";
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
    <Card height={96} padding={0} width="99%" onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.clock}>
          <NormalText
            normalText={time}
            fontType={Heading6}
            textColor="white"
            textAlign="center"
          />
          <NormalText
            normalText={ampm}
            fontType={Heading6}
            textColor="white"
            textAlign="center"
          />
        </View>
        <View style={styles.information}>
          <NormalText
            normalText={salonName}
            fontType={Heading7}
            textColor="#822848"
            textAlign="left"
          />
          <NormalText
            normalText={services}
            fontType={captions}
            textColor="#24313A"
            textAlign="left"
          />
          <NormalText
            normalText={professional}
            fontType={captions}
            textColor="#24313A"
            textAlign="left"
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
    flexDirection: "row",
  },
  clock: {
    backgroundColor: "#822848",
    height: 96,
    width: 94,
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    alignItems: "center",
  },
  information: {
    marginLeft: 8,
    justifyContent: "center",
    width: "60%",
  },
  navigator: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardAppointment;
