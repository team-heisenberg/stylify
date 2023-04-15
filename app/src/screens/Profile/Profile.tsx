import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../../../firebase";
import { Heading3 } from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";
import TableComponent from "../../components/TableComponent/TableComponent";
import { View } from "native-base";

const Profile = () => {
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
    // {
    //   profile: (
    //     <TouchableOpacity
    //       onPress={() =>
    //         navigation.navigate("Client Profile", { title: "User Name" })
    //       }
    //     >
    //       <NormalText normalText="User Name" />
    //     </TouchableOpacity>
    //   ),
    // },
    // {
    //   profile: (
    //     <TouchableOpacity
    //       onPress={() =>
    //         navigation.navigate("Client Appointments", {
    //           title: "Appointments",
    //         })
    //       }
    //     >
    //       <NormalText normalText="Appointments" />
    //     </TouchableOpacity>
    //   ),
    // },
    // {
    //   profile: (
    //     <TouchableOpacity
    //       onPress={() =>
    //         navigation.navigate("Client Favourites", {
    //           title: "Favourite Salons",
    //         })
    //       }
    //     >
    //       <NormalText normalText="Favourite Salons" />
    //     </TouchableOpacity>
    //   ),
    // },
    // {
    //   profile: (
    //     <TouchableOpacity
    //       onPress={() =>
    //         navigation.navigate("Client Settings", { title: "Settings" })
    //       }
    //     >
    //       <NormalText normalText="Settings" />
    //     </TouchableOpacity>
    //   ),
    // },
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
      <View style={{ padding: 6 }}>
        <NormalText
          normalText="Profile"
          fontType={Heading3}
          textAlign="left"
          marginBottom={-30}
          marginTop={35}
          marginLeft={10}
        />
      </View>
      <TableComponent
        numColumns={1}
        numRows={4}
        tableHeader={tableHeader}
        tableData={tableData}
      ></TableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F5EE",
  },
});

export default Profile;
