import axios from "axios";

// Set up the base URL globally
const axiosInstance = axios.create({
  baseURL: "https://personal-resource-tracker-api.onrender.com/",
});

export default axiosInstance;
