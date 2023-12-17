import "./LoginPage.scss";

export default function LoginPage() {
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
          제출
        </button>
      </div>
    </div>
  );
}
