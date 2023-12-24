import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

interface IProp {
  children: ReactNode;
  reverse?: boolean;
}

export default function AuthRouter({ children, reverse = false }: IProp) {
  const { isAuth } = useAuth();
  const navigator = useNavigate();

  useEffect(() => {
    if (isAuth && reverse) {
      navigator("/");
    }
  }, []);

  return <>{children}</>;
}
