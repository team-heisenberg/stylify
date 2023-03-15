import axios from "axios";
import { StyleSheet, View, FlatList } from "react-native";
import React, { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import NormalText from "../NormalText/NormalText";
import SearchListItem from "./SearchListItem";
import { createAxiosClient } from "../../api";

const SearchComponent = () => {
  const [value, setValue] = useState("");
  const [serviceName, setServiceName] = useState([]);
  const [filteredBusiness, setFilteredBusiness] = useState([]);

  // Search for services
  const searchService = async (value) => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get("/service")
      .then((res) => {
        const service = res.data.filter((a) => {
          return a.serviceName.toLowerCase().includes(value.toLowerCase());
        });
        const unique = service
          .map((item) => item.serviceName)
          .filter((value, index, self) => self.indexOf(value) === index);

        console.log(unique);
        setServiceName(unique);
      })
      .catch((error) => {
        console.log(JSON.stringify(error))
      });
  };

  // Search for businesses
  const searchBusiness = async (value) => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get("/service")
      .then((res) => {
        console.log(res);
        setFilteredBusiness(res.data);
      })
      .catch((error) => {
        console.log(error), setFilteredBusiness([]);
      });
  };

  const handleChange = (value) => {
    setValue(value);
    searchService(value);
    searchBusiness(value);
  };

  return (
    <>
      <InputComponent
        value={value}
        onChangeText={handleChange}
        inputLabel="Search"
      />
      {value && (
        <View style={styles.list}>
          <NormalText
            normalText={`Search services and businesses for ${value}`}
          />
          <View>
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
    </>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#F9F5EE",
    position: "absolute",
    top: 70,
    bottom: -550,
    right: -60,
    left: -60,
    zIndex: 100,
  },
});
