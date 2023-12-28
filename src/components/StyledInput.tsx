import "./StyledInput.scss";

interface IProp {
  onChange: (v: string) => void;
  required?: boolean;
  value: string;
}

export default function StyledInput({
  onChange,
  required = false,
  value,
}: IProp) {
  return (
    <div className="input_wrapper">
      <input
        onChange={(e) => onChange(e.target.value)}
        required={required}
        id="styled_input"
      />
      <label htmlFor="styled_input">{value}</label>
    </div>
  );
}
