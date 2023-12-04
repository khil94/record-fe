import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_CONFIG = {
  baseURL: import.meta.env.VITE_LOLSTAT_BASE_URL,
  headers: {
    "Cache-Control": "max-age=60",
    "Content-Type": "application/json",
  },
};

const API = axios.create(API_CONFIG);

const ErrorHandler = (err: AxiosError) => {
  console.log("err", err);
  return Promise.reject(err);
};

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log("request");
  return config;
}, ErrorHandler);

export default API;
