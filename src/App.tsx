import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalLayout from "./Layouts/GlobalLayout";
import AuthRouter from "./components/AuthRouter";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RankingPage from "./pages/RankingPage";
import SummonerPage from "./pages/SummonerPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/summoner/:summonerName/:tagName"
            element={<SummonerPage />}
          />
          <Route path="/ranking" element={<RankingPage />} />
          <Route
            path="/test"
            element={<AuthRouter children={<RankingPage />} />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage/>}/>
        </Routes>
      </GlobalLayout>
    </BrowserRouter>
  );
}

export default App;
