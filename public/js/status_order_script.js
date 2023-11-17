

function formatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
}


//-----------------------------------------------

let sending_status = 1;
const Iincshop = document.getElementById('Iincshop');

document.addEventListener('DOMContentLoaded', function() {
    const sendingOrderButton = document.querySelector('.bg_sending_order');
    const historyOrderButton = document.querySelector('.bg_history_order');
    

    // เริ่มด้วยปุ่ม .bg_sending_order เป็น active เมื่อหน้าเว็บโหลดเสร็จ
    sendingOrderButton.classList.add('bg_sending_order-active');
    Iincshop.innerHTML = '';
    console.log("st "+sending_status);
    start_order();


    // เพิ่มการกำหนด class เมื่อคลิกที่ปุ่ม .bg_sending_order
    sendingOrderButton.addEventListener('click', function() {
        sending_status = 1;
        console.log("st "+sending_status);
        Iincshop.innerHTML = '';
        start_order();
        sendingOrderButton.classList.add('bg_sending_order-active');
        historyOrderButton.classList.remove('bg_history_order-active');

    });

    // เพิ่มการกำหนด class เมื่อคลิกที่ปุ่ม .bg_history_order
    historyOrderButton.addEventListener('click', function() {
        sending_status = 0;
        console.log("st "+sending_status);
        Iincshop.innerHTML = '';
        start_order();
        historyOrderButton.classList.add('bg_history_order-active');
        sendingOrderButton.classList.remove('bg_sending_order-active');
        
    });
});



//-----------------------------------------------
// เลือก input และ button
const generateProductsButton = document.getElementById('generateProducts');
const shopCountIn = document.getElementById('shopCountIn');


function start_order(){
    

    // เพิ่มความรอบคอบให้สร้าง .incpro
    generateProductsButton.addEventListener('click', () => {
        // รับจำนวน .incpro จาก input
        
        const shopCount = parseInt(shopCountIn.value);
        Iincshop.innerHTML = '';

        // สร้าง .incpro ตามจำนวนที่ได้รับ
        // for (let j = 0; j < shopCount; j++) {
        //     createshopElement(j);
        // }
    });
    //----ไม่เกี่ยว----

    console.log("ก่อน if "+sending_status);
    if(sending_status == 1){
        for (let j = 0; j < 2; j++) {   //j < 2  --> shopCount
            createshopElementforselling(j);
        }
    }else{
        for (let j = 0; j < 2; j++) {   //j < 2  --> shopCount
            createshopElement(j);
        }
    }

}
//----

//-----------------------------------------------

function createshopElement(shopIndex) {
    // สร้าง .shop_pro
    const all_intype_order = document.createElement('div');
    all_intype_order.className = 'all_intype_order';
    all_intype_order.id = `shop${shopIndex}`;

    // สร้าง HTML ภายใน .shop_pro

    all_intype_order.innerHTML = `
    <div class="intype_order">
        <div class="detail_shop">
            <div class="shop_name">Name_Shop</div>
        </div>
        <section class="inorder" id="shop${shopIndex}_Iincpro">
        </section>
    </div>
    `;

    // นำ .shop_pro มาแทรกในเอลิเมนต์ของหน้าเว็บ
    Iincshop.appendChild(all_intype_order);
    
    const productCountIn = document.getElementById('productCountIn');
    const productCount = parseInt(productCountIn.value);
    for (let i = 0; i < 2; i++) {  // i < 2  --> productCount
        createProductElement(shopIndex, i);
    }
}
//-----------------------------------------------

function createshopElementforselling(shopIndex) {
    // สร้าง .shop_pro
    const all_intype_order = document.createElement('div');
    all_intype_order.className = 'all_intype_order';
    all_intype_order.id = `shop${shopIndex}`;

    // สร้าง HTML ภายใน .shop_pro

    all_intype_order.innerHTML = `
    <div class="intype_order">
        <div class="detail_shop">
            <div class="shop_name">Name_Shop</div>
        </div>
        <section class="inorder" id="shop${shopIndex}_Iincpro">
            
        </section>
    </div>
    `;

    // นำ .shop_pro มาแทรกในเอลิเมนต์ของหน้าเว็บ
    Iincshop.appendChild(all_intype_order);
    
    const productCountIn = document.getElementById('productCountIn');
    const productCount = parseInt(productCountIn.value);
        for (let i = 0; i < 2; i++) {  // i < 2  --> productCount
            createProductElementforselling(shopIndex, i); // มีปุ่ม
        }
}
//-----------------------------------------------

function createProductElement(shopIndex, incproIndex) {

    const Iincpro = document.getElementById(`shop${shopIndex}_Iincpro`);
    const sendingOrderButton = document.getElementById('bg_sending_order');
    // สร้าง .incpro
    const incpro = document.createElement('div');
    incpro.className = 'incpro';
    incpro.id = `shop${shopIndex}_incpro${incproIndex}`;

    // สร้าง HTML ภายใน .incpro
    
    incpro.innerHTML = `
        <a class="click_incpro" href="./product.html">
            <img src="./images/Shirocmt.jpg" alt="Product Image">
            <div class="bg_product_name">
                <div class="product_name">Product Name</div>
                <div class="select_type_pro">Select Type Product</div>
            </div>
        </a>
        <div class="cost_pro">
            &nbsp;100
        </div>
        <div class="bg_amount">
            <div>จำนวน</div>
            <div class="amount">
                &nbsp;1
            </div>
        </div>
        <div class="all_cost">
            <div class="all_cost_text">รวมคำสั่งซื้อ : </div>
            <div class="all_cost_pro">
            </div>
        </div>
        <div class="status">
            Status
        </div> 
        `;
    

    // นำ .incpro มาแทรกในเอลิเมนต์ของหน้าเว็บ
    
    Iincpro.appendChild(incpro);

}


//-----------------------------------------------



function createProductElementforselling(shopIndex, incproIndex) {

    const Iincpro = document.getElementById(`shop${shopIndex}_Iincpro`);
    const sendingOrderButton = document.getElementById('bg_sending_order');
    // สร้าง .incpro
    const incpro = document.createElement('div');
    incpro.className = 'incpro';
    incpro.id = `shop${shopIndex}_incpro${incproIndex}`;

    // สร้าง HTML ภายใน .incpro
    
    incpro.innerHTML = `
    <a class="click_incpro" href="./product.html">
        <img src="./images/Shirocmt.jpg" alt="Product Image">
        <div class="bg_product_name">
            <div class="product_name">Product Name</div>
            <div class="select_type_pro">Select Type Product</div>
        </div>
    </a>

    <div class="cost_pro">
        &nbsp;100
    </div>
    <div class="bg_amount">
        <div>จำนวน</div>
        <div class="amount">
            &nbsp;1
        </div>
    </div>
    <div class="all_cost">
        <div class="all_cost_text">รวมคำสั่งซื้อ : </div>
        <div class="all_cost_pro">
        </div>
    </div>
    <button class="con_product">ยืนยันการรับสินค้า</button>
    <div class="status">
        Status
    </div> 
        `;
    

    // นำ .incpro มาแทรกในเอลิเมนต์ของหน้าเว็บ
    
    Iincpro.appendChild(incpro);

}





















