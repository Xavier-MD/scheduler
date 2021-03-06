import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };

  const spotsRemaining = function (state, appointments) {
    let counter = 0;
    let requiredDay = {};
    for (let dayObject of state.days) {
      if (dayObject.name === state.day) {
        requiredDay = dayObject;
      }
    }
    for (const number of requiredDay.appointments) {
      if (appointments[number].interview === null) {
        counter++;
      }
    }
    const updatedDay = {
      ...requiredDay,
      spots: counter,
    };
    const days = state.days.map((day) =>
      day.id === requiredDay.id ? updatedDay : day
    );
    return days;
  };

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const days = spotsRemaining(state, appointments);
      setState({ ...state, days, appointments });
    });
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = spotsRemaining(state, appointments);
      setState({ ...state, days, appointments });
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
