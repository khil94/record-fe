import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../utils/useAuth";

interface IProp {
  children: ReactNode;
  reverse?: boolean;
}

function getXOR(a: boolean, b: boolean) {
  if (!a && b) {
    return true;
  }
  if (a && !b) {
    return true;
  }
  return false;
}

export default function AuthRouter({ children, reverse = false }: IProp) {
  const { data } = useAuth();

  return getXOR(data?.auth || false, reverse) ? (
    <>{children}</>
  ) : (
    <Navigate to={"/login"} />
  );
}
