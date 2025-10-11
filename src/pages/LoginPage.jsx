import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const mockUser = { id: "test", pw: "1234" };

  useEffect(() => {
    if (id && pw) {
      setIsDisabled(false); //로그인 버튼 활성화
    } else {
      setIsDisabled(true); //비활성화
    }
  }, [id, pw])

  function handleLogin() {
    if (id === mockUser.id && pw === mockUser.pw) {
      alert("Mock User 로그인 성공!");
      navigate("/chatbot");
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  }

  return (
    <div className="container">
      <p className={styles.serviceSlogan}>나만의 금융 친구</p>
      <p className={styles.serviceName}>핀메이트</p>
      <form className={styles.loginBox}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}>
        <input type="text" placeholder="아이디" className={styles.inputBox} value={id} onChange={e => setId(e.target.value)}></input>
        <input type="password" placeholder="비밀번호" className={styles.inputBox} value={pw} onChange={e => setPw(e.target.value)}></input>
        <button type="submit" className={`${styles.btn} ${styles.loginBtn}`} disabled={isDisabled}>로그인</button>
      </form>

      <div className={styles.signupBox}>
        <p className={styles.signupGuide}>핀메이트가 처음이신가요?</p>
        <button className={styles.btn} onClick={() => navigate("/signup")}>회원가입</button>
      </div>

      <button onClick={() => navigate("/mypage")}>마이페이지</button>
      <button onClick={() => navigate("/chatbot")}>챗봇</button>
    </div>
  );
}