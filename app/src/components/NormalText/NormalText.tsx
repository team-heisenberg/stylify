import { View, Text } from "react-native";

interface NormalTextInterface {
  normalText: string;
  fontType?: {};
  textColor?: string;
}

const NormalText = ({
  normalText,
  fontType,
  textColor,
}: NormalTextInterface) => {
  return (
    <View>
      <Text style={[fontType, { color: textColor }]}>{normalText}</Text>
    </View>
  );
};

NormalText.defaultProps = {
  normalText: "",
  fontType: {},
  textColor: "#24313A",
};

export default NormalText;
