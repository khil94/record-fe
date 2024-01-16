import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getXOR } from "../utils/generalFunctions";
import useAuth from "../utils/useAuth";

interface IProp {
  children: ReactNode;
  reverse?: boolean;
}

export default function AuthRouter({ children, reverse = false }: IProp) {
  const { data } = useAuth();

  return getXOR(data?.auth || false, reverse) ? (
    <>{children}</>
  ) : (
    <Navigate to={"/login"} />
  );
}
