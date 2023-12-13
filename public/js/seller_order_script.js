

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
async function processShopProElementsforselling(seller_id,product_id, order_id) {
    
    await createshopElementforselling(seller_id, product_id, order_id);


}

async function getcreateshopElementforselling() {

    Iincshop.innerHTML = '';

    try {
        // Fetch total product count from the server
        const response = await fetch(`/api/count_order_sell/`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        for (const item of data) {
            const product_id = item.product_id;
            const seller_id = item.seller_id;
            const order_id = item.order_id;
            
            await process_orderforselling(seller_id, product_id, order_id);

        }
    } catch (error) {
        console.error('Error fetching shop data:', error);
    }
}



async function createshopElementforselling(seller_id, product_id, order_id) {
    // Declare shop_pro here
    const Iincshop = document.getElementById(`order${order_id}`)

    try {
        
        // สร้าง HTML ภายใน .shop_pro
        const shoResponse = await fetch(`/api/order_sell/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({product_id, order_id }),
        });
        
        const date = await shoResponse.json();
        console.log(date)
        // สร้าง .incpro
        const incpro = document.createElement('div');
        incpro.className = 'incpro';
        incpro.id = `${order_id}shop${seller_id}_incpro${product_id}`;

        // สร้าง HTML ภายใน .shop_pro
        const shopResponse = await fetch(`/api/order_product_sell/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({seller_id, product_id, order_id }),
        });
        const product_info_cart = await shopResponse.json();
        const name = product_info_cart[0].name
        const price = product_info_cart[0].price
        const product_amount = product_info_cart[0].amount
        const picture1 = product_info_cart[0].picture1
        const status_order = product_info_cart[0].status_order
        const cost = (price*product_amount)

        console.log('price',price,'product_amount', product_amount,'cost',cost)
        // Assuming shop_pro is available in the global scope
        incpro.innerHTML = `
                <a class="click_incpro" href="/product/${product_id}">
                    <img src="${picture1}" alt="Product Image">
                    <div class="bg_product_name">
                        <div class="product_name">${name}</div>
                        <div class="select_type_pro">Select Type Product</div>
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
                <div class='bg_con_product' >
                    <button class="customer_info${order_id} customer_info" onclick='custo_info(${seller_id},${product_id},${order_id})'>ข้อมูลลูกค้า</button>
                    <button class="xcon_product" onclick='Xconfirm(${product_id},${order_id})'>ยกเลิก order</button>
                    <button class="con_product" onclick='confirm(${product_id},${order_id})'>ส่งสินค้าเรียบร้อย</button>
                </div>
                <div class="status">
                    <div class ="status1">${date.date[0].date}</div>
                    Status : ${status_order}
                </div>
            `;

            //------------
            const cusResponse = await fetch(`/api/order_customer_sell/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({seller_id, product_id, order_id }),
            });
            const cus_info = await cusResponse.json();
            const customer_info = document.createElement('div');
            customer_info.className = 'bg_user_profile';
            customer_info.id = `${order_id}Customer${seller_id}_info${product_id}`;
            customer_info.innerHTML = `
                        <div class="user_profile">
                            <div class="user_pic">
                                <img src="${cus_info[0].profile_picture}" alt="" id="uploadedImage">
                                <div class="edit_img" onclick="handleFileUpload()">
                                    <input type="file" id="fileInput" style="display: none;" accept="image/*" onchange="uploadFile()">
                                </div>
                            </div>
                        </div>
                        <div class="username">
                        <div class = "head_data_profile">
                            <div class = "sub_data_profile">
                                <div class="data_profile">ชื่อผู้ใช้ : ${cus_info[0].username}</div>
                            </div>
                            <div class = "sub_data_profile">
                                <div class="data_profile">ชื่อ : ${cus_info[0].first_name}</div>
                            </div>
                            <div class = "sub_data_profile">
                                <div class="data_profile">สกุล : ${cus_info[0].last_name}</div>
                            </div>
                            <div class = "sub_data_profile">
                                <div class="data_profile">โทร : ${cus_info[0].phone_number}</div>
                            </div>
                        </div>
                        <div class = "adress_profile">
                            <div>ที่อยู่ : ${cus_info[0].village}</div>
                            <div>${cus_info[0].no_village}</div>
                            <div>${cus_info[0].road}</div>
                            <div>${cus_info[0].sub_district}</div>
                            <div>${cus_info[0].district}</div>
                            <div>${cus_info[0].city}</div>
                            <div>${cus_info[0].Postal_id}</div>
                        </div>
                        </div>
                `;
            console.log('prodect - ',product_id,'order - ',order_id, 'seller', seller_id)
            Iincshop.appendChild(incpro)
            Iincshop.appendChild(customer_info)

        
        
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

//-----------------------------------------------
function custo_info(seller_id, product_id, order_id){
    const orderbg = document.getElementById(`order${order_id}`);
    const cus_info = document.getElementById(`${order_id}Customer${seller_id}_info${product_id}`);
    const customer_info = document.querySelector(`.customer_info${order_id}`);
    cus_info.classList.toggle('active');
    if (cus_info.classList.contains('active')) {
        customer_info.textContent = 'ปิดข้อมูล'
        orderbg.style.height = '450px'
        cus_info.style.visibility = 'visible'
        cus_info.style.transform = 'translateY(0px)';
      } else {
        customer_info.textContent = 'ข้อมูลลูกค้า'
        cus_info.style.transform = 'translateY(-200px)';
        orderbg.style.height = '250px'
        cus_info.style.visibility = 'hidden'
      }
    
}

//------------------------------------------------------------------------------------------------------------------------------------------


function Xconfirm(product_id,order_id){
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
            const response = await fetch(`/api/confirm_sucess_sell_cancel/`, {
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
                window.location.href = '/seller_order'
            }
            const result = await response.json();
        } catch (error) {
            console.error('Error confirming success:', error);
            // Handle the error appropriately, e.g., show an error message
        }
    });
    
};

async function confirm(product_id,order_id){
   
        try {
            const response = await fetch(`/api/confirm_sucess_sell/`, {
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
                window.location.href = '/seller_order'
            }
            const result = await response.json();
        } catch (error) {
            console.error('Error confirming success:', error);
            // Handle the error appropriately, e.g., show an error message
        }
    
    
};


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
async function processShopProElements(seller_id,product_id, order_id) {
    
    await createshopElement(seller_id, product_id, order_id);


}

async function getcreateshopElement() {

    Iincshop.innerHTML = '';

    try {
        // Fetch total product count from the server
        const response = await fetch(`/api/count_order_sell2/`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        for (const item of data) {
            const product_id = item.product_id;
            const seller_id = item.seller_id;
            const order_id = item.order_id;
            console.log('prodect - ',product_id,'order - ',order_id)
            await process_order(seller_id, product_id, order_id);

        }
    } catch (error) {
        console.error('Error fetching shop data:', error);
    }
}



async function createshopElement(seller_id, product_id, order_id) {
    // Declare shop_pro here
    const Iincshop = document.getElementById(`order${order_id}`)

    try {
        // สร้าง HTML ภายใน .shop_pro
        const shoResponse = await fetch(`/api/order_sell2/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({product_id, order_id }),
        });
        
        const date = await shoResponse.json();
        console.log(date)
        // สร้าง .incpro
        const incpro = document.createElement('div');
        incpro.className = 'incpro';
        incpro.id = `${order_id}shop${seller_id}_incpro${product_id}`;

        // สร้าง HTML ภายใน .shop_pro
        const shopResponse = await fetch(`/api/order_product_sell2/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({seller_id, product_id, order_id }),
        });
        
        const product_info_cart = await shopResponse.json();
        const name = product_info_cart[0].name
        const price = product_info_cart[0].price
        const product_amount = product_info_cart[0].amount
        const picture1 = product_info_cart[0].picture1
        const status_order = product_info_cart[0].status_order
        console.log(product_info_cart)
        const cost = (price*product_amount)
        console.log(picture1)
        console.log('seller_id, product_id, order_id',seller_id, product_id, order_id,status_order)
        // Assuming shop_pro is available in the global scope
        incpro.innerHTML = `
                <a class="click_incpro" href="/product/${product_id}">
                    <img src="${picture1}" alt="Product Image">
                    <div class="bg_product_name">
                        <div class="product_name">${name}</div>
                        <div class="select_type_pro">Select Type Product</div>
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
                    <div class ="status1">${date.date[0].date}</div>
                    Status : ${status_order}
                </div>
            `;


            


            Iincshop.appendChild(incpro)

        
        
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}
//-----------------------------------------------------------------------------------------------------















