const Iincshop = document.getElementById('Iincshop');
//-----------------------------------------------

// เพิ่มความรอบคอบให้สร้าง .incpro
//----ไม่เกี่ยว----
for (let j = 0; j < 2; j++) {   //j < 2  --> shopCount
    createshopElement(j);
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
    for (let i = 0; i < 2; i++) {  // i < 2  --> productCount
        createProductElement(shopIndex, i);
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
        <a class="click_incpro" href="/product">
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
        `;
    

    // นำ .incpro มาแทรกในเอลิเมนต์ของหน้าเว็บ
    
    Iincpro.appendChild(incpro);

}