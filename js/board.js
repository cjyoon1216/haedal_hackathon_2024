document.addEventListener("DOMContentLoaded", function() {
    const imgBox = document.getElementById('img_box');

    // 연예인 데이터를 백엔드에서 가져오는 함수
    async function fetchCelebrities() {
        try {
            // 백엔드 엔드포인트를 실제 URL로 교체
            const response = await fetch('https://your-backend-endpoint.com/celebrities'); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const celebrities = await response.json();

            // 연예인 데이터를 DOM에 추가
            celebrities.forEach((celebrity, index) => {
                // box1 div 생성
                const box = document.createElement('div');
                box.className = 'box1';

                // img 태그 생성
                const img = document.createElement('img');
                img.src = `img/photo-${index + 1}.jpg`; // photo-{i}.jpg로 설정
                img.alt = celebrity.name;

                // p 태그 생성
                const p = document.createElement('p');
                p.textContent = celebrity.name;

                // img와 p 태그를 box1 div에 추가
                box.appendChild(img);
                box.appendChild(p);

                // box1 div를 img_box div에 추가
                imgBox.appendChild(box);
            });
        } catch (error) {
            console.error('Failed to fetch celebrities:', error);
        }
    }

    // 연예인 데이터를 가져와서 화면에 표시
    fetchCelebrities();
});