import useSWRMutation from "swr";
import { IUser } from "../types/types";
export const USER_KEY = "/user-data";

export default function useUser() {
  const { data, mutate } = useSWRMutation<IUser>(USER_KEY, {
    fallbackData: {
      email: localStorage.getItem("user") || "",
    },
  });

  return { data, mutate };
}
