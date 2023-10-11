import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalLayout from "./Layouts/GlobalLayout";

function App() {
  return (
    <BrowserRouter>
      <GlobalLayout>
        <Routes>
          <Route path="/" element={<>메인</>} />
        </Routes>
      </GlobalLayout>
    </BrowserRouter>
  );
}

export default App;
