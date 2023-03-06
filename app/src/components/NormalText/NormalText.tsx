import { View, Text } from "react-native";

interface NormalTextInterface {
  normalText: string;
  fontType?: {};
  textColor?: string;
  marginRight?: number;
  marginTop?: number;
  textAlign?: string;
}

const NormalText = ({
  normalText,
  fontType,
  textColor,
  marginRight,
  marginTop,
  textAlign,
}: NormalTextInterface) => {
  return (
    <View>
      <Text
        style={[
          fontType,
          { color: textColor },
          { marginRight: marginRight || 0 },
          { marginTop: marginTop || 0 },
          { textAlign: "center" },
          // { height: 59 },
          // { display: "flex" },
          // { alignItems: "center" },
          // { justifyContent: "center" },
          // { alignContent: "center" },
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
  marginTop: "",
  textAlign: "center"
};

export default NormalText;
