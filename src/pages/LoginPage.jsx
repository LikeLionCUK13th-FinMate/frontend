import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>로그인 화면</h2>
      <h4>개발용 페이지 바로가기</h4>
      <button onClick={() => navigate("/signup")}>회원가입</button>
      <button onClick={() => navigate("/mypage")}>마이페이지</button>
      <button onClick={() => navigate("/chatbot")}>챗봇</button>
    </div>
  );
}