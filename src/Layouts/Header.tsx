import { useState } from "react";
import { Link } from "react-router-dom";
import { GetGameListBySummonerName } from "../api/apis";
import SearchInput from "../components/SearchInput";
import { MENU_LIST } from "../constants/MenuItem";
import "./Header.scss";

export default function Header() {
  const [searchVal, setSearchVal] = useState("");

  return (
    <header className="header" id="header">
      <div className="header_inner">
        <h1>
          <Link to="/">홈</Link>
        </h1>
        <nav className="navbar">
          <ul>
            {MENU_LIST.map((v) => (
              <li key={`menu_key_${v}`}>
                <Link to="">{v}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <SearchInput
          onSubmit={async () => {
            const val = searchVal.trim();
            const resp = await GetGameListBySummonerName(val);
            console.log(resp.data);
          }}
          placeholder="소환사 검색"
          onChange={(v) => setSearchVal(v)}
        />
      </div>
    </header>
  );
}
