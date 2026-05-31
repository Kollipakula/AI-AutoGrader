// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8000",
// });

// export const evaluateAnswer = (data) =>
//   API.post("/evaluate", data);

// export const getResults = () =>
//   API.get("/results");

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const createExam = (data) =>
  API.post("/create-exam", data);

export const submitStudent = (data) =>
  API.post("/submit-student", data);

export const getExams = () =>
  API.get("/get-exams");

export const getStudents = (exam) =>
  API.get(`/get-students/${exam}`);