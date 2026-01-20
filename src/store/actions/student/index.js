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

export const filterCourse = (payload) => async (dispatch) => {
  console.log("Redux action filterCourse called with payload:", payload);
  try {
    let API = createAxios();
    console.log("Calling axios.get('/course' + payload)...");
    const { data } = await API.get("/course" + payload);
    console.log("Axios response data:", data);
    return data;
  } catch (e) {
    console.error("filterCourse error:", e);
    return { success: false, message: e.response?.data?.message || e.message || "Failed to fetch courses" };
  }
};

export const getUpcomingClassForStudent = (sid) => async (dispatch) => {
  try {
    console.log(sid)
    let API = createAxios()
    const { data } = await API.get(`student/upcomingClass/${sid}`)
    return data
  } catch (error) {
    console.error("getUpcomingClassForStudent error:", error);
    return { success: false, message: error.response?.data?.message || error.message || "Failed to load upcoming classes" };
  }
}

export const getStudentDashNums = (sid) => async (dispatch) => {
  try {
    console.log(sid)
    let API = createAxios()
    const { data } = await API.get(`student/getDashNums/${sid}`)
    return data
  } catch (error) {
    console.log(error)
    return error.response.message;
  }
}

export const newStudent = (userId) => async (dispatch) => {
  try {
    let API = createAxios();
    const { data } = await API.post(`/student/new/${userId}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getStudentData = (uid) => async (dispatch) => {
  try {
    let API = createAxios();

    // console.log(payload, "payload");
    const { data } = await API.post(`/student/myDetails/${uid}`);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};


export const getStudentDetailById = (uid) => async (dispatch) => {
  try {
    let API = createAxios()
    const { data } = await API.get(`/student/${uid}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateStudentProfile = (payload) => async (dispatch) => {
  try {
    let API = createAxios();
    console.log(payload)
    const { data } = await API.post("student/updateProfile", payload);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const bookSlot = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    // console.log(payload, 'payload')
    const { data } = await API.post("/session/bookSession", payload);
    return data;
  } catch (e) {
    console.error("bookSlot error:", e);
    return { success: false, message: e.response?.data?.message || e.message || "Failed to book session" };
  }
};

export const reSchedule = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    // console.log(payload, 'payload')
    const { data } = await API.post("/session/reschedule", payload);
    return data;
  } catch (e) {
    console.error("reSchedule error:", e);
    return { success: false, message: e.response?.data?.message || e.message || "Failed to reschedule session" };
  }
};

export const makePayment = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    const { data } = await API.post("/student/payment/razorpay", payload);
    return data;
  } catch (e) {
    console.error("makePayment error:", e);
    return { success: false, message: e.response?.data?.message || "Payment initialization failed" };
  }
};

export const getCurrentTeachers = (stuid) => async (dispatch) => {
  console.log(stuid)
  try {
    let API = createAxios();
    const { data } = await API.get(`/student/currentTeachers/${stuid}`);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};
export const cancelVideoSession = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    console.log(payload, "payload");
    const { data } = await API.post("/student/cancelSession", payload);
    console.log(data, "DaTA");
    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};
export const updateSessionRefund = (payload) => async (dispatch) => {
  try {
    let API = createAxios();

    console.log(payload, "payload");
    const { data } = await API.post("/student/updateRefund", payload);
    console.log(data, "DaTA");
    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};



