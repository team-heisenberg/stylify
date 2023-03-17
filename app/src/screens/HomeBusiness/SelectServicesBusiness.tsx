import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import {
  Heading3,
  Heading5,
} from "../../components/NormalText/FontTypes";
import {
  ArrowLeftBig,
  Plus,
} from "../../components/IconsComponent/IconsComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CardSalon from "../../components/CardSalon/CardSalon";
import Card from "../../components/Card/Card";
import ImageComponent from "../../components/ImageComponent/ImageComponent";

const SelectServicesBusiness = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

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
        <NormalText normalText={route.params.title} fontType={Heading3} />
      </View>

      <View style={styles.servicesContainer}>
        <NormalText
          normalText="Hair cuts"
          textAlign="left"
          fontType={Heading5}
        />
        <View style={styles.servicesCard}>
          <Card>
            <ImageComponent height={69} width={69} borderRadius={4} />
            <View>
              <NormalText
                normalText="Men's Haircut"
                textColor="rgba(130, 40, 72, 1)"
              />
              <View style={{ flexDirection: "row" }}>
                <NormalText normalText="45min" />
                <NormalText normalText="•" textColor="rgba(130, 40, 72, 1)" />
                <NormalText normalText="$27.50" />
              </View>
            </View>
            <View style={styles.cardIcon}>
              <Plus fill="white" />
            </View>
          </Card>
        </View>
        <View style={styles.servicesCard}>
          <Card>
            <ImageComponent height={69} width={69} borderRadius={4} />
            <View>
              <NormalText
                normalText="Men's Haircut"
                textColor="rgba(130, 40, 72, 1)"
              />
              <View style={{ flexDirection: "row" }}>
                <NormalText normalText="45min" />
                <NormalText normalText="•" textColor="rgba(130, 40, 72, 1)" />
                <NormalText normalText="$27.50" />
              </View>
            </View>
            <View style={styles.cardIcon}>
              <Plus fill="white" />
            </View>
          </Card>
        </View>
        <View style={styles.servicesCard}>
          <Card>
            <ImageComponent height={69} width={69} borderRadius={4} />
            <View>
              <NormalText
                normalText="Men's Haircut"
                textColor="rgba(130, 40, 72, 1)"
              />
              <View style={{ flexDirection: "row" }}>
                <NormalText normalText="45min" />
                <NormalText normalText="•" textColor="rgba(130, 40, 72, 1)" />
                <NormalText normalText="$27.50" />
              </View>
            </View>
            <View style={styles.cardIcon}>
              <Plus fill="white" />
            </View>
          </Card>
        </View>
      </View>

      <View style={styles.button}>
        <ButtonComponent
          buttonText="Select Professional"
          onPress={() =>
            navigation.navigate("Select Professional Business", {
              title: "Select Professional",
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
    marginLeft: 16,
    marginRight: 16,
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
  servicesContainer: { marginTop: 20, marginBottom: 16 },
  servicesCard: { marginBottom: 16 },
  cardIcon: {
    backgroundColor: "#105535",
    padding: 12,
    borderRadius: 50,
    marginLeft: 120,
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
