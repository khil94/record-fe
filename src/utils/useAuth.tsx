import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
  };

  useEffect(() => {
    const cookie = localStorage.getItem("test");
    if (cookie) {
      login();
    } else {
      logout();
    }
  }, []);

  return { isAuth, login, logout };
};
