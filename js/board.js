document.addEventListener("DOMContentLoaded", function() {
    const imgBox = document.querySelector('.img_box');
    const detailBox = document.querySelector('.detail_box');

    function fetchPlacesFromLocalStorage() {
        try {
            const storedData = localStorage.getItem('schedule');
            if (!storedData) {
                throw new Error('No data found in localStorage');
            }

            const parsedData = JSON.parse(storedData);
            const spots = parsedData[0].spots;

            console.log('Parsed spots:', spots);

            spots.forEach((spot, index) => {
                // 이미지 박스 추가
                const box1 = document.createElement('div');
                box1.className = 'box1';

                const img = document.createElement('img');
                img.src = `img/photo-${index + 1}.jpg`;
                img.alt = spot.name;

                const nameP = document.createElement('p');
                nameP.textContent = spot.name;

                box1.appendChild(img);
                box1.appendChild(nameP);
                imgBox.appendChild(box1);

                if (index < spots.length - 1) {
                    const right = document.createElement('div');
                    right.className = 'right';

                    const rightImg = document.createElement('img');
                    rightImg.src = 'img/right2.png';

                    right.appendChild(rightImg);
                    imgBox.appendChild(right);
                }

                // 디테일 박스 추가
                const box2 = document.createElement('div');
                box2.className = 'box2';

                const h3 = document.createElement('h3');
                h3.textContent = spot.name;

                const p = document.createElement('p');
                p.textContent = spot.detail;

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
