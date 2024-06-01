async function submitForm() {
    const form = document.getElementById('travelForm');
    let dayCount = 1;
    // form 요소에서 데이터를 가져옵니다.
    // duration 값에 따라 dayCount 설정
    switch(form.duration.value) {
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
        const formData = {
            startDate: form.startDate.value,
            duration: form.duration.value,
            location: form.location.value,
            companion: form.companion.value,
            days: dayCount
        };
        
        localStorage.setItem('location', formData.location);
        localStorage.setItem('duration', formData.duration);
    try {
        // 서버에 데이터를 전송하고 응답을 받습니다.
        const response = await fetch('http://localhost:8080/ai/spots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Network response was not ok.');

        // JSON 응답을 파싱합니다.
        const data = await response.json();

        // Local Storage에 선택된 데이터와 서버로부터 받은 데이터 저장
        localStorage.setItem('selectedDate', formData.startDate);
        localStorage.setItem('selectedDuration', formData.duration);
        localStorage.setItem('selectedLocation', formData.location);
        localStorage.setItem('selectedCompanion', formData.companion);
        localStorage.setItem('selectedDays', formData.days);
        // 서버로부터 받은 데이터도 저장합니다.
        localStorage.setItem('aiResponse', JSON.stringify(data));

        // 다음 페이지로 이동
        window.location.href = 'http://127.0.0.1:5500/haedal_hackathon_2024-master/category_recom.html';
    } catch (error) {
        console.error("Error:", error);
    }
}
