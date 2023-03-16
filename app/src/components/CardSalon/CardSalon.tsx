import { View } from "react-native";
import Card from "../Card/Card";

interface CardInterface {
  onPress?: () => void;
}

const CardSalon = ({ onPress }: CardInterface) => {
  return (
    <View>
      <Card height={96} padding={0} width={375} onPress={onPress}></Card>
    </View>
  );
};

export default CardSalon;
