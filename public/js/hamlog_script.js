//Function Set
function bginlog_func() {
    fewpassinput();
    fewuserinput();
}
function userinput_func() {
    userinputbar();
    fewpassinput();
}
function passinput_func() {
    passinputbar();
    fewuserinput();
}
function eye_func() {
    eyeon();
    eyeimgon();
}
function sign_up_click_func() {
    sign_up_click();
    eyeoff();
    fewpassinput();
    fewuserinput();
}
function bginsign_func() {
    fewuserinput_sign();
    fewusernameinput_sign();
    fewpassinput_sign();
    fewpassinput_sign2();
    checkmatchpass();
}
function userinput_sign_func() {
    userinputbar_sign();
    fewusernameinput_sign();
    fewpassinput_sign();
    fewpassinput_sign2();
    checkmatchpass();
}
function usernameinput_sign_func() {
    usernamepassinputbar_sign();
    fewuserinput_sign();
    fewpassinput_sign();
    fewpassinput_sign2();
    checkmatchpass();
}
function passinput_sign_func() {
    passinputbar_sign();
    fewuserinput_sign();
    fewusernameinput_sign();
    fewpassinput_sign2();
    checkmatchpass();
}
function eye_sign_func() {
    eye_sign();
    eye_signimgon();
    fewuserinput_sign();
    fewusernameinput_sign();
    fewpassinput_sign();
    fewpassinput_sign2();
    checkmatchpass();
}
function passinput_sign2_func() {
    passinputbar_sign2();
    fewuserinput_sign();
    fewusernameinput_sign();
    fewpassinput_sign();
    checkmatchpass();
}
function eye_sign2_func() {
    eye_sign2();
    eye_sign2imgon();
    fewuserinput_sign();
    fewusernameinput_sign();
    fewpassinput_sign();
    fewpassinput_sign2();
    checkmatchpass();
}
function login_click_func() {
    login_click();
    eyeoff_sign();
    fewuserinput_sign();
    fewusernameinput_sign();
    fewpassinput_sign();
    fewpassinput_sign2();
}






//-----------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.querySelector('.input1');
    const insearchBarElement = document.querySelector('.insearch_bar');
    const searchimg = document.getElementById('searchimg');

    inputElement.addEventListener('focus', function() {
        insearchBarElement.classList.add('active');
        searchimg.classList.add('active');
    });
    
    inputElement.addEventListener('blur', function() {
        insearchBarElement.classList.remove('active');
        if (inputElement.value.trim() === '') {
            searchimg.classList.remove('active');
        }
    });
});


//-----------------------------------------------

function myFunction(x) {
    x.classList.toggle("change");
    let mymenu = document.getElementById('mymenu');
    if (mymenu.className === 'menu') {
        setTimeout(function () {
            mymenu.className += ' menu-active';
        }, 200);
    } else {
        mymenu.className = 'menu';
    }
    let myheader = document.getElementById('myheader');
    if (myheader.className === 'header') {
        myheader.className += ' header-active';
    } else {
        myheader.className = 'header';
    }
}


//-----------------------------------------------
function addHoverEffect(element) {
    let arrow_up = element.querySelector('#arrow_up');
    arrow_up.className = 'fa-solid fa-arrow-up fa-2xl';
}

function removeHoverEffect(element) {
    let arrow_up = element.querySelector('#arrow_up');
    arrow_up.className = 'fa-solid fa-angle-up fa-2xl';
}

let scrollToTopBtn = document.getElementById('scrollToTopBtn');
scrollToTopBtn.onmouseover = function() { addHoverEffect(this); };
scrollToTopBtn.onmouseout = function() { removeHoverEffect(this); };







//-----------------------------------------------
// หากผู้ใช้ scroll หน้าเว็บ
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // แสดงหรือซ่อนปุ่มขึ้นไปด้านบนสุดขึ้นอยู่กับตำแหน่งของ scroll
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

function scrollToTop() {
    const scrollDuration = 800; // 3 วินาที (3000 มิลลิวินาที)
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    let scrollInterval = setInterval(function() {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 1); // ปรับค่า 15 ตามต้องการ
}


//-----------------------------------------------
document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    scrollToTop();
    });


function Closemenu() {
    let mymenu = document.getElementById('mymenu');
    if (mymenu.className === 'menu-active') {
        mymenu.className += ' menu';
    } else {
        mymenu.className = 'menu';
    }
    let myheader = document.getElementById('myheader');
    if (myheader.className === 'header-active') {
        myheader.className += ' header';
    } else {
        myheader.className = 'header';
    }
    let myham = document.getElementById('myham');
    if (myham.className === 'ham change') {
        myham.className = 'ham';
    } else {
        myham.className = 'ham';
    }
}



//-----------------------------------------------

function openLogin() {
    let myprologin = document.getElementById('myprologin');
    let Iinlog = document.getElementById('Iinlog');
    let Iinsign = document.getElementById('Iinsign');
    if (myprologin.className === 'prologin') {
        myprologin.className += ' prologin-active';
        myprologin.style.background = "#828282a0";
        Iinlog.style.transform = "translateY(0)";
        Iinsign.style.transform = "translateY(0)";
        Iinlog.style.transition = "transform 0.3s";
        Iinsign.style.transition = "transform 0.3s";
    }
}


function closeLogin() {
    let myprologin = document.getElementById('myprologin');
    let Iinlog = document.getElementById('Iinlog');
    let Iinsign = document.getElementById('Iinsign');
    if (myprologin.className !== 'prologin') {
        myprologin.style.background = "none";
        Iinsign.style.transform = "translateY(-150%)";
        Iinlog.style.transform = "translateY(-150%) ";
        setTimeout(function () {
            myprologin.className = 'prologin';
        }, 200);
    }
    eyeoff();
    eyeoff_sign();
    login_click();
    slideuserinputbar();
    slidepassinputbar();
    slideuserinputbar_sign();
    usernameslidepassinputbar_sign();
    slidepassinputbar_sign();
    slidepassinputbar_sign2();
}


//-----------------------------------------------
// เลื่อน text login

//---email
function fewuserinput() {
    const userInput = document.getElementById('Uuserinput').value;
    if (userInput.trim() === '') {
        slideuserinputbar();
    }
}

function userinputbar() {
    let Uuserinputbar = document.getElementById('Uuserinputbar');
    if (Uuserinputbar.className === 'userinputbar') {
        Uuserinputbar.className += ' userinputbar-active';
    }
}
function slideuserinputbar() {
    let Uuserinputbar = document.getElementById('Uuserinputbar');
    if (Uuserinputbar.className === 'userinputbar-active') {
        Uuserinputbar.className = ' userinputbar';
    }else {
        Uuserinputbar.className = 'userinputbar';
    }
}


//---pass
function fewpassinput() {
    const passInput = document.getElementById('Ppassinput').value;
    if (passInput.trim() === '') {
        slidepassinputbar();
    }
}


function passinputbar() {
    let Ppassinputbar = document.getElementById('Ppassinputbar');
    if (Ppassinputbar.className === 'passinputbar') {
        Ppassinputbar.className += ' passinputbar-active';
    }
}
function slidepassinputbar() {
    let Ppassinputbar = document.getElementById('Ppassinputbar');
    if (Ppassinputbar.className === 'passinputbar-active') {
        Ppassinputbar.className = ' passinputbar';
    }else {
        Ppassinputbar.className = 'passinputbar';
    }
}
//-----------------------------------------------
// เลื่อน text sign up

//---email
function fewuserinput_sign() {
    const userinput_sign = document.getElementById('Uuserinput_sign').value;
    if (userinput_sign.trim() === '') {
        slideuserinputbar_sign();
    }
}

function userinputbar_sign() {
    let userinput_sign = document.getElementById('Uuserinputbar_sign');
    if (userinput_sign.className === 'userinputbar_sign') {
        userinput_sign.className += ' userinputbar_sign-active';
    }
}
function slideuserinputbar_sign() {
    let userinput_sign = document.getElementById('Uuserinputbar_sign');
    if (userinput_sign.className === 'userinputbar_sign-active') {
        userinput_sign.className = ' userinputbar_sign';
    }else {
        userinput_sign.className = 'userinputbar_sign';
    }
}


//---username
function fewusernameinput_sign() {
    const Uusernameinput_sign = document.getElementById('Uusernameinput_sign').value;
    if (Uusernameinput_sign.trim() === '') {
        usernameslidepassinputbar_sign();
    }
}


function usernamepassinputbar_sign() {
    let Uusernameinput_sign = document.getElementById('Uusernameinputbar_sign');
    if (Uusernameinput_sign.className === 'usernameinputbar_sign') {
        Uusernameinput_sign.className += ' usernameinputbar_sign-active';
    }
}
function usernameslidepassinputbar_sign() {
    let Uusernameinput_sign = document.getElementById('Uusernameinputbar_sign');
    if (Uusernameinput_sign.className === 'usernameinputbar_sign-active') {
        Uusernameinput_sign.className = ' usernameinputbar_sign';
    }else {
        Uusernameinput_sign.className = 'usernameinputbar_sign';
    }
}

//---pass1
function fewpassinput_sign() {
    const Ppassinput_sign = document.getElementById('Ppassinput_sign').value;
    if (Ppassinput_sign.trim() === '') {
        slidepassinputbar_sign();
    }
}


function passinputbar_sign() {
    let Ppassinput_sign = document.getElementById('Ppassinputbar_sign');
    if (Ppassinput_sign.className === 'passinputbar_sign') {
        Ppassinput_sign.className += ' passinputbar_sign-active';
    }
}
function slidepassinputbar_sign() {
    let Ppassinput_sign = document.getElementById('Ppassinputbar_sign');
    if (Ppassinput_sign.className === 'passinputbar_sign-active') {
        Ppassinput_sign.className = ' passinputbar_sign';
    }else {
        Ppassinput_sign.className = 'passinputbar_sign';
    }
}

//---pass2
function fewpassinput_sign2() {
    const Ppassinput_sign2 = document.getElementById('Ppassinput_sign2').value;
    if (Ppassinput_sign2.trim() === '') {
        slidepassinputbar_sign2();
    }
}


function passinputbar_sign2() {
    let Ppassinput_sign2 = document.getElementById('Ppassinputbar_sign2');
    if (Ppassinput_sign2.className === 'passinputbar_sign2') {
        Ppassinput_sign2.className += ' passinputbar_sign2-active';
        
    }
}
function slidepassinputbar_sign2() {
    let Ppassinput_sign2 = document.getElementById('Ppassinputbar_sign2');
    if (Ppassinput_sign2.className === 'passinputbar_sign2-active') {
        Ppassinput_sign2.className = ' passinputbar_sign2';
    }else {
        Ppassinput_sign2.className = 'passinputbar_sign2';
    }
}
// matchpass
function checkmatchpass() {
    const Ppassinput_sign2 = document.getElementById('Ppassinput_sign2').value;
    const Ppassinput_sign = document.getElementById('Ppassinput_sign').value;
    if (Ppassinput_sign2.trim() !== '') {
        if (Ppassinput_sign2.trim() !== Ppassinput_sign.trim()) {
            matchpass();
        } else {
            matchpasstrue();
        }
    } else {
        matchpasstrue();
    }
    
}

function matchpass() {
    let Ppassinput_sign2 = document.getElementById('Mmatchpass');
    if (Ppassinput_sign2.className === 'matchpass') {
        Ppassinput_sign2.className += ' matchpass-active';
    }
}
function matchpasstrue() {
    let Ppassinput_sign2 = document.getElementById('Mmatchpass');
    if (Ppassinput_sign2.className === ' matchpass-active') {
        Ppassinput_sign2.className = ' matchpass';
    }else {
        Ppassinput_sign2.className = 'matchpass';
    }
}

//-----------------------------------------------
// login eye password

function eyeon() {
    let eye = document.getElementById('Ppassinput');
    if (eye.type === 'password') {
        eye.type = 'text';
    } else {
        eye.type = 'password';
    }
}
function eyeimgon() {
    let eye = document.getElementById('eye');
    if (eye.className === 'fa-solid fa-eye fa-xl') {
        eye.className = 'fa-solid fa-eye-slash fa-xl';
        eye.style.transform = 'translateX(1.5px)';
        eye.style.cursor = 'pointer';
    } else {
        eye.className = 'fa-solid fa-eye fa-xl';
        eye.style.transform = 'none';
        eye.style.cursor = 'pointer';
    }
}
//clear
function eyeoff() {
    let eye = document.getElementById('eye');
    if (eye.className !== 'fa-solid fa-eye fa-xl') {
        eye.className = 'fa-solid fa-eye fa-xl';
        eye.style.transform = 'none';
        eye.style.cursor = 'pointer';
    }
    let Ppassinput = document.getElementById('Ppassinput');
    if (Ppassinput.type !== 'password') {
        Ppassinput.type = 'password';
    }

    document.getElementById('Uuserinput').value = '';
    document.getElementById('Ppassinput').value = '';
}
//-----------------------------------------------
// Sing up eye password

function eye_sign() {
    let eye_sign = document.getElementById('Ppassinput_sign');
    if (eye_sign.type === 'password') {
        eye_sign.type = 'text';
    } else {
        eye_sign.type = 'password';
    }
}
function eye_signimgon() {
    let eye = document.getElementById('eye_sign');
    if (eye.className === 'fa-solid fa-eye fa-xl') {
        eye.className = 'fa-solid fa-eye-slash fa-xl';
        eye.style.transform = 'translateX(1.5px)';
        eye.style.cursor = 'pointer';
    } else {
        eye.className = 'fa-solid fa-eye fa-xl';
        eye.style.transform = 'none';
        eye.style.cursor = 'pointer';
    }
}
//clear
function eyeoff_sign() {
    let eye_sign = document.getElementById('eye_sign');
    let eye_sign2 = document.getElementById('eye_sign2');
    if (eye_sign.className !== 'fa-solid fa-eye fa-xl') {
        eye_sign.className = ' fa-solid fa-eye fa-xl';
        eye_sign.style.transform = 'none';
        eye_sign.style.cursor = 'pointer';
    }
    if (eye_sign2.className !== 'fa-solid fa-eye fa-xl') {
        eye_sign2.className = ' fa-solid fa-eye fa-xl';
        eye_sign2.style.transform = 'none';
        eye_sign2.style.cursor = 'pointer';
    }
    let Ppassinput_sign = document.getElementById('Ppassinput_sign');
    let Ppassinput_sign2 = document.getElementById('Ppassinput_sign2');
    if (Ppassinput_sign.type !== 'password') {
        Ppassinput_sign.type = 'password';
    }
    if (Ppassinput_sign2.type !== 'password') {
        Ppassinput_sign2.type = 'password';
    }
    document.getElementById('Uuserinput_sign').value = '';
    document.getElementById('Uusernameinput_sign').value = '';
    document.getElementById('Ppassinput_sign').value = '';
    document.getElementById('Ppassinput_sign2').value = '';
    matchpasstrue();
}
// Sing up eye2 password

function eye_sign2() {
    let eye_sign2 = document.getElementById('Ppassinput_sign2');
    if (eye_sign2.type === 'password') {
        eye_sign2.type = 'text';
    } else {
        eye_sign2.type = 'password';
    }
}
function eye_sign2imgon() {
    let eye_sign2 = document.getElementById('eye_sign2');
    if (eye_sign2.className === 'fa-solid fa-eye fa-xl') {
        eye_sign2.className = 'fa-solid fa-eye-slash fa-xl';
        eye_sign2.style.transform = 'translateX(1.5px)';
        eye_sign2.style.cursor = 'pointer';
    } else {
        eye_sign2.className = 'fa-solid fa-eye fa-xl';
        eye_sign2.style.transform = 'none';
        eye_sign2.style.cursor = 'pointer';
    }
}

//-----------------------------------------------
//sign_up_click

function sign_up_click() {
    let Iinlog = document.getElementById('Iinlog');
    let Iinsign = document.getElementById('Iinsign');
    if (Iinlog.className === 'inlog') {
        Iinlog.style.opacity = '0';
        Iinlog.style.zIndex = '20';
        Iinsign.style.opacity = '1';
        Iinsign.style.zIndex = '21';
        Iinlog.style.transition = "opacity 0.1s transform 0.3s";
        Iinsign.style.transition = "opacity 0.1s transform 0.3s";
    }
}
function login_click() {
    let Iinlog = document.getElementById('Iinlog');
    let Iinsign = document.getElementById('Iinsign');
    if (Iinsign.className === 'insign') {
        Iinsign.style.opacity = '0';
        Iinsign.style.zIndex = '20';
        Iinlog.style.opacity = '1';
        Iinlog.style.zIndex = '21';
        Iinlog.style.transition = "opacity 0.1s transform 0.3s";
        Iinsign.style.transition = "opacity 0.1s transform 0.3s";
    }
}



//--------------------------------

document.addEventListener('DOMContentLoaded', function() {
    let count_order = document.querySelector('.count_order')  

// ส่งคำขอ GET ไปยัง server เพื่อดึงข้อมูล
fetch(`/api/count_in_cart/`)
    .then(response => response.json())
    .then(amount_pro_cart => {
        count_order.innerHTML = `${amount_pro_cart} `;
    })
    .catch(error => {
        console.error('Error fetching product data:', error);
    });





    const logout = document.querySelector('.logout').addEventListener("click",function(){
        const relog = document.querySelector('.relog')
        relog.style.transform = "scale(1)"
        
    })
    const cancel_logout = document.querySelector('.cancel_logout').addEventListener("click",function(){
        const relog = document.querySelector('.relog')
        setTimeout(() => {
            relog.style.transform = "scale(0)"
        }, 100);
        
    });
    document.querySelector('.ham').addEventListener("click",function(){
        const relog = document.querySelector('.relog')
        setTimeout(() => {
            relog.style.transform = "scale(0)"
        }, 100);
        
    });
});



//------------------------------

//-----------------------------------------------// login client to server




//----------------------------------------------

document.querySelector('.Loginbutton').addEventListener('click', function() {
    // ดึงค่า input จากฟอร์ม
    const email = document.getElementById('Uuserinput').value;
    const password = document.getElementById('Ppassinput').value;
    const closeLogin = document.querySelector('.closeLogin');
    const logout = document.querySelector('.logout');
    const login = document.querySelector('.login');
    const not_mail = document.querySelector('.not_mail');

    // ส่ง request ไปยัง server
    fetch('/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Handle successful login (e.g., redirect, update UI, etc.)
            window.location.href = '/';  // Redirect to the home page
        } else {
            // Handle unsuccessful login (e.g., display an error message)
            not_mail.style.visibility = "visible";
            console.log('Invalid username or password');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle the error, for example by displaying a user-friendly message
    });
});



//---------------------------------------------- register
document.querySelector('.Signinbutton').addEventListener('click', function () {
    // ดึงค่า input จากฟอร์ม
    const Uuserinput_sign = document.getElementById('Uuserinput_sign').value.trim();
    const Uusernameinput_sign = document.getElementById('Uusernameinput_sign').value;
    const Ppassinput_sign = document.getElementById('Ppassinput_sign').value.trim();
    const Ppassinput_sign2 = document.getElementById('Ppassinput_sign2').value.trim();
    const match_mail = document.querySelector('.match_mail');
    const login_click = document.querySelector('.login_click');
    const matchpass = document.querySelector('.matchpass')
    // ตรวจสอบรหัสผ่านและอีเมล
    if (Ppassinput_sign === Ppassinput_sign2 && Ppassinput_sign.length >= 8) {
        matchpass.style.display = 'none';
        // ส่ง request ไปยัง server
        fetch('/save-register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Uuserinput_sign, Uusernameinput_sign, Ppassinput_sign }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.check_mail) {
                    match_mail.style.visibility = "hidden";
                    console.log('Data inserted successfully');
                    setTimeout(() => {
                        login_click.click()
                        alert('Register successfully!!!');
                    }, 500);
                    
                } else {
                    match_mail.style.visibility = "visible";
                    console.log('Email is already registered');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle the error, for example by displaying a user-friendly message
            });
    } else {
        matchpass.style.display = 'flex';
        console.log('Password mismatch or does not meet requirements');
    }
});



