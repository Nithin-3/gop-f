import axios from "axios";
import { baseURL } from "../../../utils/api";

function createAxios(){
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  return axios.create({
    baseURL: `${baseURL}/course`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token && token.access}`,
    },
  });
}

// console.log(token.access)

export const getCourseById = (courseId) => async (dispatch) => {
  try{
    let API = createAxios()
    const {data} = await API.get(`/${courseId}`)
    return data
  } catch(error){
    console.log(error)
    return error.response.message;
  }
}


export const getTeacherRatings = (teacherId) => async (dispatch) => {
  try {
    let API = createAxios();
    console.log(teacherId, "courseId");
    const  data  = await API.get(`/teacher_ratings/${teacherId}`);
    console.log("datadata : ", data);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};


export const createCourse = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

    console.log(payload, "payload");
    const { data } = await API.post("/createCourse", payload);
    console.log(data, "DaTA");
    // dispatch({ type: "Create_Course", payload: { ...data } });
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const getMyCourses = (tid) => async (dispatch) => {
  try {
    let API = createAxios()

    // console.log(payload, 'payload')
    const { data } = await API.get(`/getCourseByTeacher/${tid}`);
    return data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const updateCourse = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

    // console.log(payload, 'payload')
    const { data } = await API.post("/updateCourse", payload);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const deleteCourse = (payload)=>async(dispatch)=>{
  try {
    let API = createAxios()

    // console.log(payload, 'payload')
    const { data } = await API.post("/deleteCourse", payload);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export const getCourseData = (payload) => async (dispatch) => {
  try {
    let API = createAxios()

    // console.log(payload, 'payload')
    const { data } = await API.get("/courseData?courseId=61daca14245835d2f54d4b58");
    return data;
  } catch (e) {
    console.log(e);
    return e.response.message;
  }
};

export const getTeacherDashNums = (payload) => async(dispacth) => {
  try{
    let API = createAxios()
    const data = API.get("/getnums")
    return data;
  } catch(error){
    console.log(error)
    return error.response.message;
  }
}

