import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import { PostLogin } from "../api/apis";
import CommonModal from "../components/CommonModal";
import useUser from "../utils/useUser";
import "./LoginPage.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigator = useNavigate();
  const { mutate } = useUser();

  async function HandleLogin() {
    try {
      const resp = await PostLogin(email, pwd);
      await localStorage.setItem("user", resp.data.refreshToken);
      API.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${resp.data.accessToken}`;
      mutate({
        email: email,
        accessToken: resp.data.accessToken,
      });
      navigator("/");
    } catch {
      setShowModal(true);
      resetForm();
    }
  }

  function resetForm() {
    setEmail("");
    setPwd("");
  }

  return (
    <div className="login_page_wrapper">
      <div className="logo_wrapper">
        <img src="logo.png" width={88} />
      </div>
      <div className="login_form_wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            HandleLogin();
          }}
          id="login_form"
          className="login_form"
        >
          <div className="input_wrapper">
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              id="login_email"
            />
            <label htmlFor="login_email">이메일</label>
          </div>
          <div className="input_wrapper">
            <input
              onChange={(e) => setPwd(e.target.value)}
              required
              id="login_password"
              type="password"
            />
            <label htmlFor="login_password">비밀번호</label>
          </div>
        </form>
        <button form="login_form" className="btn_submit" type="submit">
          로그인
        </button>
        <Link to="/register">
          <button className="btn_register" type="button">
            회원가입{" "}
          </button>
        </Link>
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
      <CommonModal
        showModal={showModal}
        title="로그인 실패"
        message="로그인 오류가 발생했습니다. 정보를 다시 확인해주세요."
        onDisapppear={() => {
          resetForm();
          setShowModal(false);
        }}
      />
    </div>
  );
}
