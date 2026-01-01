import axios from "axios";
import { baseURL } from "../../../utils/api";

// ──────────────────────────────────────────────────────────────
// Reusable Axios instance factories
// ──────────────────────────────────────────────────────────────
const createTeacherAxios = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const token = profile?.token?.access;

  return axios.create({
    baseURL: `${baseURL}/teacher`,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

const createReviewAxios = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const token = profile?.token?.access;

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

// ──────────────────────────────────────────────────────────────
// DASHBOARD - Quick numbers (students count, sessions, earnings, avg rating, etc)
// ──────────────────────────────────────────────────────────────
export const getTeacherDashNums = () => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.get("/dashboard/numbers"); // ← change endpoint if different

    return data;
  } catch (error) {
    console.error("Failed to fetch dashboard numbers:", error);
    throw error?.response?.data || { message: "Unable to load dashboard statistics" };
  }
};

// ──────────────────────────────────────────────────────────────
// PROFILE
// ──────────────────────────────────────────────────────────────
export const getTeacherData = () => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.get("/detail");

    // Optional: keep in localStorage for quick access
    localStorage.setItem("teacherData", JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Failed to fetch teacher details:", error);
    throw error?.response?.data || { message: "Failed to load teacher profile" };
  }
};

export const updateTeacherProfile = (profileData) => async () => {
  try {
    const API = createTeacherAxios();

    // If you're sending files (photo) use FormData and uncomment this:
    // const response = await API.post("/updateProfile", profileData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });

    const { data } = await API.post("/updateProfile", profileData);

    // Optional: update local storage after success
    // if (data.updated) {
    //   localStorage.setItem("teacherData", JSON.stringify(data.updated));
    // }

    return data;
  } catch (error) {
    console.error("Profile update failed:", error);
    throw error?.response?.data || { message: "Failed to update profile" };
  }
};

// ──────────────────────────────────────────────────────────────
// TEACHER DETAILS / LOOKUP
// ──────────────────────────────────────────────────────────────
export const getTeacherDetailById = (uid) => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.get(`/userId/${uid}`);
    return data;
  } catch (error) {
    console.error("getTeacherDetailById error:", error);
    throw error?.response?.data || { message: "Teacher not found" };
  }
};

export const getTeacherDetailByTId = (tid) => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.get(`/teacherId/${tid}`);
    return data;
  } catch (error) {
    console.error("getTeacherDetailByTId error:", error);
    throw error?.response?.data || { message: "Teacher not found" };
  }
};

// ──────────────────────────────────────────────────────────────
// SESSIONS & CLASSES
// ──────────────────────────────────────────────────────────────
export const getTeacherSessions = () => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.get("/sessions");
    return data;
  } catch (error) {
    console.error("getTeacherSessions error:", error);
    throw error?.response?.data || { message: "Failed to load sessions" };
  }
};

export const getUpcomingClassForTeacher = () => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.get("/upcomingClass");
    return data;
  } catch (error) {
    console.error("getUpcomingClassForTeacher error:", error);
    throw error?.response?.data?.message || "Failed to load upcoming classes";
  }
};

// ──────────────────────────────────────────────────────────────
// RATINGS / REVIEWS
// ──────────────────────────────────────────────────────────────
export const updateRatings = (
  audioRating,
  videoRating,
  teacherRating,
  comments,
  sessionID,
  teacherId,
  studentId
) => async () => {
  try {
    const API = createReviewAxios();

    const payload = {
      courseId: sessionID,
      teacherId,
      audio_rating: audioRating,
      video_rating: videoRating,
      teacher_rating: teacherRating,
      userId: studentId,
      comments,
    };

    const { data } = await API.post("/review/addTeacherReview", payload);

    return data;
  } catch (error) {
    console.error("updateRatings error:", error);
    throw error?.response?.data || { message: "Failed to submit review" };
  }
};

// ──────────────────────────────────────────────────────────────
// AVAILABILITY
// ──────────────────────────────────────────────────────────────
export const addAvailability = (payload) => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.post("/addAvailability", payload);
    return data;
  } catch (error) {
    console.error("addAvailability error:", error);
    throw error?.response?.data || { message: "Failed to add availability" };
  }
};

export const editAvailability = (payload) => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.post("/editAvailability", payload);
    return data;
  } catch (error) {
    console.error("editAvailability error:", error);
    throw error?.response?.data || { message: "Failed to update availability" };
  }
};

// ──────────────────────────────────────────────────────────────
// COURSE
// ──────────────────────────────────────────────────────────────
export const updateCourse = (payload) => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.post("/updateCourse", payload);
    return data;
  } catch (error) {
    console.error("updateCourse error:", error);
    throw error?.response?.data || { message: "Failed to update course" };
  }
};

// ──────────────────────────────────────────────────────────────
// EARNINGS & WALLET
// ──────────────────────────────────────────────────────────────
export const getTeacherEarnings = () => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.get("/allMyEarnigs"); // typo? should be "allMyEarnings" ?
    return data;
  } catch (error) {
    console.error("getTeacherEarnings error:", error);
    throw error?.response?.data || { message: "Failed to load earnings" };
  }
};

export const getTeacherWithdrawals = () => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.get("/getAllMyPayouts");
    return data;
  } catch (error) {
    console.error("getTeacherWithdrawals error:", error);
    throw error?.response?.data || { message: "Failed to load withdrawals" };
  }
};

export const getTeacherWallet = () => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.get("/getMyBalance");
    return data;
  } catch (error) {
    console.error("getTeacherWallet error:", error);
    throw error?.response?.data || { message: "Failed to load wallet balance" };
  }
};

export const getTeacherTodayEarnings = () => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.get("/getTodayEarnings");
    return data;
  } catch (error) {
    console.error("getTeacherTodayEarnings error:", error);
    throw error?.response?.data || { message: "Failed to load today's earnings" };
  }
};

export const getTeacherPendingEarnings = () => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.get("/getTeacherPendingEarnings");
    return data;
  } catch (error) {
    console.error("getTeacherPendingEarnings error:", error);
    throw error?.response?.data || { message: "Failed to load pending earnings" };
  }
};

export const getTeacherAlreadyWithdrawn = () => async () => {
  try {
    const API = createTeacherAxios();
    const { data } = await API.get("/getTeacherAlreadyWithdrawn");
    return data;
  } catch (error) {
    console.error("getTeacherAlreadyWithdrawn error:", error);
    throw error?.response?.data || { message: "Failed to load withdrawal history" };
  }
};
