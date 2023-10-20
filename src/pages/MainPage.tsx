import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import "./MainPage.scss";

export default function MainPage() {
  const [searchVal, setSearchVal] = useState("");
  const navigation = useNavigate();

  return (
    <div className="page_main">
      <SearchInput
        value={searchVal}
        onSubmit={() => {
          const val = searchVal.trim();
          navigation(`summoner/${val}`);
        }}
        placeholder="소환사 검색"
        onChange={(v) => setSearchVal(v)}
      />
    </div>
  );
}
