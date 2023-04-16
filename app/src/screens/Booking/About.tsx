import { View } from "react-native";
import NormalText from "../../components/NormalText/NormalText";

const About = ({ details }: any) => {
  return (
    <View style={{ margin: 16 }}>
      <NormalText normalText={details} />
    </View>
  );
};

export default About;
