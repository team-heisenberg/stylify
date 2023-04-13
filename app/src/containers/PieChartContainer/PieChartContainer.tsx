import { View } from "react-native";
import PieChartComponent from "../../components/PieChartComponent/PieChartComponent";
import NormalText from "../../components/NormalText/NormalText";
import {
  BodyRegular,
  Heading4,
  Heading5,
  SubHeading2,
} from "../../components/NormalText/FontTypes";
import Card from "../../components/Card/Card";

interface pieChartInterface {
  onlineAmount: number;
  callAmount: number;
  walkinAmount: number;
  totalEarnings?: number;
}

const PieChartContainer = ({
  onlineAmount,
  callAmount,
  walkinAmount,
  totalEarnings,
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
        <View style={{ alignItems: "flex-start", gap: 10 }}>
          <NormalText normalText="Appointments" fontType={Heading5} />
          <NormalText normalText={total.toString()} fontType={Heading4} />
        </View>
        {totalEarnings != 0 ? (
          <PieChartComponent
            onlineAmount={onlineAmount}
            callAmount={callAmount}
            walkinAmount={walkinAmount}
          />
        ) : (
          <View style={{ width: "100%", marginTop: 30 }}>
            <NormalText normalText="No appointments" fontType={BodyRegular} />
          </View>
        )}
      </Card>
    </View>
  );
};

export default PieChartContainer;
