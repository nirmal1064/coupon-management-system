import axios from "axios";

//const baseURL = import.meta.env.VITE_BACKEND_HOST;

const baseURL = "http://localhost:8000";

const API = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-type": "application/json" }
});

export default API;
