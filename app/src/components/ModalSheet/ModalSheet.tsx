import { StyleSheet, Text, View } from "react-native";
import { Actionsheet, Button, useDisclose } from "native-base";
import React from "react";
import NormalText from "../NormalText/NormalText";
import { Heading4 } from "../NormalText/FontTypes";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

interface ModalSheetInterface {
  professionalName: string;
}

const ModalSheet = ({ professionalName }: ModalSheetInterface) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const selectProfessionalHandler = () => {};
  const viewPortfolioHandler = () => {};

  return (
    <>
      <Button onPress={onOpen}>Actionsheet</Button>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <View style={{ width: "90%", gap: 20 }}>
            <NormalText
              normalText={professionalName}
              fontType={Heading4}
              textAlign="left"
            />
            <View style={{ width: "90%", alignSelf: "center" }}>
              <ButtonComponent
                buttonText="Select Professional"
                onPress={selectProfessionalHandler}
              />
              <ButtonComponent
                buttonText="View Portfolio"
                backgroundColor="#F9F5EE"
                textColor="#24313A"
                onPress={viewPortfolioHandler}
              />
            </View>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default ModalSheet;

const styles = StyleSheet.create({});
