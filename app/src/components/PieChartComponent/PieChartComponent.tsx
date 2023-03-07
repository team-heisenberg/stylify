import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryPie } from "victory-native";
import NormalText from "../NormalText/NormalText";
import { BodyRegular } from "../NormalText/FontTypes";

interface pieChartInterface {
  onlineAmount: number;
  callAmount: number;
  walkinAmount: number;
}

const PieChartComponent = ({
  onlineAmount,
  callAmount,
  walkinAmount,
}: pieChartInterface) => {
  return (
    <View style={styles.container}>
      <VictoryPie
        data={[
          { x: "Online", y: onlineAmount, label: onlineAmount },
          { x: "Call", y: callAmount, label: callAmount },
          { x: "Walk-in", y: walkinAmount, label: walkinAmount },
        ]}
        colorScale={["#105535", "#2A7E57", "#6FA78D"]}
        padding={100}

        //@ts-ignore 
        origin={{ x: 130 }}

        style={{
          labels: {
            fontSize: 24,
            fill: "#F0F0F0",
            padding: -40,
          },
        }}
      />
      <View style={styles.containerMacroLabel}>
        <View style={styles.containerLabel}>
          <View style={{ width: 17, height: 7, backgroundColor: "#105535", margin: 10 }} />
          <NormalText normalText="Online" fontType={BodyRegular} />
        </View>
        <View style={styles.containerLabel}>
          <View style={{ width: 17, height: 7, backgroundColor: "#2A7E57", margin: 10 }} />
          <NormalText normalText="Call" fontType={BodyRegular} />
        </View>
        <View style={styles.containerLabel}>
          <View style={{ width: 17, height: 7, backgroundColor: "#6FA78D", margin: 10 }} />
          <NormalText normalText="Walk-in" fontType={BodyRegular} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // backgroundColor: "green",
    position: "relative",
    padding: 40
  },
  containerLabel: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "blue",
    margin: 5,
  },
  containerMacroLabel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    flexDirection: "column",
    alignContent: "space-around",
    paddingLeft: 50
    // backgroundColor: "red"
  }
});

// Default props
PieChartComponent.defaultProps = {
  onlineAmount: 0,
  callAmount: 0,
  walkinAmount: 0,
};

export default PieChartComponent;
