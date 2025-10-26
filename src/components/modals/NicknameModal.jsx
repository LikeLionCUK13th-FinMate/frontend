import { useState } from "react";
import BaseModal from "../BaseModal.jsx";
import styles from "./NicknameModal.module.css";

export default function NicknameModal({ onClose, onSave }) {
  const [nickname, setNickname] = useState("");

  const handlePrimary = () => {
    const v = nickname.trim();
    if (!v) {
      alert("닉네임을 입력하세요.");
      return;
    }
    onSave?.(v); // 부모로 저장 요청
  };

  return (
    <BaseModal
      title="닉네임 수정"
      onClose={onClose}
      primaryText="저장"
      onPrimary={handlePrimary}
      secondaryText="취소"
    >
      <input
        type="text"
        placeholder="닉네임 입력"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className={styles.input}
      />
    </BaseModal>
  );
}