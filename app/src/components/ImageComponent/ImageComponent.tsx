// Imports
import { View, Image, StyleSheet } from "react-native";

// Declare interface
interface imageInferface {
    width: number;
    height: number;
    imageURL: any;
    borderRadius: number;
}

// Component function and props
const ImageComponent = ({width, height, imageURL, borderRadius}: imageInferface) => {
    // Create stylesheet
    const style = StyleSheet.create ({
        imageStyle: {
            width: width,
            height: height,
            borderRadius: borderRadius,
        }
    })

    // Return structure
    return (
        <View>
            <Image source={{uri: `${imageURL}`}} style={style.imageStyle} />
        </View>
    )
}

// Default props
ImageComponent.defaultProps = {
    width: "200pt",
    height: "auto",
    imageURL: "",
    borderRadius: "unset"
}

// Export function/component
export default ImageComponent;