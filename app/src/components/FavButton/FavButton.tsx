import { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Heart } from "../IconsComponent/IconsComponent";

interface favButtonInterface {
  onClick?: () => void;
  height?: number | string;
  width?: number | string;
  colorFill?: string;
}

const FavButton = ({
  onClick,
  height,
  width,
  colorFill,
}: favButtonInterface) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <View style={{ padding: 5 }}>
      <Pressable
        onPress={onClick}
        onPressIn={() => setIsFav(!isFav)}
        style={{ padding: 5, backgroundColor: "rgba(255, 255, 255, 0)" }}
      >
        <Heart
          fill={isFav ? colorFill : "#F9F5EE"}
          stroke={isFav ? "" : "black"}
          strokeWidth={isFav ? "" : 1.5}
          height={height}
          width={width}
        />
      </Pressable>
    </View>
  );
};

FavButton.defaultProps = {
  colorFill: "#105535",
  favState: false,
  height: 20,
  width: 20,
};

export default FavButton;
