import axios from "axios";

const axiosInstanceFormData = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Change to your API URL
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default axiosInstanceFormData;
