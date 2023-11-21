
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
    product_box.href = "/product";  // แก้ไขไปยังรหัสไหนที่ต้องการ

    // ส่งคำขอ GET ไปยัง server เพื่อดึงข้อมูล
    fetch(`/api/products/`)
        .then(response => response.json())
        .then(product => {
            const name_product = product[productId].name
            const price_product = product[productId].price
            console.log(name_product)
            product_box.innerHTML = `
                    <div class="imgproduct_box"><img src="/images/Shirocmt.jpg"></div>
                    <div class="detail_product_box">
                        ${name_product}
                    </div> 
                    <div class="cost_product">
                        ${price_product}
                    </div>`
                ;
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });

    const productContainer = document.getElementById('productContainer');
    productContainer.appendChild(product_box);
}
