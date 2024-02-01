import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DeleteUser } from "../api/apis";
import CommonModal from "../components/CommonModal";
import SearchInput from "../components/SearchInput";
import { MENU_LIST } from "../constants/Enum";
import { addRecentSearchVal, makeTagName } from "../utils/generalFunctions";
import userAuth from "../utils/useAuth";
import { useOnClickOutside } from "../utils/useOnClickOutside";
import "./Header.scss";

export default function Header() {
  const [searchVal, setSearchVal] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showErrDeleteUserModal, setErrShowDeleteUserModal] = useState(false);

  const { data, logout } = userAuth();
  const navigator = useNavigate();

  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowDropdown(false));

  const deleteUser = async () => {
    try {
      await DeleteUser();
      await logout();
      navigator("/login");
    } catch {
      setErrShowDeleteUserModal(true);
    }
  };

  const UserComponent = () => {
    return (
      <div
        onClick={() => {
          data?.auth ? setShowDropdown(!showDropdown) : navigator("/login");
        }}
        className="user_wrapper"
        ref={ref}
      >
        <span>{data?.auth ? "메뉴" : "로그인"}</span>
        <div className={`user_dropdown ${showDropdown ? "show" : ""}`}>
          {/* <div
            onClick={() => {
              navigation("/mypage");
            }}
          >
            마이페이지
          </div> */}
          <div
            onClick={() => {
              logout();
              navigator("/login");
            }}
          >
            로그아웃
          </div>
          <div
            onClick={() => {
              const answer = confirm("정말로 탈퇴하시겠습니까?");
              if (answer) {
                deleteUser();
              }
            }}
          >
            회원탈퇴
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
                <li key={`menu_key_${v.name}`}>
                  <Link to={`/${v.url.toLowerCase()}`}>{v.name}</Link>
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
                navigator(`summoner/${name}/${tag}`);
              }}
              placeholder="소환사 검색"
              onChange={(v) => setSearchVal(v)}
            />
            <UserComponent />
          </div>
        </div>
        <CommonModal
          showModal={showErrDeleteUserModal}
          title="회원탈퇴 실패"
          message="회원탈퇴에 실패하였습니다. 잠시 후 다시 시도해주세요."
          onDisapppear={() => setErrShowDeleteUserModal(false)}
        />
      </div>
    </header>
  );
}
