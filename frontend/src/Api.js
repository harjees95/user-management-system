import axios from "axios";

const API = axios.create({
  baseURL: "https://user-management-backend-0278.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;   // raw token (your backend expects this)
  return req;
});

export default API;
