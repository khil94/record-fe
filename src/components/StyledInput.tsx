import "./StyledInput.scss";

interface IProp extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  err?: boolean;
  errMsg?: string;
  label?: string;
  value: string;
}

export default function StyledInput({
  onChange,
  required = false,
  value,
  err,
  errMsg,
  label = "",
  ...rest
}: IProp) {
  return (
    <div className="input_wrapper">
      <input
        className={`${value.length === 0 ? "" : !err ? "valid" : "invalid"}`}
        onChange={onChange}
        required={required}
        value={value}
        {...rest}
        id="styled_input"
      />
      <label htmlFor="styled_input">{label}</label>
      {err && value.length > 0 && <span className="error_msg">{errMsg}</span>}
    </div>
  );
}
