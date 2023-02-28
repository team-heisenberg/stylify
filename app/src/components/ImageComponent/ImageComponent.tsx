// Imports
import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Declare interface
interface imageInferface {
  width: number;
  height: number;
  imageURL: any;
  borderRadius: number;
  linearGradient?: boolean;
  positionLinearGradient?: String;
}

// Component function and props
const ImageComponent = ({
  width,
  height,
  imageURL,
  borderRadius,
  linearGradient,
  positionLinearGradient
}: imageInferface) => {
    let position = "";

    if (positionLinearGradient === "top") {
        position = "0deg"
    } else if (positionLinearGradient === "bottom") {
        position = "180deg"
    };

  // Create stylesheet
  const style = StyleSheet.create({
    imageStyle: {
      width: width,
      height: height,
      borderRadius: borderRadius,
    },
    background: {
      position: "absolute",
      height: "100%",
      width: "100%",
      transform: [{rotate: `${position}`}]
    },
  });

  if (linearGradient) {
    <LinearGradient
    colors={["rgba(0,0,0,0.8)", "transparent"]}
    style={style.background} />
  }

  // Return structure
  return (
    <View>
      <Image source={{ uri: `${imageURL}` }} style={style.imageStyle} />
      {linearGradient ? <LinearGradient colors={["rgba(0,0,0,0.8)", "transparent"]} style={style.background} /> : ""}
    </View>
  );
};

// Default props
ImageComponent.defaultProps = {
  width: 200,
  height: 100,
  imageURL: "",
  borderRadius: "",
  linearGradient: false,
  positionLinearGradient: "bottom"
};

// Export function/component
export default ImageComponent;
