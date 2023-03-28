import { View } from "react-native"
import NormalText from "../../components/NormalText/NormalText"
import CardService from "../../components/CardService/CardService"
import { Heading5 } from "../../components/NormalText/FontTypes"

const BookingServiceContainer = () => {
    return (
        <View style={{margin: 16}}>
        <NormalText
          normalText="Hair Color"
          textAlign="left"
          fontType={Heading5}
        />
        <View style={{marginTop: 12}}>
          <CardService />
        </View>
      </View>
    )
}

export default BookingServiceContainer