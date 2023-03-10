import { useNavigation } from "@react-navigation/native";
import React from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Heading3 } from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";

const HomeBusiness = () => {
  const navigation = useNavigation<any>();

  return (
    <>
      <NormalText
        normalText="Home Business Screen"
        fontType={Heading3}
        textAlign="left"
      />
      <ButtonComponent buttonText="Create New Appointment" onPress={() =>
            navigation.navigate("Create Appointment Business", { title: "Create Appointment" })
          } />
    </>
  );
};

export default HomeBusiness;
