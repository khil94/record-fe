import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalLayout from "./Layouts/GlobalLayout";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </GlobalLayout>
    </BrowserRouter>
  );
}

export default App;
