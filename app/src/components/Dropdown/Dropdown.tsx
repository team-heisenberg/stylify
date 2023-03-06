import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import NormalText from "../NormalText/NormalText";

interface DropdownProps {
  label: string;
  labelTop: string;
  data: Array<{ label: string; value: string }>;
  onSelect: (item: { label: string; value: string }) => void;
}

const Dropdown = ({ label, labelTop, data, onSelect }: DropdownProps) => {
  const dropdownButtonRef = useRef<TouchableOpacity>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [visible, setVisible] = useState(false);

  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
    undefined
  );

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    if (dropdownButtonRef.current) {
      dropdownButtonRef.current.measure((_fx, _fy, _width, height, _px, py) => {
        setDropdownTop(py + height);
      });
    }
    setVisible(true);
  };

  const renderItem = ({ item }: { item: { label: string; value: string } }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedLabel(item.label);
        onSelect(item);
        setVisible(false);
      }}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    if (visible) {
      return (
        <Modal visible={true} transparent animationType="none">
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}
          >
            <View style={[styles.dropdown, { top: dropdownTop }]}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.value}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={dropdownButtonRef}
        style={styles.input}
        onPress={toggleDropdown}
      >
        {selectedLabel ? <Text>{selectedLabel}</Text> : <NormalText normalText={label} />}
        <Text style={styles.labelTop}>{labelTop}</Text>
      </TouchableOpacity>
      {renderDropdown()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 16,
    marginRight: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 24,
    padding: 18,
    width: "100%",
  },
  labelTop: {
    position: "absolute",
    top: -10,
    left: 14,
    fontSize: 14,
    backgroundColor: "white",
    paddingLeft: 8,
    paddingRight: 8,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default Dropdown;
