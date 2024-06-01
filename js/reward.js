document.addEventListener("DOMContentLoaded", function () {
  // 사용자 정보 및 포인트 정보 가져오기
  fetch("http://localhost:5000/api/user")
    .then((response) => response.json())
    .then((data) => {
      // 사용자 정보 설정
      const user = {
        name: data.name,
        email: data.email,
      };

      // 포인트 정보 설정
      const points = data.points;

      // 사용자 정보 렌더링
      document.getElementById("user-name").textContent = `이름: ${user.name}`;
      document.getElementById(
        "user-email"
      ).textContent = `이메일: ${user.email}`;
      document.getElementById(
        "user-points"
      ).textContent = `현재 포인트: ${points}`;
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });

  // 리워드 목록 설정
  const rewards = [
    { name: "모바일 상품권 1만원", points: 1000 },
    { name: "커피 기프티콘", points: 500 },
    { name: "영화 예매권", points: 800 },
    { name: "편의점 상품권 5천원", points: 700 },
    { name: "도서 상품권 1만원", points: 1000 },
    { name: "식사 쿠폰", points: 1200 },
  ];

  // 리워드 목록 렌더링
  const rewardsList = document.getElementById("rewards-list");
  rewards.forEach((reward) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<p>${reward.name}</p><p>${reward.points} 포인트</p>`;
    rewardsList.appendChild(listItem);
  });
});
