import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import NormalText from "../../components/NormalText/NormalText";
import TableComponent from "../../components/TableComponent/TableComponent";
import {
  captions,
  Heading4,
  Heading5,
} from "../../components/NormalText/FontTypes";
import { Link } from "@react-navigation/native";
import PieChartContainer from "../../containers/PieChartContainer/PieChartContainer";
import { ScrollView } from "native-base";
import { createAxiosClient } from "../../api";

const GeneralInsights = () => {
  const [business, setBusiness] = useState("");

  const getInsights = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get("/business/1")
      .then((res) => {
        console.log(res.data);
        setBusiness(res.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  useEffect(() => {
    getInsights();
  });

  return (
    <ScrollView>
      <Card flexDirection="column">
        <View>
          <NormalText normalText="Monthly Earnings" fontType={Heading5} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <NormalText normalText="$80,560" fontType={Heading4} />
          <NormalText
            normalText="↓10% from last month"
            fontType={captions}
            textColor="#822848"
          />
        </View>
      </Card>
      <TableComponent
        numColumns={2}
        numRows={3}
        tableHeader={[
          { title: "Top 3 Peofessionals", property: "professional" },
          { title: "Sale", property: "sale" },
        ]}
        tableData={[
          {
            professional: "John",
            sale: "$400",
          },
          {
            professional: "Clark",
            sale: "$350",
          },
          {
            professional: "Bary",
            sale: "$300",
          },
        ]}
        headerBackgroundColor="#822848"
        headerTextColor="white"
      />
      <View>
        <Link to={{ screen: "Profile", params: { id: "jane" } }}>
          <NormalText
            normalText="View All"
            borderBottomWidth={2}
            borderBottomColor="#24313A"
          />
        </Link>
      </View>
      <PieChartContainer onlineAmount={20} callAmount={30} walkinAmount={50} />
      <View>
        <NormalText normalText="Ratings" />
        <Card />
      </View>
    </ScrollView>
  );
};

export default GeneralInsights;

const styles = StyleSheet.create({});
