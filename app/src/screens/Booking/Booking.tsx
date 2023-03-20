import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import NormalText from "../../components/NormalText/NormalText";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import {
  Heading3,
  Heading5,
  captions,
} from "../../components/NormalText/FontTypes";
import {
  Star,
  ArrowLeftBig,
} from "../../components/IconsComponent/IconsComponent";
import FavButton from "../../components/FavButton/FavButton";

const Booking = ({ route }: any) => {
  const navigation = useNavigation<any>();
  console.log(route.params);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <ImageComponent
          width="100%"
          height={260}
          imageURL="https://picsum.photos/500/500"
          borderRadius={0}
          linearGradient={true}
          positionLinearGradient="bottom"
        />
        <View style={styles.textContainer}>
          <View style={styles.businessInfo}>
            <NormalText
              normalText={route.params?.salonName}
              fontType={Heading3}
              textColor="white"
              textAlign="left"
            />
            <NormalText
              normalText={route.params?.salonLocation}
              fontType={captions}
              textColor="white"
              textAlign="left"
            />
          </View>
          <View style={styles.ratingContainer}>
            <NormalText
              normalText={route.params?.rating}
              fontType={Heading5}
              textColor="white"
              textAlign="left"
            />
            <Star style={{ marginLeft: 5 }} />
          </View>
          <View style={styles.buttonTopContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonTopLeft}
            >
              <ArrowLeftBig width={24} height={17.54} fill="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonTopLeft}
            >
              <FavButton colorFill="#822848" height={18.23} width={22} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <NormalText normalText="lalal" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  businessInfo: {
    bottom: 70,
  },
  textContainer: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: -100
  },
  ratingContainer: {
    bottom: 120,
    left: 330,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonTopLeft: {
    backgroundColor: "black",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    bottom: 320,
  },
  buttonTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default Booking;