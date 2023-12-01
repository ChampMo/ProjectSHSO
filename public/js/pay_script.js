
function formatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
}
//-----------------------------------------------
// เลือก input และ button
async function processShopProElements(seller_id, product_id) {
    let shop_pro = document.querySelectorAll('.all_intype_order');
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
        const response = await fetch(`/api/count_order/`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const seller_id = data.seller_id;
        const product_id = data.product_id;
        for(i = 0; i < seller_id.length; i++){
            await processShopProElements(seller_id[i], product_id[i]);
        }
    } catch (error) {
        console.error('Error fetching shop data:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    getcreateshopElement();
    cost_pay_produck();
});

//-----------------------------------------------

async function createshopElement(seller_id, product_id) {
    // Declare shop_pro here
    const Iincshop = document.getElementById("Iincshop")


    try {
        // สร้าง .shop_pro
        const all_intype_order = document.createElement('div');
        all_intype_order.className = 'all_intype_order';
        all_intype_order.id = `shop${seller_id}`;
        
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

        all_intype_order.innerHTML = `
            <div class="intype_order">
                <div class="detail_shop">
                    <div class="shop_name">${shop_name[0].shop_name}</div>
                    <div class="detail_car">
                        <i class="fa-solid fa-truck fa-xl"></i>
                        ฿ 50
                    </div>
                </div>
                <section class="inorder" id="shop${seller_id}_Iincpro">
                </section>
            </div>
            `;

        // นำ .shop_pro มาแทรกในเอลิเมนต์ของหน้าเว็บ
        Iincshop.appendChild(all_intype_order);

        
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
        const cost = (price*product_amount)
        // Assuming shop_pro is available in the global scope
        incpro.innerHTML = `
                <a class="click_incpro" href="/product/${product_id}">
                    <img src="${picture1}">
                    <div class="product_name">${name}</div>
                </a>
                <div class="select_type_pro">Select Type Product</div>
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
                    <div class="all_cost_pro">฿ ${formatNumber(cost)}
                    </div>
                </div>
            `;

        Iincpro.appendChild(incpro);


        
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}
//-----------------------------------------------


async function cost_pay_produck(){
    const cost_product2 = document.querySelector(".cost_product2")
    const cost_car = document.querySelector(".cost_car")
    const cost_allcp = document.querySelector(".cost_allcp")

    try {
        // Fetch total product count from the server
        const response = await fetch(`/api/cost_pay_produck/`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const allcost = parseInt(data.check_cost) + parseInt( data.cost_car);
        cost_product2.innerHTML = `${formatNumber(data.check_cost)}  ฿`;
        cost_car.innerHTML = `${formatNumber(data.cost_car)}  ฿`;
        cost_allcp.innerHTML = `${formatNumber(allcost)}  ฿`;


    } catch (error) {
        console.error('Error fetching shop data:', error);
    }
    const village = document.querySelector(".village")
    const no_village = document.querySelector(".no_village")
    const road = document.querySelector(".road")
    const sub_district = document.querySelector(".sub_district")
    const district = document.querySelector(".district")
    const city = document.querySelector(".city")
    const Postal_id = document.querySelector(".Postal_id")

    try {
        // Fetch total product count from the server
        const response = await fetch(`/api/address_pay/`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const address = await response.json();

        village.innerHTML = `${address.village}`;
        no_village.innerHTML = `${address.no_village}`;
        road.innerHTML = `${address.road}`;
        sub_district.innerHTML = `${address.sub_district}`;
        district.innerHTML = `${address.district}`;
        city.innerHTML = `${address.city}`;
        Postal_id.innerHTML = `${address.Postal_id}`;


    } catch (error) {
        console.error('Error fetching shop data:', error);
    }





}



































