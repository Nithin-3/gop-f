import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios() {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}/messages`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

export const getMessages = (userId) => async (dispatch) => {
  try {
    let API = createAxios();

    const { data } = await API.get(`/${userId}`)
    return data
  } catch (error) {
    console.error(error)
    return error.response.message;
  }
};

export const addMessage = (payload) => async (dispatch) => {
  try {
    let API = createAxios();
    const { data } = await API.post("/", payload)
    return data
  } catch (err) {
    console.error(err);
  }
}