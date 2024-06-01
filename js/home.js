$(document).ready(function() {
    var typingBool = false; 
    var typingIdx = 0; 
    var liIndex = 0;
    var liLength = $(".typing-txt>ul>li").length;
  
    // 타이핑될 텍스트를 가져온다 
    var typingTxt = $(".typing-txt>ul>li").eq(liIndex).text(); 
    typingTxt = typingTxt.split(""); // 한글자씩 자른다. 
    if (typingBool == false) { // 타이핑이 진행되지 않았다면 
        typingBool = true; 
        var tyInt = setInterval(typing, 100); // 반복동작 
    } 
        
    function typing() { 
        if (typingIdx < typingTxt.length) { // 타이핑될 텍스트 길이만큼 반복 
            $(".typing").append(typingTxt[typingIdx]); // 한글자씩 이어준다. 
            typingIdx++; 
        } else { // 한문장이 끝나면
            // 다음 문장으로.. 마지막 문장이면 다시 첫번째 문장으로 
            if (liIndex >= liLength - 1) {
                liIndex = 0;
            } else {
                liIndex++; 
            }
        
            // 다음 문장을 타이핑하기 위한 셋팅
            typingIdx = 0;
            typingBool = false; 
            typingTxt = $(".typing-txt>ul>li").eq(liIndex).text(); 
          
            // 다음 문장 타이핑 전 1초 쉰다
            clearInterval(tyInt);
            setTimeout(function() {
                $(".typing").html('');
                tyInt = setInterval(typing, 100);
            }, 1000);
        } 
    }
  
    // 로그인 폼 제출 이벤트 핸들러
    $('#login-form').submit(async function(e) {
        e.preventDefault();
  
        const username = $('#username').val();
        const password = $('#password').val();
        localStorage.setItem('user_name', username);
  
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
  
            const data = await response.json();
  
            if (data.success) {
                // 로그인 성공 시 처리
                console.log('로그인 성공:', data.token);
  
                // 로그인 성공 시 토큰 저장
                
                localStorage.setItem('token', data.token);
                localStorage.setItem('token', data.token);
  
                // 메인 페이지로 이동하는 등의 추가 처리
                window.location.href = 'http://127.0.0.1:5500/haedal_hackathon_2024-master/main.html';
            } else {
                // 로그인 실패 시 처리
                alert(data.msg);
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    });
  
    // 회원가입 버튼을 누르면 회원가입 창 팝업으로 나타나게 하는 기능
    window.openRegisterPopup = function() {
        var screenWidth = window.screen.width;
        var screenHeight = window.screen.height;
        var popupWidth = 600;
        var popupHeight = 500;
        var popupLeft = (screenWidth - popupWidth) / 2;
        // 사용자의 스크롤 위치에 따라 팝업 창의 top 값을 조정
        var popupTop = window.moveTo(0, -300); // 페이지 상단에서 50px 아래에 위치
  
        window.open('register.html', 'registerWindow', 'width=' + popupWidth + ', height=' + popupHeight + ', left=' + popupLeft + ', top=' + popupTop + ', scrollbars=yes');
    }
  });

  document.addEventListener('DOMContentLoaded', (event) => {
    const user_name = localStorage.getItem('user_name');
    if (user_name) {
        document.getElementById('user_name').innerText = user_name;
    }
  });