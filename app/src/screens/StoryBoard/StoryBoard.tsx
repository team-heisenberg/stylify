import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import InputCheck from "../../components/InputCheck/InputCheck";
import NormalText from "../../components/NormalText/NormalText";
import { Heading1 } from "../../components/NormalText/FontTypes";
import Radio from "../../components/Radio/Radio";
import InputComponent from "../../components/InputComponent/InputComponent";
import TableComponent from "../../components/TableComponent/TableComponent";
import Dropdown from "../../components/Dropdown/Dropdown";
import {
  ArrowLeft,
  Edit,
  ThreeDots,
} from "../../components/IconsComponent/IconsComponent";
import React from "react";
import PieChartContainer from "../../containers/PieChartContainer/PieChartContainer";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Card from "../../components/Card/Card";
import Message from "../../components/Message/Message";
import FavButton from "../../components/FavButton/FavButton";
import ImageButton from "../../components/ImageButton/ImageButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import TabViewExample from "../../components/TabViewComponent/TabViewComponent";
import TabViewComponent from "../../components/TabViewComponent/TabViewComponent";
// import { useNavigation } from "@react-navigation/native";

const StoryBoard: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  // const navigation = useNavigation();
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
      <FavButton />
      <ArrowLeft width={50} height={50} fill="red" />
      <Edit width={50} height={50} fill="red" />
      <ThreeDots width={50} height={50} fill="red" />
      <ImageButton
        type="edit"
        imageURL="https://picsum.photos/200/300"
        onClick={() => {
          return;
        }}
      />
      {/* <ArrowLeft fill="red" width={50} height={50} /> */}
      <ArrowLeft fill="red" width={50} height={50} />
      {/* <ImageComponent
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
      /* <TableComponent
      {/* <TableComponent
        numColumns={2}
        numRows={3}
        tableHeader={tableHeader}
        tableData={tableData}
        headerBackgroundColor="rgba(130, 40, 72, 1)"
        headerTextColor="white"
      /> */}
      <InputComponent
        inputLabel="Input label"
        showText={true}
        error={false}
        labelBgColor="white"
        inputBgColor="white"
      />

      <ButtonComponent
        buttonText="Show Top Tab Navigator"
        onPress={() => 
          navigation.navigate("TopTabNavigator")}
        //     routes: [
        //       {
        //         key: "1",
        //         title: "Tab 1",
        //       },
        //       {
        //         key: "2",
        //         title: "Tab 2",
        //       },
        //       {
        //         key: "3",
        //         title: "Tab 3",
        //       },
        //       {
        //         key: "4",
        //         title: "Tab 4",
        //       },
        //     ],
        //   });
        // }}
      />
      <Card>
        <ImageComponent
          imageURL="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2811&q=80"
          width={69}
          height={69}
        />
        <NormalText normalText="Haircut" />
      </Card>
      <Message />
      <Dropdown
        label="Select Item"
        labelTop="Label top"
        data={dataDropdown}
        onSelect={handleSelect}
      />
    </View>
  );
};

export default StoryBoard;
