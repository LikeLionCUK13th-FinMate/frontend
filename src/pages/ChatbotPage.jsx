import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChatbotPage.module.css";

const formatDate = (ts) => {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
};

const formatTime = (ts) => {
  return new Date(ts).toLocaleTimeString("ko-KR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ChatbotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    // 초기 챗봇 메세지
    {
      id: 1,
      role: "bot",
      text: "안녕하세요! 무엇을 도와드릴까요?",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState(""); // 유저가 입력한 글
  const [user, setUser] = useState({
    nickname: "사용자",
    image: "/profile.png",
  }); // 유저 정보 상태
  const listRef = useRef(null);
  const endRef = useRef(null);

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser({
            nickname: data.nickname,
            image: data.optionalProfile?.profileImageUrl,
          });
        }
      } catch (error) {
        // console.error("유저 정보를 불러오는데 실패했습니다:", error);
        // 에러 시 기본값 다시 설정
        setUser({
          nickname: "사용자",
          image: "/profile.png",
        });
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date().toISOString();
    const userMsg = { id: Date.now(), role: "user", text, createdAt: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // 임시 응답
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        role: "bot",
        text: "ETF는 여러 종목을 한 바구니처럼 묶어서 만든 '분산 투자'용 상품이고, 주식처럼 거래시간에 사고팔 수 있어요.\n초보자도 시장 전체 흐름에 투자하는 데 활용할 수 있지만, 변동성과 수수료도 함께 고려해야 해요.\n한국 시장 기준으로 지수 추종형·테마형 등 종류가 다양해요.\n\n어떤 관점에서 ETF를 이해하고 싶나요? (예: 구조, 위험, 종류, 사고파는 법 등)",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const rows = [];
  let lastDate = "";
  messages.forEach((m) => {
    const dateHeader = formatDate(m.createdAt);
    if (dateHeader !== lastDate) {
      rows.push(
        <div key={`date-${dateHeader}`} className={styles.dateDivider}>
          <span className={styles.dateChip}>{dateHeader}</span>
        </div>
      );
      lastDate = dateHeader;
    }

    rows.push(
      <div
        key={m.id}
        className={`${styles.row} ${
          m.role === "user" ? styles.me : styles.bot
        }`}
      >
        {m.role === "bot" && (
          <img src="/chatbot.png" alt="챗봇" className={styles.botImage} />
        )}
        <div className={styles.bubbleWrapper}>
          <div className={styles.bubble}>{m.text}</div>
          <span className={styles.time}>{formatTime(m.createdAt)}</span>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img
          src={user.image}
          alt="image"
          className={styles.image}
          onClick={() => {
            navigate("/mypage");
          }}
        />
        <p className={styles.nickname}>{user.nickname}</p>
      </header>

      <main className={styles.chatArea} ref={listRef}>
        {rows}
        <div ref={endRef} />
      </main>

      <form
        className={styles.inputBar}
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <textarea
          className={styles.input}
          placeholder="메시지를 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
        />
        <button className={styles.send} type="submit" disabled={!input.trim()}>
          전송
        </button>
      </form>
    </div>
  );
}
