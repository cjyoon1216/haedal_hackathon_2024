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

function createCheckboxes(spots) {
    const spotsListDiv = document.getElementById('spotsList');
    if (!spotsListDiv) {
        console.error("Element with ID 'spotsList' not found");
        return;
    }
    spotsListDiv.innerHTML = ''; // 기존 내용을 비웁니다.

    spots.forEach((spot) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = spot.name;
        checkbox.value = spot.name;

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.appendChild(document.createTextNode(spot.name));

        spotsListDiv.appendChild(checkbox);
        spotsListDiv.appendChild(label);
        spotsListDiv.appendChild(document.createElement('br'));
    });

    const confirmButton = document.createElement('button');
    confirmButton.textContent = '확인';
    confirmButton.id = 'confirmButton';

    confirmButton.addEventListener('click', function() {
        const selectedSpots = [];
        spots.forEach((spot) => {
            const checkbox = document.getElementById(spot.name);
            if (checkbox.checked) {
                selectedSpots.push(spot.name);
            }
        });

        const unselectedSpots = spots.filter(spot => !selectedSpots.includes(spot.name));
        const sendingSpot = unselectedSpots.map(spot => spot.name);

        console.log('Selected spots:', selectedSpots);
        console.log('Sending spots:', sendingSpot);

        document.getElementById('checkboxesContainer').style.display = 'none';
        document.getElementById('travelForm').style.display = 'block';

        // 필요한 경우 선택되지 않은 값들을 서버로 다시 보내는 로직을 추가할 수 있습니다.
        // 예: submitUnselectedSpots(sendingSpot);
    });

    spotsListDiv.appendChild(confirmButton);
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