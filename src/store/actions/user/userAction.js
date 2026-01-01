import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios() {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}/user`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

export const getUser = (userId) => async(dispatch) => {
  try { 
    let API = createAxios();
    // console.log("payload", userId)
    const {data} = await API.get(`/${userId}`)
    return data
  } catch (error) {
    console.log(error)
    return error.response.message;
  }
};
