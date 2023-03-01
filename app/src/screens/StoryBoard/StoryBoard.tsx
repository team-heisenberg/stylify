import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import InputCheck from "../../components/InputCheck/InputCheck";
import NormalText from "../../components/NormalText/NormalText";
import { Heading1 } from "../../components/NormalText/FontTypes";
import Radio from "../../components/Radio/Radio";
import TableComponent from "../../components/TableComponent/TableComponent";
import Dropdown from "../../components/Dropdown/Dropdown";
import { ArrowLeft, Edit, ThreeDots } from "../../components/IconsComponent/IconsComponent";
import React from "react";
import InputComponent from "../../components/InputComponent/InputComponent";

const StoryBoard = () => {
  const [checked, setChecked] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");
  const handleRadioPress = (value: string) => {
    setSelectedValue(value);
  };
  const options = ["Option 1", "Option 2", "Option 3"];

  const tableHeader = [
    { title: "Name", property: "name" },
    { title: "Nationality", property: "nationality" },
  ];
  const tableData = [
    {
      name: "Diego",
      nationality: "Chilean",
    },
  ];

  const handleSelect = (item: { label: string; value: string }) => {
    console.log("Selected item:", item);
  };

  const dataDropdown = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  return (
    <View>
      <Text>Test from StoryBoard</Text>
      <ArrowLeft width={50} height={50} fill="red" />
      <Edit width={50} height={50} fill="red" />
      <ThreeDots width={50} height={50} fill="red" />
      <ImageComponent
        width={415}
        height={200}
        imageURL="https://picsum.photos/500/350"
        linearGradient={true}
        positionLinearGradient="bottom"
      />
      <Text>{String(checked)}</Text>
      <InputCheck
        normalText="Testing"
        isDisabled={false}
        isChecked={checked}
        onChange={setChecked}
      />
      <NormalText
        normalText="Text Component"
        fontType={Heading1}
        textColor="blue"
      />
      {options.map((option) => (
        <Radio
          key={option}
          radioValue={option}
          selected={selectedValue === option}
          onPress={handleRadioPress}
          radioText={option}
        />
      ))}
      <Text>{`Selected value: ${selectedValue}`}</Text>
      {/* <TableComponent
        numColumns={2}
        numRows={3}
        tableHeader={tableHeader}
        tableData={tableData}
        headerBackgroundColor="rgba(130, 40, 72, 1)"
        headerTextColor="white"
      />
      <Dropdown
        label="Select Item"
        labelTop="Label top"
        data={dataDropdown}
        onSelect={handleSelect}
      />
      /> */}
      <InputComponent
        inputLabel="Input label"
        showText={true}
        error={false}
        labelBgColor="white"
        inputBgColor="white"
      />
    </View>
  );
};

export default StoryBoard;
