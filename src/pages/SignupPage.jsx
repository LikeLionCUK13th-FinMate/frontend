import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./SignupPage.module.css";

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [confirmPw, setConfirmPw] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  const [birth, setBirth] = useState({ year: "", month: "", day: "" });
  const years = Array.from({ length: 2016 - 1950 + 1 }, (_, i) => 2016 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [isCheckDisabled, setIsCheckDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  // 아이디 입력창 비어있으면 중복버튼 비활성화(true)
  useEffect(() => {
    setIsCheckDisabled(id.trim() === "");
  }, [id]);

  useEffect(() => {
    setIsMatch(confirmPw === "" ? true : pw === confirmPw);
  }, [pw, confirmPw]);

  const handleBirthChange = (key, value) => {
    setBirth((prev) => ({ ...prev, [key]: value }));
  };

  // 입력값 변경될 때마다 다음 버튼 활성화 유무 다시 체크
  useEffect(() => {
    const allFilled =
      name.trim() !== "" &&
      id.trim() !== "" &&
      pw.trim() !== "" &&
      confirmPw.trim() !== "" &&
      birth.year !== "" &&
      birth.month !== "" &&
      birth.day !== "" &&
      isMatch;

    setIsNextDisabled(!allFilled);
  }, [name, id, pw, confirmPw, birth, isMatch]);

  // 기본정보 입력 완료 -> 세션에 저장하고 survey로 이동
  const handleNext = () => {
    // 생년월일로 나이 계산
    let age = null;
    if (birth.year) {
      const currentYear = new Date().getFullYear();
      age = currentYear - Number(birth.year) + 1;
    }

    const basicInfo = {
      userId: id.trim(),
      password: pw.trim(),
      nickname: name.trim(),
      age,
    };

    sessionStorage.setItem("signup_basic", JSON.stringify(basicInfo));
    navigate("/survey");
  };

  return (
    <div className={styles.container}>
      <p className={styles.pageTitle}>회원가입</p>

      <div className={styles.itemContainer}>
        {/* 닉네임 */}
        <div>
          <p className={styles.inputTitle}>닉네임</p>
          <input
            type="text"
            placeholder="닉네임"
            className={styles.inputBox}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* 아이디 */}
        <div>
          <p className={styles.inputTitle}>아이디</p>
          <div className={styles.idForm}>
            <input
              type="text"
              placeholder="아이디"
              className={styles.inputBox}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button
              className={styles.btn}
              disabled={isCheckDisabled}
              onClick={() => {
                // 중복확인 API가 있는지 백엔드에 확인해봐야 합니다.
                // 만약 /users/check-duplicate 같은 엔드포인트가 있다면 여기서 호출하세요.
                alert(
                  "중복확인 엔드포인트가 없으면 서버에서 가입 시 중복을 검증합니다."
                );
              }}
            >
              중복확인
            </button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div>
          <p className={styles.inputTitle}>비밀번호</p>
          <div className={styles.pwForm}>
            <input
              type="password"
              placeholder="비밀번호"
              className={styles.inputBox}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              className={styles.inputBox}
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
            />
            {!isMatch && (
              <p className={styles.noMatchMessage}>
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>
        </div>

        {/* 생년월일 */}
        <div>
          <p className={styles.inputTitle}>생년월일</p>
          <div className={styles.birthForm}>
            <select
              className={styles.inputBox}
              value={birth.year}
              onChange={(e) => handleBirthChange("year", e.target.value)}
            >
              <option value="">년</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <select
              className={styles.inputBox}
              value={birth.month}
              onChange={(e) => handleBirthChange("month", e.target.value)}
            >
              <option value="">월</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <select
              className={styles.inputBox}
              value={birth.day}
              onChange={(e) => handleBirthChange("day", e.target.value)}
            >
              <option value="">일</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`${styles.btn} ${styles.nextBtn}`}
        disabled={isNextDisabled}
        onClick={handleNext}
      >
        다음
      </button>
    </div>
  );
}
