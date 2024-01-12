import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PutVerifyEmail } from "../api/apis";
import CommonModal from "../components/CommonModal";
import StyledInput from "../components/StyledInput";
import { IError } from "../types/types";
import "./EmailAuthPage.scss";

export default function EmailAuthPage() {
  const [authNum, setAuthNum] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const loc = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    if (!loc.state) {
      navigator("/");
    }
  }, [loc.state]);

  return (
    <div className="email_auth_page_wrapper">
      <h1>이메일 인증</h1>
      <div className="subtitle">
        <span>이메일 인증이 완료되지 않은 계정입니다.</span>
        <span>먼저 이메일 인증을 완료해 주세요.</span>
        <span>로그인 하신 이메일에 확인 메일이 전송되었습니다.</span>
      </div>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await PutVerifyEmail(authNum);
              navigator("/");
            } catch (e) {
              if (axios.isAxiosError<IError>(e)) {
                switch (e.response?.data.errorCode) {
                  case 9000:
                    setMsg("인증번호가 잘못되었습니다. 다시 확인해주세요.");
                    break;
                  case 1004:
                    setMsg(
                      "인증번호의 유효기간이 만료되었습니다. 재발급된 메일을 확인해주세요."
                    );
                    break;
                  default:
                    setMsg("이메인 인증에 실패하였습니다. 다시 확인해주세요.");
                    break;
                }
              }
              setShowModal(true);
            }
          }}
        >
          <StyledInput
            onChange={(e) => setAuthNum(e.target.value.trim())}
            value={authNum}
            label="인증 번호"
          />
          <button type="submit">제출하기</button>
        </form>
      </div>
      <CommonModal
        showModal={showModal}
        title="인증 실패"
        message={msg}
        onDisapppear={() => setShowModal(false)}
      />
    </div>
  );
}
