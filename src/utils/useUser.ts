import useSWRImmutable from "swr";
import API from "../api/api";
import { PostRefresh } from "../api/apis";
import { IUser } from "../types/types";
export const USER_KEY = "/user-data";

export default function useUser() {
  const fetcher: () => Promise<IUser> = async () => {
    const refreshToken = localStorage.getItem("user");
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

  const { data, mutate } = useSWRImmutable<IUser>(USER_KEY, fetcher, {
    fallbackData: {
      auth:
        API.defaults.headers.common["Authorization"] !== undefined ||
        localStorage.getItem("user")
          ? true
          : false,
    },
    revalidateOnFocus: false,
  });

  const logout = async () => {
    API.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("user");
    await mutate({ auth: false });
  };

  const login = async () => {
    await mutate({ auth: true });
  };

  return { data, logout, login };
}
