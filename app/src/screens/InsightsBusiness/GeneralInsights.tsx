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
import PieChartContainer from "../../containers/PieChartContainer/PieChartContainer";
import { ScrollView } from "native-base";
import { createAxiosClient } from "../../api";
import ImageComponent from "../../components/ImageComponent/ImageComponent";

interface GeneralInsightsInterface {
  insightsType: "day" | "week" | "month" | "year";
}

interface ReviewInterface {
  appointmentRating: number;
  reviewDetails: string;
}

const GeneralInsights = ({ insightsType }: GeneralInsightsInterface) => {
  const [totalEarnings, setTotalEarnings] = useState("");
  const [lastEarnings, setLastEarnings] = useState("");
  const [topProfessionals, setTopProfessionals] = useState([]);
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);

  let initialDate;
  let finalDate;
  let initialDateForLastEarnings;
  let finalDateForLastEarnings;
  let EarningsType;

  if (insightsType === "day") {
    EarningsType = "Daily";
  } else if (insightsType === "week") {
    EarningsType = "Weekly";
  } else if (insightsType === "month") {
    EarningsType = "Monthly";
  } else if (insightsType === "year") {
    EarningsType = "Yearly";
  }

  // Get Total Earnings
  const getTotalEarnings = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(
        "/insights/?initialDate=2023-01-11&finalDate=2023-12-11&businessID=1"
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
        "/insights/?initialDate=2023-01-11&finalDate=2023-12-11&businessID=1"
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
        "/insights/byProfessional/?initialDate=2023-01-11&finalDate=2023-12-11&businessID=1"
      )
      .then((res) => {
        setTopProfessionals(res.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  // Get Reviews
  const getReviews = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get("/review")
      .then((res) => {
        setReviews(res.data);
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
    getReviews();
  }, []);

  console.log(reviews);

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
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <NormalText normalText={`$${totalEarnings}`} fontType={Heading4} />
            <NormalText
              normalText="↓10% from last month"
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
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            marginLeft: 20,
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{ borderBottomWidth: 1, borderColor: "#24313A" }}
            onPress={showAllProfessionals}
          >
            <NormalText normalText="View All" />
          </TouchableOpacity>
        </View>
        <PieChartContainer onlineAmount={3} callAmount={3} walkinAmount={1} />
      </View>

      <View
        style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#718096" }}
      >
        <NormalText
          normalText="Ratings"
          fontType={Heading5}
          textAlign="left"
          marginTop={10}
        />
        {/* {reviews?.map((review) => {

            <Card>
              <ImageComponent />
              <NormalText normalText="Amy Adams" />
              <NormalText normalText={review.appointmentRating} />
              <NormalText normalText={review.reviewDetails} />
            </Card>

        })} */}
        <Card
          flexDirection="column"
          height={138}
          justifyContent="space-around"
          width="95%"
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ImageComponent
                imageURL="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2811&q=80"
                width={50}
                height={50}
                borderRadius={50}
              />
              <NormalText normalText="Amy Adams" marginLeft={10} />
            </View>
            <NormalText normalText={5} />
          </View>
          <View style={{ width: "100%" }}>
            <NormalText normalText="good service" textAlign="left" />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default GeneralInsights;

const styles = StyleSheet.create({});
