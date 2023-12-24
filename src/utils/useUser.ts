import useSWR from "swr";
import { IUser } from "../types/types";
export const USER_KEY = "/user-data";

export default function useUser() {
  const { data, mutate } = useSWR<IUser>(USER_KEY, {
    fallbackData: {
      email: "",
      accessToken: "",
    },
  });

  return { data, mutate };
}
