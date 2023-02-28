import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import InputCheck from "../../components/InputCheck/InputCheck";
import NormalText from "../../components/NormalText/NormalText";
import { Heading1 } from "../../components/NormalText/FontTypes";
import Radio from "../../components/Radio/Radio";
import { ArrowLeft, Edit, ThreeDots } from "../../components/IconsComponent/IconsComponent";

const StoryBoard = () => {
const [checked, setChecked] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");
  const handleRadioPress = (value: string) => {
    setSelectedValue(value);
  };
  const options = ["Option 1", "Option 2", "Option 3"];

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
      <InputCheck normalText="Testing" isDisabled={false} isChecked={checked} onChange={setChecked} />
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
        />
      ))}
      <Text>{`Selected value: ${selectedValue}`}</Text>
    </View>
  );
};

export default StoryBoard;
