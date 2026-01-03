import axios from "axios";

// CRA environment variable (NOT VITE)
const baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL,
  // ❌ DO NOT set Content-Type here
  // Axios will set it automatically:
  // - application/json for JSON
  // - multipart/form-data for FormData
});

export default api;
