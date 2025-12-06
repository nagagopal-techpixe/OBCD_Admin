import axios from "axios";

let url;

if (import.meta.env.MODE == "development") {
  url = import.meta.env.VITE_API_BASE_URL;
} else {
  url = import.meta.env.VITE_API_BASE_URL;
}

export const API = axios.create({
  baseURL: url,
});

export const buildImageUrl = (image) => {
  return `${url}/${image?.replace("\\", "/")}`;
};

API.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
