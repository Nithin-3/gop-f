import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios() {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}/payout`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

export const requestPayout = async (payload) => {
  try {
    let API = createAxios();

    const { data } = await API.post("/requestPayout", payload);
    console.log(data.success, "DaTA");

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllPayouts = async (payload) => {
  try {
    let API = createAxios();

    const { data } = await API.get("/getAllPayouts");

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updatePayoutById = async (id, payload) => {
  try {
    let API = createAxios();

    const { data } = await API.patch(`/${id}`, payload);
    console.log(data.success, "DaTA");

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const sendEmailToTeacher = async (payload) => {
  try {
    let API = createAxios();

    await API.post("/sendEmail", payload);
    // console.log(data.success, "DaTA");

    // return data;
  } catch (e) {
    console.log(e);
  }
};
