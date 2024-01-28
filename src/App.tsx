import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalLayout from "./Layouts/GlobalLayout";
import AuthRouter from "./components/AuthRouter";
import EmailAuthPage from "./pages/EmailAuthPage";
import FindDuoPage from "./pages/FindDuoPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
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
            path="login"
            element={
              <AuthRouter key={"LOGIN"} reverse children={<LoginPage />} />
            }
          />
          <Route
            path="register"
            element={
              <AuthRouter
                key={"REGISTER"}
                reverse
                children={<RegisterPage />}
              />
            }
          />
          <Route
            path="/email_auth"
            element={
              <AuthRouter key={"EMAILAUTH"} children={<EmailAuthPage />} />
            }
          />
          <Route
            path="/duo"
            element={<AuthRouter children={<FindDuoPage key={`DUO`} />} />}
          />
        </Routes>
      </GlobalLayout>
    </BrowserRouter>
  );
}

export default App;
