import { View, TouchableOpacity, StyleSheet, Touchable } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import { Heading3, Heading5 } from "../../components/NormalText/FontTypes";
import {
  ArrowLeftBig,
  Plus,
} from "../../components/IconsComponent/IconsComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CardSalon from "../../components/CardSalon/CardSalon";
import Card from "../../components/Card/Card";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import { createAxiosClient } from "../../api";
import { Row } from "native-base";
import { background } from "native-base/lib/typescript/theme/styled-system";

const SelectServicesBusiness = ({ businessID }: any) => {
  const serviceType: any = [];

  const searchService = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(`/serviceType/servicetypebybusiness/${businessID}`)
      .then((res) => {
        for (const service of res.data) {
          serviceType.push(service["serviceType"]);
        }
      })
      .catch((error) => {
        console.log("THIS IS THE ERROR >>>>", error);
      });
  };

  searchService();

  console.log(businessID);

  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const services = [
    {
      id: 1,
      name: "Men's Haircut",
      duration: "45min",
      price: "27.50",
    },
    {
      id: 2,
      name: "Men's Haircolor",
      duration: "60min",
      price: "49.50",
    },
    {
      id: 3,
      name: "Kid's Haircut",
      duration: "30min",
      price: "25.50",
    },
  ];

  // const [services, setServices] = useState({
  //   services: [
  //     {
  //       id: 1,
  //       name: "Men's Haircut",
  //       duration: "45min",
  //       price: "27.50",
  //     },
  //     {
  //       id: 2,
  //       name: "Men's Haircolor",
  //       duration: "60min",
  //       price: "49.50",
  //     },
  //     {
  //       id: 3,
  //       name: "Kid's Haircut",
  //       duration: "30min",
  //       price: "25.50",
  //     },
  //   ],
  // });

  const [servicesSelected, setServicesSelected] = useState<
    {
      name: string;
      price: number;
    }[]
  >([]);
  console.log(servicesSelected);

  const addService = (selectedService: any) => {
    setServicesSelected((servicesSelected) => [
      ...servicesSelected,
      selectedService,
    ]);
  };

  return (
    <View style={styles.container}>
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
          <NormalText normalText="Hair" textAlign="left" fontType={Heading5} />
        </View>
        {services.map((service) => (
          <View style={styles.servicesCard}>
            <Card>
              <View style={styles.cardContentContainer}>
                <View style={styles.imageTextContaienr}>
                  <ImageComponent
                    height={69}
                    width={69}
                    borderRadius={4}
                    imageURL={"https://picsum.photos/200/300"}
                  />
                  <View>
                    <NormalText
                      normalText={service.name}
                      textColor="rgba(130, 40, 72, 1)"
                    />
                    <View style={{ flexDirection: "row" }}>
                      <NormalText normalText={service.duration} />
                      <NormalText
                        normalText="•"
                        textColor="rgba(130, 40, 72, 1)"
                      />
                      <NormalText normalText={`${service.price}`} />
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  key={service.id}
                  onPress={() => addService(service)}
                  style={styles.cardIcon}
                >
                  <Plus fill="white" />
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        ))}
      </View>

      <View style={styles.button}>
        <ButtonComponent
          buttonText="Select Professional"
          onPress={() =>
            navigation.navigate("Select Professional Business", {
              titleProfessional: "Select Professional",
              // serviceName: services[0].name,
              // servicePrice: services[0].price,
              servicesSelected: servicesSelected,
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
    width: "110%",
  },
  cardContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    // backgroundColor: "green",
    alignItems: "center",
  },
  imageTextContaienr: { flexDirection: "row", gap: 7, alignItems: "center" },
  cardIcon: {
    backgroundColor: "#105535",
    padding: 12,
    borderRadius: 50,
    // marginLeft: 150,
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 29,
    marginRight: 29,
    marginBottom: 24,
  },
});

export default SelectServicesBusiness;
