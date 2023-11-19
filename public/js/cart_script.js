


function formatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
}

//-----------------------------------------------
// เลือก input และ button


const generateProductsButton = document.getElementById('generateProducts');
const shopCountIn = document.getElementById('shopCountIn');
const Iincshop = document.getElementById('Iincshop');

// เพิ่มความรอบคอบให้สร้าง .incpro
generateProductsButton.addEventListener('click', () => {
    // รับจำนวน .incpro จาก input
    
    const shopCount = parseInt(shopCountIn.value);
    Iincshop.innerHTML = '';

    // สร้าง .incpro ตามจำนวนที่ได้รับ
    for (let j = 0; j < shopCount; j++) {
        createshopElement(j);
    }
});
//----ไม่เกี่ยว----
for (let j = 0; j < 2; j++) {   //j < 2  --> shopCount
    createshopElement(j);
}

function generateUniqueId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
//----

//-----------------------------------------------

function createProductElement(shopIndex, incproIndex) {

    const Iincpro = document.getElementById(`shop${shopIndex}_Iincpro`);
    // สร้าง .incpro
    const incpro = document.createElement('div');
    incpro.className = 'incpro';
    incpro.id = `shop${shopIndex}_incpro${incproIndex}`;

    // สร้าง HTML ภายใน .incpro

    incpro.innerHTML = `
        <label class="check_pro">
            <input type="checkbox" class="Ccheck_pro">
            <span class="checkmark1"></span>
        </label>
        <a class="click_incpro" href="./product">
            <img src="./images/Shirocmt.jpg">
            <div class="product_name">Product Name</div>
        </a>
        <div class="select_type_pro">Select Type Product</div>
        <div class="cost_pro">
            &nbsp;100
        </div>
        <div class="amount">
            <button class="decrement"> - </button>
            <span class="count">1</span>
            <button class="increment"> + </button>
        </div>
        <div class="all_cost_pro"></div>
        <div class="delete">ลบ</div>
    `;

    // นำ .incpro มาแทรกในเอลิเมนต์ของหน้าเว็บ
    
    Iincpro.appendChild(incpro);

    const decrementButtons = document.querySelectorAll(`#${incpro.id} .decrement`);
    const incrementButtons = document.querySelectorAll(`#${incpro.id} .increment`);

    // สร้างตัวแปรสำหรับจำนวน
    let count = 1;

    // เมื่อคลิก "decrement" หรือ "increment" ใน incpro ใหม่ ให้เรียก amount_pro(incpro.id)
    decrementButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (count > 1) {
                count--;
                updateCostProduct(incpro.id, count);
            }
        });
    });
    
    incrementButtons.forEach((button) => {
        button.addEventListener('click', () => {
            count++;
            updateCostProduct(incpro.id, count);
        });
    });

    amount_pro(incpro.id, decrementButtons, incrementButtons, count);
    checkbox();
}

//-----------------------------------------------

function createshopElement(shopIndex) {
    // สร้าง .shop_pro
    const shop_pro = document.createElement('div');
    shop_pro.className = 'shop_pro';
    shop_pro.id = `shop${shopIndex}`;

    // สร้าง HTML ภายใน .shop_pro

    shop_pro.innerHTML = `
    <div class="detail_shop">
        <label class="check_shop_pro">
            <input type="checkbox" class="Ccheck_shop_pro" onclick="checkbox()">
            <span class="checkmark"></span>
        </label>
        <div class="shop_name">Name_Shop</div>
    </div>
    <div class="outincpro"  id="shop${shopIndex}_Iincpro">
        
    </div>
    `;

    // นำ .shop_pro มาแทรกในเอลิเมนต์ของหน้าเว็บ
    Iincshop.appendChild(shop_pro);

    const productCountIn = document.getElementById('productCountIn');
    const productCount = parseInt(productCountIn.value);
    for (let i = 0; i < 2; i++) {  //i < 2  --> productCount
        createProductElement(shopIndex, i);
    }
}
//-----------------------------------------------





function amount_pro(incproId, decrementButtons, incrementButtons, count) {
    
    const countDisplays = document.querySelectorAll(`#${incproId} .count`);
    const Ccost_pro = document.querySelector(`#${incproId} .cost_pro`);
    const all_cost_pro = document.querySelector(`#${incproId} .all_cost_pro`);
    

    updateCostProduct(incproId);

    decrementButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (count > 1) {
                count--;
                updateCostProduct(incproId, count);
            }
        });
    });

    incrementButtons.forEach((button) => {
        button.addEventListener('click', () => {
            count++;
            updateCostProduct(incproId, count);
        });
    });


    function updateCostProduct(incproId) {
        const cost = parseInt(Ccost_pro.textContent.replace('฿ ', ''));
        const cost_product = count * cost;

        countDisplays.forEach((display) => {
            display.textContent = count;
        });
        all_cost_pro.textContent = ' ฿ ' + formatNumber(cost_product);
    }
}
// ประกาศ updateCostProduct ให้เป็นฟังก์ชันในขอบเขตระดับสูงที่สามารถเรียกใช้ได้ทั่วไป
function updateCostProduct(incproId, count) {
    const incpro = document.getElementById(incproId);
    const Ccost_pro = incpro.querySelector('.cost_pro');

    const cost = parseInt(Ccost_pro.textContent.replace('฿ ', ''));
    const cost_product = count * cost;

    const countDisplays = incpro.querySelectorAll('.count');
    const all_cost_pro = incpro.querySelector('.all_cost_pro');

    countDisplays.forEach((display) => {
        display.textContent = count;
    });

    all_cost_pro.textContent = ' ฿ ' + formatNumber(cost_product);
}




//-----------------------------------------------


function checkbox() {
    // รายการร้านค้าทั้งหมด
    const shop_pros = document.querySelectorAll('.shop_pro');
    
    shop_pros.forEach((shop_pro) => {
        const parentCheckbox = shop_pro.querySelector('.Ccheck_shop_pro');
        const childCheckboxes = shop_pro.querySelectorAll('.Ccheck_pro');
        const decrement = shop_pro.querySelectorAll('.decrement');
        const increment = shop_pro.querySelectorAll('.increment');

        // กำหนดการทำงานเมื่อคลิกที่ปุ่ม decrement
        decrement.forEach((button) => {
            button.addEventListener('click', function () {
                updateAmountSelect(childCheckboxes);
            });
        });

        // กำหนดการทำงานเมื่อคลิกที่ปุ่ม increment
        increment.forEach((button) => {
            button.addEventListener('click', function () {
                updateAmountSelect(childCheckboxes);
            });
        });

        // กำหนดการทำงานเมื่อเปลี่ยนสถานะของ parentCheckbox
        parentCheckbox.addEventListener('change', function () {
            childCheckboxes.forEach((checkbox) => {
                checkbox.checked = parentCheckbox.checked;
            });
            updateAmountSelect(childCheckboxes);
        });

        // กำหนดการทำงานเมื่อเปลี่ยนสถานะของ childCheckboxes
        childCheckboxes.forEach((child) => {
            child.addEventListener('change', function () {
                const allChecked = [...childCheckboxes].every((checkbox) => checkbox.checked);
                parentCheckbox.checked = allChecked;
                updateAmountSelect(childCheckboxes);
            });
        });
        
        const parent_pro = document.querySelectorAll('.parent_pro');
        parent_pro.forEach((parent) => {
            parent.addEventListener('click', function () {
                childCheckboxes.forEach((checkbox) => {
                    checkbox.checked = parent.checked;
                });
                parentCheckbox.checked = parent.checked;
                updateAmountSelect(childCheckboxes);
            });
        });  
    });
}
//-----------------------------------------------

function updateAmountSelect() {
    const amount_select = document.querySelector('.amount_select');
    const amount_select1 = document.querySelector('.amount_select1');

    let all_cost_select = 0;
    let totalNumberOfCheckedChildCheckboxes = 0;

    const shop_pros = document.querySelectorAll('.shop_pro');
    
    shop_pros.forEach((shop_pro) => {
        const parentCheckbox = shop_pro.querySelector('.Ccheck_shop_pro');
        const childCheckboxes = shop_pro.querySelectorAll('.Ccheck_pro');
        const checkedChildCheckboxes = Array.from(childCheckboxes).filter((checkbox) => checkbox.checked);

        totalNumberOfCheckedChildCheckboxes += checkedChildCheckboxes.length;

        all_cost_select += Array.from(checkedChildCheckboxes).reduce((total, checkbox) => {
            const incpro = checkbox.closest('.incpro');
            if (incpro) {
                const cost = parseInt(incpro.querySelector('.cost_pro').textContent.replace('฿ ', ''));
                const count = parseInt(incpro.querySelector('.count').textContent);
                return total + (cost * count);
            }
            return total;
        }, 0);
    });

    amount_select.textContent = 'เลือกสินค้าทั้งหมด ( ' + totalNumberOfCheckedChildCheckboxes + ' ) ';
    amount_select1.textContent = 'รวม ( ' + totalNumberOfCheckedChildCheckboxes + ' สินค้า ) : ' + '฿ ' + formatNumber(all_cost_select);
}

//-----------------------------------------------

