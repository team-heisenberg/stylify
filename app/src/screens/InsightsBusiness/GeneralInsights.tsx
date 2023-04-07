import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import NormalText from "../../components/NormalText/NormalText";
import TableComponent from "../../components/TableComponent/TableComponent";
import {
  captions,
  Heading4,
  Heading5,
} from "../../components/NormalText/FontTypes";
import { createAxiosClient } from "../../api";
import Reviews from "./Reviews";
import AppointmentsInsights from "./AppointmentsInsights";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GeneralInsightsInterface {
  insightsType: "day" | "week" | "month" | "year";
}

const GeneralInsights = ({ insightsType }: GeneralInsightsInterface) => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [lastEarnings, setLastEarnings] = useState(0);
  const [topProfessionals, setTopProfessionals] = useState([]);
  const [showProfessionals, setShowProfessionals] = useState(false);

  let today = new Date();
  let date = new Date(today);
  let currentYear = new Date().getFullYear();
  let initialDate: any;
  let finalDate: any;
  let initialDateForLastEarnings: any;
  let finalDateForLastEarnings: any;
  let EarningsType;
  let EarningsPercentage;
  let EarningsPercentageType;

  if (insightsType === "day") {
    EarningsType = "Daily";
    EarningsPercentageType = "yesterday";
    initialDate = today.toLocaleDateString("en-CA");
    finalDate = today.toLocaleDateString("en-CA");
    date.setDate(date.getDate() - 2);
    initialDateForLastEarnings = date.toISOString().substring(0, 10);
    finalDateForLastEarnings = date.toISOString().substring(0, 10);
  } else if (insightsType === "week") {
    EarningsType = "Weekly";
    EarningsPercentageType = "last week";
    let first = today.getDate() - today.getDay();
    let last = first + 6;
    initialDate = new Date(today.setDate(first)).toISOString().substring(0, 10);
    finalDate = new Date(today.setDate(last)).toISOString().substring(0, 10);
    date.setDate(date.getDate() - 7);
    let firstForLastWeek = date.getDate() - date.getDay();
    let lastForLastWeek = firstForLastWeek + 6;
    initialDateForLastEarnings = new Date(date.setDate(firstForLastWeek))
      .toISOString()
      .substring(0, 10);
    finalDateForLastEarnings = new Date(date.setDate(lastForLastWeek))
      .toISOString()
      .substring(0, 10);
  } else if (insightsType === "month") {
    EarningsType = "Monthly";
    EarningsPercentageType = "last month";
    initialDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    ).toLocaleDateString("en-CA");
    finalDate = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).toLocaleDateString("en-CA");
    initialDateForLastEarnings = new Date(
      today.getFullYear() - (today.getMonth() > 0 ? 0 : 1),
      (today.getMonth() - 1 + 12) % 12,
      1
    ).toLocaleDateString("en-CA");
    finalDateForLastEarnings = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).toLocaleDateString("en-CA");
  } else if (insightsType === "year") {
    EarningsType = "Yearly";
    EarningsPercentageType = "last year";
    initialDate = new Date(new Date().getFullYear(), 0, 1).toLocaleDateString(
      "en-CA"
    );
    finalDate = new Date(new Date().getFullYear(), 11, 31).toLocaleDateString(
      "en-CA"
    );
    initialDateForLastEarnings = new Date(
      currentYear - 1,
      0,
      1
    ).toLocaleDateString("en-CA");
    finalDateForLastEarnings = new Date(
      currentYear - 1,
      11,
      31
    ).toLocaleDateString("en-CA");
  }

  // Earnings Percentage
  if (totalEarnings != 0 && lastEarnings != 0) {
    let percentage = (totalEarnings / lastEarnings - 1) * 100;
    let rounded = Math.round(percentage * 10) / 10;
    if (totalEarnings >= lastEarnings) {
      EarningsPercentage = `↑ ${rounded}% from ${EarningsPercentageType}`;
    } else if (totalEarnings < lastEarnings) {
      EarningsPercentage = `↓ ${rounded}% from ${EarningsPercentageType}`;
    }
  }

  // Get Total Earnings
  const getTotalEarnings = async (businessID: number | string) => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(
        `/insights/?initialDate=${initialDate}&finalDate=${finalDate}&businessID=${businessID}`
      )
      .then((res) => {
        if (res.data.Total != null) {
          setTotalEarnings(res.data.Total);
        }
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  // Get Last Earnings
  const getLastEarnings = async (businessID: string | number) => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(
        `/insights/?initialDate=${initialDateForLastEarnings}&finalDate=${finalDateForLastEarnings}&businessID=${businessID}`
      )
      .then((res) => {
        if (res.data.Total != null) {
          setLastEarnings(res.data.Total);
        }
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  // Get Top Professionals
  const getTopProfessionals = async (businessID: string | number) => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(
        `/insights/byProfessional/?initialDate=${initialDate}&finalDate=${finalDate}&businessID=${businessID}`
      )
      .then((res) => {
        setTopProfessionals(res.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  // Show Professionals Function
  const showAllProfessionals = () => {
    setShowProfessionals(true);
  };
  const showLessProfessionals = () => {
    setShowProfessionals(false);
  };

  useEffect(() => {
    (async () => {
      const rawUserData = await AsyncStorage.getItem("@stylify:user");
      const userData = JSON.parse(rawUserData || "{}");
      getTotalEarnings(userData?.ID);
      getLastEarnings(userData?.ID);
      getTopProfessionals(userData?.ID);
    })();
  }, []);

  return (
    <ScrollView style={{ marginTop: 5 }}>
      <View style={{ margin: 20 }}>
        <Card
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="space-around"
          width="99%"
          marginBottom={25}
        >
          <View>
            <NormalText
              normalText={`${EarningsType} Earnings`}
              fontType={Heading5}
            />
          </View>
          <View style={styles.cardViewStyles}>
            <NormalText normalText={`$${totalEarnings}`} fontType={Heading4} />
            <NormalText
              normalText={EarningsPercentage}
              fontType={captions}
              textColor="#822848"
              fontWeight="bold"
            />
          </View>
        </Card>
        <TableComponent
          tableHeader={[
            { title: "Top Peofessionals", property: "professional" },
            { title: "Sale", property: "sale" },
          ]}
          tableData={
            !showProfessionals
              ? topProfessionals.slice(0, 3).map((pro: any) => ({
                  professional: `${pro.firstName} ${pro.lastName}`,
                  sale: pro.Total,
                }))
              : topProfessionals.map((pro: any) => ({
                  professional: `${pro.firstName} ${pro.lastName}`,
                  sale: pro.Total,
                }))
          }
          headerBackgroundColor="#822848"
          headerTextColor="white"
          tableCellStyles={[
            {
              index: 1,
              alignItems: "flex-end",
              borderLeftWidthForHeader: 0.2,
              borderLeftColorForHeader: "white",
            },
          ]}
        />
        <View style={styles.viewAllText}>
          {!showProfessionals ? (
            <TouchableOpacity
              style={{ borderBottomWidth: 1, borderColor: "#24313A" }}
              onPress={showAllProfessionals}
            >
              <NormalText normalText="View All" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ borderBottomWidth: 1, borderColor: "#24313A" }}
              onPress={showLessProfessionals}
            >
              <NormalText normalText="View Less" />
            </TouchableOpacity>
          )}
        </View>
        <AppointmentsInsights initialDate={initialDate} finalDate={finalDate} />
      </View>
      <View style={styles.divider} />
      <Reviews />
    </ScrollView>
  );
};

export default GeneralInsights;

const styles = StyleSheet.create({
  cardViewStyles: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  viewAllText: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 20,
    marginTop: 10,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: "#718096",
  },
});
