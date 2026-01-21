import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios() {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}/availability`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

export const addTeacherAvailability = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    const { data } = await API.post("/addAvailability", payload);

    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.error(e);
    return { success: false, message: e.response?.data?.message || e.message || "Failed to add availability" };
  }
};

export const getAvailByTeacher = async (id) => {
  try {
    let API = createAxios();

    const { data } = await API.get(`/${id}`);

    return data;
  } catch (e) {
    console.error(e);
    return { success: false, message: e.response?.data?.message || e.message || "Failed to get availability" };
  }
};

export const getAvailByAId = (aid) => async (dispatch) => {
  try {
    let API = createAxios();
    const { data } = await API.get(`/avail/${aid}`)
    return data
  } catch (error) {
    console.error(error);
    return { success: false, message: error.response?.data?.message || error.message || "Failed to get availability" };
  }
}

export const getTeacherAvailability = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    const { data } = await API.get("/myAvails");

    return data;
  } catch (e) {
    console.error(e);
    return { success: false, message: e.response?.data?.message || e.message || "Failed to get availability" };
  }
};

export const deleteAvailability = async (id) => {
  try {
    let API = createAxios();

    const { data } = await API.delete(`/deleteAvailability/${id}`);
    return data;
  } catch (e) {
    console.error(e);
    return { success: false, message: e.response?.data?.message || e.message || "Failed to delete availability" };
  }
};
