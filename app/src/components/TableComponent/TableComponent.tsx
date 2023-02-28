import { FlatList, StyleSheet, View, Text } from "react-native";
import React from "react";
import NormalText from "../NormalText/NormalText";
import { Heading5 } from "../NormalText/FontTypes";

interface TableProps {
  numColumns: number;
  numRows: number;
  tableHeader: { title: string; property: string }[];
  tableData: any[];
  headerBackgroundColor?: string;
  headerTextColor?: string;
}

const TableComponent = (props: TableProps) => {
  const renderItem = (item: { item: string; index: number }) => {
    const { item: rowData, index } = item;
    return (
      <View style={styles.row} key={index}>
        {props.tableHeader.map((header: any, i) => (
          <View key={i} style={styles.cell}>
            <NormalText normalText={rowData[header.property]} />
          </View>
        ))}
      </View>
    );
  };

  const header = props.tableHeader.map((h, index) => (
    <View
      key={index}
      style={[
        styles.headerCell,
        { backgroundColor: props.headerBackgroundColor },
      ]}
    >
      <NormalText
        normalText={h.title}
        textColor={props.headerTextColor}
        fontType={Heading5}
      />
    </View>
  ));

  const tableData = props.tableData.map((rowData) => rowData);

  return (
    <FlatList
      style={styles.container}
      data={[...tableData]}
      renderItem={renderItem}
      ListHeaderComponent={() => <View style={styles.header}>{header}</View>}
      stickyHeaderIndices={[0]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#718096",
  },
  cell: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 16,
  },
});

export default TableComponent;
