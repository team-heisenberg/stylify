import { AxiosResponse } from "axios";
import { AddIcon, Fab, View } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { createAxiosClient } from "../../api";
import Card from "../../components/Card/Card";
import {
  ArrowRightBig,
  ArrowRightSmall,
  RightChevron,
} from "../../components/IconsComponent/IconsComponent";
import {
  Heading1,
  Heading2,
  Heading3,
} from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";

const BusinessDeals: React.FC<any> = ({ serviceTypeID }) => {
  const [deals, setDeals] = useState<any[]>();
  const getDeals = async () => {
    const { axiosClient } = await createAxiosClient();
    const res: any = await axiosClient
      .get("/deal")
      .catch((err) => ({ error: err }));

    const { data, error } = res;
    if (error) {
      console.error(error);
      return;
    }


    if (serviceTypeID) {
      const filteredDeals = data.filter(
        (d: any) => d.service.serviceTypeID === serviceTypeID
      );

      setDeals(filteredDeals);
    } else {
      console.log(data);
      setDeals(data);
    }
  };

  useEffect(() => {
    getDeals();
  }, []);

  return (
    <View style={styles.container}>
      {deals?.map((deal, i) => (
        <Card
          width="100%"
          height={100}
          justifyContent="space-between"
          flexDirection="row"
          key={i}
          onPress={() => alert("Edit")}
        >
          <View>
            <NormalText
              textAlign="left"
              normalText={`Get ${deal.price}% Off`}
              fontType={Heading1}
            />
            <NormalText
              textAlign="left"
              normalText={deal.business.businessName}
            />
          </View>
          <RightChevron />
        </Card>
      ))}
      <Fab
        size={60}
        backgroundColor="#24313A"
        icon={<AddIcon />}
        onPress={() => alert("Create")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },

  discountCode: {
    backgroundColor: "#822848",
    padding: 16,
    borderRadius: 6,
  },

  arrow: {
    paddingRight: 15,
  },
});

export default BusinessDeals;
