import { useNavigate } from "react-router-dom";
import "./ErrorPage.scss";
export default function ErrorPage() {
  const navigator = useNavigate();
  return (
    <div className="err_page_wrapper">
      <div className="">
        <div className="err_page_title">
          요청하신 페이지를 찾을 수 없습니다.
        </div>
        <div className="err_page_content">
          <p>
            방문하신 페이지의 주소가 잘못되었거나 페이지가 삭제 또는 변경되어
            <br />
            요청하신 페이지를 찾을 수 없습니다.
          </p>
          <p>입력하신 주소가 정확한지 다시 확인해주세요.</p>
          <p></p>
        </div>
        <div className="err_page_btn_wrapper">
          <button
            onClick={() => {
              navigator(-1);
            }}
            type="button"
          >
            뒤로가기
          </button>
          <button
            onClick={() => {
              navigator("/");
            }}
            type="button"
          >
            홈
          </button>
        </div>
      </div>
    </div>
  );
}
