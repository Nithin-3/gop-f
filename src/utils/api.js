// export const baseURL = "http://localhost:8000"; // Localhost

export const baseURL = "https://gop-b.onrender.com"; // Production
// export const baseURL =
//   "http://ec2-13-232-71-109.ap-south-1.compute.amazonaws.com/api"; // AWS

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return config;
};
