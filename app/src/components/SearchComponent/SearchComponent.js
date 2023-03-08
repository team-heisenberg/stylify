import axios from "axios";
import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";

const SearchComponent = () => {
  const [value, setValue] = useState("");

  const service = async () => {
    await axios
      .get("http://localhost:8080/search?q=hair")
      .then((res) => {
        console.log(res.data);
        // res.data.map((data) => {
        //   console.log(data.businessID);
        // });
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (text) => {
    setValue(text);

    service();

    //search for services
    // const filteredServices = () => {};
  };

  return (
    <View>
      <InputComponent
        value={value}
        onChangeText={handleChange}
        inputLabel="Search"
      />
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({});
