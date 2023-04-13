import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Heading3, Heading5 } from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";
import CardSalon from "../../components/CardSalon/CardSalon";
import CardAppointment from "../../components/CardAppointment/CardAppointment";
import CardRecentAppointment from "../../components/CardRecentAppointment/CardRecentAppointment";
import { createAxiosClient } from "../../api";

const HomeCustomer = () => {
  const navigation = useNavigation<any>();
  const [business, setBusiness] = useState([]);
  const route = useRoute();

  console.log(business);

  const searchBusiness = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get("/business")
      .then((res) => {
        console.log(res);
        setBusiness(res.data);
      })
      .catch((error) => {
        console.log(error), setBusiness([]);
      });
  };

  useEffect(() => {
    searchBusiness();
  }, []);

  return (
    <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
      {/* TEST IF THERE ARE UPCOMING APPOINTMENTS VVVVV */}
      <View>
        <View style={styles.containerText}>
          <NormalText
            normalText="Upcoming Appointment"
            fontType={Heading3}
            textAlign="left"
            marginTop={5}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Client Appointments", {
                title: "Appointments",
              })
            }
          >
            <Text style={{ textDecorationLine: "underline", color: "#24313A" }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cards}>
          <CardAppointment
            time="12:00"
            ampm="am"
            salonName="Daniel Salon"
            services="Haircut"
            professional="Diego Lara"
          />
        </View>
        <View style={styles.cards}>
          <CardAppointment
            time="12:00"
            ampm="am"
            salonName="Daniel Salon"
            services="Haircut"
            professional="Diego Lara"
          />
        </View>
      </View>

      {/* IF THERE IS NO UPCOMMING APPOINTMENT RENDER THIS VVVVV */}
      {/* <View style={{ marginTop: 5 }}>
        <NormalText
          normalText="No upcoming appointments"
          fontType={Heading5}
          textColor="#8E9394"
          textAlign="left"
        />
      </View> */}

      {/* CHECK THE RECENT APPOINTMENTS VVVVV */}
      {/* NO RECENT APPOINTMENT */}
      <View>
        <View style={styles.containerText}>
          <NormalText
            normalText="Recent Appointments"
            fontType={Heading5}
            textColor="#24313A"
            textAlign="left"
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Client Appointments", {
                title: "Appointments",
              })
            }
          >
            <Text style={{ textDecorationLine: "underline", color: "#24313A" }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.cards}>
            <CardRecentAppointment
              salonImage="https://picsum.photos/200/300"
              salonName="Daniel Salon"
              services="Haircut, Beard Styling"
              duration="45min"
              price="$27.90"
              favState={false}
            />
          </View>
        </View>
      </View>

      {/* IF THERE ARE NO FAVORITE SALONS VVVVV */}
      <View>
        <View style={styles.containerText}>
          <NormalText
            normalText="Salons near me"
            fontType={Heading5}
            textColor="#24313A"
            textAlign="left"
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Browse", {
                title: "Browse",
              })
            }
          >
            <Text style={{ textDecorationLine: "underline", color: "#24313A" }}>
              10km radius
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {business?.map((b) => (
            <View style={styles.cards}>
              <CardSalon
                salonImage="https://picsum.photos/200/300"
                salonName={b["businessName"]}
                salonLocation={b["location"]}
                rating="4.6"
                favState={false}
                onPress={() => {
                  navigation.navigate("Booking", {
                    salonName: b["businessName"],
                    salonLocation: b["location"],
                    rating: "4.6",
                    favState: false,
                    businessId: b["businessID"]
                  });
                }}
              />
            </View>
          ))}
        </View>
      </View>

      {/* IF THEY HAVE FAVORITE SALONS VVVVV */}
      {/* <View style={{ marginBottom: 40 }}>
        <View style={styles.containerText}>
          <NormalText
            normalText="Favourite salons"
            fontType={Heading5}
            textColor="#24313A"
            textAlign="left"
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Client Favourites", {
                title: "Favourite Salons",
              })
            }
          >
            <Text style={{ textDecorationLine: "underline", color: "#24313A" }}>
              Explore more
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.cards}>
            <CardSalon
              salonImage="https://picsum.photos/200/300"
              salonName="Diego Salon"
              salonLocation="Langara 49th, Vancouver"
              rating="2.5"
              favState={true}
            />
          </View>
        </View>
      </View> */}

      {/* END OF CODE */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F9F5EE",
    height: "100%",
    paddingLeft: 16,
    paddingRight: 16,
  },
  cards: {
    marginTop: 16,
  },
  containerText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default HomeCustomer;
