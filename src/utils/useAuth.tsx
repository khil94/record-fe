import { useEffect, useState } from "react";
import API from "../api/api";
import useUser from "./useUser";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>();
  const { mutate } = useUser();
  const cookie = localStorage.getItem("user");

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
    API.defaults.headers.common["Authorization"] = ``;
    localStorage.removeItem("user");
    mutate({ email: "", accessToken: "" });
  };

  useEffect(() => {
    if (cookie) {
      login();
    } else {
      setIsAuth(false);
    }
  }, [cookie]);

  return { isAuth, login, logout };
};
