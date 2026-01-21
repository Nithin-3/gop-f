import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios() {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}/teacher`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

export const getTeacherOnboardData = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

    const { data } = await API.post("/personaldetail", payload);
    dispatch({ type: "GET_TEACHER_ONBOARD_DATA", payload: { ...data } });
    return data;
  } catch (e) {
    console.error(e);
    // return e.response.message;
  }
};

export const setTeacher = (user) => {
  return {
    type: "SET_TEACHER",
    payload: user
  }
}

