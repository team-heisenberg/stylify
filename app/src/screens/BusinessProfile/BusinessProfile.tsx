import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { View } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../../../firebase";
import { ArrowLeftBig } from "../../components/IconsComponent/IconsComponent";
import { Heading3 } from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";
import TableComponent from "../../components/TableComponent/TableComponent";

const BusinessProfile = () => {
  const navigation = useNavigation<any>();

  const tableHeader = [{ title: "", property: "profile" }];

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  const tableData = [
    {
      profile: (
        <TouchableOpacity onPress={handleSignOut}>
          <NormalText normalText="Sign Out" />
        </TouchableOpacity>
      ),
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeftBig width={24} height={17.54} fill="black" />
        </TouchableOpacity>
        <NormalText normalText="Profile" fontType={Heading3} textAlign="left" />
      </View>
      <TableComponent
        numColumns={1}
        numRows={1}
        tableHeader={tableHeader}
        tableData={tableData}
      ></TableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8
  },
  arrow: {
    paddingRight: 15,
  },
});

export default BusinessProfile;
