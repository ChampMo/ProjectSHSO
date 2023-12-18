
function formatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
}

const Iincshop = document.querySelector(".bg_mypro")

async function getcreateshopElement_seller() {

    Iincshop.innerHTML = '';

    try {
        // Fetch total product count from the server
        const response = await fetch(`/api/get_infoproduct_show/`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        for (const item of data) {
            const product_id = item.product_id;
            
            await createshopElement_seller( product_id);

        }
    } catch (error) {
        console.error('Error fetching shop data:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
getcreateshopElement_seller();
});

async function createshopElement_seller( product_id) {

    try {
        
        const shoResponse = await fetch(`/api/product_sellmain/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({product_id}),
        });
        
        const date = await shoResponse.json();

        const incpro = document.createElement('div');
        incpro.className = 'myproduct';
        incpro.id = `myproduct${product_id}`;

        // สร้าง HTML ภายใน .shop_pro
        const shopResponse = await fetch(`/api/order_product_sellmain/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id}),
        });
        const product_info_cart = await shopResponse.json();
        const name = product_info_cart.productInfoCart[0].name
        const price = product_info_cart.productInfoCart[0].price
        const product_quantity = product_info_cart.productInfoCart[0].quantity
        const picture1 = product_info_cart.productInfoCart[0].picture1
        const detail = product_info_cart.productInfoCart[0].detail
        const main_type = product_info_cart.types_product[0].type_name
        const sub_type = product_info_cart.types_product[0].sub_type
        let insub_type = `[ ${sub_type} ]`

        if(sub_type === undefined){
            insub_type = ''
        }
        incpro.innerHTML = `
                <div class="detail_pro">
                    <a class="click_incpro" href="/product/${product_id}">
                        <img src="${picture1}" alt="Product Image">
                        <div class="bg_product_name">
                            <div class="product_name">${name}</div>
                            
                        </div>
                    </a>
                    <div class="bg_description">
                        <div class="bg_cost_amount">
                            <div class="cost_pro">
                                &nbsp;${formatNumber(price)}
                            </div>
                            <div class="bg_amount">
                                <div>จำนวน</div>
                                <div class="amount">
                                    &nbsp;${formatNumber(product_quantity)}
                                </div>
                            </div>
                        </div>
                        <textarea class="bg_desc" readonly>
                            detail : ${detail}
                        </textarea>
                    </div>
                </div>
                <div class="data_pro">
                    <div class="type_selling">
                        <div class="main_type">
                            ${main_type}
                        </div>
                        <div class="sub_type sub_type${product_id}">
                         ${insub_type} 
                        </div>
                    </div>
                    <div class="date_selling">
                        Date : ${date.date[0].date}
                    </div>
                </div>
            `;

        
            Iincshop.appendChild(incpro)

    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

//-----------------------------------------------







async function get_infoshop(){
    const img_shop = document.querySelector('.img_shop')
    const address_shopin = document.querySelector('.address_shopin')
    const description_shop = document.querySelector('.description_shop')
    const shop_name = document.getElementById('shop_name')

    const shoResponse = await fetch(`/api/get_infoshop_show/`);
    if (!shoResponse.ok) {
        throw new Error(`HTTP error! Status: ${shoResponse.status}`);
    }
    const seller_info = await shoResponse.json();
    console.log(seller_info[0])
    img_shop.src = seller_info[0].picture
    address_shopin.innerHTML = seller_info[0].address_shop
    description_shop.innerHTML = seller_info[0].description
    shop_name.innerHTML = "Shop name : " + seller_info[0].shop_name
    

    }
document.addEventListener('DOMContentLoaded', function() {
    get_infoshop()
});
    




