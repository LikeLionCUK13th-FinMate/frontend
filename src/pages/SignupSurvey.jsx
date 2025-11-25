import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import styles from "./SignupPage.module.css";
import SignUpKeywords from "./SignupKeywords";

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
        id: "keyword"
      },
    ],
    []
  );

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const current = steps[step];

  // 1, 2단계용 선택 값
  const selected = answers[current.id] ?? "";

  // 다음 단계로 이동하는 공통 함수
  const goNext = (data) => {
    // 각 단계의 데이터를 answers에 병합
    setAnswers((prev) => ({ ...prev, [current.id]: data }));

    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      setIsComplete(true);
    }
  };

  // 1, 2단계에서 '다음' 버튼 클릭 핸들러
  const handleRadioNext = () => {
    goNext(selected);
  };

  // 1, 2단계 선택 핸들러
  const handleRadioSelect = (value) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  // 완료 화면
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
      <SignUpKeywords
        onNext={(selectedKeywords) => goNext(selectedKeywords)}
        onSkip={() => goNext([])} // 건너뛰기 시 빈 배열 저장 후 다음으로
      />
    );
  }

  // 기본 설문 화면 (1단계, 2단계)
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
