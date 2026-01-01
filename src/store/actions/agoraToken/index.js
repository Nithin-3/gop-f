import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios() {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

export const generateAgoraToken = (channelName, role, uid) => async(dispatch) => {
  try{
    let API = createAxios()
    const data = API.get(`/rtc/${channelName}/${role}/uid/${uid}`)
    return data
  } catch (err) {
    console.log(err)
    return err.response.message;
  }
};