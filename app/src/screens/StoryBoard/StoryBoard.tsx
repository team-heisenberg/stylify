import { View, Text, Image, StyleSheet } from "react-native";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import InputCheck from "../../components/InputCheck/InputCheck";
import { useState } from "react";

const StoryBoard = () => {
const [checked, setChecked] = useState(false);

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
    </View>
  );
};

export default StoryBoard;
