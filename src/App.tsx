import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalLayout from "./Layouts/GlobalLayout";
import MainPage from "./pages/MainPage";
import SummonerPage from "./pages/SummonerPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/summoner/:summonerName" element={<SummonerPage />} />
        </Routes>
      </GlobalLayout>
    </BrowserRouter>
  );
}

export default App;
