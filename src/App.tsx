import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalLayout from "./Layouts/GlobalLayout";
import AuthRouter from "./components/AuthRouter";
import EmailAuthPage from "./pages/EmailAuthPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import RankingPage from "./pages/RankingPage";
import RegisterPage from "./pages/RegisterPage";
import SummonerPage from "./pages/SummonerPage";
import NavigateComp from "./utils/NavigateComp";

function App() {
  return (
    <BrowserRouter>
      <GlobalLayout>
        <NavigateComp />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/summoner/:summonerName/:tagName"
            element={<SummonerPage />}
          />
          <Route path="/summoner/:id" element={<SummonerPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route
            path="/test"
            element={<AuthRouter children={<RankingPage />} />}
          />
          <Route
            path="login"
            element={<AuthRouter reverse children={<LoginPage />} />}
          />
          <Route
            path="register"
            element={<AuthRouter reverse children={<RegisterPage />} />}
          />
          <Route
            path="/email_auth"
            element={<AuthRouter children={<EmailAuthPage />} />}
          />
          <Route
            path="/mypage"
            element={<AuthRouter children={<MyPage />} />}
          />
        </Routes>
      </GlobalLayout>
    </BrowserRouter>
  );
}

export default App;
