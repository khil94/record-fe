import useSWRMutation from "swr";
import API from "../api/api";
import { IUser } from "../types/types";
export const USER_KEY = "/user-data";

export default function useUser() {
  const { data, mutate } = useSWRMutation<IUser>(USER_KEY, {
    fallbackData: {
      auth:
        API.defaults.headers.common["Authorization"] !== undefined ||
        localStorage.getItem("user")
          ? true
          : false,
    },
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
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
