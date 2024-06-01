document.addEventListener("DOMContentLoaded", function() {
    const imgBox = document.querySelector('.img_box');
    const detailBox = document.querySelector('.detail_box');

    // 장소 데이터를 백엔드에서 가져오는 함수
    async function fetchPlaces() {
        try {
            const response = await fetch('https://your-backend-endpoint.com/places'); // 백엔드 엔드포인트를 실제 URL로 교체
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const places = await response.json();

            // 장소 데이터를 img_box에 추가
            places.forEach((place, index) => {
                const box1 = document.createElement('div');
                box1.className = 'box1';

                const img = document.createElement('img');
                img.src = `img/photo-${index + 1}.jpg`; // photo-{i}.jpg로 설정
                img.alt = place.name;

                const nameP = document.createElement('p');
                nameP.textContent = place.name;

                box1.appendChild(img);
                box1.appendChild(nameP);
                imgBox.appendChild(box1);
            });

            // 장소 데이터를 detail_box에 추가
            places.forEach(place => {
                const box2 = document.createElement('div');
                box2.className = 'box2';

                const h3 = document.createElement('h3');
                h3.textContent = place.name;

                const p = document.createElement('p');
                p.textContent = `날짜: ${place.date} 시간: ${place.hour} \n세부정보: ${place.detail}`;

                box2.appendChild(h3);
                box2.appendChild(p);
                detailBox.appendChild(box2);
            });
        } catch (error) {
            console.error('Failed to fetch places:', error);
        }
    }

    fetchPlaces();
});
