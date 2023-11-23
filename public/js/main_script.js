
//-----------------------------------------------

const productContainer = document.getElementById('productContainer');
// เพิ่มฟังก์ชันให้เรียก createProductElements เมื่อผู้ใช้เปลี่ยนแปลง input

function createProductElements() {
    // Clear existing product containers
    productContainer.innerHTML = '';

    // Fetch total product count from the server
    fetch(`/api/count_products/`)
        .then(response => response.json())
        .then(totalProducts => {
            // Create product boxes based on the total count
            for (let i = 0; i < totalProducts; i++) {
                createProductBox(i);
            }
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
}
createProductElements();


function createProductBox(productId) {
    // สร้าง .shop_pro
    const product_box = document.createElement('a');
    product_box.className = 'inproduct';
    product_box.id = `shop${productId}`;
    

    // ส่งคำขอ GET ไปยัง server เพื่อดึงข้อมูล
    fetch(`/api/products/`)
        .then(response => response.json())
        .then(product => {
            const name_product = product[productId].name
            const price_product = product[productId].price
            const id_product = product[productId].product_id
            product_box.href = `/product/${id_product}`;
            console.log(name_product)
            product_box.innerHTML = `
                    <div class="imgproduct_box"><img src="/images/Shirocmt.jpg"></div>
                    <div class="detail_product_box">
                        ${name_product}
                    </div> 
                    <div class="cost_product">
                        ${price_product}
                    </div>`
                    ;
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });

    const productContainer = document.getElementById('productContainer');
    productContainer.appendChild(product_box);
}


//-----------------------------------------------------------------





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

