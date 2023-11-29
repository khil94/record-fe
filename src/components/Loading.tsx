import "./Loading.scss";

interface IProp extends React.HTMLAttributes<HTMLImageElement> {
  width?: number;
}

export default function Loading({ width, ...rest }: IProp) {
  return (
    <div className="Loading_Wrapper">
      <img width={width} {...rest} alt="loading" src="/Loading.gif" />
    </div>
  );
}
