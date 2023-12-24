import { useEffect, useState } from "react";
import API from "../api/api";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(
    localStorage.getItem("user") ? true : false
  );
  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
    API.defaults.headers.common["Authorization"] = ``;
    localStorage.removeItem("user");
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
