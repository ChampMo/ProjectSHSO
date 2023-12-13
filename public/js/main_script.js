function formatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
}
//-----------------------------------------------

const productContainer = document.getElementById('productContainer');
// เพิ่มฟังก์ชันให้เรียก createProductElements เมื่อผู้ใช้เปลี่ยนแปลง input

function createProductElements() {
    // Clear existing product containers
    productContainer.innerHTML = '';

    // Fetch total product count from the server
    fetch(`/api/count_products/`)
        .then(response => response.json())
        .then(totalProducts => {
            // Create product boxes based on the total count
            console.log(totalProducts)
            for (let i = 0; i < totalProducts; i++) {
                
                createProductBox(i);
            }
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
}
createProductElements();


function createProductBox(productId) {
    // สร้าง .shop_pro
    const product_box = document.createElement('a');
    product_box.className = 'inproduct';
    product_box.id = `shop${productId}`;
    

    // ส่งคำขอ GET ไปยัง server เพื่อดึงข้อมูล
    fetch(`/api/products/`)
        .then(response => response.json())
        .then(product => {
            const name_product = product[productId].name
            const price_product = product[productId].price
            const id_product = product[productId].product_id
            const picture1 = product[productId].picture1
            product_box.href = `/product/${id_product}`;
            console.log(name_product)
            product_box.innerHTML = `
                    <div class="imgproduct_box"><img src="${picture1}"></div>
                    <div class="detail_product_box">
                        ${name_product}
                    </div> 
                    <div class="cost_product">
                        ${formatNumber(price_product)}
                    </div>`
                    ;
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });

    const productContainer = document.getElementById('productContainer');
    productContainer.appendChild(product_box);
}


//-----------------------------------------------------------------




function search_product(){
    const input1 = document.querySelector('.input1').value;
    if (input1 !== ''){
        window.location.href = '/main'
            productContainer.innerHTML = '';
            fetch('/search-product/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input1 }),
            })
            .then(response => response.json())
            
            .then(totalProducts => {
                // Create product boxes based on the total count
                
                totalProducts.forEach(element => {
                    createProductBoxsearch(element.product_id);
                });
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
        }
}

    
    



function createProductBoxsearch(productId) {
    // สร้าง .shop_pro
    const product_box = document.createElement('a');
    product_box.className = 'inproduct';
    product_box.id = `shop${productId}`;

    // ส่งคำขอ GET ไปยัง server เพื่อดึงข้อมูล
    fetch('/api/products-search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
    })
        .then(response => response.json())
        .then(product => {
            const name_product = product[0].name
            const price_product = product[0].price
            const id_product = product[0].product_id
            const picture1 = product[0].picture1
            product_box.href = `/product/${id_product}`;
            console.log(name_product)
            product_box.innerHTML = `
                    <div class="imgproduct_box"><img src="${picture1}"></div>
                    <div class="detail_product_box">
                        ${name_product}
                    </div> 
                    <div class="cost_product">
                        ${formatNumber(price_product)}
                    </div>`
                    ;

        })
    
        .catch(error => {
            console.error('Error fetching product data:', error);
        });

    const productContainer = document.getElementById('productContainer');
    productContainer.appendChild(product_box);
}






//-----------------------------------------------

