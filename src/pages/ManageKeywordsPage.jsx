import { useState } from "react";
import styles from "./ManageKeywordsPage.module.css";
import GoBack from "../components/GoBack.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function ManageKeywordsPage() {
  const initialRecommended = [
    { id: 'DEPOSIT', label: '예금', isSelected: true },
    { id: 'SAVINGS', label: '적금', isSelected: false },
    { id: 'ETF', label: 'ETF', isSelected: false },
    { id: 'REALTY', label: '부동산', isSelected: false },
    { id: 'DOMESTIC', label: '국내투자', isSelected: false },
    { id: 'OVERSEAS', label: '해외투자', isSelected: true },
  ];
  const [recommendedKeywords, setRecommendedKeywords] = useState(initialRecommended);
  
  const [myKeywords, setMyKeywords] = useState(['비트코인']);
  const [newKeyword, setNewKeyword] = useState('');

  const handleToggleRecommended = (id) => {
    setRecommendedKeywords(prev =>
      prev.map(keyword =>
        keyword.id === id
          ? { ...keyword, isSelected: !keyword.isSelected }
          : keyword
      )
    );
  };

  const handleRegisterKeyword = (e) => {
    e.preventDefault();
    const trimmedKeyword = newKeyword.trim();
    if (trimmedKeyword && !myKeywords.includes(trimmedKeyword)) {
      setMyKeywords(prev => [...prev, trimmedKeyword]);
      setNewKeyword('');
    } else if (myKeywords.includes(trimmedKeyword)) {
      alert("이미 등록된 키워드입니다.");
    }
  };

  const handleDeleteMyKeyword = (keywordToDelete) => {
    setMyKeywords(prev => prev.filter(keyword => keyword !== keywordToDelete));
  };
  
  const handleSave = (e) => {
    e.preventDefault();
    
    const selectedRecommendedIds = recommendedKeywords
      .filter(k => k.isSelected)
      .map(k => k.id);
      
    const finalKeywords = [...selectedRecommendedIds, ...myKeywords];
    
    if (finalKeywords.length === 0) {
       alert("선택된 키워드가 없습니다.");
       return;
    }

    alert(`최종 저장 키워드: ${finalKeywords.join(', ')}`);
  };
  
  const renderKeywordButton = (keyword, isSelected, isDeletable = false, onDelete) => {
    const isCustom = keyword.id ? false : true;
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
              e.stopPropagation();
              onDelete(keyword);
            }}
          >
            <FontAwesomeIcon icon={faTimes} /> 
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="container">
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <GoBack title="관심 키워드 관리" />
        </header>

        <form className={styles.form} onSubmit={handleSave}>
          <div className={styles.contentArea}>
            
            <section className={styles.keywordSection}>
              <h3 className={styles.sectionTitle}>추천 키워드</h3>
              <div className={styles.keywordList}>
                {recommendedKeywords.map(keyword =>
                  renderKeywordButton(keyword, keyword.isSelected)
                )}
              </div>
            </section>

            <section className={styles.keywordSection}>
              <h3 className={styles.sectionTitle}>나의 키워드</h3>
              <div className={styles.keywordList}>
                {myKeywords.map(keyword =>
                  renderKeywordButton(
                    keyword, 
                    true,
                    true, 
                    handleDeleteMyKeyword
                  )
                )}
              </div>
            </section>
          
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
          
          <button type="submit" className={styles.saveButton}>
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
}