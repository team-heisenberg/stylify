import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import NormalText from "../../components/NormalText/NormalText";
import TableComponent from "../../components/TableComponent/TableComponent";
import {
  captions,
  Heading4,
  Heading5,
} from "../../components/NormalText/FontTypes";
import { ScrollView } from "native-base";
import { createAxiosClient } from "../../api";
import Reviews from "./Reviews";
import AppointmentsInsights from "./AppointmentsInsights";

interface GeneralInsightsInterface {
  insightsType: "day" | "week" | "month" | "year";
}

const GeneralInsights = ({ insightsType }: GeneralInsightsInterface) => {
  const [totalEarnings, setTotalEarnings] = useState(null);
  const [lastEarnings, setLastEarnings] = useState(null);
  const [topProfessionals, setTopProfessionals] = useState([]);

  let date = new Date();
  let currentYear = new Date().getFullYear();
  let initialDate: any;
  let finalDate: any;
  let initialDateForLastEarnings: any;
  let finalDateForLastEarnings: any;
  let EarningsType;
  let EarningsPercentage;

  if (insightsType === "day") {
    EarningsType = "Daily";
    initialDate = date.toLocaleDateString("en-CA");
    finalDate = date.toLocaleDateString("en-CA");
    initialDateForLastEarnings = date.setDate(date.getDate() - 1);
    finalDateForLastEarnings = date.setDate(date.getDate() - 1);
  } else if (insightsType === "week") {
    EarningsType = "Weekly";
    initialDate = new Date(
      date.setDate(date.getDate() - date.getDay())
    ).toLocaleDateString("en-CA");
    finalDate = new Date(
      date.setDate(date.getDate() - date.getDay() + 6)
    ).toLocaleDateString("en-CA");
    initialDateForLastEarnings = new Date(
      date.setDate(date.getDate() - date.getDay() - 7)
    );
    finalDateForLastEarnings = new Date(
      date.setDate(date.getDate() - date.getDay() - 1)
    );
  } else if (insightsType === "month") {
    EarningsType = "Monthly";
    initialDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).toLocaleDateString("en-CA");
    finalDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).toLocaleDateString("en-CA");
    initialDateForLastEarnings = date.setMonth(date.getMonth() - 1, 1);
    finalDateForLastEarnings = date.setMonth(date.getMonth(), 0);
  } else if (insightsType === "year") {
    EarningsType = "Yearly";
    initialDate = new Date(new Date().getFullYear(), 0, 1).toLocaleDateString(
      "en-CA"
    );
    finalDate = new Date(new Date().getFullYear(), 11, 31).toLocaleDateString(
      "en-CA"
    );
    initialDateForLastEarnings = new Date(currentYear - 1, 0, 1);
    finalDateForLastEarnings = new Date(currentYear - 1, 11, 31);
  }

  // Calculate Earnings Percentage
  if (totalEarnings && lastEarnings) {
    let percentage = (totalEarnings / lastEarnings - 1) * 100;
    if (totalEarnings >= lastEarnings) {
      EarningsPercentage = `↑ ${percentage}%`;
    } else if (totalEarnings < lastEarnings) {
      EarningsPercentage = `↓ ${percentage}%`;
    }
  }

  console.log(initialDate);

  // Get Total Earnings
  const getTotalEarnings = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(
        `/insights/?initialDate=${initialDate}&finalDate=${finalDate}&businessID=1`
      )
      .then((res) => {
        setTotalEarnings(res.data.Total);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  // Get Last Earnings
  const getLastEarnings = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(
        `/insights/?initialDate=${initialDateForLastEarnings}&finalDate=${finalDateForLastEarnings}&businessID=1`
      )
      .then((res) => {
        setLastEarnings(res.data.Total);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  // Get Top Professionals
  const getTopProfessionals = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(
        `/insights/byProfessional/?initialDate=${initialDate}&finalDate=${finalDate}&businessID=1`
      )
      .then((res) => {
        setTopProfessionals(res.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  // Show Professionals Function
  const showAllProfessionals = () => {};

  useEffect(() => {
    getTotalEarnings();
    getLastEarnings();
    getTopProfessionals();
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
              normalText={`${EarningsPercentage} from last ${insightsType}`}
              fontType={captions}
              textColor="#822848"
              fontWeight="bold"
            />
          </View>
        </Card>
        <TableComponent
          numColumns={2}
          numRows={3}
          tableHeader={[
            { title: "Top Peofessionals", property: "professional" },
            { title: "Sale", property: "sale" },
          ]}
          tableData={topProfessionals.map((pro: any) => ({
            professional: `${pro.firstName} ${pro.lastName}`,
            sale: pro.Total,
          }))}
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
          <TouchableOpacity
            style={{ borderBottomWidth: 1, borderColor: "#24313A" }}
            onPress={showAllProfessionals}
          >
            <NormalText normalText="View All" />
          </TouchableOpacity>
        </View>
        <AppointmentsInsights />
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
