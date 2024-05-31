document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            window.location.href = '/login.html'; // 로그인 페이지로 리다이렉트
            return;
        }

        // 사용자 정보 요청
        const response = await fetch('http://localhost:8080/auth/userinfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token // 요청 헤더에 토큰 추가
            }
        });

        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.message);
        }

        // 생일로부터 현재 나이 계산
        const birthDate = new Date(data.birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // HTML 문서에 사용자 정보와 계산된 나이 삽입
        document.querySelector('.information ul').innerHTML = `
            <li>NickName: ${data.nickname}</li>
            <li>Age: ${age}</li> 
            <li>Gender: ${data.gender}</li>
            <li>Local: ${data.region}</li>
            <li>Point: ${data.points}</li>
        `;
    } catch (error) {
        console.error('사용자 정보를 가져오는 데 실패했습니다.', error);
        alert('사용자 정보를 가져오는 데 실패했습니다.');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // "AI 계획추천" 버튼에 대한 참조를 얻습니다.
    var aiPlanButton = document.getElementById("aiGuideButton");

    // 버튼이 클릭되면 'AItourguide.html' 페이지로 이동합니다.
    aiPlanButton.addEventListener("click", function() {
        window.location.href = 'http://127.0.0.1:5500/haedal_hackathon_2024-master/AItourguide.html';
    });
});