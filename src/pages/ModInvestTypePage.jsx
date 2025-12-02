import { useState } from "react";
import styles from "./ModInvestTypePage.module.css";
import GoBack from "../components/GoBack.jsx";

export default function ModInvestTypePage() {
  const [selected, setSelected] = useState("STABLE");

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
    alert(`선택된 투자 성향: ${selected}`);
  };

  return (
    <div className="container">
      <div className={styles.pageContainer}>
        
        <header className={styles.header}>
          <GoBack title="투자 성향 수정" />
        </header>

        <form className={styles.form} onSubmit={handleSave}>

          <fieldset className={styles.fieldset}>
            <ul className={styles.list}>
              {options.map((opt) => (
                <li key={opt.id} className={styles.item}>
                  <label className={styles.option}>
                    <input
                      type="radio"
                      name="investType"
                      value={opt.id}
                      checked={selected === opt.id}
                      onChange={(e) => setSelected(e.target.value)}
                      className={styles.radio}
                    />
                    <span aria-hidden="true" className={styles.customRadio} />
                    <span className={styles.labelText}>{opt.label}</span>
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