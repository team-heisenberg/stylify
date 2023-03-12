import axios from "axios";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowLeftBig } from "../IconsComponent/IconsComponent";
import NormalText from "../NormalText/NormalText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Heading3 } from "../NormalText/FontTypes";
import { FlatList } from "native-base";
import SearchResultListItem from "./SearchResultListItem";

const SearchResult = () => {
  const [business, setBusiness] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const searchBusiness = async (service) => {
    await axios
      .get(`http://localhost:8080/search?q=${service}`)
      .then((res) => {
        console.log(res.data);
        setBusiness(res.data);
      })
      .catch((error) => {
        console.log(error), setBusiness([]);
      });
  };

  useEffect(() => {
    searchBusiness(route.params.title);
  }, []);

  return (
    <View>
      <View>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeftBig width={24} height={17.54} fill="black" />
        </TouchableOpacity>
        <NormalText normalText={route.params.pageTitle} fontType={Heading3} />
      </View>
      <View>
        <NormalText
          normalText={`${business.length} results for ${route.params.title}`}
          textAlign="left"
        />
        <FlatList
          data={business}
          renderItem={({ item }) => (
            <SearchResultListItem
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

const styles = StyleSheet.create({});
