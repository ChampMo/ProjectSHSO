


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
        const quantity = product_info_cart[0].quantity
        
        // Assuming shop_pro is available in the global scope
        incpro.innerHTML = `
                <label class="check_pro">
                    <input type="checkbox" class="Ccheck_pro" id="Ccheck_pro${product_id}">
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
                    <div class="maxq" id="maxq${product_id}">*ของถึงจำนวนจำกัดแล้ว</div>
                    <div class="qquan" id="qquan${product_id}"> สินค้ามีจำนวน ${quantity} ชิ้น</div>
                </div>
                <div class="all_cost_pro"></div>
                <div class="delete" onclick="del_pro_incart(${product_id})">ลบ</div>
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
    const maxqId = `maxq${product_id}`;
    const maxq = document.getElementById(maxqId)
    const qquanId = `qquan${product_id}`;
    const qquan = document.getElementById(qquanId)


    

    updateCostProduct(incproId, count);

    decrementButtons.forEach((button) => {
        button.addEventListener('click', async () => {
            const shopResponse = await fetch(`/api/cart_count_decrement/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product_id }),
            });
            const countd = await shopResponse.json();
            const countdd =countd.countd 
            qquan.style.display = "flex";
            maxq.style.display = "none";
            updateCostProduct(incproId, countdd);
            
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
            const countii = counti.counti
            const bucount = counti.bucount
            if (!bucount){
                qquan.style.display = "none";
                maxq.style.display = "flex";
            }else{
                qquan.style.display = "flex";       
                maxq.style.display = "none";
            }
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
        const parentCheckboxforpro = document.querySelectorAll('.Ccheck_shop_pro');
        const childCheckboxesforpro = document.querySelectorAll('.Ccheck_pro');
        

        // กำหนดการทำงานเมื่อคลิกที่ปุ่ม decrement
        decrement.forEach((button) => {
            button.addEventListener('click', function () {
                updateAmountSelect();
            });
        });

        // กำหนดการทำงานเมื่อคลิกที่ปุ่ม increment
        increment.forEach((button) => {
            button.addEventListener('click', function () {
                updateAmountSelect();
            });
        });

        parentCheckbox.addEventListener('change', function () {
            const allChecked = [...parentCheckboxforpro].every((checkbox) => checkbox.checked)
            
            childCheckboxes.forEach((checkbox) => {

                checkbox.checked = parentCheckbox.checked;
                updateAmountSelect();
            });

            if (allChecked) {
                // Assuming parent_pro is a checkbox
                const parent_pro = document.querySelector('.parent_pro');
                parent_pro.checked = true;
            } else {
                const parent_pro = document.querySelector('.parent_pro');
                parent_pro.checked = false;
            }
        
            updateAmountSelect();
        });

        childCheckboxesforpro.forEach((child) => {
            child.addEventListener('change', function () {
                const allCheckedp = [...childCheckboxes].every((checkbox) => checkbox.checked);
                parentCheckbox.checked = allCheckedp;

                const allChecked = [...childCheckboxesforpro].every((checkbox) => checkbox.checked);

                if (allChecked) {
                    const parent_pro = document.querySelector('.parent_pro');
                    parent_pro.checked = true;
                } else {
                    const parent_pro = document.querySelector('.parent_pro');
                    parent_pro.checked = false;
                }

                updateAmountSelect();
            });
        });

        const parent_pro = document.querySelectorAll('.parent_pro');
        parent_pro.forEach((parent) => {
            parent.addEventListener('click', function () {
                childCheckboxes.forEach((checkbox) => {
                    checkbox.checked = parent.checked;
                });
                parentCheckbox.checked = parent.checked;
                updateAmountSelect();
            });
        });  
    });
}
//-----------------------------------------------

async function updateAmountSelect() {
    try {
        let checkedIds = [];

        let checkProElements = document.querySelectorAll('.Ccheck_pro');

        await Promise.all(Array.from(checkProElements).map(async (element) => {
            if (element.checked) {
                let productId = parseInt(element.id.replace("Ccheck_pro", ""));
                checkedIds.push(productId);
                console.log('session.productId',productId)
            }
        }));
        if (checkedIds.length >= 0) {
            const response = await fetch(`/api/check_produck/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ checkedIds }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data from the server');
            }

            const check_cost = await response.json();
            const amount_select = document.querySelector('.amount_select');
            const amount_select1 = document.querySelector('.amount_select1');

            amount_select.textContent = 'เลือกสินค้าทั้งหมด ( ' + checkedIds.length + ' ) ';
            amount_select1.textContent = 'รวม ( ' + checkedIds.length + ' สินค้า ) : ' + '฿ ' + formatNumber(check_cost.check_cost);
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle the error, for example by displaying a user-friendly message
    }




}




//-----------------------------------------------



const button_order = document.querySelector(".button_order");

button_order.addEventListener("click", async () => {
    try {
        const plsadd = document.querySelector('.plsadd')
        // Fetch total product count from the server
        const response = await fetch(`/api/check_order/`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const selId = data.selId;
        console.log(selId);
        if (parseInt(selId) > 0) {
            plsadd.style.display = "none";
            window.location.href = '/pay';
        } else {
            plsadd.style.display = "flex";
        }
        
    } catch (error) {
        console.error('Error fetching shop data:', error);
    }
});



//--------------------------------------------------------
function del_pro_incart( product_id){
    
    fetch(`/api/delete_product_cart/`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        
    },
    body: JSON.stringify({ product_id }),
    })
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log();
        if(data.DELETE){
            window.location.href = "/cart"
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error (e.g., display an error message to the user)
    });
}






