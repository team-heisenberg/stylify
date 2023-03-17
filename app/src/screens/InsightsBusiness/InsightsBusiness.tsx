import React from "react";
import { View } from "react-native";
import Card from "../../components/Card/Card";
import {
  captions,
  Heading3,
  Heading4,
  Heading5,
} from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";
import TableComponent from "../../components/TableComponent/TableComponent";

const InsightsBusiness = () => {
  return (
    <>
      <NormalText normalText="Insights" fontType={Heading3} textAlign="left" />
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
    </>
  );
};

export default InsightsBusiness;
