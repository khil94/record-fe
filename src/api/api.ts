import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { IError } from "../types/types";
import { PostRefresh } from "./apis";

const API_CONFIG = {
  baseURL: import.meta.env.VITE_LOLSTAT_BASE_URL,
  withCredentials: true,
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
  return config;
}, ErrorHandler);

API.interceptors.response.use(
  (config: AxiosResponse) => {
    console.log("response");

    return config;
  },
  async (e: AxiosError) => {
    const { config } = e;
    if (axios.isAxiosError<IError>(e)) {
      const refToken = localStorage.getItem("user");
      switch (e.response?.data.errorCode) {
        case 1002:
          if (refToken) {
            try {
              API.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${refToken}`;
              const resp = await PostRefresh();
              API.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${resp.data.accessToken}`;
              if (config) {
                config.headers.Authorization = `Bearer ${resp.data.accessToken}`;
                return (await axios.request(config)).data;
              }
            } catch (e) {
              localStorage.removeItem("user");
              window.location.href = "/";
              return config;
            }
          } else {
            window.location.href = "/login";
          }
          break;
        case 1003:
          window.location.href = "/email_auth";
          break;
        case 1005:
          try {
            if (
              `Bearer ${refToken}` ===
              API.defaults.headers.common["Authorization"]
            ) {
              throw new Error("refresh toekn expired");
            }
            API.defaults.headers.common["Authorization"] = `Bearer ${refToken}`;
            const resp = await PostRefresh();
            API.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${resp.data.accessToken}`;
            if (config) {
              config.headers.Authorization = `Bearer ${resp.data.accessToken}`;
              return await axios.request(config);
            }
          } catch (e) {
            localStorage.removeItem("user");
            window.location.href = "/";
            return config;
          }
          break;
        default:
      }
    }
    return Promise.reject(e);
  }
);

export default API;
