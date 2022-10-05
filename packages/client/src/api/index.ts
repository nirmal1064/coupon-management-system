import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_HOST;

const headers = { "Content-type": "application/json" };

const API = axios.create({ baseURL, withCredentials: true, headers });

export default API;
