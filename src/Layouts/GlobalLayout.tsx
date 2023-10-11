import { ReactNode } from "react";
import Footer from "./Footer";
import "./GlobalLayout.scss";
import Header from "./Header";
interface Props {
  children: ReactNode;
}

export default function GlobalLayout({ children }: Props) {
  return (
    <>
      <Header />
      <div className="main_container">{children}</div>
      <Footer />
    </>
  );
}
