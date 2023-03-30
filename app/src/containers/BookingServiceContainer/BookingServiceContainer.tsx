import { View } from "react-native";
import NormalText from "../../components/NormalText/NormalText";
import CardService from "../../components/CardService/CardService";
import { Heading5 } from "../../components/NormalText/FontTypes";

interface BookingServiceContainer {
  serviceCategory: string;
  services?: object;
}

const BookingServiceContainer = ({
  serviceCategory, services
}: BookingServiceContainer) => {
  return (
    <View style={{ margin: 16 }}>
      <NormalText
        normalText={serviceCategory}
        textAlign="left"
        fontType={Heading5}
      />
      <View style={{ marginTop: 12 }}>
        <CardService serviceDuration={45} serviceName="Divyank" servicePrice={30}/>
      </View>
    </View>
  );
};

export default BookingServiceContainer;
