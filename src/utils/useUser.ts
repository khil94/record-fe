import useSWR from "swr";
export const USER_KEY = "/user-data";

export default function useUser() {
  const { data, mutate } = useSWR(USER_KEY, {
    fallbackData: {
      email: "",
      accesssKey: "",
    },
  });

  return { data, mutate };
}
