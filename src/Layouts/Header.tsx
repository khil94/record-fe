import { Link } from "react-router-dom";
import { MENU_LIST } from "../constants/MenuItem";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header" id="header">
      <div className="header_inner">
        <h1>
          <Link to="/">홈</Link>
        </h1>
        <nav className="navbar">
          <ul>
            {MENU_LIST.map((v) => (
              <li>
                <Link to="">{v}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
