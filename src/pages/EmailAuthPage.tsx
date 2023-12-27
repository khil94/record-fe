import { useState } from "react";
import useUser from "../utils/useUser";
import "./EmailAuthPage.scss";

export default function EmailAuthPage() {
  const [authNumSent, setAuthNumSent] = useState(false);
  const { data } = useUser();

  return (
    <div className="email_auth_page_wrapper">
      <h1>이메일 인증이 필요합니다.</h1>
      <div>
        <form>
          <input disabled={!authNumSent} placeholder="인증 번호" />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (authNumSent) {
                setAuthNumSent(false);
              } else {
                setAuthNumSent(true);
              }
            }}
            type={authNumSent ? "submit" : "button"}
          >
            {authNumSent ? "남은 시간" : "인증키 발송"}
          </button>
        </form>
      </div>
    </div>
  );
}
