import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import NormalText from "../NormalText/NormalText";
import { Heading5 } from "../NormalText/FontTypes";

interface TableProps {
  numColumns: number;
  numRows: number;
  tableHeader: string[];
  tableData: any[][];
  headerBackgroundColor?: string;
  headerTextColor?: string;
}

const TableComponent = (props: TableProps) => {
  const renderItem = (item: { item: string[]; index: number }) => {
    const { item: rowData, index } = item;
    return (
      <View style={styles.row}>
        {rowData.map((cellData, cellIndex) => (
          <View key={cellIndex} style={styles.cell}>
            <NormalText normalText={cellData} />
          </View>
        ))}
      </View>
    );
  };

  const header = props.tableHeader.map((title, index) => (
    <View
      key={index}
      style={[
        styles.headerCell,
        { backgroundColor: props.headerBackgroundColor },
      ]}
    >
      <NormalText
        normalText={title}
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
