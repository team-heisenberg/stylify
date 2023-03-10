import { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Heart } from "../IconsComponent/IconsComponent";

interface favButtonInterface {
  onClick?: () => void;
}

const FavButton = ({ onClick }: favButtonInterface) => {
    const [isFav, setIsFav] = useState(false);

  return (
    <View>
      <Pressable
        onPress={onClick}
        onPressIn={() => setIsFav(!isFav)}
      >
          <Heart 
          fill={isFav ? "#105535" : "white"} stroke={isFav ? "" : "black"} strokeWidth={isFav ? "" : 2} height={20} width={20} style={{margin: 5}} />
      </Pressable>
    </View>
  );
};

export default FavButton;
