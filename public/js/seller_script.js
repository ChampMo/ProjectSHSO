
function formatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
}

const Iincshop = document.querySelector(".bg_mypro")

async function getcreateshopElement_seller() {

    Iincshop.innerHTML = '';

    try {
        // Fetch total product count from the server
        const response = await fetch(`/api/count_product_sellmain/`);
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
                    <div class="edit_del">
                        <button class="edit_product" onclick="edit_product_sell(${product_id})">แก้ไข</button>
                        <button class="del_product" onclick="del_product_sell(${product_id})">ลบสินค้า</button>
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

count_order2();
async function count_order2(){
    const count_order2 = document.querySelector('.count_order2');
    

    try {
        const response = await fetch(`/api/count_order2_seller/`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const amount_order =data[0].amount_order
        count_order2.textContent = amount_order
    } catch (error) {
        console.error('Error fetching shop data:', error);
    }

}


function del_product_sell(product_id){
        
    fetch(`/api/delete_product_sell/`, {
        method: 'PUT',
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
                window.location.href = "/seller"
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error (e.g., display an error message to the user)
        });
}







function del_product_sell(product_id){
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
        
        fetch(`/api/delete_product_sell/`, {
            method: 'PUT',
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
                    window.location.href = "/seller"
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error (e.g., display an error message to the user)
            });
    });
    
};




async function edit_product_sell(product_id){
    const shoResponse = await fetch(`/api/edit_product_sellmain/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({product_id}),
    });
    if (!shoResponse.ok) {
        throw new Error(`HTTP error! Status: ${shoResponse.status}`);
    }
  
    const editId = await shoResponse.json();
    if(editId.success){
        window.location.href = "/edit_product"
    }
}

document.getElementById('eye_icon').addEventListener('click',()=>{
    const eye_icon = document.getElementById('eye_icon')
    const eyeslash_icon = document.getElementById('eyeslash_icon')
    const incart_id = document.querySelector('.incart_id')
    const inbank = document.querySelector('.inbank')
    const inbank_number = document.querySelector('.inbank_number')

    eye_icon.style.display = 'none'
    eyeslash_icon.style.display = 'flex'
    incart_id.type = 'text'
    inbank.type = 'text'
    inbank_number.type = 'text'
})
document.getElementById('eyeslash_icon').addEventListener('click',()=>{
    const eye_icon = document.getElementById('eye_icon')
    const eyeslash_icon = document.getElementById('eyeslash_icon')
    const incart_id = document.querySelector('.incart_id')
    const inbank = document.querySelector('.inbank')
    const inbank_number = document.querySelector('.inbank_number')

    eye_icon.style.display = 'flex'
    eyeslash_icon.style.display = 'none'
    incart_id.type = 'password'
    inbank.type = 'password'
    inbank_number.type = 'password'
})



async function get_infoshop(){
    const img_shop = document.querySelector('.img_shop')
    const address_shopin = document.querySelector('.address_shopin')
    const description_shop = document.querySelector('.description_shop')
    const incart_id = document.querySelector('.incart_id')
    const inbank = document.querySelector('.inbank')
    const inbank_number = document.querySelector('.inbank_number')


    const shoResponse = await fetch(`/api/get_infoshop/`);
    if (!shoResponse.ok) {
        throw new Error(`HTTP error! Status: ${shoResponse.status}`);
    }
    const seller_info = await shoResponse.json();
    console.log(seller_info[0])
    img_shop.src = seller_info[0].picture
    address_shopin.innerHTML = seller_info[0].address_shop
    description_shop.innerHTML = seller_info[0].description
    incart_id.value = seller_info[0].card_id
    inbank.value = seller_info[0].bank
    inbank_number.value = seller_info[0].bank_number
    

    }
document.addEventListener('DOMContentLoaded', function() {
    get_infoshop()
});
    




