import { useEffect, useState } from "react";
import API from "../api/api";
import useUser from "./useUser";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(
    localStorage.getItem("user") ? true : false
  );
  const { mutate } = useUser();

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
    const cookie = localStorage.getItem("user");
    if (cookie) {
      login();
    } else {
      setIsAuth(false);
    }
  }, [localStorage.getItem("user")]);

  return { isAuth, login, logout };
};
