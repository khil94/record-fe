import "./LoginPage.scss";

export default function LoginPage() {
  return (
    <div className="login_page_wrapper">
      <div className="login_form_wrapper">
        <form>
          <input type="email" placeholder="이메일" />
          <input type="password" placeholder="비밀번호" />
          <button type="submit">제출</button>
        </form>
      </div>
    </div>
  );
}
