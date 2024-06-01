document.addEventListener("DOMContentLoaded", function() {
    const imgBox = document.querySelector('.img_box');
    const detailBox = document.querySelector('.detail_box');

    // 장소 데이터를 localStorage에서 가져오는 함수
    function fetchPlacesFromLocalStorage() {
        try {
            const storedData = localStorage.getItem('scheduleData');
            if (!storedData) {
                throw new Error('No data found in localStorage');
            }
            const data = JSON.parse(storedData);
            const places = data.spots; // JSON 구조에 맞게 수정

            // 장소 데이터를 img_box에 추가
            places.forEach((place, index) => {
                const box1 = document.createElement('div');
                box1.className = 'box1';

                const img = document.createElement('img');
                img.src = `img/photo-${index + 1}.jpg`; // photo-{index + 1}.jpg로 설정
                img.alt = place.name;

                const nameP = document.createElement('p');
                nameP.textContent = place.name;

                box1.appendChild(img);
                box1.appendChild(nameP);
                imgBox.appendChild(box1);

                // 마지막 요소가 아닌 경우에만 class="right" div 박스를 추가
                if (index < places.length - 1) {
                    const right = document.createElement('div');
                    right.className = 'right';
                    
                    const rightImg = document.createElement('img');
                    rightImg.src = 'img/right2.png';

                    right.appendChild(rightImg);
                    imgBox.appendChild(right);
                }
            });

            // 장소 데이터를 detail_box에 추가
            places.forEach((place) => {
                const box2 = document.createElement('div');
                box2.className = 'box2';

                const h3 = document.createElement('h3');
                h3.textContent = place.name;

                const p = document.createElement('p');
                p.textContent = place.detail;

                box2.appendChild(h3);
                box2.appendChild(p);
                detailBox.appendChild(box2);
            });
        } catch (error) {
            console.error('Failed to fetch places from localStorage:', error);
        }
    }

    fetchPlacesFromLocalStorage();
});
