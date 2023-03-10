import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NormalText from "../../components/NormalText/NormalText";
import { Heading3 } from "../../components/NormalText/FontTypes";
import { ArrowLeftBig } from "../../components/IconsComponent/IconsComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const SelectServicesBusiness = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  return (
    <>
      <View style={styles.container}>
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

      <>
        <NormalText />
      </>

      <ButtonComponent
        buttonText="Select Professional"
        onPress={() =>
          navigation.navigate("Select Professional Business", {
            title: "Select Professional",
          })
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    paddingRight: 15,
  },
});

export default SelectServicesBusiness;
