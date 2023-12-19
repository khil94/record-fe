import { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.scss";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div className="register_page_wrapper">
      <div className="logo_wrapper">
        <img src="logo.png" width={88} />
        <div>회원가입</div>
      </div>
      <div className="register_form_wrapper">
        <form id="register_form" className="register_form">
          <div className="input_wrapper">
            <input required id="register_email" />
            <label htmlFor="register_email">이메일</label>
          </div>
          <div className="input_wrapper">
            <input required id="register_password" type="password" />
            <label htmlFor="register_password">비밀번호</label>
          </div>
          <div className="input_wrapper">
            <input required id="register_password" type="password" />
            <label htmlFor="register_password">비밀번호 확인</label>
          </div>
        </form>
        <button form="register_form" className="btn_submit" type="submit">
          회원가입
        </button>
        
      </div>
    </div>
  );
}
