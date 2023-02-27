import { View, Text } from "react-native";

interface NormalTextInterface {
  normalText: string;
  fontType?: {};
  textColor?: string;
  marginRight?: number;
}

const NormalText = ({
  normalText,
  fontType,
  textColor,
  marginRight,
}: NormalTextInterface) => {
  return (
    <View>
      <Text
        style={[fontType, { color: textColor }, { marginRight: marginRight }]}
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
};

export default NormalText;
