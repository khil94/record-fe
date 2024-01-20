import parse from "html-react-parser";
import React, { useState } from "react";
import "./ObjImgComponent.scss";

interface IProp extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: string;
  description: string;
  src: string;
}

export default function ObjImgComponent({
  name,
  description,
  src,
  ...rest
}: IProp) {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className="obj_wrapper">
      <img
        onMouseEnter={() => setShowDesc(true)}
        onMouseLeave={() => setShowDesc(false)}
        src={src}
        alt={name}
        {...rest}
      />
      {showDesc && description && (
        <div className="obj_description">
          <span className="obj_name">{name}</span>
          <span>{parse(description)}</span>
        </div>
      )}
    </div>
  );
}
