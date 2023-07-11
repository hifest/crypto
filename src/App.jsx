import RegisterPage from "./pages/RegisterPage";
import "./scss/main.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogInPage from "./pages/LogInPage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LogInPage />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
