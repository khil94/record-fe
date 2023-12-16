import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProp {
  children: ReactNode;
}

export default function AuthRouter({ children }: IProp) {
  const [isAuth, setIsAuth] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    const cookie = localStorage.getItem("test");
    if (cookie) {
      setIsAuth(true);
    } else {
      navigator("/login");
    }
  }, []);

  return isAuth ? <>{children}</> : <></>;
}
