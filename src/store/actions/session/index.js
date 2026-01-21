import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios() {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}/session`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

export const getAllSessions = () => async (dispatch) => {
  try {
    let API = createAxios();
    const { data } = await API.get("/getAll");
    return data

  } catch (err) {
    console.error("getAllSessions error:", err);
    return { success: false, message: err.response?.data?.message || "Failed to fetch sessions" };
  }
};

export const getSessionsByStatus = async (status) => {
  try {
    let API = createAxios();

    const { data } = await API.get(`/${status}`);
    return data;
  } catch (e) {
    console.error("getSessionsByStatus error:", e);
    return { success: false, message: e.response?.data?.message || "Failed to fetch sessions by status" };
  }
};

export const getTeacherFreeSessions = async () => {
  try {
    let API = createAxios();

    const { data } = await API.get("/getMyFreeSessions");

    return data;
  } catch (e) {
    console.error("getTeacherFreeSessions error:", e);
    return { success: false, message: e.response?.data?.message || "Failed to fetch free sessions" };
  }
};
