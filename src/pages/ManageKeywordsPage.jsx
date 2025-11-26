import { useState } from "react";
import styles from "./ManageKeywordsPage.module.css";
import GoBack from "../components/GoBack.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // X 아이콘을 사용하기 위해

// NOTE: FontAwesomeIcon을 사용하려면 해당 라이브러리가 프로젝트에 설치되어 있어야 합니다.
// 설치 예: npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core

export default function ManageKeywordsPage() {
  // 1. 추천 키워드 목록 및 상태 관리
  const initialRecommended = [
    { id: 'DEPOSIT', label: '예금', isSelected: true }, // 피그마처럼 '예금'은 초기 선택
    { id: 'SAVINGS', label: '적금', isSelected: false },
    { id: 'ETF', label: 'ETF', isSelected: false },
    { id: 'REALTY', label: '부동산', isSelected: false },
    { id: 'DOMESTIC', label: '국내투자', isSelected: false },
    { id: 'OVERSEAS', label: '해외투자', isSelected: true }, // 피그마처럼 '해외투자'는 초기 선택
  ];
  const [recommendedKeywords, setRecommendedKeywords] = useState(initialRecommended);
  
  // 2. 사용자 지정 (나의 키워드) 목록 및 상태 관리
  const [myKeywords, setMyKeywords] = useState(['비트코인']); // 피그마처럼 '비트코인'은 초기 등록
  const [newKeyword, setNewKeyword] = useState(''); // 입력 필드 값

  // 추천 키워드 선택/해제 토글 핸들러
  const handleToggleRecommended = (id) => {
    setRecommendedKeywords(prev =>
      prev.map(keyword =>
        keyword.id === id
          ? { ...keyword, isSelected: !keyword.isSelected }
          : keyword
      )
    );
  };

  // 새로운 키워드 등록 핸들러
  const handleRegisterKeyword = (e) => {
    e.preventDefault();
    const trimmedKeyword = newKeyword.trim();
    if (trimmedKeyword && !myKeywords.includes(trimmedKeyword)) {
      setMyKeywords(prev => [...prev, trimmedKeyword]);
      setNewKeyword(''); // 입력 필드 초기화
    } else if (myKeywords.includes(trimmedKeyword)) {
      alert("이미 등록된 키워드입니다.");
    }
  };

  // 나의 키워드 삭제 핸들러
  const handleDeleteMyKeyword = (keywordToDelete) => {
    setMyKeywords(prev => prev.filter(keyword => keyword !== keywordToDelete));
  };
  
  // 최종 저장 핸들러
  const handleSave = (e) => {
    e.preventDefault();
    
    // 선택된 추천 키워드 ID 추출
    const selectedRecommendedIds = recommendedKeywords
      .filter(k => k.isSelected)
      .map(k => k.id);
      
    // 최종 저장할 키워드 목록
    const finalKeywords = [...selectedRecommendedIds, ...myKeywords];
    
    if (finalKeywords.length === 0) {
       alert("선택된 키워드가 없습니다.");
       return;
    }

    // TODO: 백엔드 연동 (finalKeywords 전송)
    // ex) await saveKeywords(finalKeywords)
    alert(`최종 저장 키워드: ${finalKeywords.join(', ')}`);
  };

  // 키워드 버튼 렌더링 함수
  const renderKeywordButton = (keyword, isSelected, isDeletable = false, onDelete) => {
    const isCustom = keyword.id ? false : true; // 추천 키워드가 아니면 사용자 지정 키워드
    const buttonClass = isSelected ? styles.keywordButtonActive : styles.keywordButton;
    
    return (
      <button
        key={keyword.id || keyword}
        className={`${buttonClass} ${styles.keywordTag}`}
        onClick={() => !isDeletable && handleToggleRecommended(keyword.id)}
      >
        {keyword.label || keyword}
        {isDeletable && (
          <span 
            className={styles.deleteIcon} 
            onClick={(e) => {
              e.stopPropagation(); // 버튼 클릭 이벤트 중복 방지
              onDelete(keyword);
            }}
          >
            {/* 피그마의 X자 스타일 (색상: #2F9086) */}
            <FontAwesomeIcon icon={faTimes} /> 
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="container">
      <div className={styles.pageContainer}>
        {/* 상단 헤더 */}
        <header className={styles.header}>
          <GoBack title="관심 키워드 관리" />
        </header>

        <form className={styles.form} onSubmit={handleSave}>
          <div className={styles.contentArea}>
            
            {/* 추천 키워드 섹션 */}
            <section className={styles.keywordSection}>
              <h3 className={styles.sectionTitle}>추천 키워드</h3>
              <div className={styles.keywordList}>
                {recommendedKeywords.map(keyword =>
                  renderKeywordButton(keyword, keyword.isSelected)
                )}
              </div>
            </section>

            {/* 나의 키워드 섹션 */}
            <section className={styles.keywordSection}>
              <h3 className={styles.sectionTitle}>나의 키워드</h3>
              <div className={styles.keywordList}>
                {myKeywords.map(keyword =>
                  renderKeywordButton(
                    keyword, 
                    true, // 나의 키워드는 등록 즉시 활성화 스타일
                    true, 
                    handleDeleteMyKeyword
                  )
                )}
              </div>
            </section>
          
            {/* 관심 키워드 등록 입력 폼 */}
            <div className={styles.registerGroup}>
              <input
                type="text"
                className={styles.keywordInput}
                placeholder="관심 키워드"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
              />
              <button 
                type="button" 
                className={styles.registerButton}
                onClick={handleRegisterKeyword}
              >
                등록하기
              </button>
            </div>
          </div>
          
          {/* 하단 저장 버튼 */}
          <button type="submit" className={styles.saveButton}>
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
}