import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";

const IS_MOCK = true;
const MOCK_ACCOUNT = {
  userId: "test",
  password: "1234"
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(!(id && pw));
  }, [id, pw])

  async function handleLogin() {
    if (IS_MOCK) {
      if (id === MOCK_ACCOUNT.userId && pw === MOCK_ACCOUNT.password) {
        alert("로그인 성공!");
        navigate("/chatbot");
      } else {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.\n시연용 계정: test / 1234");
      }
      return;
    }

    try {
      const res = await fetch("/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id, password: pw }),
      });

      let payload = {};
      try {
        payload = await res.json();
      } catch {
        payload = {};
      }

      if (!res.ok) {
        const msg = payload.message || (res.status === 401
          ? "아이디 또는 비밀번호가 올바르지 않습니다."
          : "로그인 중 오류가 발생했습니다.");
        alert(msg);
        return;
      }

      const token = payload.data
      if (!token) {
        alert("로그인 응답에 토큰이 없습니다.");
        return;
      }

      localStorage.setItem("token", token);
      alert("로그인 성공!");
      navigate("/chatbot");
    } catch (err) {
      console.error("로그인 요청 실패:", err);
      alert("서버 연결 실패");
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
    </div>
  );
}