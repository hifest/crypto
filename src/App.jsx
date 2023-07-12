import RegisterPage from "./pages/RegisterPage";
import "./scss/main.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogInPage from "./pages/LogInPage";
import {MainPage} from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LogInPage />} />
            <Route path="/" element={<MainPage />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
