import { useState } from "react";
import { View, Pressable } from "react-native";
import { Heart } from "../IconsComponent/IconsComponent";

interface favButtonInterface {
  onClick?: () => void;
  colorFill?: string;
  favState: boolean;
}

const FavButton = ({ onClick, colorFill, favState }: favButtonInterface) => {
  const [isFav, setIsFav] = useState(favState);

  return (
    <View>
      <Pressable onPress={onClick} onPressIn={() => setIsFav(!isFav)} style={{ padding: 5, backgroundColor: "#F9F5EE" }}>
        <Heart
          fill={isFav ? colorFill : "#F9F5EE"}
          stroke={isFav ? "" : "black"}
          strokeWidth={isFav ? "" : 1.5}
          height={20}
          width={20}
        />
      </Pressable>
    </View>
  );
};

FavButton.defaultProps = {
  colorFill: "#105535",
  favState: false
};

export default FavButton;
