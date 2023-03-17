import { ScrollView } from "native-base";
import React from "react";
import { ScrollViewBase, View } from "react-native";
import { Heading3 } from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";
import TabViewComponent from "../../components/TabViewComponent/TabViewComponent";
import GeneralInsights from "./GeneralInsights";

const InsightsBusiness = () => {
  return (
    <>
      <NormalText normalText="Insights" fontType={Heading3} textAlign="left" />
        <TabViewComponent
          routes={[
            { key: "first", title: "Day", Component: GeneralInsights },
            { key: "second", title: "Week", Component: GeneralInsights },
            { key: "second", title: "Month", Component: GeneralInsights },
            { key: "second", title: "Year", Component: GeneralInsights },
          ]}
        />
    </>
  );
};

export default InsightsBusiness;
