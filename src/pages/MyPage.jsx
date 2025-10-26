import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./MyPage.module.css";

import GoBack from "../components/GoBack.jsx";

import ProfilePicModal from "../components/modals/ProfilePicModal.jsx";
import NicknameModal from "../components/modals/NicknameModal.jsx";
import LogoutModal from "../components/modals/LogoutModal.jsx";
import WithdrawModal from "../components/modals/WithdrawModal.jsx";

import { IoPricetagOutline, IoBarChartOutline } from "react-icons/io5";
import { RiSurveyLine } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

/** 서비스 레이어(백엔드 호출) */
import {
  uploadProfileImage,
  updateNickname,
  logout as beLogout,
  withdraw as beWithdraw,
} from "../api/BEfetches.js";

export default function MyPage() {
  // 모달 상태: null | 'profilePic' | 'nickname' | 'logout' | 'withdraw'
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const openModal = (key) => setModal(key);
  const closeModal = () => {
    if (!loading) setModal(null);
  };

  const navigate = useNavigate();
  const toModInvestTypePage = () => navigate("/mypage/mod-investment-type");
  const toModKnowledgeLevelPage = () => navigate("/mypage/mod-knowledge-level");
  const toManageKeywordsPage = () => navigate("/mypage/manage-keywords");
  const toTermsNConditionsPage = () => navigate("/mypage/terms-n-conditions");

  // 보통 토큰은 로그인 시 저장해둔 값 사용
  const token = localStorage.getItem("token");

  /* ===== 백엔드 연동 핸들러 ===== */
  const handleSaveProfilePic = async (file) => {
    try {
      setLoading(true);
      const data = await uploadProfileImage(file, token); // { url: ... } 반환 가정
      // TODO: 전역 사용자 상태가 있다면 여기서 업데이트
      // setUser(prev => ({ ...prev, profileImage: data.url }));
      closeModal();
    } catch (err) {
      alert(err.message || "프로필 사진 업로드에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNickname = async (newNickname) => {
    try {
      setLoading(true);
      const data = await updateNickname(newNickname, token); // { nickname: ... } 가정
      // TODO: 전역 사용자 상태 업데이트
      // setUser(prev => ({ ...prev, nickname: data.nickname }));
      closeModal();
    } catch (err) {
      alert(err.message || "닉네임 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await beLogout(token);
      localStorage.removeItem("token");
      navigate("/"); // 로그인 페이지 등
    } catch (err) {
      alert(err.message || "로그아웃에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (password) => {
    try {
      setLoading(true);
      await beWithdraw(password, token);
      localStorage.removeItem("token");
      navigate("/"); // 탈퇴 후 이동
    } catch (err) {
      alert(err.message || "회원 탈퇴에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

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
            <CgProfile className={styles.profile__pic} />
            <GoPencil
              className={`${styles["profile__pic-edit"]} ${styles["icon-btn"]}`}
              onClick={() => openModal("profilePic")}
              aria-label="프로필 사진 수정"
              title="프로필 사진 수정"
            />
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
          <h2 id="info-heading" className={styles.mypage__subtitle}>내 정보</h2>
          <hr className={styles.mypage__divider} />

          <ul className={styles.mypage__list1}>
            <li>
              <div className={styles["mypage__list1-icon"]}><RiSurveyLine /></div>
              <div className={styles["mypage__list1-text"]} onClick={toModInvestTypePage}>
                투자 성향 수정
              </div>
            </li>
            <li>
              <div className={styles["mypage__list1-icon"]}><IoBarChartOutline /></div>
              <div className={styles["mypage__list1-text"]} onClick={toModKnowledgeLevelPage}>
                금융 지식 수준 수정
              </div>
            </li>
            <li>
              <div className={styles["mypage__list1-icon"]}><IoPricetagOutline /></div>
              <div className={styles["mypage__list1-text"]} onClick={toManageKeywordsPage}>
                관심 키워드 관리
              </div>
            </li>
          </ul>

          <hr className={styles.mypage__divider} />

          <ul className={styles.mypage__list2}>
            <li>
              <div className={styles["mypage__list2-text"]} onClick={toTermsNConditionsPage}>
                약관 보기
              </div>
            </li>
            <li>
              <div className={styles["mypage__list2-text"]} onClick={() => openModal("logout")}>
                로그아웃
              </div>
            </li>
            <li>
              <div className={styles["mypage__list2-text"]} onClick={() => openModal("withdraw")}>
                회원 탈퇴
              </div>
            </li>
          </ul>
        </section>
      </div>

      {/* ===== 모달 영역 ===== */}
      {modal === "profilePic" && (
        <ProfilePicModal
          onClose={closeModal}
          onSave={handleSaveProfilePic}
          loading={loading}
        />
      )}

      {modal === "nickname" && (
        <NicknameModal
          onClose={closeModal}
          onSave={handleSaveNickname}
          loading={loading}
        />
      )}

      {modal === "logout" && (
        <LogoutModal
          onClose={closeModal}
          onConfirm={handleLogout}
          loading={loading}
        />
      )}

      {modal === "withdraw" && (
        <WithdrawModal
          onClose={closeModal}
          onConfirm={handleWithdraw}
          loading={loading}
        />
      )}
    </div>
  );
}