import { useState } from "react";
import SearchInput from "../components/SearchInput";
import "./MainPage.scss";

export default function MainPage() {
  const [searchVal, setSearchVal] = useState("");
  return (
    <div className="page_main">
      <SearchInput
        onSubmit={() => {
          console.log(searchVal);
        }}
        onChange={(v) => setSearchVal(v)}
      />
    </div>
  );
}
