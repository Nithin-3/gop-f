import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios() {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}/payment`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

export const addPayment = (payload) => async (dispatch) => {
  try {
    let API = createAxios();
    const { data } = await API.post("/add", payload);
    // console.log(result);
    return data;
  } catch (e) {
    console.error("addPayment error:", e);
    return { success: false, message: e.response?.data?.message || "Payment registration failed" };
  }
};

export const getAllPayments = async (data) => {
  try {
    let API = createAxios();
    const { data } = await API.get("/getAllPayments");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getCancelledSessions = async (data) => {
  try {
    let API = createAxios();
    const { data } = await API.get("/cancelledSessions");
    return data;
  } catch (e) {
    console.log(e);
  }
};
