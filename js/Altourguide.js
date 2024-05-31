async function submitForm() {
    const form = document.getElementById('travelForm');
    const formData = {
        startDate: form.startDate.value,
        duration: form.duration.value,
        location: form.location.value,
        companion: form.companion.value
    };

    try {
        const response = await fetch('http://localhost:8080/ai/spots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }

        const responseData = await response.json();

        // 체크박스를 생성하는 함수 호출 후 travelForm 숨기기
        createCheckboxes(responseData.spots);
        document.getElementById('travelForm').style.display = 'none';
        document.getElementById('checkboxesContainer').style.display = 'block';
    } catch (error) {
        console.error("Error:", error);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('travelForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            submitForm();
        });
    } else {
        console.error("Element with ID 'travelForm' not found");
    }
});