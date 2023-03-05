import { View, Text } from "react-native";

interface NormalTextInterface {
  normalText: string;
  fontType?: {};
  textColor?: string;
  marginRight?: number;
<<<<<<< HEAD
  marginTop?: number;
=======
  textAlign?: string;
>>>>>>> 79d5fd7 (feature/HB-127-Create-Button-Component)
}

const NormalText = ({
  normalText,
  fontType,
  textColor,
  marginRight,
<<<<<<< HEAD
  marginTop,
=======
  textAlign,
>>>>>>> 79d5fd7 (feature/HB-127-Create-Button-Component)
}: NormalTextInterface) => {
  return (
    <View>
      <Text
        style={[
          fontType,
          { color: textColor },
          { marginRight: marginRight || 0 },
<<<<<<< HEAD
          { marginTop: marginTop || 0 },
=======
          { textAlign: "center" },
          // { height: 59 },
          // { display: "flex" },
          // { alignItems: "center" },
          // { justifyContent: "center" },
          // { alignContent: "center" },
>>>>>>> 79d5fd7 (feature/HB-127-Create-Button-Component)
        ]}
      >
        {normalText}
      </Text>
    </View>
  );
};

NormalText.defaultProps = {
  normalText: "",
  fontType: {},
  textColor: "#24313A",
  marginRight: "",
<<<<<<< HEAD
  marginTop: "",
=======
  textAlign: "center"
>>>>>>> 79d5fd7 (feature/HB-127-Create-Button-Component)
};

export default NormalText;
