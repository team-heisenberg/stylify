import { View } from "react-native"
import PieChartComponent from "../../components/PieChartComponent/PieChartComponent"
import NormalText from "../../components/NormalText/NormalText";
import { Heading5, SubHeading2 } from "../../components/NormalText/FontTypes";

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
    const total:number = onlineAmount+callAmount+walkinAmount;

    return (
        <View style={{height: 300, marginVertical: 50}}>
            <NormalText normalText="Appointments" fontType={Heading5}/>
            <NormalText normalText={total.toString()} fontType={SubHeading2}/>
            <PieChartComponent onlineAmount={onlineAmount} callAmount={callAmount} walkinAmount={walkinAmount} />
        </View>
    )
}

export default PieChartContainer