import useSWRMutation from "swr";
import { IUserInfo } from "../types/types";
export const USER_KEY = "/user-data";

export default function useUser() {
  const { data, mutate } = useSWRMutation<IUserInfo>(USER_KEY, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  return { data, mutate };
}
