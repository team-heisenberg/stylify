import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import { Heading3, Heading5 } from "../../components/NormalText/FontTypes";
import { ArrowLeftBig } from "../../components/IconsComponent/IconsComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { createAxiosClient } from "../../api";
import CardService from "../../components/CardService/CardService";
import { ScrollView } from "native-base";

let businessID: any;

const SelectServicesBusiness = () => {
  const [services, setServices] = useState<any[]>([]);
  const serviceType: any = [];

  const searchService = async () => {
    const rawUserData = await AsyncStorage.getItem("@stylify:user");

    const userData = JSON.parse(rawUserData || "{}");
    const { axiosClient } = await createAxiosClient();
    businessID = userData.ID;
    await axiosClient
      .get(`/service/byBusinessId/${businessID}`)
      .then((res) => {
        setServices(res.data);
      })
      .catch((error) => {
        console.log("THIS IS THE ERROR >>>>", error);
      });
  };

  useEffect(() => {
    searchService();
  }, []);

  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [servicesSelected, setServicesSelected] = useState<
    {
      serviceID: number;
      name: string;
      price: number;
      amount: number;
    }[]
  >([]);
  console.log(servicesSelected);

  const addService = (selectedService: any) => {
    let arr = Array.from(servicesSelected || []);
    const itemIndex = arr.findIndex((a) => selectedService.name === a.name);
    if (itemIndex > -1) {
      const { price } = selectedService;
      let { amount } = arr[itemIndex];
      amount = amount + 1;
      arr[itemIndex] = {
        ...arr[itemIndex],
        price: price * amount,
        amount,
      };
      setServicesSelected(arr);
    } else {
      arr.push(selectedService);
      setServicesSelected(arr);
    }
  };

  const removeService = (selectedService: any) => {
    let arr = Array.from(servicesSelected || []);
    const itemIndex = arr.findIndex((a) => selectedService.name === a.name);
    if (itemIndex > -1) {
      const { price } = selectedService;
      let { amount } = arr[itemIndex];
      amount = amount - 1;
      arr[itemIndex] = {
        ...arr[itemIndex],
        price: price * amount,
        amount,
      };
      if (amount === 0) {
        arr.splice(itemIndex, 1);
      }

      setServicesSelected(arr);
    } else {
      arr.splice(itemIndex, 1);
      setServicesSelected(arr);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.navigation}>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ArrowLeftBig width={24} height={17.54} fill="black" />
          </TouchableOpacity>
          <NormalText
            normalText={route.params.titleSelectServices}
            fontType={Heading3}
          />
        </View>

        <View style={styles.servicesContainer}>
          <View style={styles.titleContainer}>
            <NormalText
              normalText="Hair"
              textAlign="left"
              fontType={Heading5}
            />
          </View>
          {services?.map((service) => (
            <View style={styles.servicesCard}>
              <CardService
                serviceID={service?.serviceID}
                serviceName={service.serviceName}
                serviceDuration={parseInt(service.durationInMinutes)}
                servicePrice={parseFloat(service.servicePrice)}
                addService={addService}
                photoURL={service?.photoURL}
                removeService={removeService}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.button}>
        <ButtonComponent
          buttonText="Select Professional"
          onPress={() =>
            navigation.navigate("Select Professional Business", {
              titleProfessional: "Select Professional",
              servicesSelected: servicesSelected,
              appointmentDetails: servicesSelected,
              businessID: businessID,
              ...route.params,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F5EE",
    paddingLeft: 16,
    paddingRight: 16,
  },
  arrow: {
    paddingRight: 15,
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 16,
  },
  servicesContainer: {
    marginTop: 20,
    marginBottom: 16,
    alignContent: "center",
  },
  titleContainer: { marginBottom: 13 },
  servicesCard: {
    marginBottom: 16,
    width: "100%",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    width: "86%",
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 30,
  },
});

export default SelectServicesBusiness;
