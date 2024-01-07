import { useState } from "react";
import "./ObjImgComponent.scss";

interface IProp extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: string;
  description: string;
  image: string;
}

export default function ObjImgComponent({ name, description, ...rest }: IProp) {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div>
      <img
        onMouseEnter={() => setShowDesc(true)}
        onMouseLeave={() => setShowDesc(false)}
        src={rest.src}
        alt={name}
        {...rest}
      />
      {showDesc && (
        <div className="obj_description">
          <span className="obj_name">{name}</span>
          <span>{description}</span>
        </div>
      )}
    </div>
  );
}
