import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import InputCheck from "../../components/InputCheck/InputCheck";
import NormalText from "../../components/NormalText/NormalText";
import { Heading1 } from "../../components/NormalText/FontTypes";
import Radio from "../../components/Radio/Radio";
import InputComponent from "../../components/InputComponent/InputComponent";
import TableComponent from "../../components/TableComponent/TableComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Card from "../../components/Card/Card";

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

  return (
    <View>
      <Text>Test from StoryBoard</Text>
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
      /> */}
      <InputComponent
        inputLabel="Input label"
        showText={true}
        error={false}
        labelBgColor="white"
        inputBgColor="white"
      />
      <ButtonComponent buttonText="Button" />
      <Card>
        <ImageComponent
          imageURL="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2811&q=80"
          width={69}
          height={69}
        />
        <NormalText normalText="Haircut" />
      </Card>
    </View>
  );
};

export default StoryBoard;
