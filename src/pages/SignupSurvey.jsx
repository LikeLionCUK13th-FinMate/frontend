import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import styles from "./SignupPage.module.css";

export default function SignupSurvey() {
    const navigate = useNavigate();
    const steps = useMemo(() => [
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
            question: ["더 많은 정보를 알고 싶은\n", "금융 키워드", "를 ", "선택해주세요"],
            options: [
                "예금", "적금", "ETF", "부동산", "국내투자", "해외투자" // 임시
            ],
        },
    ], []);

    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isComplete, setIsComplete] = useState(false);

    const current = steps[step];
    const selected = answers[current.id] ?? "";
    const isLast = step === steps.length - 1;
    const isNextDisabled = !selected;


    const handleSelect = (value) => {
        setAnswers((prev) => ({ ...prev, [current.id]: value }));
    };

    const handleNext = () => {
        if (!isLast) {
            setStep((s) => s + 1);
        } else {
            setIsComplete(true);
        }
    };

    // 완료 화면
    if (isComplete) {
        return (
            <div className={styles.container} >
                <div className={styles.completeBox}>
                    <img src="/success.png" alt="회원가입 완료"/>
                    
                    <div className={styles.textBox}>
                        <p className={styles.completeTitle}><span>회원가입</span>이 <span>완료</span>되었어요!</p>
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

    // 설문 화면
    return (
        <div className={styles.container}>
            <p className={styles.pageTitle}>회원가입</p>

            <div className={styles.questionBox}>
                <p className={styles.question}>
                    {current.question[0]}
                    <span className={styles.highlight}>{current.question[1]}</span>
                    {current.question[2]}
                    {current.id != "keyword" && <br />}
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
                                onChange={(e) => handleSelect(e.target.value)}
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
                onClick={handleNext}
                disabled={isNextDisabled}
            >
                다음
            </button>
        </div>
    );
}