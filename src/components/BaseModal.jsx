import styles from "./BaseModal.module.css";

export default function BaseModal({
  title,
  onClose,
  children,
  primaryText = "확인",
  onPrimary,
  secondaryText = "취소",
  onSecondary,
  danger = false, // 삭제/탈퇴 같은 위험 작업일 때 버튼 색상 바꿈
  disablePrimary = false,
  disableSecondary = false,
}) {
  const handleOverlay = () => onClose?.();
  const stop = (e) => e.stopPropagation();

  return (
    <div className={styles.overlay} onClick={handleOverlay} role="dialog" aria-modal="true">
      <div className={styles.content} onClick={stop}>
        {title && <h3 className={styles.title}>{title}</h3>}

        <div className={styles.body}>{children}</div>

        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${styles.secondary}`}
            onClick={onSecondary ?? onClose}
            disabled={disableSecondary}
            type="button"
          >
            {secondaryText}
          </button>
          <button
            className={`${styles.btn} ${danger ? styles.danger : styles.primary}`}
            onClick={onPrimary}
            disabled={disablePrimary}
            type="button"
          >
            {primaryText}
          </button>
        </div>
      </div>
    </div>
  );
}