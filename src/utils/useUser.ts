import useSWRMutation from "swr";
import API from "../api/api";
import { PostRefresh } from "../api/apis";
import { IUser } from "../types/types";
export const USER_KEY = "/user-data";

export default function useUser() {
  const accessToken = API.defaults.headers.common["Authorization"];
  const refreshToken = localStorage.getItem("user");
  const fetcher: () => Promise<IUser> = async () => {
    try {
      if (refreshToken) {
        API.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
        const resp = await PostRefresh();
        API.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${resp.data.accessToken}`;
        return { auth: true };
      } else {
        throw new Error("");
      }
    } catch {
      return { auth: false };
    }
  };

  const { data, mutate } = useSWRMutation<IUser>(USER_KEY, fetcher, {
    fallbackData: {
      auth: accessToken !== undefined || refreshToken ? true : false,
    },
    suspense: true,
  });

  const logout = () => {
    mutate({ auth: false });
    API.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("user");
  };

  const login = () => {
    mutate({ auth: true });
  };

  return { data, logout, login };
}
