import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage"; // 개인정보
import ChatbotPage from "./pages/ChatbotPage";
import ModInvestTypePage from "./pages/ModInvestTypePage"; // 개인정보 - 투자 성향 수정
import ModKnowledgeLevelPage from "./pages/ModKnowledgeLevelPage"; // 개인정보 - 금융지식 수준 수정
import ManageKeywordsPage from "./pages/ManageKeywordsPage"; // 개인정보 - 관심 키워드 관리
import TermsNConditionsPage from "./pages/TermsNConditionsPage"; // 개인정보 - 약관 보기

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
          <Route path="/mypage/mod-investment-type" element={<ModInvestTypePage />} />
          <Route path="/mypage/mod-knowledge-level" element={<ModKnowledgeLevelPage />} />
          <Route path="/mypage/manage-keywords" element={<ManageKeywordsPage />} />
          <Route path="/mypage/terms-n-conditions" element={<TermsNConditionsPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App