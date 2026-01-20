import axios from "axios";
import { baseURL } from "../../../utils/api";

const API = axios.create({
  baseURL: `${baseURL}/auth`,
});

const token = JSON.parse(localStorage.getItem("profile"))?.token;
const Token_Api = axios.create({
  baseURL: `${baseURL}/auth`,
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${token && token.access}`,
  },
});

export const signup = (user) => async (dispatch) => {
  try {
    const { data } = await API.post("/signup", user);
    const userDoc = data._doc || data.user || data;
    const token = data.token || userDoc.token;
    const resultPayload = { ...userDoc, token };

    dispatch({ type: "AUTH", payload: resultPayload });
    return { ...resultPayload, _doc: userDoc };
  } catch (e) {
    console.log(e);
    return e.response?.data || e.message;
  }
};

export const login = (user) => async (dispatch) => {
  try {
    const { data } = await API.post("/login", user);
    const userDoc = data._doc || data.user || data;
    const token = data.token || userDoc.token;
    const resultPayload = { ...userDoc, token };

    dispatch({
      type: "AUTH",
      payload: resultPayload,
    });
    return { ...resultPayload, _doc: userDoc };
  } catch (e) {
    console.log(e);
    return e.response?.data || e.message;
  }
};

export const getVerificationCode = (email) => async (dispatch) => {
  try {
    const { data } = await API.post("/reset-password-token", { email });
    return data;
  } catch (e) {
    return e.response?.data || e.message;
  }
};

export const resetPassword = (body) => async (dispatch) => {
  try {
    const { data } = await API.post("/reset-password", body);
    return data;
  } catch (e) {
    console.log(e);
    return e.response?.data || e.message;
  }
};

export const changePassword = (body) => async (dispatch) => {
  try {
    const { data } = await Token_Api.post("/changePassword", body);
    return data;
  } catch (e) {
    console.log(e);
    return e.response?.data || e.message;
  }
};

export const getInTouch = (body) => async (dispatch) => {
  try {
    const { data } = await API.post("/getInTouch", body);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

//   export const googleLogin = (user) => async (dispatch) => {
//   try {
//     const { data } = await API.post("/googleLogin", user);
//     dispatch({
//       type: "AUTH",
//       payload: { ...data._doc, token: data.token.access },
//     });
//     console.log(data);
//     return "Success";
//   } catch (e) {
//     console.log(e);
//     return e.response.message;
//   }
// };

// export const facebookLogin = (user) => async (dispatch) => {
//   try {
//     const { data } = await API.post("/facebookLogin", user);
//     dispatch({
//       type: "AUTH",
//       payload: { ...data._doc, token: data.token.access },
//     });
//     console.log(data);
//     return "Success";
//   } catch (e) {
//     console.log(e);
//     return e.response.message;
//   }
// };

// export const updateUser = (user) => async (dispatch) => {
//   try {
//     const { data } = await API.patch("/", user);
//     dispatch({ type: "UPDATE_USER", payload: data });
//   } catch (e) {
//     console.log(e);
//   }
// };
