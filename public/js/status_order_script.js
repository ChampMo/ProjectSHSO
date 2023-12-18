

function formatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
}


// -----------------------------------------------

let sending_status = 1;
const Iincshop = document.getElementById('Iincshop');

document.addEventListener('DOMContentLoaded', function() {
    const sendingOrderButton = document.querySelector('.bg_sending_order');
    const historyOrderButton = document.querySelector('.bg_history_order');
    

    // เริ่มด้วยปุ่ม .bg_sending_order เป็น active เมื่อหน้าเว็บโหลดเสร็จ
    sendingOrderButton.classList.add('bg_sending_order-active');
    Iincshop.innerHTML = '';
    start_order();


    // เพิ่มการกำหนด class เมื่อคลิกที่ปุ่ม .bg_sending_order
    sendingOrderButton.addEventListener('click', function() {
        sending_status = 1;
        Iincshop.innerHTML = '';
        start_order();
        sendingOrderButton.classList.add('bg_sending_order-active');
        historyOrderButton.classList.remove('bg_history_order-active');

    });

    // เพิ่มการกำหนด class เมื่อคลิกที่ปุ่ม .bg_history_order
    historyOrderButton.addEventListener('click', function() {
        sending_status = 0;
        Iincshop.innerHTML = '';
        start_order();
        historyOrderButton.classList.add('bg_history_order-active');
        sendingOrderButton.classList.remove('bg_sending_order-active');
        
    });
});



//-----------------------------------------------

async function start_order(){
        
        Iincshop.innerHTML = '';

    if(sending_status == 1){
        await getcreateshopElementforselling();
    }else{
        for (let j = 0; j < 2; j++) {   //j < 2  --> shopCount
            await getcreateshopElement(j);
        }
    }

}
//----
// ดูว่ามี element ที่มี order${order_id} เดียวกันไหม ถ้าไม่มีก็สร้าง

async function process_orderElementsforselling(seller_id, product_id, order_id) {
    let shop_pro = document.querySelectorAll('.all_intype_order');
    let foundMatch = false;
    for (const element of shop_pro) {
        if (element.id === `order${order_id}`) {
            await processShopProElementsforselling(seller_id, product_id, order_id);
            foundMatch = true;
            
        }
    }

    if (!foundMatch) {
        await process_orderforselling(seller_id, product_id, order_id);
    }
}

//สร้าว element order${order_id}
async function process_orderforselling(seller_id, product_id, order_id) {
    const Iincshop = document.getElementById("Iincshop")


    try {
        let all_intype_order = document.createElement('div');
        all_intype_order.className = 'all_intype_order';
        all_intype_order.id = `order${order_id}`;

        
        Iincshop.appendChild(all_intype_order);
        await processShopProElementsforselling(seller_id, product_id, order_id);
        
        
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

// ดูว่ามีร้านที่ถูกสร้างมั้ย
async function processShopProElementsforselling(seller_id, product_id, order_id) {
    let shop_pro = document.querySelectorAll('.all_intype_order');
    let foundMatch = false;
    for (const element of shop_pro) {
        if (element.id === `${order_id}shop${seller_id}`) {
            console.log('มีร้านแล้วสร้าง สินค้า ',product_id)
            await createProductElementforselling(seller_id, product_id, order_id);
            foundMatch = true;
            
        }
    }

    if (!foundMatch) {
        await createshopElementforselling(seller_id, product_id, order_id);
    }
}

async function getcreateshopElementforselling() {

    Iincshop.innerHTML = '';

    try {
        // Fetch total product count from the server
        const response = await fetch(`/api/count_order_status/`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        for (const item of data) {
            const product_id = item.product_id;
            const seller_id = item.seller_id;
            const order_id = item.order_id;

            await process_orderElementsforselling(seller_id, product_id, order_id);

        }
    } catch (error) {
        console.error('Error fetching shop data:', error);
    }
}



async function createshopElementforselling(seller_id, product_id, order_id) {
    // Declare shop_pro here
    const Iincshop = document.getElementById(`order${order_id}`)


    try {
        // สร้าง .shop_pro
        let all_intype_order = document.createElement('div');
        all_intype_order.className = 'all_intype_order';
        all_intype_order.id = `${order_id}shop${seller_id}`;
        
        // สร้าง HTML ภายใน .shop_pro
        const shopResponse = await fetch(`/api/order_shop/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ seller_id, order_id }),
        });

        const shop_name = await shopResponse.json();
        // Assuming shop_pro is available in the global scope
        all_intype_order.innerHTML = `
        <div class="shop_pro">
            <div class="detail_shop">
                <div class="shop_name" onclick='goshop(${product_id})'>${shop_name.shop_name[0].shop_name}</div>
                <div class="date_order">${shop_name.date[0].date}</div>  
            </div>
            <section class="inorder" id="${order_id}shop${seller_id}_Iincpro">
            </section>
            <div class="cost_car">
                <div class="detail_car">
                    <i class="fa-solid fa-truck fa-xl"></i>
                    ฿ 50
                </div>
            </div>
        </div>
        `;

        // นำ .shop_pro มาแทรกในเอลิเมนต์ของหน้าเว็บ
        Iincshop.appendChild(all_intype_order);

        await createProductElementforselling(seller_id, product_id, order_id);
        
        
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

//-----------------------------------------------

async function createProductElementforselling(seller_id, product_id, order_id) {


    // สร้าง HTML ภายใน .incpro
    try {
        // สร้าง .shop_pro
        const Iincpro = document.getElementById(`${order_id}shop${seller_id}_Iincpro`);
        // สร้าง .incpro
        const incpro = document.createElement('div');
        incpro.className = 'incpro';
        incpro.id = `${order_id}shop${seller_id}_incpro${product_id}`;
        
        // สร้าง HTML ภายใน .shop_pro
        const shopResponse = await fetch(`/api/order_product/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id, order_id }),
        });
        const product_info_cart = await shopResponse.json();
        console.log(product_info_cart)
        const name = product_info_cart.product_info_cart[0].name
        const price = product_info_cart.product_info_cart[0].price
        const product_amount = product_info_cart.product_info_cart[0].amount
        const picture1 = product_info_cart.product_info_cart[0].picture1
        const status_order = product_info_cart.product_info_cart[0].status_order
        const cost = (price*product_amount)
        const main_type = product_info_cart.types_product[0].type_name
        // Assuming shop_pro is available in the global scope
        

        if(status_order === 'Sending'){
            incpro.innerHTML = `
                    <a class="click_incpro" href="/product/${product_id}">
                        <img src="${picture1}" alt="Product Image">
                        <div class="bg_product_name">
                            <div class="product_name">${name}</div>
                            <div class="select_type_pro">${main_type}</div>
                        </div>
                    </a>

                    <div class="cost_pro">
                        &nbsp;${formatNumber(price)}
                    </div>
                    <div class="bg_amount">
                        <div>จำนวน</div>
                        <div class="amount">
                            &nbsp;${formatNumber(product_amount)}
                        </div>
                    </div>
                    <div class="all_cost">
                        <div class="all_cost_text">รวมคำสั่งซื้อ : </div>
                        <div class="all_cost_pro">
                            ฿ ${formatNumber(cost)}
                        </div>
                    </div>
                    <button class="con_product" onclick='confirm(${product_id},${order_id})'>ยืนยันการรับสินค้า</button>
                    <div class="status">
                        Status : ${status_order}
                    </div>
                `;
        }else{
            incpro.innerHTML = `
                    <a class="click_incpro" href="/product/${product_id}">
                        <img src="${picture1}" alt="Product Image">
                        <div class="bg_product_name">
                            <div class="product_name">${name}</div>
                            <div class="select_type_pro">${main_type}</div>
                        </div>
                    </a>

                    <div class="cost_pro">
                        &nbsp;${formatNumber(price)}
                    </div>
                    <div class="bg_amount">
                        <div>จำนวน</div>
                        <div class="amount">
                            &nbsp;${formatNumber(product_amount)}
                        </div>
                    </div>
                    <div class="all_cost">
                        <div class="all_cost_text">รวมคำสั่งซื้อ : </div>
                        <div class="all_cost_pro">
                            ฿ ${formatNumber(cost)}
                        </div>
                    </div>
                    <div class="status">
                        Status : ${status_order}
                    </div>
                `;
        }


        Iincpro.appendChild(incpro);

        

    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------





function confirm(product_id,order_id){
    const bg_confirm_success = document.querySelector('.bg_confirm_sucess');
    const confirm_success = document.querySelector('.confirm_success');
    bg_confirm_success.style.display = "flex";
    confirm_success.style.transform = "scale(1) translateX(-50%) translateY(-50%) ";

    document.querySelector('.confirm_success_exit').addEventListener('click',() =>{
        const bg_confirm_success = document.querySelector('.bg_confirm_sucess');
        const confirm_success = document.querySelector('.confirm_success');
        bg_confirm_success.style.display = "none";
        confirm_success.style.transform = "scale(0)";
    })
    document.querySelector('.bg_confirm_sucess').addEventListener('click',() =>{
        const bg_confirm_success = document.querySelector('.bg_confirm_sucess');
        const confirm_success = document.querySelector('.confirm_success');
        bg_confirm_success.style.display = "none";
        confirm_success.style.transform = "scale(0)";
    })
    document.querySelector('.confirm_success_verifile').addEventListener('click', async () => {
        const bg_confirm_success = document.querySelector('.bg_confirm_sucess');
        const confirm_success = document.querySelector('.confirm_success');
        bg_confirm_success.style.display = "none";
        confirm_success.style.transform = "scale(0)";
        
        try {
            const response = await fetch(`/api/confirm_success/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product_id, order_id }),
            });
    
            if (!response.ok) {
                
                console.error('Failed to confirm success:', response.statusText);
                // Handle the error appropriately, e.g., show an error message
                return;
            }
            if(response){
                window.location.href = '/status_order'
            }
            const result = await response.json();
        } catch (error) {
            console.error('Error confirming success:', error);
            // Handle the error appropriately, e.g., show an error message
        }
    });
    
};





async function process_orderElements(seller_id, product_id, order_id) {
    let shop_pro = document.querySelectorAll('.all_intype_order');
    let foundMatch = false;
    for (const element of shop_pro) {
        if (element.id === `order${order_id}`) {
            await processShopProElements(seller_id, product_id, order_id);
            foundMatch = true;
            
        }
    }

    if (!foundMatch) {
        await process_order(seller_id, product_id, order_id);
    }
}

//สร้าว element order${order_id}
async function process_order(seller_id, product_id, order_id) {
    const Iincshop = document.getElementById("Iincshop")


    try {
        let all_intype_order = document.createElement('div');
        all_intype_order.className = 'all_intype_order';
        all_intype_order.id = `order${order_id}`;

        
        Iincshop.appendChild(all_intype_order);
        await processShopProElements(seller_id, product_id, order_id);
        
        
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

// ดูว่ามีร้านที่ถูกสร้างมั้ย
async function processShopProElements(seller_id, product_id, order_id) {
    let shop_pro = document.querySelectorAll('.all_intype_order');
    let foundMatch = false;
    for (const element of shop_pro) {
        if (element.id === `${order_id}shop${seller_id}`) {
            await createProductElement(seller_id, product_id, order_id);
            foundMatch = true;
            
        }
    }

    if (!foundMatch) {
        await createshopElement(seller_id, product_id, order_id);
    }
}

async function getcreateshopElement() {

    Iincshop.innerHTML = '';

    try {
        // Fetch total product count from the server
        const response = await fetch(`/api/count_order_status2/`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        for (const item of data) {
            const product_id = item.product_id;
            const seller_id = item.seller_id;
            const order_id = item.order_id;

            await process_orderElements(seller_id, product_id, order_id);

        }
    } catch (error) {
        console.error('Error fetching shop data:', error);
    }
}



async function createshopElement(seller_id, product_id, order_id) {
    // Declare shop_pro here
    const Iincshop = document.getElementById(`order${order_id}`)


    try {
        // สร้าง .shop_pro
        let all_intype_order = document.createElement('div');
        all_intype_order.className = 'all_intype_order';
        all_intype_order.id = `${order_id}shop${seller_id}`;
        
        // สร้าง HTML ภายใน .shop_pro
        const shopResponse = await fetch(`/api/order_shop2/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ seller_id, order_id }),
        });

        const shop_name = await shopResponse.json();
        // Assuming shop_pro is available in the global scope
        all_intype_order.innerHTML = `
        <div class="shop_pro">
            <div class="detail_shop">
                <div class="shop_name" onclick='goshop(${product_id})'>${shop_name.shop_name[0].shop_name}</div>
                <div class="date_order">${shop_name.date[0].date}</div>
            </div>
            <section class="inorder" id="${order_id}shop${seller_id}_Iincpro">
            </section>
            <div class="cost_car">
                <div class="detail_car">
                    <i class="fa-solid fa-truck fa-xl"></i>
                    ฿ 50
                </div>
            </div>
        </div>
        `;

        // นำ .shop_pro มาแทรกในเอลิเมนต์ของหน้าเว็บ
        Iincshop.appendChild(all_intype_order);

        await createProductElement(seller_id, product_id, order_id);
        
        
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

//-----------------------------------------------

async function createProductElement(seller_id, product_id, order_id) {


    // สร้าง HTML ภายใน .incpro
    try {
        // สร้าง .shop_pro
        const Iincpro = document.getElementById(`${order_id}shop${seller_id}_Iincpro`);
        // สร้าง .incpro
        const incpro = document.createElement('div');
        incpro.className = 'incpro';
        incpro.id = `${order_id}shop${seller_id}_incpro${product_id}`;
        
        // สร้าง HTML ภายใน .shop_pro
        const shopResponse = await fetch(`/api/order_product/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id, order_id }),
        });
        const product_info_cart = await shopResponse.json();
        const name = product_info_cart.product_info_cart[0].name
        const price = product_info_cart.product_info_cart[0].price
        const product_amount = product_info_cart.product_info_cart[0].amount
        const picture1 = product_info_cart.product_info_cart[0].picture1
        const status_order = product_info_cart.product_info_cart[0].status_order
        const cost = (price*product_amount)
        const main_type = product_info_cart.types_product[0].type_name
        // Assuming shop_pro is available in the global scope
        incpro.innerHTML = `
                <a class="click_incpro" href="/product/${product_id}">
                    <img src="${picture1}" alt="Product Image">
                    <div class="bg_product_name">
                        <div class="product_name">${name}</div>
                        <div class="select_type_pro">${main_type}</div>
                    </div>
                </a>

                <div class="cost_pro">
                    &nbsp;${formatNumber(price)}
                </div>
                <div class="bg_amount">
                    <div>จำนวน</div>
                    <div class="amount">
                        &nbsp;${formatNumber(product_amount)}
                    </div>
                </div>
                <div class="all_cost">
                    <div class="all_cost_text">รวมคำสั่งซื้อ : </div>
                    <div class="all_cost_pro">
                        ฿ ${formatNumber(cost)}
                    </div>
                </div>
                <div class="status">
                    Status : ${status_order}
                </div>
            `;


        Iincpro.appendChild(incpro)
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

//-----------------------------------------------------------------------------------------------------















