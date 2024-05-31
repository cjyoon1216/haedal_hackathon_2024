// 아이디 양식에 맞게 입력
$(document).ready(function() {
    $("#username").on('input', function() {
        var username = $(this).val();
        var pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,20}$/;

        if(pattern.test(username)) {
            // 조건을 만족하면 안내 메시지를 숨기고, 중복확인 버튼을 보이게 합니다.
            $(".guidance-message").show().css('color', 'blue');
            $("#check-username").css('visibility', 'visible'); // 중복확인 버튼을 보이게 함
        } else {
            // 조건을 만족하지 못하면 안내 메시지를 빨간색으로 표시하고, 중복확인 버튼을 보이지 않게 합니다.
            $(".guidance-message").show().css('color', 'red');
            $("#check-username").css('visibility', 'hidden'); // 중복확인 버튼을 보이지 않게 함
        }
    });

    // 페이지가 로드될 때 중복확인 버튼을 보이지 않게 합니다. (초기 상태 설정)
    $("#check-username").css('visibility', 'hidden');
});

// 중복확인 버튼 클릭 시 /auth/check-username API 호출해 데이터베이스 중복확인
$(document).ready(function() {
    $('#check-username').click(async function() {
        const username = $('#username').val();

        if (!username) {
            $('#username-error').text('아이디를 입력해주세요.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/auth/check-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });

            const data = await response.json();

            if (data.exists) {
                $('#username-error').text('이미 사용중인 아이디입니다.');
                alert('이미 사용중인 아이디입니다.'); // 팝업 메시지로 사용자에게 알림
            } else {
                $('#username-error').text('사용 가능한 아이디입니다.');
                alert('사용 가능한 아이디입니다.'); // 팝업 메시지로 사용자에게 알림
                $('#check-username').hide(); // 중복 확인 버튼 숨기기
            }
        } catch (error) {
            console.error('Error checking username:', error);
            $('#username-error').text('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'); // 팝업 메시지로 사용자에게 알림
        }
    });
});

// 비밀번호 조건 충족 확인
$(document).ready(function() {
    // 비밀번호 입력 필드에 이벤트 리스너 추가
    $("#password").on("input", function() {
        validatePassword();
    });
});

function validatePassword() {
    var password = $("#password").val();
    var messageElement = $(".password-guidance");

    // 비밀번호 조건: 영문, 숫자, 특수문자 포함 8자리 이상
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (passwordRegex.test(password)) {
        // 조건을 만족하면 메시지를 "적절한 비밀번호입니다."로 변경
        messageElement.text("적절한 비밀번호입니다.");
        messageElement.css("color", "green"); // 메시지 색상을 초록색으로 변경
    } else {
        // 조건을 만족하지 않으면 원래 메시지로 복원
        messageElement.text("영문, 숫자, 특수문자를 조합하여 8자리 이상의 비밀번호를 입력해주세요.");
        messageElement.css("color", "black"); // 메시지 색상을 검은색으로 변경
    }
}


// 비밀번호 확인 값이 비밀번호와 동일한지 확인 
$(document).ready(function() {
    // 비밀번호와 비밀번호 확인 입력 필드의 입력값이 변경될 때마다 함수를 실행합니다.
    $('#password, #confirm-password').on('input', function() {
        // 비밀번호와 비밀번호 확인 필드의 값이 서로 같은지 확인합니다.
        if ($('#password').val() === $('#confirm-password').val()) {
            // 값이 같으면, 비밀번호 일치 메시지를 표시합니다.
            $(".confrim-password-guidance").text('비밀번호가 일치합니다.').css('color', 'green');
        } else {
            // 값이 다르면, 메시지를 지웁니다.
            $(".confrim-password-guidance").text('비밀번호를 다시 한 번 입력해주세요.').css('color', 'black');
        }
    });
});

// 이메일 직접입력 시 입력칸 생성
$(document).ready(function(){
    $("#email-domain").change(function(){
        if($(this).val() == "직접 입력"){
            $("#email-custom-domain").show();
        }else{
            $("#email-custom-domain").hide();
        }
    });
});
$(document).ready(function(){
    let gender = '-'; // 초기값을 '-'로 설정

    $('#submit-form').click(async function(event){
        event.preventDefault(); // 폼 제출 기본 동작 방지

        const username = $('#username').val().substring(0, 50); // 최대 50자로 제한
        const password = $('#password').val().substring(0, 255); // 최대 255자로 제한
        const confirmPassword = $('#confirm-password').val();
        const name = $('#name').val().substring(0, 100); // 최대 100자로 제한
        const genderValue = $('input[name="gender"]:checked').val();
        const nickname = $('#nickname').val().substring(0, 50); // 최대 50자로 제한
        const phoneNumber = $('#phone-prefix').val().replace('-', '') + $('#phone-middle').val().replace('-', '') + $('#phone-last').val().replace('-', ''); // 하이픈 제거
        const region = $('#region').val().substring(0, 100); // 최대 100자로 제한
        const Birthdate = $('#birthdate').val();
        const emailUser = $('#email-user').val();
        const emailDomain = $('#email-domain').val() === '직접 입력' ? $('#email-custom-domain').val() : $('#email-domain').val();
        const email = `${emailUser}@${emailDomain}`;

        // 입력 정보 유효성 검사
        const { isValid, gender } = validateInputs(username, password, confirmPassword, name, genderValue, nickname, phoneNumber, Birthdate, email);
        if (!isValid) {
            return; // 유효성 검사 실패 시 API 호출 중단
        }
        // 생일 데이터를 date 형식으로 변환
        const birthdate = new Date(Birthdate).toISOString().slice(0, 10);
        // API 호출
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                    name,
                    gender,
                    nickname,
                    phone: phoneNumber,
                    region,
                    birthdate,
                    email
                })
            });

            if (response.ok) {
                // 회원가입 성공 처리
                alert('회원가입이 완료되었습니다.');
                window.close(); // 회원가입 페이지 닫기
            } else {
                // 회원가입 실패 처리
                const errorData = await response.json();
                alert(errorData.message);
                location.reload(); // 회원가입 창 새로고침
            }
        } catch (error) {
            console.error('API 호출 실패:', error);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
            location.reload(); // 회원가입 창 새로고침
        }
    });

    function validateInputs(username, password, confirmPassword, name, genderValue, nickname, phoneNumber, birthdate, email) {
        let isValid = true;
        let gender = '-'; // 초기값을 '-'로 설정

        // 아이디 유효성 검사
        if (!/^[a-zA-Z0-9]{7,20}$/.test(username)) {
            $('#username-error').text('영문과 숫자를 조합한 7~20자리의 아이디를 입력해주세요.');
            isValid = false;
        } else {
            $('#username-error').text('');
        }

        // 비밀번호 유효성 검사
        if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(password)) {
            $('#password-error').text('영문, 숫자, 특수문자를 조합하여 8자리 이상의 비밀번호를 입력해주세요.');
            isValid = false;
        } else {
            $('#password-error').text('');
        }

        // 비밀번호 확인 검사
        if (password !== confirmPassword) {
            $('#confirm-password-error').text('비밀번호가 일치하지 않습니다.');
            isValid = false;
        } else {
            $('#confirm-password-error').text('');
        }

        // 이름 유효성 검사
        if (name.trim() === '') {
            isValid = false;
        }

        // 성별 유효성 검사
        if (genderValue === 'male') {
            gender = '남성';
        } else if (genderValue === 'female') {
            gender = '여성';
        } else {
            gender = '-'; // 성별 정보가 없는 경우
        }

        // 닉네임 유효성 검사
        if (nickname.trim() === '') {
            isValid = false;
        }

        // 전화번호 유효성 검사
        if (phoneNumber.trim() === '') {
            isValid = false;
        }

        // 생년월일 유효성 검사
        if (birthdate.trim() === '') {
            isValid = false;
        }

        // 이메일 유효성 검사
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $('#email-error').text('이메일 형식이 올바르지 않습니다.');
            isValid = false;
        } else {
            $('#email-error').text('');
        }

        return {
            isValid,
            gender
        };
    }
});