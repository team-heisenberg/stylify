import { View } from "react-native";
import PieChartComponent from "../../components/PieChartComponent/PieChartComponent";
import NormalText from "../../components/NormalText/NormalText";
import { Heading5, SubHeading2 } from "../../components/NormalText/FontTypes";
import Card from "../../components/Card/Card";

interface pieChartInterface {
  onlineAmount: number;
  callAmount: number;
  walkinAmount: number;
}

const PieChartContainer = ({
  onlineAmount,
  callAmount,
  walkinAmount,
}: pieChartInterface) => {
  const total: number = onlineAmount + callAmount + walkinAmount;

  return (
    <View style={{ height: 300, marginVertical: 40 }}>
      <Card
        height={300}
        flexDirection="column"
        alignItems="flex-start"
        padding={20}
        width="99%"
      >
        <View style={{ alignItems: "flex-start" }}>
          <NormalText normalText="Appointments" fontType={Heading5} />
          <NormalText normalText={total.toString()} fontType={SubHeading2} />
        </View>
        <PieChartComponent
          onlineAmount={onlineAmount}
          callAmount={callAmount}
          walkinAmount={walkinAmount}
        />
      </Card>
    </View>
  );
};

export default PieChartContainer;
