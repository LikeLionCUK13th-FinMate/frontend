import BaseModal from "../BaseModal.jsx";
import styles from "./LogoutModal.module.css";

export default function LogoutModal({ onClose, onConfirm }) {
  return (
    <BaseModal
      title="로그아웃"
      onClose={onClose}
      primaryText="로그아웃"
      onPrimary={onConfirm}
      secondaryText="취소"
    >
      <p className={styles.text}>로그아웃 하시겠습니까?</p>
    </BaseModal>
  );
}