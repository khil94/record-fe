import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import { MENU_LIST } from "../constants/Enum";
import "./Header.scss";

export default function Header() {
  const [searchVal, setSearchVal] = useState("");
  const navigation = useNavigate();

  return (
    <header className="header" id="header">
      <div className="header_inner">
        <h1>
          <Link to="/">홈</Link>
        </h1>
        <div className="header_content">
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
            value={searchVal}
            onSubmit={() => {
              const val = searchVal.trim();
              setSearchVal("");
              navigation(`summoner/${val}`);
            }}
            placeholder="소환사 검색"
            onChange={(v) => setSearchVal(v)}
          />
        </div>
      </div>
    </header>
  );
}
