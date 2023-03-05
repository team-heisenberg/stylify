import { View, Text } from "react-native";

interface NormalTextInterface {
  normalText: string;
  fontType?: {};
  textColor?: string;
  marginRight?: number;
  marginTop?: number;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
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
          { textAlign: textAlign },
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
  textAlign: "center",
};

export default NormalText;
