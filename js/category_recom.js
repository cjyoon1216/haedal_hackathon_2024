document.addEventListener('DOMContentLoaded', (event) => {
    const selectedDate = localStorage.getItem('selectedDate');
    const selectedDuration = localStorage.getItem('selectedDuration');
    const selectedLocation = localStorage.getItem('selectedLocation');
    const selectedCompanion = localStorage.getItem('selectedCompanion');
    if (selectedDuration) {
        document.getElementById('selectedDuration').innerText += selectedDuration;
    } else {
        document.getElementById('selectedDuration').innerText += '선택된 값이 없습니다.';
    }
    if (selectedDate) {
        document.getElementById('selectedDate').innerText += selectedDate;
    } else {
        document.getElementById('selectedDate').innerText += '선택된 값이 없습니다.';
    }
    if (selectedLocation) {
        document.getElementById('selectedLocation').innerText += selectedLocation;
    } else {
        document.getElementById('selectedLocation').innerText += '선택된 값이 없습니다.';
    }
    if (selectedCompanion) {
        document.getElementById('selectedCompanion').innerText += selectedCompanion;
    } else {
        document.getElementById('selectedCompanion').innerText += '선택된 값이 없습니다.';
    }
});