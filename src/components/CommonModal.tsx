import { useEffect, useState } from "react";
import "./CommonModal.scss";

interface IProp {
  showModal: boolean;
  title: string;
  message: string;
  width?: number;
  height?: number;
  onDisapppear?: () => void;
}

export default function CommonModal({
  showModal,
  title,
  message,
  width,
  height,
  onDisapppear = () => {},
}: IProp) {
  const [show, setShow] = useState(showModal);

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  return show ? (
    <div
      onClick={() => {
        setShow(false);
        onDisapppear();
      }}
      className="modal_outer_wrapper"
    >
      <div
        style={{ width: width, height: height }}
        className="modal_inner_wrapper"
      >
        <span className="modal_title">{title}</span>
        <span className="modal_body">{message}</span>
      </div>
    </div>
  ) : (
    <></>
  );
}
