import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(
    localStorage.getItem("user") ? true : false
  );
  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const cookie = localStorage.getItem("user");
    if (cookie) {
      login();
    } else {
      setIsAuth(false);
    }
  }, []);

  return { isAuth, login, logout };
};
