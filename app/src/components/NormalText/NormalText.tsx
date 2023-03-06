import { View, Text } from "react-native";

interface NormalTextInterface {
  normalText: string;
  fontType?: {};
  textColor?: string;
  marginRight?: number;
  marginTop?: number;
}

const NormalText = ({
  normalText,
  fontType,
  textColor,
  marginRight,
  marginTop,
}: NormalTextInterface) => {
  return (
    <View>
      <Text
        style={[
          fontType,
          { color: textColor },
          { marginRight: marginRight || 0 },
          { marginTop: marginTop || 0 },
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
};

export default NormalText;
