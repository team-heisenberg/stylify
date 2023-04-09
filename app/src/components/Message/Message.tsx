import { Modal, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import NormalText from "../NormalText/NormalText";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { Heading3 } from "../NormalText/FontTypes";

interface MessageInterface {
  messageText: string;
  messageButtonText: string;
  buttonText: string;
}

const Message = ({
  messageText,
  messageButtonText,
  buttonText,
}: MessageInterface) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalCentered}>
          <View style={styles.modalContentsCentered}>
            <View style={styles.modalContentsContainer}>
              <NormalText normalText={messageText} fontType={Heading3} />
              <ButtonComponent
                buttonText={messageButtonText}
                containerWidth="50%"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <View style={styles.shadow}>
              <NormalText normalText={messageText} fontType={Heading3} />
              <ButtonComponent containerWidth="50%" />
            </View>
          </View>
        </View>
      </Modal>
      <ButtonComponent
        buttonText={buttonText}
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalCentered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContentsCentered: { alignItems: "center", width: "90%" },
  modalContentsContainer: {
    backgroundColor: "#FDF6E9",
    borderWidth: 2,
    borderColor: "#822848",
    borderRadius: 8,
    padding: 35,
    alignItems: "center",
    width: "90%",
    flexDirection: "column",
    gap: 30,
    zIndex: 100,
  },
  shadow: {
    backgroundColor: "#000000",
    position: "absolute",
    top: 4,
    right: 14,
    width: "90%",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 8,
    padding: 35,
    alignItems: "center",
    flexDirection: "column",
    gap: 30,
  },
});

export default Message;
