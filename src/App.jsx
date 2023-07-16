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
import Footer from "./components/Footer";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

function App() {
  return (
      <BrowserRouter>
      <main>
                <>
                    <Header/>
                    <div className="container">
                        <Routes>
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login" element={<LogInPage />} />
                            <Route path="/FAQ" element={<FAQ />} />
                            <Route path="/history" element={<HistoryPage />} />
                            <Route path="/partners" element={<PartnersPage />} />
                            <Route path="/reserves" element={<ReservesPage />} />
                            <Route path='/terms' element={<TermsPage/>}/>
                            <Route path='/privacy' element={<PrivacyPage/>}/>
                            <Route path="/" element={<MainPage />} />
                        </Routes>
                        </div>
                </>
    </main>
    <Footer/>
      </BrowserRouter>
  );
}
export default App;
