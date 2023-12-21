import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostRegister } from "../api/apis";
import CommonModal from "../components/CommonModal";
import "./RegisterPage.scss";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [emailValid, setEmailVaild] = useState(false);
  const [pwdValid, setPwdValid] = useState(false);
  const [pwdCheckValid, setPwdCheckValid] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigator = useNavigate();

  // 이메일 에러 판정
  useEffect(() => {
    if (email.length > 0 && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailVaild(true);
    } else {
      setEmailVaild(false);
    }
  }, [email]);

  // 비밀번호 에러 판정
  useEffect(() => {
    if (pwd.length > 0 && pwd.length >= 8 && pwd.length <= 16) {
      setPwdValid(true);
    } else {
      setPwdValid(false);
    }
  }, [pwd, pwdCheck]);

  // 비밀번호 확인 에러 판정
  useEffect(() => {
    if (pwdCheck.length > 0 && pwd === pwdCheck) {
      setPwdCheckValid(true);
    } else {
      setPwdCheckValid(false);
    }
  }, [pwd, pwdCheck]);

  async function HandleRegister() {
    try {
      await PostRegister(email, pwd, pwdCheck);
      navigator("/login");
    } catch {
      setShowModal(true);
    }
  }

  function resetForm() {
    setEmail("");
    setPwd("");
    setPwdCheck("");
  }

  return (
    <div className="register_page_wrapper">
      <div className="logo_wrapper">
        <img src="logo.png" width={88} />
        <div>회원가입</div>
      </div>
      <div className="register_form_wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            HandleRegister();
          }}
          id="register_form"
          className="register_form"
        >
          <div className="input_wrapper">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={`${
                email.length === 0 ? "" : emailValid ? "valid" : "invalid"
              }`}
              type="email"
              id="register_email"
              value={email}
            />
            <label htmlFor="register_email">이메일</label>
            {!emailValid && email.length > 0 && (
              <span className="error_msg">이메일 형식에 맞게 써주세요.</span>
            )}
          </div>
          <div className="input_wrapper">
            <input
              onChange={(e) => {
                setPwd(e.target.value.trim());
              }}
              className={`${
                pwd.length === 0 ? "" : pwdValid ? "valid" : "invalid"
              }`}
              id="register_password"
              value={pwd}
              maxLength={16}
              type="password"
            />
            <label htmlFor="register_password">비밀번호</label>
            {!pwdValid && pwd.length > 0 && (
              <span className="error_msg">비밀번호는 8~16자리로 해주세요.</span>
            )}
          </div>
          <div className="input_wrapper">
            <input
              onChange={(e) => {
                setPwdCheck(e.target.value.trim());
              }}
              className={`${
                pwdCheck.length === 0 ? "" : pwdCheckValid ? "valid" : "invalid"
              }`}
              id="register_password_check"
              value={pwdCheck}
              maxLength={16}
              type="password"
            />
            <label htmlFor="register_password_check">비밀번호 확인</label>
            {!pwdCheckValid && pwdCheck.length > 0 && (
              <span className="error_msg">
                비밀번호 확인이 비밀번호와 같지 않습니다.
              </span>
            )}
          </div>
        </form>
        <button
          disabled={!emailValid || !pwdValid || !pwdCheckValid}
          form="register_form"
          className="btn_submit"
          type="submit"
        >
          회원가입
        </button>
      </div>
      <CommonModal
        showModal={showModal}
        title={"회원가입 오류"}
        message={
          "회원가입 과정에서 오류가 발생했습니다. 중복된 아이디 이거나 입력된 정보가 정확하지 않을 수 있습니다."
        }
        onDisapppear={() => {
          resetForm();
          setShowModal(false);
        }}
      />
    </div>
  );
}
