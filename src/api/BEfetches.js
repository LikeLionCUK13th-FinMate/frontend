export async function uploadProfileImage(file, token) {
  const form = new FormData();
  form.append("profileImage", file);
  const res = await fetch("/api/users/profile-image", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) throw new Error("프로필 업로드 실패");
  return await res.json(); // { url: "..." }
}

export async function updateNickname(nickname, token) {
  const res = await fetch("/api/users/nickname", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nickname }),
  });
  if (!res.ok) throw new Error("닉네임 수정 실패");
  return await res.json(); // { nickname: "..." }
}

export async function logout(token) {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("로그아웃 실패");
  return true;
}

export async function withdraw(password, token) {
  const res = await fetch("/api/users", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error("회원 탈퇴 실패");
  return true;
}
