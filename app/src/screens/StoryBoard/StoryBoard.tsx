import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import InputCheck from "../../components/InputCheck/InputCheck";
import NormalText from "../../components/NormalText/NormalText";
import { Heading1 } from "../../components/NormalText/FontTypes";
import Radio from "../../components/Radio/Radio";

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
      <ImageComponent
        width={50}
        height={50}
        imageURL="https://reactnative.dev/img/tiny_logo.png"
        borderRadius={50}
      />
      <Text>{String(checked)}</Text>
      <InputCheck isDisabled={false} isChecked={checked} onChange={setChecked} />
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
