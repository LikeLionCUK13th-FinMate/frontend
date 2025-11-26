import { useState } from "react";
import styles from "./ModKnowledgeLevelPage.module.css"; 
import GoBack from "../components/GoBack.jsx"; 

export default function ModKnowledgeLevelPage() {
  const [selected, setSelected] = useState("");

  const options = [
    { id: "LEV_NOVICE", label: "초급", description: "기본 용어만 이해" },
    { id: "LEV_BASIC", label: "기본", description: "간단한 금융상품 이해" },
    { id: "LEV_INTERMEDIATE", label: "중급", description: "투자 경험 있음" },
    { id: "LEV_ADVANCED", label: "상급", description: "포트폴리오 구성 가능" },
    { id: "LEV_EXPERT", label: "전문가", description: "심화 금융지식 보유" },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    if (!selected) {
      alert("금융 지식 수준을 선택해주세요.");
      return;
    }
    // TODO: 백엔드 연동 (선택값 selected 전송)
    // ex) await saveKnowledgeLevel(selected)
    alert(`선택된 금융 지식 수준 ID: ${selected}`);
  };

  return (
    <div className="container">
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <GoBack title="금융지식 수준 수정" />
        </header>

        <form className={styles.form} onSubmit={handleSave}>
          <fieldset className={styles.fieldset}>
            <ul className={styles.list}>
              {options.map((opt) => (
                <li key={opt.id} className={styles.item}>
                  <label className={styles.option}>
                    <input
                      type="radio"
                      name="knowledgeLevel"
                      value={opt.id}
                      checked={selected === opt.id}
                      onChange={(e) => setSelected(e.target.value)}
                      className={styles.radio}
                    />
                    <span aria-hidden="true" className={styles.customRadio} />
                    
                    <div className={styles.textGroup}>
                      <span className={styles.labelText}>{opt.label}</span>
                      <span className={styles.descriptionText}>{opt.description}</span>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
          
          <button type="submit" className={styles.saveButton}>
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
}