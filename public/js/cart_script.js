


function formatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
}

//-----------------------------------------------
// เลือก input และ button
async function processShopProElements(seller_id, product_id) {
    let shop_pro = document.querySelectorAll('.shop_pro');
    let foundMatch = false;
    for (const element of shop_pro) {
        
        if (element.id === `shop${seller_id}`) {
            await createProductElement(seller_id, product_id);
            foundMatch = true;
        }
    }

    if (!foundMatch) {
        await createshopElement(seller_id, product_id);
    }
}

async function getcreateshopElement() {

    
    
    Iincshop.innerHTML = '';

    try {
        // Fetch total product count from the server
        const response = await fetch(`/api/count_shop/`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        for (const item of data) {
            const product_id = item.product_id;
            const seller_id = item.seller_id;

            await processShopProElements(seller_id, product_id);

        }
    } catch (error) {
        console.error('Error fetching shop data:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    getcreateshopElement();
});

//-----------------------------------------------

async function createshopElement(seller_id, product_id) {
    // Declare shop_pro here
    const Iincshop = document.getElementById("Iincshop")


    try {
        // สร้าง .shop_pro
        let shop_pro = document.createElement('div');
        shop_pro.className = 'shop_pro';
        shop_pro.id = `shop${seller_id}`;
        
        // สร้าง HTML ภายใน .shop_pro
        const shopResponse = await fetch(`/api/shop/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ seller_id }),
        });

        const shop_name = await shopResponse.json();
        // Assuming shop_pro is available in the global scope
        shop_pro.innerHTML = `
            <div class="detail_shop">
                <label class="check_shop_pro">
                    <input type="checkbox" class="Ccheck_shop_pro" onclick="checkbox()">
                    <span class="checkmark"></span>
                </label>
                <div class="shop_name">${shop_name[0].shop_name}</div>
            </div>
            <div class="outincpro"  id="shop${seller_id}_Iincpro">
                
            </div>
        `;

        // นำ .shop_pro มาแทรกในเอลิเมนต์ของหน้าเว็บ
        Iincshop.appendChild(shop_pro);

        
        await createProductElement(seller_id, product_id);
        
        
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

//-----------------------------------------------

async function createProductElement(seller_id, product_id) {


    // สร้าง HTML ภายใน .incpro
    try {
        // สร้าง .shop_pro
        const Iincpro = document.getElementById(`shop${seller_id}_Iincpro`);
        // สร้าง .incpro
        const incpro = document.createElement('div');
        incpro.className = 'incpro';
        incpro.id = `shop${seller_id}_incpro${product_id}`;
        
        // สร้าง HTML ภายใน .shop_pro
        const shopResponse = await fetch(`/api/cart_product/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id }),
        });
        const product_info_cart = await shopResponse.json();
        const name = product_info_cart[0].name
        const price = product_info_cart[0].price
        const product_amount = product_info_cart[0].product_amount
        const picture1 = product_info_cart[0].picture1
        
        // Assuming shop_pro is available in the global scope
        incpro.innerHTML = `
                <label class="check_pro">
                    <input type="checkbox" class="Ccheck_pro">
                    <span class="checkmark1"></span>
                </label>
                <a class="click_incpro" href="/product/${product_id}">
                    <img src="${picture1}">
                    <div class="product_name">${name}</div>
                </a>
                <div class="select_type_pro">Select Type Product</div>
                <div class="cost_pro">
                    &nbsp;${price}
                </div>
                <div class="amount">
                    <button class="decrement"> - </button>
                    <span class="count">${product_amount}</span>
                    <button class="increment"> + </button>
                </div>
                <div class="all_cost_pro"></div>
                <div class="delete">ลบ</div>
            `;
        
        Iincpro.appendChild(incpro);



        amount_pro(incpro.id, product_amount, product_id);
        checkbox();
        
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}
//-----------------------------------------------





async function amount_pro(incproId, count, product_id) {
    const decrementButtons = document.querySelectorAll(`#${incproId} .decrement`);
    const incrementButtons = document.querySelectorAll(`#${incproId} .increment`);
    
    const countDisplays = document.querySelectorAll(`#${incproId} .count`);
    const Ccost_pro = document.querySelector(`#${incproId} .cost_pro`);
    const all_cost_pro = document.querySelector(`#${incproId} .all_cost_pro`);
    

    updateCostProduct(incproId, count);

    decrementButtons.forEach((button) => {
        button.addEventListener('click', async () => {
            if (count > 1) {
                const shopResponse = await fetch(`/api/cart_count_decrement/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ product_id }),
                });
                
                const countd = await shopResponse.json();
                const countdd =countd.countd
                updateCostProduct(incproId, countdd);
            }
        });
    });

    incrementButtons.forEach((button) => {
        button.addEventListener('click', async () => {
            const shopResponse = await fetch(`/api/cart_count_increment/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product_id }),
            });
            
            const counti = await shopResponse.json();
            const countii =counti.counti
            updateCostProduct(incproId, countii);
        });
    });



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









