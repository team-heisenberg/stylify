import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { DownChevronCircle } from "../IconsComponent/IconsComponent";

interface Props {
  onDateSelect: (date: string) => void;
}

const CalendarComponent: React.FC<Props> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    new Date().toDateString()
  );
  const [markedDates, setMarkedDates] = useState({
    [currentDate]: { selected: true, selectedColor: "#105535" },
  });
  const [expanded, setExpanded] = useState(false);

  const handleDayPress = (day: any) => {
    setMarkedDates({
      [currentDate]: { selected: false },
      [day.dateString]: { selected: true, selectedColor: "#105535" },
    });
    setCurrentDate(day.dateString);
    setSelectedDate(new Date(day.dateString).toDateString());
    onDateSelect(new Date(day.dateString).toDateString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        {expanded ? (
          <Calendar
            markedDates={markedDates}
            onDayPress={handleDayPress}
            style={styles.calendar}
            firstDay={1}
            theme={{
              textDayFontFamily: "PlayfairDisplay_400Regular",
              textMonthFontFamily: "PlayfairDisplay_700Bold",
              textDayHeaderFontFamily: "PlayfairDisplay_700Bold",
              calendarBackground: "#F9F5EE",
              textDayFontWeight: "400",
              textDisabledColor: "#000000",
              textSectionTitleColor: "#105535",
              textDayHeaderFontWeight: "700",
              textDayHeaderFontSize: 16,
              selectedDayBackgroundColor: "#105535",
              selectedDayTextColor: "#ffffff",
              dayTextColor: "#000000",
              todayTextColor: "#000000",
              textMonthFontWeight: "700",
              textMonthFontSize: 18,
            }}
          />
        ) : (
          <Calendar
            markedDates={markedDates}
            onDayPress={handleDayPress}
            style={styles.expanded}
            firstDay={1}
            theme={{
              textDayFontFamily: "PlayfairDisplay_400Regular",
              textMonthFontFamily: "PlayfairDisplay_700Bold",
              textDayHeaderFontFamily: "PlayfairDisplay_700Bold",
              calendarBackground: "#F9F5EE",
              textDayFontWeight: "400",
              textDisabledColor: "#000000",
              textSectionTitleColor: "#105535",
              textDayHeaderFontWeight: "700",
              textDayHeaderFontSize: 14,
              selectedDayBackgroundColor: "#105535",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#000000",
              arrowColor: "#000000",
              dayTextColor: "#000000",
              textMonthFontWeight: "700",
              textMonthFontSize: 18,
            }}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.arrowDownUpContainer}
      >
        {expanded ? (
          <DownChevronCircle style={styles.arrowUp} />
        ) : (
          <DownChevronCircle style={styles.arrowDown} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: { marginBottom: 10 },
  calendarContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  calendar: {},
  expanded: {
    height: 130,
    overflow: "hidden",
  },
  arrowDownUpContainer: {
    backgroundColor: "transparent",
    paddingBottom: 5,
    paddingTop: 5,
  },
  arrowDown: {
    padding: 10,
    position: "absolute",
    top: -10,
    right: "47.5%",
    borderRadius: 24,
  },
  arrowUp: {
    padding: 10,
    position: "absolute",
    top: -10,
    right: "47.5%",
    borderRadius: 24,
    transform: [{ rotate: "180deg" }],
  },
};

export default CalendarComponent;
