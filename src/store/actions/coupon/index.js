import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios() {
  const token = JSON.parse(localStorage.getItem("profile"))?._id;
  return axios.create({
    baseURL: `${baseURL}/coupon`,
    headers: {
      "content-type": "application/json",
      //   authorization: `Bearer ${token && token.access}`,
      token: `${token}`,
    },
  });
}

export const addCouponSlot = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    const { data } = await API.post("/", payload);

    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.error(e);
    return e.response.message;
  }
};
export const viewCouponByUser = (payload, page) => async (dispatch) => {
  try {
    let API = createAxios();

    const { data } = await API.get(`/getCoupon?search=${payload}&page=${page}`);

    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.error(e);
    return e.response.message;
  }
};

export const viewCouponByCourse = (courseId, page) => async (dispatch) => {
  try {
    let API = createAxios();

    const { data } = await API.get(`/getCouponByCourse/${courseId}`);
    return data.coupons;
  } catch (e) {
    console.error(e);
    return e.response.message;
  }
};




export const deleteCouponSlot = (id) => async (dispatch) => {
  try {
    let API = createAxios();

    const { data } = await API.delete(`/getCoupon/${id}`);

    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.error(e);
    return e.response.message;
  }
};
export const editCouponSlot = (payload, id) => async (dispatch) => {
  try {
    let API = createAxios();

    const { data } = await API.put(`/getCoupon/${id}`, payload);

    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.error(e);
    return e.response.message;
  }
};
