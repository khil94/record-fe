import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { NavigateFunction } from "react-router-dom";
import API from "../api/api";
import { PostRefresh } from "../api/apis";
import { IError } from "../types/types";
import useAuth from "./useAuth";

const SetupInterceptors = (navigate: NavigateFunction) => {
  const { logout } = useAuth();
  const [once, setOnce] = useState(true);
  if (once) {
    API.interceptors.response.use(
      (config: AxiosResponse) => {
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
                    return axios.request(config);
                  }
                } catch (e) {
                  await logout();
                  navigate("/");
                  return Promise.reject(e);
                }
              } else {
                navigate("/login");
              }
              break;
            case 1003:
              navigate("/email_auth", { state: { isValid: true } });
              break;
            case 1005:
              try {
                if (
                  `Bearer ${refToken}` ===
                  API.defaults.headers.common["Authorization"]
                ) {
                  throw new Error("refresh toekn expired");
                }
                API.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${refToken}`;
                const resp = await PostRefresh();
                API.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${resp.data.accessToken}`;
                if (config) {
                  config.headers.Authorization = `Bearer ${resp.data.accessToken}`;
                  return await axios.request(config);
                }
              } catch (e) {
                await logout();
                navigate("/");

                return config;
              }
              break;
            default:
          }
        }
        return Promise.reject(e);
      }
    );
    setOnce(false);
  }
};

export default SetupInterceptors;
