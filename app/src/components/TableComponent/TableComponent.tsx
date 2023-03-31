import { FlatList, StyleSheet, View } from "react-native";
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
  tableCellStyles?: {
    index: number;
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    borderLeftWidthForHeader?: number;
    borderLeftColorForHeader?: string;
    borderLeftWidth?: number;
    borderLeftColor?: string;
  }[];
  renderItems?: "top" | "all";
}

const TableComponent = (props: TableProps) => {
  const renderItem = (item: { item: string; index: number }) => {
    const { item: rowData, index } = item;
    return (
      <View style={styles.row} key={index}>
        {props.tableHeader.map((header: any, i) => (
          <View
            key={i}
            style={[
              styles.cell,
              props.tableCellStyles &&
                props.tableCellStyles.map((cell) =>
                  cell.index === i
                    ? {
                        alignItems: cell.alignItems,
                        borderLeftWidth: cell.borderLeftWidth,
                        borderLeftColor: cell.borderLeftColor,
                      }
                    : { alignItems: "flex-start", borderLeftWidth: 0 }
                ),
            ]}
          >
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
        props.tableCellStyles &&
          props.tableCellStyles.map((cell) =>
            cell.index === index
              ? {
                  alignItems: cell.alignItems,
                  borderLeftWidth: cell.borderLeftWidthForHeader,
                  borderLeftColor: cell.borderLeftColorForHeader,
                }
              : { alignItems: "flex-start", borderLeftWidth: 0 }
          ),
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
    <View>
      <FlatList
        style={styles.container}
        data={[...tableData]}
        initialNumToRender={0}
        renderItem={renderItem}
        ListHeaderComponent={() => <View style={styles.header}>{header}</View>}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    justifyContent: "center",
    padding: 16,
  },
});

export default TableComponent;
