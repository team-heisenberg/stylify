import { View, Text, Image, StyleSheet } from "react-native";
import ImageComponent from "../../components/ImageComponent/ImageComponent";

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
    </View>
  );
};

export default StoryBoard;
