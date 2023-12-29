import { useNavigate } from "react-router-dom";
import SetupInterceptors from "./SetupInterceptors";
export default function NavigateComp() {
  const navigator = useNavigate();

  SetupInterceptors(navigator);

  return <></>;
}
