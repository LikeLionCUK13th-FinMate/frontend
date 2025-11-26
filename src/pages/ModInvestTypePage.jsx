import { useState } from "react";
import styles from "./ModInvestTypePage.module.css";
import GoBack from "../components/GoBack.jsx";

export default function ModInvestTypePage() {
  const [selected, setSelected] = useState(""); // 선택된 투자성향

  const options = [
    { id: "CONSERVATIVE", label: "안정형" },
    { id: "STABLE", label: "안정추구형" },
    { id: "NEUTRAL", label: "위험중립형" },
    { id: "AGGRESSIVE", label: "적극투자형" },
    { id: "OFFENSIVE", label: "공격투자형" },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    if (!selected) {
      alert("투자 성향을 선택해주세요.");
      return;
    }
    // TODO: 백엔드 연동 (선택값 selected 전송)
    // ex) await saveInvestType(selected)
    alert(`선택된 투자 성향: ${selected}`);
  };

  return (
    <div className="container">
      <div className={styles.modinvesttypepage}>
        {/* 상단 헤더 */}
        <header className={styles.modinvesttypepage__header}>
          <GoBack title="투자 성향 수정" />
        </header>

        {/* 선택 폼 */}
        <form className={styles.form} onSubmit={handleSave}>
          <fieldset className={styles.fieldset}>
            <ul className={styles.list}>
              {options.map((opt) => (
                <li key={opt.id} className={styles.item}>
                  <label className={styles.option}>
                    {/* 실제 라디오 */}
                    <input
                      type="radio"
                      name="investType"
                      value={opt.id}
                      checked={selected === opt.id}
                      onChange={(e) => setSelected(e.target.value)}
                      className={styles.radio}
                    />
                    {/* 커스텀 원형 */}
                    <span aria-hidden="true" className={styles.customRadio} />
                    {/* 텍스트 */}
                    <span className={styles.labelText}>{opt.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        </form>
        
        {/* 하단 저장 버튼 */}
          <button type="submit" className={styles.saveButton}>
            저장하기
          </button>
      </div>
    </div>
  );
}