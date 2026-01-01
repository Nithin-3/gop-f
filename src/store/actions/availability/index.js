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

    console.log(payload, "payload");
    const { data } = await API.post("/addAvailability", payload);
    console.log(data, "DaTA");
    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const getAvailByTeacher = async (id) => {
  try {
    let API = createAxios();

    const { data } = await API.get(`/${id}`);
    console.log(data, "DaTA");
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const getAvailByAId = (aid) => async(dispatch) => {
  try{
    let API = createAxios();
    const {data} = await API.get(`/avail/${aid}`)
    return data
  } catch(error) {
    return error.response.message;
  }
}

export const getTeacherAvailability = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    console.log(payload, "payload");
    const { data } = await API.get("/myAvails");
    console.log(data, "DaTA");
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const deleteAvailability = async (id) => {
  try {
    let API = createAxios();

    const { data } = await API.delete(`/deleteAvailability/${id}`);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
