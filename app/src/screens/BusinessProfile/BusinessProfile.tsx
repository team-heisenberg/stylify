import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React from "react";
import { TouchableOpacity } from "react-native";
import { auth } from "../../../firebase";
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
    <>
      <NormalText normalText="Profile" fontType={Heading3} textAlign="left" />
      <TableComponent
        numColumns={1}
        numRows={1}
        tableHeader={tableHeader}
        tableData={tableData}
      ></TableComponent>
    </>
  );
};

export default BusinessProfile;
