import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import styles from "./SignupPage.module.css";
import SignupKeywords from "./SignupKeywords";
import { registerUser } from "../api/auth";

export default function SignupSurvey() {
  const navigate = useNavigate();
  const steps = useMemo(
    () => [
      {
        id: "level",
        question: ["현재 나의 ", "금융 지식 수준", "은", "어느 정도인가요?"],
        options: [
          "초급 기본 용어만 이해",
          "기본 간단한 금융상품 이해",
          "중급 투자 경험 있음",
          "상급 포트폴리오 구성 가능",
          "전문가 심화 금융지식 보유",
        ],
      },
      {
        id: "tendency",
        question: ["나의 ", "투자 성향", "을", "선택해주세요"],
        options: [
          "안정형",
          "안정추구형",
          "위험중립형",
          "적극투자형",
          "공격투자형",
        ],
      },
      {
        id: "keyword",
      },
    ],
    []
  );

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const current = steps[step];
  const selected = answers[current.id] ?? "";

  const goNext = (data) => {
    const newAnswers = { ...answers, [current.id]: data };
    setAnswers(newAnswers);

    if (step < steps.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    // 마지막 단계(키워드) 완료 -> 회원가입 수행
    submitRegistration(newAnswers);
  };

  const handleRadioNext = () => {
    goNext(selected);
  };

  const handleRadioSelect = (value) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  async function submitRegistration(allAnswers) {
    console.log("설문 답변:", allAnswers);

    try {
      // registerUser가 세션 스토리지 처리와 매핑을 모두 담당
      await registerUser(allAnswers);

      setIsComplete(true);
      alert("회원가입 완료! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {
      alert(err.message || "회원가입 중 오류가 발생했습니다.");
    }
  }

  if (isComplete) {
    return (
      <div className={styles.container}>
        <div className={styles.completeBox}>
          <img src="/success.png" alt="회원가입 완료" />
          <div className={styles.textBox}>
            <p className={styles.completeTitle}>
              <span>회원가입</span>이 <span>완료</span>되었어요!
            </p>
            <p className={styles.completeText}>편하게 대화할 수 있는</p>
            <p className={styles.completeText}>금융 친구가 되어드릴게요</p>
          </div>
          <button
            type="button"
            className={styles.btn}
            onClick={() => navigate("/")}
          >
            바로 로그인하기
          </button>
        </div>
      </div>
    );
  }

  if (current.id === "keyword") {
    return (
      <div className={styles.container}>
        <SignupKeywords
          onNext={(selectedKeywords) => goNext(selectedKeywords)}
          onSkip={() => goNext([])}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.pageTitle}>회원가입</p>

      <div className={styles.questionBox}>
        <p className={styles.question}>
          {current.question[0]}
          <span>{current.question[1]}</span>
          {current.question[2]}
          <br />
          {current.question[3]}
        </p>
      </div>

      <div className={styles.optionForm}>
        {current.options.map((label, i) => {
          const [first, ...rest] = label.split(" ");
          return (
            <label key={i} className={styles.option}>
              <input
                type="radio"
                name={current.id}
                value={label}
                checked={selected === label}
                onChange={(e) => handleRadioSelect(e.target.value)}
              />
              <span>
                <strong className={styles.levelText}>{first}</strong>{" "}
                {rest.join(" ")}
              </span>
            </label>
          );
        })}
      </div>

      <button
        type="button"
        className={`${styles.btn} ${styles.nextBtn}`}
        onClick={handleRadioNext}
        disabled={!selected}
      >
        다음
      </button>
    </div>
  );
}