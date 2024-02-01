import "./StyledInput.scss";

interface IProp extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  err?: boolean;
  errMsg?: string;
  label: string;
  value: string;
  mode?: "common" | "dark";
}

export default function StyledInput({
  onChange,
  required = false,
  value,
  err,
  errMsg,
  mode = "common",
  label = "",

  ...rest
}: IProp) {
  return (
    <div className="input_outer_wrapper">
      <div className={`input_wrapper ${mode === "common" ? "" : "dark"}`}>
        <input
          className={`${value.length === 0 ? "" : !err ? "valid" : "invalid"}`}
          onChange={onChange}
          required={required}
          value={value}
          {...rest}
          id={`styled_input_${label}`}
        />
        <label htmlFor="styled_input">{label}</label>
        {err && value.length > 0 && <span className="error_msg">{errMsg}</span>}
      </div>
    </div>
  );
}
