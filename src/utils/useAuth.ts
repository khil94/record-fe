import useSWRImmutation from "swr/immutable";
import API from "../api/api";
import { IUser } from "../types/types";
export const USER_KEY = "/auth-data";

export default function useAuth() {
  const { data, mutate } = useSWRImmutation<IUser>(USER_KEY, {
    fallbackData: {
      auth:
        API.defaults.headers.common["Authorization"] !== undefined ||
        localStorage.getItem("user")
          ? true
          : false,
    },
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
