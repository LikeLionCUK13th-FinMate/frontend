import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import ChatbotPage from "./pages/ChatbotPage";
import SignupSurvey from "./pages/SignupSurvey";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/survey" element={<SignupSurvey />} />
        </Routes>
      </Router>
    </>
  )
}

export default App