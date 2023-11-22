

let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}
function onmouseDivs(n) {
    showDivs(slideIndex = n);
  }
function showDivs(n) {
  let i;
  const x = document.getElementsByClassName("mySlides");
  const sub = document.getElementsByClassName("sub");
  if (n > x.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = x.length; }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    sub[i].style.opacity = "0.7";
  }
  x[slideIndex - 1].style.display = "block";
  sub[slideIndex - 1].style.opacity = "1";
}

//---------------------------------------

const productCartButtons = document.getElementById('product_cart_button');
const cartrun = document.getElementById('cartrun');
const product_cart_button = document.querySelectorAll('.product_cart_button');
let isAnimating = false;

function startAnimation() {
    // ถ้ากำลังมีอนิเมชันทำงานอยู่ ออกจากฟังก์ชันเพื่อป้องกันการคลิกเพิ่มเติม
    if (isAnimating) return;

    // เริ่มอนิเมชัน
    isAnimating = true;
    cartrun.classList.add('running');

    // เริ่มอนิเมชันของ productCartButtons
    productCartButtons.classList.add('animation'); // เรียกอนิเมชันของ productCartButtons

    // ให้หายไปหลังจากอนิเมชันเสร็จสิ้น
    cartrun.addEventListener('animationend', () => {
        cartrun.classList.remove('running');
        isAnimating = false;
    });

    // ให้ productCartButtons หายไปหลังจากอนิเมชันเสร็จสิ้น
    productCartButtons.addEventListener('animationend', () => {
      productCartButtons.classList.remove('animation');
    });
}

product_cart_button.forEach((button) => {
    button.addEventListener('click', startAnimation);
});

//---------------------------------------

const decrementButtons = document.querySelectorAll('.decrement');
const incrementButtons = document.querySelectorAll('.increment');
const countDisplays = document.querySelectorAll('.count');
const quantity_products = document.getElementById('quantity_product');
let myDataValue = parseInt(quantity_products.textContent);
let max_qp = document.querySelector('.max_qp')

// สร้างตัวแปรสำหรับจำนวน
let count = 1;

decrementButtons.forEach((button) => {
  button.addEventListener('click', () => {
      if (count > 1) {
          count--;
          max_qp.textContent = '';
          countDisplays.forEach((display) => {
            display.textContent = count;
        });
      }
  });
});

incrementButtons.forEach((button) => {
  button.addEventListener('click', () => {
    console.log(myDataValue)
      if (count < myDataValue) {
        count++;
        max_qp.textContent = '';
          countDisplays.forEach((display) => {
            display.textContent = count;
        });
      }else {
        max_qp.textContent = '* จำนวนสินค้าถึงขีดจำกัดแล้ว *';
      }
    });
  });
//---------------------------------------

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
  // ตรวจสอบรหัสผ่านและอีเมล
  if (Ppassinput_sign === Ppassinput_sign2 && Ppassinput_sign.length >= 8) {
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
      console.log('Password mismatch or does not meet requirements');
  }
});




//-----------------------------------------------