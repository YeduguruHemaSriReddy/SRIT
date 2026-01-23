// src/api.js
import axios from "axios";

// Point all API calls to your deployed backend on Render
const API = axios.create({
  baseURL: "https://srit-7gpl.onrender.com", // your Render backend URL
});

export default API;
