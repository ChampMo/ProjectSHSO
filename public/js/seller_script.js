
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
        const name = product_info_cart[0].name
        const price = product_info_cart[0].price
        const product_quantity = product_info_cart[0].quantity
        const picture1 = product_info_cart[0].picture1
        const detail = product_info_cart[0].detail

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
                        <textarea class="bg_desc">
                            detail : ${detail}
                        </textarea>
                    </div>
                </div>
                <div class="type_selling">
                    type
                </div>
                <button class="del_product" onclick="del_product_sell(${product_id})">ลบสินค้า</button>
                <div class="date_selling">
                    Date : ${date.date[0].date}
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