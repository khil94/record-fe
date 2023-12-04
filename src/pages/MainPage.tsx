import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import {
  addRecentSearchVal,
  deleteRecentSearchVal,
} from "../utils/generalFunctions";
import "./MainPage.scss";

export default function MainPage() {
  const [searchVal, setSearchVal] = useState("");
  const [showRecent, setShowRecent] = useState(false);
  const navigation = useNavigate();
  const [recentSearchVal, setRecentSearchVal] = useState<string[]>(
    localStorage.getItem("recent")
      ? JSON.parse(localStorage.getItem("recent")!)
      : []
  );

  function RecentSearch({ val }: { val: string }) {
    return (
      <div
        onMouseDown={() => {
          navigation(`summoner/${val}`);
        }}
        className="recent_search_val"
      >
        <span>{val}</span>
        <span
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setRecentSearchVal(
              recentSearchVal.filter((v: string) => v !== val)
            );
            deleteRecentSearchVal(val);
          }}
          className="delete_recent"
        >
          X
        </span>
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
      {showRecent && recentSearchVal.length > 0 && (
        <div className={`recent_search_val_wrapper`}>
          <div className="recent_search_info">최근 검색 목록</div>
          <div className="recent_search_val_container">
            {recentSearchVal.map((v: string) => {
              return <RecentSearch key={v} val={v} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
