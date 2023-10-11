import { MENU_LIST } from "../constants/MenuItem";

export default function Header() {
  return (
    <header>
      <h1>홈</h1>
      <ul>
        {MENU_LIST.map((v) => (
          <li>{v}</li>
        ))}
      </ul>
    </header>
  );
}
