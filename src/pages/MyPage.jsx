import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./MyPage.module.css";
import GoBack from "../components/GoBack.jsx";
import BaseModal from "../components/BaseModal.jsx";

import { IoPricetagOutline, IoBarChartOutline } from "react-icons/io5";
import { RiSurveyLine } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

export default function MyPage() {
  // 모달 상태: null | 'profilePic' | 'nickname' | 'logout' | 'withdraw'
  const [modal, setModal] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleProfileFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // 형식 검증
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("이미지 파일(jpg, png, webp)만 업로드할 수 있습니다.");
      e.target.value = "";
      setSelectedFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      return;
    }

    // 미리보기 URL
    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(url);
  };

  // 이 모달 상태 초기화 (모달 닫거나 저장 후 호출)
  const resetProfilePicState = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const openModal = (key) => setModal(key);
  const closeModal = () => {
    if (modal === "profilePic") resetProfilePicState();
    setModal(null);
  };

  // 버튼 동작 예시(원하는 로직으로 바꿔도 됨)
  const saveProfilePic = () => {
    if (!selectedFile) {
      alert("먼저 프로필 사진을 선택하세요.");
      return;
    }
    // TODO: fetch/axios 업로드 처리
    resetProfilePicState();
    closeModal();
  }; /* 사진 저장 */
  const saveNickname = () => { closeModal(); }; /* 닉네임 저장 */
  const doLogout = () => { closeModal(); }; /* 로그아웃 처리 */
  const doWithdraw = () => { closeModal(); }; /* 회원 탈퇴 처리 */
  /*------------------- 백엔드 연동(프로필 사진 저장 함수) -------------------*/
  // const saveProfilePic = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("profileImage", selectedFile); // 이미지 업로드 예시
  //     const res = await fetch("https://api.example.com/users/profile-image", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`, // 로그인 시 발급된 토큰
  //       },
  //       body: formData,
  //     });

  //     if (!res.ok) throw new Error("업로드 실패");

  //     const data = await res.json();
  //     console.log("✅ 업로드 성공:", data);

  //     // 예: 상태 업데이트 후 모달 닫기
  //     setUser((prev) => ({ ...prev, profileImage: data.url }));
  //     closeModal();
  //   } catch (err) {
  //     console.error("❌ 에러:", err);
  //     alert("프로필 사진 업로드에 실패했습니다.");
  //   }
  // };

  const navigate = useNavigate();
  const toModInvestTypePage = () => {
    navigate("/mypage/mod-investment-type");
  }
  const toModKnowledgeLevelPage = () => {
    navigate("/mypage/mod-knowledge-level");
  }
  const toManageKeywordsPage = () => {
    navigate("/mypage/manage-keywords");
  }
  const toTermsNConditionsPage = () => {
    navigate("/mypage/terms-n-conditions");
  }

  
  return (
    <div className="container">
      <div className={styles.mypage}>
        {/* 헤더 */}
        <header className={styles.mypage__header}>
          <GoBack title="개인정보" />
        </header>

        {/* 프로필 = 프로필 사진 + 닉네임 */}
        <section className={styles.profile} aria-labelledby="profile-heading">
          <div className={styles.profile__picture}>
            <CgProfile className={styles.profile__pic}/> {/* 프로필사진 */}
            <GoPencil
              className={`${styles["profile__pic-edit"]} ${styles["icon-btn"]}`}
              onClick={() => openModal("profilePic")}
              aria-label="프로필 사진 수정"
              title="프로필 사진 수정"
            /> {/* 프로필사진 옆 수정 연필 */}
          </div>
          
          <div className={styles.profile__name}>
            <span className={styles.profile__nickname}>닉네임</span>
            <GoPencil
              className={`${styles["icon-btn"]} ${styles["profile__name-edit"]}`}
              onClick={() => openModal("nickname")}
              aria-label="닉네임 수정"
              title="닉네임 수정"
              />
          </div>
        </section>

        {/* 내 정보 */}
        <section className={styles.mypage__section} aria-labelledby="info-heading">
          <h2 id="info-heading" className={styles.mypage__subtitle}>
            내 정보
          </h2>
          
          <hr className={styles.mypage__divider} />

          <ul className={styles.mypage__list1}>
            <li>
              <div className={styles["mypage__list1-icon"]}>
                <RiSurveyLine />
              </div>
              <div className={styles["mypage__list1-text"]} onClick={toModInvestTypePage}>투자 성향 수정</div>
            </li>
            <li>
              <div className={styles["mypage__list1-icon"]}>
                <IoBarChartOutline />
              </div>
              <div className={styles["mypage__list1-text"]} onClick={toModKnowledgeLevelPage}>금융 지식 수준 수정</div>
            </li>
            <li>
              <div className={styles["mypage__list1-icon"]}>
                <IoPricetagOutline />
              </div>
              <div className={styles["mypage__list1-text"]} onClick={toManageKeywordsPage}>관심 키워드 관리</div>
            </li>
          </ul>

          <hr className={styles.mypage__divider} />

          <ul className={styles.mypage__list2}>
            <li>
              <div className={styles["mypage__list2-text"]} onClick={toTermsNConditionsPage}>약관 보기</div>
            </li>
            <li>
              <div className={styles["mypage__list2-text"]} onClick={() => openModal("logout")}>로그아웃</div>
            </li>
            <li>
              <div className={styles["mypage__list2-text"]} onClick={() => openModal("withdraw")}>회원 탈퇴</div>
            </li>
          </ul>
        </section>
      </div>

      {/* ===== 모달 ===== */}
      {/* 1) 프로필 사진 수정 모달 */}
      {modal === "profilePic" && (
        <BaseModal
          title="프로필 사진 수정"
          onClose={closeModal}
          primaryText="저장"
          onPrimary={saveProfilePic}
          secondaryText="취소"
        >
          <p className={styles.modalText}>프로필 사진을 선택하세요.</p>

          {/* 미리보기 (있을 때만 표시) */}
          {previewUrl && (
            <div className={styles.previewWrap}>
              <img src={previewUrl} alt="미리보기" className={styles.previewImage} />
            </div>
          )}

          {/* 파일 선택 버튼 */}
          <input
            type="file"
            accept="image/*"
            className={styles.modalFile}
            onChange={handleProfileFileChange}
          />
        </BaseModal>
      )}

      {/* 2) 닉네임 수정 모달 */}
      {modal === "nickname" && (
        <BaseModal
          title="닉네임 수정"
          onClose={closeModal}
          primaryText="저장"
          onPrimary={saveNickname}
          secondaryText="취소"
        >
          <label style={{ display: "grid", gap: 6 }}>
            <input type="text" placeholder="닉네임 입력" className={styles.modalInput}/>
          </label>
        </BaseModal>
      )}

      {/* 3) 로그아웃 모달 */}
      {modal === "logout" && (
        <BaseModal
          title="로그아웃"
          onClose={closeModal}
          primaryText="로그아웃"
          onPrimary={doLogout}
          secondaryText="취소"
        >
          <p className={styles.modalText}>로그아웃 하시겠습니까?</p>
        </BaseModal>
      )}

      {/* 4) 회원 탈퇴 모달 (위험 버튼 강조) */}
      {modal === "withdraw" && (
        <BaseModal
          title="회원 탈퇴"
          onClose={closeModal}
          primaryText="회원탈퇴"
          onPrimary={doWithdraw}
          secondaryText="취소"
          danger
        >
          <p className={styles.modalText}>정말로 탈퇴하시겠습니까?</p>
          <label style={{ display: "grid", gap: 6 }}>
            <input type="password" placeholder="비밀번호 입력" className={styles.modalInput}/>
          </label>
        </BaseModal>
      )}
    </div>
  );
}