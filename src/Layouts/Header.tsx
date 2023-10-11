import { MENU_LIST } from "../constants/MenuItem";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header" id="header">
      <div className="header_inner">
        <h1>
          <a href="/">홈</a>
        </h1>
        <nav className="navbar">
          <ul>
            {MENU_LIST.map((v) => (
              <li>
                <a href="">{v}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
