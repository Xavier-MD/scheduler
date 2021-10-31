import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const parsedDays = props.days.map(mappedDay =>
    <DayListItem
      key={mappedDay.id}
      name={mappedDay.name}
      spots={mappedDay.spots}
      selected={mappedDay.name === props.value}
      setDay={props.onChange}
    />);
  return (
    <ul>
    { parsedDays }
    </ul>
  );
};