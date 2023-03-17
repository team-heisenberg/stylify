import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TableComponent from "../../components/TableComponent/TableComponent";

const topProfessionalsDetails = () => {
  // const { professionals } = route.params;
  return (
    <View>
      {/* <TableComponent
        numColumns={2}
        numRows={3}
        tableHeader={[
          { title: "Peofessionals", property: "professional" },
          { title: "Sale", property: "sale" },
        ]}
        tableData={professionals.map((pro: any) => ({
          professional: `${pro.firstName} ${pro.lastName}`,
          sale: pro.Total,
        }))}
        headerBackgroundColor="#822848"
        headerTextColor="white"
      /> */}
    </View>
  );
};

export default topProfessionalsDetails;

const styles = StyleSheet.create({});
