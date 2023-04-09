import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowLeftBig } from "../IconsComponent/IconsComponent";
import NormalText from "../NormalText/NormalText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Heading3, Heading5 } from "../NormalText/FontTypes";
import { FlatList } from "native-base";
import SearchResultListItem from "./SearchResultListItem";
import { createAxiosClient } from "../../api";

interface BusinessInterface {
  businessId: string;
  businessName: string;
  location: string;
}

const SearchResult = () => {
  const [business, setBusiness] = useState<BusinessInterface[]>([]);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const searchBusiness = async (searchTerm: any) => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(`/search?q=${searchTerm}`)
      .then((res) => {
        setBusiness(res.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        setBusiness([]);
      });
  };

  useEffect(() => {
    searchBusiness(route.params.title);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeftBig width={24} height={17.54} fill="black" />
        </TouchableOpacity>
        <NormalText normalText={route.params.pageTitle} fontType={Heading3} />
      </View>
      <View style={styles.resultText}>
        <NormalText
          normalText={`${business.length} results for ${route.params.title}`}
          fontType={Heading5}
          textAlign="left"
        />
        <FlatList
          data={business}
          renderItem={({ item }) => (
            <SearchResultListItem
              businessId={item.businessId}
              businessName={item.businessName}
              location={item.location}
            />
          )}
          keyExtractor={(item) => item.businessId}
        />
      </View>
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#F9F5EE"
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  resultText: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
