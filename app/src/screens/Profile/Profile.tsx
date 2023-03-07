import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Heading3 } from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";
import TableComponent from "../../components/TableComponent/TableComponent";

const Profile = () => {
  const navigation = useNavigation<any>();

  const tableHeader = [{ title: "", property: "profile" }];
  const tableData = [
    {
      profile: (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Client Profile", { title: "User Name" })
          }
        >
          <NormalText normalText="User Name" />
        </TouchableOpacity>
      ),
    },
    {
      profile: (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Client Appointments", {
              title: "Appointments",
            })
          }
        >
          <NormalText normalText="Appointments" />
        </TouchableOpacity>
      ),
    },
    {
      profile: (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Client Favourites", {
              title: "Favourite Salons",
            })
          }
        >
          <NormalText normalText="Favourite Salons" />
        </TouchableOpacity>
      ),
    },
    {
      profile: (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Client Settings", { title: "Settings" })
          }
        >
          <NormalText normalText="Settings" />
        </TouchableOpacity>
      ),
    },
  ];
  return (
    <>
      <NormalText normalText="Profile" fontType={Heading3} textAlign="left" />
      <TableComponent
        numColumns={1}
        numRows={4}
        tableHeader={tableHeader}
        tableData={tableData}
      ></TableComponent>
    </>
  );
};

export default Profile;
