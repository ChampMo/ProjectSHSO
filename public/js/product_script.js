

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
// สร้างตัวแปรสำหรับจำนวน
let count = 1;

decrementButtons.forEach((button) => {
  button.addEventListener('click', () => {
      if (count > 1) {
          count--;
          countDisplays.forEach((display) => {
            display.textContent = count;
        });
      }
  });
});

incrementButtons.forEach((button) => {
  button.addEventListener('click', () => {
      count++;
      countDisplays.forEach((display) => {
        display.textContent = count;
    });
  });
});

//---------------------------------------

