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

export const getAllSessions = () => async(dispatch) => {
  try {
    let API =  createAxios();
    const { data } = await API.get("/getAll");
    return data

  } catch(err) {
    console.log(err)
    return err.response
  }
}

export const getSessionsByStatus = async (status) => {
  try {
    let API = createAxios();

    const { data } = await API.get(`/${status}`);
    return data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const getTeacherFreeSessions = async () => {
  try {
    let API = createAxios();

    const { data } = await API.get("/getMyFreeSessions");
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};
