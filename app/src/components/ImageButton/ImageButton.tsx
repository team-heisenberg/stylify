import { View, Pressable } from "react-native";
import ImageComponent from "../ImageComponent/ImageComponent";
import { Edit } from "../IconsComponent/IconsComponent";
import { Check } from "../IconsComponent/IconsComponent";

interface imageButtonInterface {
  type: string;
  imageURL: string;
  onClick?: () => void;
}

const ImageButton = ({ type, imageURL, onClick }: imageButtonInterface) => {
  return (
    <View>
      {type === "edit" ? (
        <Pressable
          onPress={onClick}
          style={{ position: "relative", width: 100, height: 100 }}
        >
          <ImageComponent
            width={100}
            height={100}
            imageURL={imageURL}
            borderRadius={4}
          />
          <View
            style={{
              backgroundColor: "#105535",
              borderRadius: 50,
              width: 28,
              height: 28,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 5,
              right: 5,
            }}
          >
            <Edit fill="white" height={20} width={20} />
          </View>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            return;
          }}
          style={{ position: "relative", width: 100, height: 100 }}
        >
          <ImageComponent
            width={100}
            height={100}
            imageURL={imageURL}
            borderRadius={4}
          />
          <View
            style={{
              backgroundColor: "#105535",
              borderRadius: 50,
              width: 28,
              height: 28,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 5,
              right: 5,
            }}
          >
            <Check fill="white" height={20} width={20} />
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default ImageButton;
