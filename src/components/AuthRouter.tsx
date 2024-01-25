import { ReactNode, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getXOR } from "../utils/generalFunctions";
import useAuth from "../utils/useAuth";

interface IProp {
  children: ReactNode;
  reverse?: boolean;
}

export default function AuthRouter({ children, reverse = false }: IProp) {
  const { data } = useAuth();
  const navigator = useNavigate();
  const [show, setShow] = useState(getXOR(data?.auth || false, reverse));

  useEffect(() => {
    if (!show) {
      navigator("/");
    }
  }, []);
  return show ? <>{children}</> : <Navigate to={"/login"} replace />;
}
