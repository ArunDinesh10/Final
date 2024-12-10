import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://final-1-wo0z.onrender.com/api", // Updated to the deployed backend URL
  headers: {
    "Content-Type": "application/json",
  },
});
