const IS_MOCK = true;

// 매핑
function mapLevelToEnum(label) {
  if (!label) return null;
  if (label.includes("초급") || label.includes("기본")) return "BEGINNER";
  if (label.includes("중급")) return "INTERMEDIATE";
  if (label.includes("상급") || label.includes("전문가")) return "ADVANCED";
  return null;
}

function mapTendencyToEnum(label) {
  if (!label) return null;
  if (label.includes("안정")) return "SAFE";
  if (label.includes("중립")) return "NEUTRAL";
  if (label.includes("투자")) return "AGGRESSIVE";
  return "NEUTRAL";
}

// 회원가입 API 연동
export async function registerUser(surveyAnswers) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // 1. 세션 스토리지에서 기본 정보 가져오기
  const basicRaw = sessionStorage.getItem("signup_basic");
  if (!basicRaw) {
    throw new Error("기본 회원정보가 존재하지 않습니다. 처음부터 다시 진행해주세요.");
  }
  const basic = JSON.parse(basicRaw);

  // 2. DTO 구성 (매핑 포함)
  const dto = {
    userId: basic.userId,
    password: basic.password,
    nickname: basic.nickname,
    age: basic.age,
    gender: null,
    financialLevel: mapLevelToEnum(surveyAnswers.level),
    interestFields: surveyAnswers.keyword ?? [],
    job: null,
    monthlyIncomeRange: null,
    financialGoal: null,
    investmentTendency: mapTendencyToEnum(surveyAnswers.tendency),
    currentMainConcerns: null,
  };

  if (IS_MOCK) {
    return;
  }

  // 3. API 호출
  const res = await fetch(`${baseUrl}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = data?.message || `회원가입 실패: ${res.status}`;
    throw new Error(msg);
  }

  // 4. 성공 시 세션 스토리지 정리
  sessionStorage.removeItem("signup_basic");
}