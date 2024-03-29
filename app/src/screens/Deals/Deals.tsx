import { View } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { createAxiosClient } from "../../api";
import Card from "../../components/Card/Card";
import {
  Heading1,
  Heading1Bold,
  Heading3,
  Heading4,
} from "../../components/NormalText/FontTypes";
import NormalText from "../../components/NormalText/NormalText";

const Deals = () => {
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
    console.log(data);
    setDeals(data);
  };

  useEffect(() => {
    getDeals();
  }, []);

  return (
    <View style={styles.container}>
      <NormalText
        normalText="Deals"
        textAlign="left"
        marginBottom={20}
        marginTop={35}
        marginLeft={10}
        fontType={Heading3}
      />

      {deals?.map((deal, i) => (
        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
          <Card
            width="100%"
            height={100}
            justifyContent="space-between"
            flexDirection="row"
            key={i}
            onPress={() => alert("Apply Fn")}
          >
            <View>
              <NormalText
                textAlign="left"
                normalText={`${deal.price}% OFF`}
                fontType={Heading1Bold}
                textColor="#822848"
                marginBottom={10}
              />
              <NormalText
                textAlign="left"
                normalText={`Salon: ${deal.business.businessName}`}
              />
            </View>
            <View style={styles.discountCode}>
              <NormalText
                textAlign="left"
                textColor="white"
                normalText={`EASY${deal.price}`}
                fontType={Heading1}
              />
            </View>
          </Card>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: "#F9F5EE",
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

export default Deals;
