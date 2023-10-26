import "./SearchInput.scss";

interface Props {
  onChange: (v: string) => void;
  value: string;
  placeholder?: string;
  onSubmit: () => void;
  type?: "default" | "dark";
}

export default function SearchInput({
  onChange,
  onSubmit,
  placeholder,
  value,
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
          value={value}
          className="search_input"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="btn_search" type="submit">
          <i /> {/*필히 검색 돋보기 모양 나중에 넣을것 */}
        </button>
      </form>
    </div>
  );
}
