import RegisterPage from "./pages/RegisterPage";
import "./scss/main.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogInPage from "./pages/LogInPage";
import {MainPage} from "./pages/MainPage";
import Header from "./components/Header";
import FAQ from "./pages/FAQ";
import HistoryPage from "./pages/HistoryPage";
import PartnersPage from "./pages/PartnersPage";
import ReservesPage from "./pages/ReservesPage";

function App() {
  return (
      <>
                <BrowserRouter>
                    <Header/>
                    <div className="container">
                        <Routes>
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login" element={<LogInPage />} />
                            <Route path="/FAQ" element={<FAQ />} />
                            <Route path="/history" element={<HistoryPage />} />
                            <Route path="/partners" element={<PartnersPage />} />
                            <Route path="/reserves" element={<ReservesPage />} />
                            <Route path="/" element={<MainPage />} />
                        </Routes>
                        </div>
                </BrowserRouter>
    </>
  );
}
export default App;
