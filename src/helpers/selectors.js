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

export function getInterviewersForDay(state, day) {
  let interviewersArray = [];
  let interviewerObject = {};
  const result = [];

  for (let dayObject of state.days) {
    if (day === dayObject.name) {
      interviewersArray = dayObject.interviewers;
    }
  }

  for (let interviewerNumber of interviewersArray) {
    interviewerObject = state.interviewers[interviewerNumber];
    if (interviewerObject) {
      result.push(interviewerObject);
    }
  }

  return result;
}

export function getInterview(state, interview) {
  let interviewData = {};

  if (interview) {
    interviewData.student = interview.student;
    interviewData.interviewer = {
      id: interview.interviewer,
    };
  } else {
    return null;
  }

  const interviewer = state.interviewers[interviewData.interviewer.id];

  if (interviewer) {
    interviewData.interviewer.name = interviewer.name;
    interviewData.interviewer.avatar = interviewer.avatar;
  } else {
    return null;
  }

  return interviewData;
}
