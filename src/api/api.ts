import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// const API_CONFIG = {
//   baseURL: URL,
// };

const API = axios.create();

const ErrorHandler = (err: AxiosError) => {
  console.log("err", err);
  return Promise.reject(err);
};

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log("request");
  return config;
}, ErrorHandler);

export default API;
