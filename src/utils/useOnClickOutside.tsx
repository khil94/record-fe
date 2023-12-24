import { RefObject } from "react";

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  const listener = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      handler(e);
    }
  };
  document.addEventListener(mouseEvent, listener);
}
