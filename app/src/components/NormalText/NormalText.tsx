import { View, Text } from "react-native";

interface NormalTextInterface {
  normalText: string;
  fontType?: {};
  textColor?: string;
  marginRight?: number;
  marginTop?: number;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  borderBottomWidth?: number;
  borderBottomColor?: string;
}

const NormalText = ({
  normalText,
  fontType,
  textColor,
  marginRight,
  marginTop,
  textAlign,
  borderBottomWidth,
  borderBottomColor,
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
          { borderBottomWidth: borderBottomWidth || 0 },
          { borderBottomColor: borderBottomColor },
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
  borderBottomWidth: "",
  borderBottomColor: "#24313A",
};

export default NormalText;
