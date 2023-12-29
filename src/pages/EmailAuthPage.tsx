import { useState } from "react";
import StyledInput from "../components/StyledInput";
import "./EmailAuthPage.scss";

export default function EmailAuthPage() {
  const [authNum, setAuthNum] = useState("");

  return (
    <div className="email_auth_page_wrapper">
      <h1>이메일 인증</h1>
      <div className="subtitle">
        <span>이메일 인증이 완료되지 않은 계정입니다.</span>
        <span>먼저 이메일 인증을 완료해 주세요</span>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <StyledInput
            onChange={(e) => setAuthNum(e.target.value)}
            value={authNum}
            label="인증 번호"
          />
          <button type="submit">제출하기</button>
        </form>
      </div>
    </div>
  );
}
