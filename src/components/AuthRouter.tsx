import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../utils/useUser";

interface IProp {
  children: ReactNode;
  reverse?: boolean;
}

export default function AuthRouter({ children, reverse = false }: IProp) {
  const { data } = useUser();
  const navigator = useNavigate();

  useEffect(() => {
    if (data?.auth && reverse) {
      navigator("/");
    }
    if (!data?.auth && !reverse) {
      navigator("/");
    }
  }, [data?.auth, reverse]);

  return <>{children}</>;
}
