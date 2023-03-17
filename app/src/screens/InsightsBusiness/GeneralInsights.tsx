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

  useEffect(() => {
    getTotalEarnings();
    getLastEarnings();
    getTopProfessionals();
    getReviews();
  }, []);

  console.log(reviews);

  return (
    <ScrollView>
      <Card flexDirection="column">
        <View>
          <NormalText
            normalText={`${EarningsType} Earnings`}
            fontType={Heading5}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <NormalText normalText={`$${totalEarnings}`} fontType={Heading4} />
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
        tableData={topProfessionals.map((pro: any) => ({
          professional: `${pro.firstName} ${pro.lastName}`,
          sale: pro.Total,
        }))}
        headerBackgroundColor="#822848"
        headerTextColor="white"
      />
      <View>
        <Link
          to={{
            screen: "Top Professionals Details",
            params: { professionals: topProfessionals },
          }}
        >
          <NormalText
            normalText="View All"
            borderBottomWidth={2}
            borderBottomColor="#24313A"
          />
        </Link>
      </View>
      <PieChartContainer onlineAmount={3} callAmount={3} walkinAmount={1} />

      <NormalText normalText="Ratings" fontType={Heading5} textAlign="left" />
      {reviews.map((review) => {
        <Card>
          <ImageComponent />
          <NormalText normalText="Amy Adams" />
          <NormalText normalText={review.appointmentRating} />
          <NormalText normalText={review.reviewDetails} />
        </Card>;
      })}
      <Card justifyContent="space-between">
        <ImageComponent
          imageURL="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2811&q=80"
          width={40}
          height={40}
          borderRadius={50}
        />
        <NormalText normalText="Amy Adams" />
        <NormalText normalText={5} />
        <NormalText normalText="good service" />
      </Card>
    </ScrollView>
  );
};

export default GeneralInsights;

const styles = StyleSheet.create({});
