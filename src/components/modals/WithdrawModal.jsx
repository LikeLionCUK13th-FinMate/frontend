import { useState } from "react";
import BaseModal from "../BaseModal.jsx";
import styles from "./WithdrawModal.module.css";

export default function WithdrawModal({ onClose, onConfirm }) {
  const [password, setPassword] = useState("");

  const handlePrimary = () => {
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    }
    onConfirm?.(password);
  };

  return (
    <BaseModal
      title="회원 탈퇴"
      onClose={onClose}
      primaryText="회원탈퇴"
      onPrimary={handlePrimary}
      secondaryText="취소"
      danger
    >
      <p className={styles.text}>정말로 탈퇴하시겠습니까?</p>
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
    </BaseModal>
  );
}