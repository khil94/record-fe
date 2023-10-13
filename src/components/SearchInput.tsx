import "./SearchInput.scss";

interface Props {
  onChange: (v: string) => void;
  placeholder?: string;
  onSubmit: () => void;
  type?: "default" | "dark";
}

export default function SearchInput({
  onChange,
  onSubmit,
  placeholder,
}: Props) {
  return (
    <div className="search_box">
      <form
        action="search"
        className="search_form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          type="text"
          required
          className="search_input"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="btn_search" type="submit">
          <i />
        </button>
      </form>
    </div>
  );
}
