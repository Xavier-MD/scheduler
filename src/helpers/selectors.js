export function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];
  let appointmentObject = {};
  const result = [];

  for (let dayObject of state.days) {
    if (day === dayObject.name) {
      appointmentsArray = dayObject.appointments;
    }
  }

  for (let appointmentNumber of appointmentsArray) {
    appointmentObject = state.appointments[appointmentNumber];
    if (appointmentObject) {
      result.push(appointmentObject);
    }
  }

  return result;
}
