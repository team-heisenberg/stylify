import { View, Text } from "react-native";

interface NormalTextInterface {
  normalText: any;
  fontType?: {};
  textColor?: string;
  marginRight?: number;
  marginTop?: number;
  marginLeft?: number;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  borderBottomWidth?: number;
  borderBottomColor?: string;
  fontWeight?: "normal" | "bold" | "700" | "900";
}

const NormalText = ({
  normalText,
  fontType,
  textColor,
  marginRight,
  marginTop,
  marginLeft,
  textAlign,
  borderBottomWidth,
  borderBottomColor,
  fontWeight,
}: NormalTextInterface) => {
  return (
    <View>
      <Text
        style={[
          fontType,
          {
            color: textColor,
            marginRight: marginRight || 0,
            marginTop: marginTop || 0,
            marginLeft: marginLeft || 0,
            textAlign: textAlign,
            borderBottomWidth: borderBottomWidth || 0,
            borderBottomColor: borderBottomColor,
            fontWeight: fontWeight,
          },
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
  marginLeft: "",
  textAlign: "center",
  borderBottomWidth: "",
  borderBottomColor: "#24313A",
};

export default NormalText;
