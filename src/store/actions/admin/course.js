import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios() {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}/admin`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

export const getCourses = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    const data = await API.get(`/getCourses?page=1&limit=100&search=${payload}`);

    return data;
  } catch (e) {
    console.error(e);
    if (e.response.data.message === "No Course found") {
      return "No Course Found!"
    }

    // toast(e.response.data.errors[0].msg);
    return e;
  }
};

export const approveCourse = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    const { data } = await API.post("/approveCourse", payload);
    return data;
  } catch (e) {
    console.error(e);
    return e.response.message;
  }
};
