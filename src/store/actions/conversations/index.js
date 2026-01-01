import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios() {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}/conversations`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

export const getConversations = (userId) => async(dispatch) => {
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

export const createConversation = (payload) => async(dispatch) => {
  try{
    let API = createAxios();
    const {data} = await API.post('/', payload)
    return data
  } catch(error){
    console.log(error)
    return error.response.message;
  }
}