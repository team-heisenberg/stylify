import { StyleSheet, View, FlatList } from "react-native";
import React, { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import NormalText from "../NormalText/NormalText";
import SearchListItem from "./SearchListItem";
import { createAxiosClient } from "../../api";

interface BusinessInterface {
  businessID: string;
  businessName: string;
}

const SearchComponent = () => {
  const [value, setValue] = useState("");
  const [serviceName, setServiceName] = useState([]);
  const [filteredBusiness, setFilteredBusiness] = useState<BusinessInterface[]>(
    []
  );

  // Search for services
  const searchService = async (value: any) => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get("/service")
      .then((res) => {
        const service = res.data.filter((a: { serviceName: string }) => {
          return a.serviceName.toLowerCase().includes(value.toLowerCase());
        });
        const unique = service
          .map((item: { serviceName: string }) => item.serviceName)
          .filter(
            (value: string, index: number, self: string) =>
              self.indexOf(value) === index
          );
        console.log("service", service);
        console.log("unique", unique);
        setServiceName(unique);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  // Search for businesses
  const searchBusiness = async (value: any) => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get("/business")
      .then((res) => {
        const business = res.data.filter((a: { businessName: string }) => {
          return a.businessName.toLowerCase().includes(value.toLowerCase());
        });
        console.log("business", business);
        setFilteredBusiness(business);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        setFilteredBusiness([]);
      });
  };

  const handleChange = (value: any) => {
    setValue(value);
    searchService(value);
    searchBusiness(value);
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: 6 }}>
        <InputComponent
          value={value}
          onChangeText={handleChange}
          inputLabel="Search"
          isSearch
        />
      </View>
      {value && (
        <View style={styles.list}>
          <NormalText
            normalText={`Search services and businesses for ${value}`}
          />
          <View style={{ backgroundColor: "#F9F5EE" }}>
            <FlatList
              data={serviceName}
              renderItem={({ item }) => (
                <SearchListItem id={item} title={item} />
              )}
              keyExtractor={(item) => item}
            />
            <FlatList
              data={filteredBusiness}
              renderItem={({ item }) => (
                <SearchListItem
                  id={item.businessID}
                  title={item.businessName}
                />
              )}
              keyExtractor={(item) => item.businessID}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  input: {
    width: "90%",
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    zIndex: 200,
  },
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: "#F9F5EE",
  },
  list: {
    backgroundColor: "#F9F5EE",
    position: "absolute",
    top: 90,
    bottom: -550,
    right: -60,
    left: -60,
    zIndex: 100,
    padding: 15,
  },
});
