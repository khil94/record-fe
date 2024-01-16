import { ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";
import { getXOR } from "../utils/generalFunctions";
import useAuth from "../utils/useAuth";

interface IProp {
  children: ReactNode;
  reverse?: boolean;
}

export default function AuthRouter({ children, reverse = false }: IProp) {
  const { data } = useAuth();
  const [show, setShow] = useState(getXOR(data?.auth || false, reverse));
  return show ? <>{children}</> : <Navigate to={"/login"} />;
}
