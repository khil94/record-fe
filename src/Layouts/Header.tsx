import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import { MENU_LIST } from "../constants/Enum";
import { addRecentSearchVal, makeTagName } from "../utils/generalFunctions";
import userAuth from "../utils/useAuth";
import { useOnClickOutside } from "../utils/useOnClickOutside";
import "./Header.scss";

export default function Header() {
  const [searchVal, setSearchVal] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  const { data, logout } = userAuth();
  const navigation = useNavigate();

  useOnClickOutside(ref, () => setShowDropdown(false));

  const UserComponent = () => {
    return (
      <div
        onClick={() => {
          data?.auth ? setShowDropdown(!showDropdown) : navigation("/login");
        }}
        className="user_wrapper"
        ref={ref}
      >
        <span>{data?.auth ? "메뉴" : "로그인"}</span>
        <div className={`user_dropdown ${showDropdown ? "show" : ""}`}>
          <div
            onClick={() => {
              navigation("/mypage");
            }}
          >
            마이페이지
          </div>
          <div
            onClick={() => {
              logout();
              navigation("/login");
            }}
          >
            로그아웃
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="header" id="header">
      <div className="header_inner">
        <h1>
          <Link to="/">
            <img src="/logo.png" width={44} />
          </Link>
        </h1>
        <div className="header_content">
          <nav className="navbar">
            <ul>
              {MENU_LIST.map((v) => (
                <li key={`menu_key_${v}`}>
                  <Link to={`/${v.toLowerCase()}`}>{v}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header_right_wrapper">
            <SearchInput
              value={searchVal}
              onSubmit={() => {
                const { name, tag } = makeTagName(searchVal);
                setSearchVal("");
                addRecentSearchVal(name, tag);
                navigation(`summoner/${name}/${tag}`);
              }}
              placeholder="소환사 검색"
              onChange={(v) => setSearchVal(v)}
            />
            <UserComponent />
          </div>
        </div>
      </div>
    </header>
  );
}
