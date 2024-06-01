document.addEventListener('DOMContentLoaded', function() {
    const aiResponse = localStorage.getItem('aiResponse');
    if (aiResponse) {
        const data = JSON.parse(aiResponse);
        const spots = data.spots;
        const checklistContainer = document.getElementById('checklistContainer');

        spots.forEach(spot => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = spot.name;
            checkbox.name = 'spots';
            checkbox.value = spot.name;

            const label = document.createElement('label');
            label.htmlFor = spot.name;
            label.textContent = spot.name;

            const br = document.createElement('br');

            checklistContainer.appendChild(checkbox);
            checklistContainer.appendChild(label);
            checklistContainer.appendChild(br);
        });
    } else {
        alert('잘못된 접근입니다.');
    }
});
    document.addEventListener('DOMContentLoaded', function() {
});

async function refreshChecklist() {
    const formData = {
        startDate: localStorage.getItem('selectedDate'),
        duration: localStorage.getItem('selectedDuration'),
        location: localStorage.getItem('selectedLocation'),
        companion: localStorage.getItem('selectedCompanion'),
        days: localStorage.getItem('selectedDays')
    };

    try {
        const response = await fetch('http://localhost:8080/ai/spots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            const spots = data.spots;
            // 기존 체크리스트 초기화
            const checklistContainer = document.getElementById('checklistContainer');
            checklistContainer.innerHTML = ''; // 기존 체크리스트 내용을 모두 지웁니다.

            // 새로운 체크리스트 항목 추가
            spots.forEach(spot => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = spot.name;
            checkbox.name = 'spots';
            checkbox.value = spot.name;

            const label = document.createElement('label');
            label.htmlFor = spot.name;
            label.textContent = spot.name;

            const br = document.createElement('br');

            checklistContainer.appendChild(checkbox);
            checklistContainer.appendChild(label);
            checklistContainer.appendChild(br);
            });
        } else {
            alert('데이터를 불러오는데 실패했습니다.');
        }
    } catch (error) {
        console.error('오류가 발생했습니다:', error);
        alert('오류가 발생했습니다. 콘솔을 확인해주세요.');
    }
    }

async function submitForm() {
    let dayCount = 1;
    switch(document.getElementById('duration').value) {
        case '당일치기':
            dayCount = 1;
            break;
        case '1박 2일':
            dayCount = 2;
            break;
        case '2박 3일':
            dayCount = 3;
            break;
        case '3박 4일':
            dayCount = 4;
            break;
        case '4박 5일':
            dayCount = 5;
            break;
        default:
            dayCount = 1; // 기본값 설정
        }
    // 사용자가 선택한 값들을 formData 객체에 저장
    const formData = {
        startDate: document.getElementById('startDate').value,
        duration: document.getElementById('duration').value,
        location: document.getElementById('location').value,
        companion: document.getElementById('companion').value,
        days: dayCount
    };
        // Local Storage에 선택된 데이터와 서버로부터 받은 데이터 저장
        localStorage.setItem('selectedDate', formData.startDate);
        localStorage.setItem('selectedDuration', formData.duration);
        localStorage.setItem('selectedLocation', formData.location);
        localStorage.setItem('selectedCompanion', formData.companion);
        localStorage.setItem('selectedDays', formData.days);
    try {
        // 서버에 formData를 전송하고 응답 받기
        const response = await fetch('http://localhost:8080/ai/spots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // JSON 응답을 파싱합니다.
            const data = await response.json();
            // 서버로부터 받은 데이터도 저장합니다.
            localStorage.setItem('aiResponse', JSON.stringify(data));

            const spots = data.spots;
            // 기존 체크리스트 초기화
            const checklistContainer = document.getElementById('checklistContainer');
            checklistContainer.innerHTML = ''; // 기존 체크리스트 내용을 모두 지웁니다.

            // 새로운 체크리스트 항목 추가
            spots.forEach(spot => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = spot.name;
                checkbox.name = 'spots';
                checkbox.value = spot.name;

                const label = document.createElement('label');
                label.htmlFor = spot.name;
                label.textContent = spot.name;

                const br = document.createElement('br');

                checklistContainer.appendChild(checkbox);
                checklistContainer.appendChild(label);
                checklistContainer.appendChild(br);
            });
        } else {
            alert('데이터를 불러오는데 실패했습니다.');
        }
    } catch (error) {
        console.error('오류가 발생했습니다:', error);
        alert('오류가 발생했습니다. 콘솔을 확인해주세요.');
    }
}

async function detail() {
    // 체크되지 않은 체크리스트 항목들을 추출하여 routes 배열 생성
    const uncheckedSpots = [];
    document.querySelectorAll('input[name="spots"]:not(:checked)').forEach(function(spot) {
        uncheckedSpots.push({ name: spot.value });
    });

    // 로컬 스토리지에서 필요한 데이터를 가져와서 formData 객체 생성
    const formData = {
        startDate: localStorage.getItem('selectedDate'),
        duration: localStorage.getItem('selectedDuration'),
        location: localStorage.getItem('selectedLocation'),
        companion: localStorage.getItem('selectedCompanion'),
        routes: uncheckedSpots,
        days: localStorage.getItem('selectedDays')
    };

    try {
        // 서버에 formData를 전송하고 응답 받기
        const response = await fetch('http://localhost:8080/ai/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            // 로컬 스토리지에 응답 데이터 저장
            localStorage.setItem('schedule', JSON.stringify(data));
            alert('일정이 성공적으로 저장되었습니다.');
        } else {
            alert('일정을 저장하는 데 실패했습니다.');
        }
    } catch (error) {
        console.error('오류가 발생했습니다:', error);
        alert('오류가 발생했습니다. 콘솔을 확인해주세요.');
    }
}