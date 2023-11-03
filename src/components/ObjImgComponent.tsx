import { useState } from "react";
import "./ObjImgComponent.scss";

interface IProp {
  name: string;
  description: string;
  image: string;
}

export default function ObjImgComponent({ name, description, image }: IProp) {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <>
      <img
        onMouseEnter={() => setShowDesc(true)}
        onMouseLeave={() => setShowDesc(false)}
        src={image}
        alt={name}
      />
      {showDesc && (
        <div className="obj_description">
          <span className="obj_name">{name}</span>
          <span>{description}</span>
        </div>
      )}
    </>
  );
}
