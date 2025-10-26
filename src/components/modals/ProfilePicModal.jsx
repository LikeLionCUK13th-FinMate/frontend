import { useEffect, useState } from "react";
import BaseModal from "../BaseModal.jsx";
import styles from "./ProfilePicModal.module.css";

export default function ProfilePicModal({ onClose, onSave }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // 이미지 형식 검증
    const valid = ["image/jpeg", "image/png", "image/webp"];
    if (!valid.includes(f.type)) {
      alert("jpg, png, webp 형식의 이미지 파일만 업로드할 수 있습니다.");
      e.target.value = "";
      setFile(null);
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(f);
    setFile(f);
    setPreviewUrl(url);
  };

  const handlePrimary = () => {
    if (!file) {
      alert("먼저 프로필 사진을 선택하세요.");
      return;
    }
    onSave?.(file); // 부모에 파일 전달
  };

  // 모달 닫힐 때 blob URL 해제
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <BaseModal
      title="프로필 사진 수정"
      onClose={onClose}
      primaryText="저장"
      onPrimary={handlePrimary}
      secondaryText="취소"
    >
      <p className={styles.text}>프로필 사진을 선택하세요.</p>

      {previewUrl && (
        <div className={styles.previewWrap}>
          <img src={previewUrl} alt="미리보기" className={styles.previewImage} />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        className={styles.file}
        onChange={handleChange}
      />
    </BaseModal>
  );
}