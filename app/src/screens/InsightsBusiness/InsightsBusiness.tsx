import React from "react";
import { View } from "react-native";
import { Heading3 } from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";
import TabViewComponent from "../../components/TabViewComponent/TabViewComponent";
import GeneralInsights from "./GeneralInsights";

const InsightsBusiness = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#F9F5EE" }}>
      <View style={{ margin: 6 }}>
        <NormalText
          normalText="Insights"
          fontType={Heading3}
          textAlign="left"
        />
      </View>
      <TabViewComponent
        routes={[
          {
            key: "first",
            title: "Day",
            Component: () => <GeneralInsights insightsType="day" />,
          },
          {
            key: "second",
            title: "Week",
            Component: () => <GeneralInsights insightsType="week" />,
          },
          {
            key: "third",
            title: "Month",
            Component: () => <GeneralInsights insightsType="month" />,
          },
          {
            key: "forth",
            title: "Year",
            Component: () => <GeneralInsights insightsType="year" />,
          },
        ]}
      />
    </View>
  );
};

export default InsightsBusiness;
