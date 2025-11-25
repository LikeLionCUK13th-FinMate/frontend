import { useState } from "react";
import styles from "./SignUpKeywords.module.css";

// 부모(SignupSurvey)에서 전달받은 onNext, onSkip 함수 사용
const SignupKeywords = ({ onNext, onSkip }) => {
  // 상태 관리
  const [selectedRecommends, setSelectedRecommends] = useState([]);
  const [myKeywords, setMyKeywords] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const recommendList = [
    "예금",
    "적금",
    "ETF",
    "부동산",
    "국내투자",
    "해외투자",
  ];

  const toggleRecommend = (keyword) => {
    if (selectedRecommends.includes(keyword)) {
      setSelectedRecommends(selectedRecommends.filter((k) => k !== keyword));
    } else {
      setSelectedRecommends([...selectedRecommends, keyword]);
    }
  };

  const handleAddKeyword = () => {
    if (inputValue.trim() === "") return;
    if (
      !myKeywords.includes(inputValue) &&
      !selectedRecommends.includes(inputValue)
    ) {
      setMyKeywords([...myKeywords, inputValue]);
    }
    setInputValue("");
  };

  const handleRemoveKeyword = (keyword) => {
    setMyKeywords(myKeywords.filter((k) => k !== keyword));
  };

  // '다음' 버튼 클릭 시 부모에게 데이터 전달
  const handleNextClick = () => {
    const allKeywords = [...selectedRecommends, ...myKeywords];
    onNext(allKeywords);
  };

  return (
    <div className={styles.container}>
      <p className={styles.pageTitle}>회원가입</p>

      <div className={styles.questionBox}>
        <p className={styles.question}>
          더 많은 정보를 알고싶은
          <br />
          <span>금융 키워드</span>를
          선택해주세요
        </p>
      </div>

      {/* 1. 추천 키워드 섹션 */}
      <div className={styles.section}>
        <p className={styles.label}>추천 키워드</p>
        <div className={styles.gridContainer}>
          {recommendList.map((keyword) => {
            const isSelected = selectedRecommends.includes(keyword);
            return (
              <button
                key={keyword}
                onClick={() => toggleRecommend(keyword)}
                className={`${styles.chipButton} ${
                  isSelected ? styles.chipSelected : ""
                }`}
              >
                {keyword}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 나의 키워드 섹션 */}
      <div className={styles.section}>
        <p className={styles.label}>나의 키워드</p>
        <div className={styles.tagsContainer}>
          {myKeywords.map((keyword) => (
            <div key={keyword} className={styles.tag}>
              {keyword}
              <button
                onClick={() => handleRemoveKeyword(keyword)}
                className={styles.tagCloseBtn}
              >
                X
              </button>
            </div>
          ))}
        </div>

        {/* 입력창 & 등록 버튼 */}
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="관심 키워드"
            className={styles.input}
          />
          <button onClick={handleAddKeyword} className={styles.keywordBtn}>
            등록하기
          </button>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className={styles.footer}>
        <button className={styles.nextButton} onClick={handleNextClick}>
          다음
        </button>
        <button className={styles.skipButton} onClick={onSkip}>
          나중에 선택할래요
        </button>
      </div>
    </div>
  );
};

export default SignupKeywords;