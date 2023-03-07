import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Card from "../Card/Card";
import NormalText from "../NormalText/NormalText";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { BodyBold } from "../NormalText/FontTypes";

const Message = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Card flexDirection="column">
            <NormalText normalText="Message" fontType={BodyBold} />
            <ButtonComponent
              buttonText="Close"
              width={164}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </Card>
        </View>
      </Modal>
      <ButtonComponent
        buttonText="Show Message"
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});

export default Message;
