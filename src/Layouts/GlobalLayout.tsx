import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function GlobalLayout({ children }: Props) {
  return <div>{children}</div>;
}
