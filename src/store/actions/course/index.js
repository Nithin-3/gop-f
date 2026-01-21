import axios from "axios";
import { baseURL } from "../../../utils/api";

const createAxios = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const token = profile?.token?.access;

  return axios.create({
    baseURL: `${baseURL}/course`,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};

export const getCourseById = (courseId) => async () => {
  try {
    const API = createAxios();
    const { data } = await API.get(`/${courseId}`);
    return data;
  } catch (e) {
    console.error("getCourseById error:", e);
    return e.response?.data?.message || e.message;
  }
};

export const getTeacherRatings = (teacherId) => async () => {
  try {
    const API = createAxios();
    const { data } = await API.get(`/teacher_ratings/${teacherId}`);
    return data;
  } catch (e) {
    console.error("getTeacherRatings error:", e);
    return e.response?.data?.message || e.message;
  }
};

export const createCourse = (payload) => async () => {
  try {
    const API = createAxios();


    const { data } = await API.post("/createCourse", payload);

    return data;

  } catch (e) {
    console.error("ERROR:", e.response?.data || e.message);
    return e.response?.data || e.message;
  }
};

export const getMyCourses = (tid) => async () => {
  try {
    const API = createAxios();
    const { data } = await API.get(`/getCourseByTeacher/${tid}`);
    return data;
  } catch (e) {
    console.error("getMyCourses error:", e);
    return e.response?.data?.message || e.message;
  }
};

export const updateCourse = (payload) => async () => {
  try {
    const API = createAxios();
    const { data } = await API.put("/updateCourse", payload);
    return data;
  } catch (e) {
    console.error("updateCourse error:", e);
    return e.response?.data?.message || e.message;
  }
};

export const deleteCourse = (payload) => async () => {
  try {
    const API = createAxios();
    const { data } = await API.delete("/deleteCourse", { data: payload });
    return data;
  } catch (e) {
    console.error("deleteCourse error:", e);
    return e.response?.data?.message || e.message;
  }
};

export const getTeacherDashNums = () => async () => {
  try {
    const API = createAxios();
    const { data } = await API.get("/getnums");
    return data;
  } catch (e) {
    console.error("getTeacherDashNums error:", e);
    return e.response?.data?.message || e.message;
  }
};
