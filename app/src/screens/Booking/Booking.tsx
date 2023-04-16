import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
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
import TabViewComponent from "../../components/TabViewComponent/TabViewComponent";
import BookingServices from "./BookingServices";
import BookingSpecialists from "./BookingSpecialists";
import About from "./About";
import { createAxiosClient } from "../../api";
import { background } from "native-base/lib/typescript/theme/styled-system";
import StarComponent from "../../components/StarComponent/StarComponent";

const Booking = ({ route }: any) => {
  const navigation = useNavigation<any>();
  // console.log(route.params);

  const serviceTypeIds: any = [];
  const serviceName: any = [];

  const searchService = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get("/servicetypebybusiness/1")
      .then((res) => {
        // const serviceTypeIdGet = res.data.filter((a: any) => {
        //   if (a["businessID"] === route.params.businessId) {
        //     serviceTypeIds.push(a["serviceTypeID"]);
        //     serviceName.push(a["serviceName"]);
        //   }
        // });
        console.log(res.data);
        // console.log(serviceTypeIds);
        // console.log(serviceName);
      })
      .catch((error) => {
        console.log("THIS IS THE ERROR >>>>", error);
      });
  };

  // const searchServiceType = async () => {
  //   const { axiosClient } = await createAxiosClient();
  //   await axiosClient
  //     .get("/serviceType")
  //     .then((res) => {
  //       const serviceTypeNameGet = res.data.filter((a: any) => {
  //         console.log(res.data)
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("THIS IS THE ERROR >>>>", error);
  //     });
  // };

  useEffect(() => {
    searchService();
  }, []);

  return (
    <View style={{ backgroundColor: "#F9F5EE", height: "100%", gap: 15 }}>
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
            <StarComponent ratings={route.params?.rating} textColor="white" />
          </View>
        </View>
        <View style={styles.buttonTopContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.buttonTopLeft}
          >
            <ArrowLeftBig width={24} height={17.54} fill="white" />
          </TouchableOpacity>
          {/* <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonTopLeft}
            >
              <FavButton colorFill="#822848" height={18.23} width={22} />
            </TouchableOpacity> */}
        </View>
      </View>
      <TabViewComponent
        routes={[
          {
            key: "first",
            title: "Services",
            Component: () => (
              <BookingServices businessID={route.params.businessId} />
            ),
          },
          {
            key: "second",
            title: "Specialists",
            Component: () => (
              <BookingSpecialists businessID={route.params.businessId} />
            ),
          },
          {
            key: "third",
            title: "About",
            Component: () => <About details={route.params?.description} />,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  businessInfo: {
    // bottom: 70,
  },
  textContainer: {
    // marginLeft: 16,
    // marginRight: 16,
    // marginBottom: -100,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "90%",
    // zIndex: 100,
    // backgroundColor: "red",
    position: "absolute",
    bottom: 10,
  },
  ratingContainer: {
    // bottom: 120,
    // left: 330,
    // display: "flex",
    // flexDirection: "row",
    // alignItems: "center",
  },
  buttonTopLeft: {
    backgroundColor: "black",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    // bottom: 320,
  },
  buttonTopContainer: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // width: "90%",
    alignSelf: "center",
    position: "absolute",
    top: 15,
    left: 15,
    // backgroundColor: "red",
  },
});

export default Booking;
