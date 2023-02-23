import { View, Text, Image, StyleSheet } from "react-native";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import NormalText from "../../components/NormalText/NormalText";
import { Heading1 } from "../../components/NormalText/FontTypes";

const StoryBoard = () => {
  return (
    <View>
      <Text>Test from StoryBoard</Text>
      <ImageComponent
        width={50}
        height={50}
        imageURL="https://reactnative.dev/img/tiny_logo.png"
        borderRadius={50}
      />
      <NormalText
        normalText="Text Component"
        fontType={Heading1}
        textColor="blue"
      />
    </View>
  );
};

export default StoryBoard;
