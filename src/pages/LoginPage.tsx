import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div className="login_page_wrapper">
      <div className="logo_wrapper">
        <img src="logo.png" width={88} />
      </div>
      <div className="login_form_wrapper">
        <form id="login_form" className="login_form">
          <div className="input_wrapper">
            <input required id="login_email" />
            <label htmlFor="login_email">이메일</label>
          </div>
          <div className="input_wrapper">
            <input required id="login_password" type="password" />
            <label htmlFor="login_password">비밀번호</label>
          </div>
        </form>
        <button form="login_form" className="btn_submit" type="submit">
          로그인
        </button>
        <div className="extra_option_wrapper">
          <Link to="/">
            <span>아이디 찾기</span>
          </Link>
          <span>/</span>
          <Link to={"/"}>
            <span>비밀번호 찾기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
