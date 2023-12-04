import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import { addRecentSearchVal } from "../utils/generalFunctions";
import "./MainPage.scss";

export default function MainPage() {
  const [searchVal, setSearchVal] = useState("");
  const [showRecent, setShowRecent] = useState(false);
  const navigation = useNavigate();
  const recentSearchVal = localStorage.getItem("recent")
    ? JSON.parse(localStorage.getItem("recent")!)
    : [];

  function RecentSearch({ val }: { val: string }) {
    return (
      <div className="recent_search_val">
        <span>{val}</span>
        <span>X</span>
      </div>
    );
  }

  return (
    <div className="page_main">
      <SearchInput
        value={searchVal}
        onSubmit={() => {
          const val = searchVal.trim();
          addRecentSearchVal(val);
          navigation(`summoner/${val}`);
        }}
        onFocus={() => {
          setShowRecent(true);
        }}
        onBlur={() => {
          setShowRecent(false);
        }}
        placeholder="소환사 검색"
        onChange={(v) => setSearchVal(v)}
      />
      {showRecent && (
        <div className="recent_search_val_wrapper">
          <div className="recent_search_info">최근 검색 목록</div>
          <div className="recent_search_val_container">
            {recentSearchVal.map((v) => {
              return <RecentSearch val={v} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
