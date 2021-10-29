import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const parsedDays = props.days.map(day =>
    <DayListItem 
      key={day.id} 
      name={day.name} 
      spots={day.spots}
      selected={day.name === props.day.name}
      setDay={props.setDay}
    />);
  return (
    <ul>
    { parsedDays }
    </ul>
  );
};