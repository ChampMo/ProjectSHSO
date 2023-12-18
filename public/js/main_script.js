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
                
                totalProducts.forEach(element => {
            console.log("element",element)
                    createProductBoxsearch(element.product_id);
                });
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
}
createProductElements();




//-----------------------------------------------------------------




function search_product(){
    const input1 = document.querySelector('.input1').value;
    if (input1 !== ''){
        //window.location.href = '/main'
            productContainer.innerHTML = '';
            console.log('input1',input1)
            fetch('/search-product/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input1 }),
            })
            .then(response => response.json())
            
            .then(totalProducts => {
                
                totalProducts.forEach(element => {
                    console.log('input1',element)
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


const product_cate =  document.getElementById('product_type')
product_cate.addEventListener("change", () => {
    const product_cate_value = product_cate.value;
    const sub_product_type = document.getElementById('sub_product_type')
    const min_type = document.querySelector('.min_type')

    if(product_cate_value ==0){
        sub_product_type.style.display= 'none'
        min_type.style.display= 'none'
        sub_product_type.innerHTML = `<option value="100">-</option>`
    }else if(product_cate_value ==1){
        sub_product_type.style.display= 'flex'
        sub_product_type.innerHTML = `<option value="101">-</option>
        <option value="2">เสื้อผ้าแฟชั่น</option>
        <option value="3">รองเท้า</option>
        <option value="4">กระเป๋า</option>
        <option value="1">อื่น</option>
        `
    }else if(product_cate_value ==2){
        sub_product_type.style.display= 'flex'
        min_type.style.display= 'flex'
        sub_product_type.innerHTML = `<option value="102">-</option>
        <option value="6">โทรศัพท์</option>
        <option value="7">แท็บเล็ต</option>
        <option value="8">คอมพิวเตอร์</option>
        <option value="5">อื่น</option>
        `
    }else if(product_cate_value ==3){
        sub_product_type.style.display= 'flex'
        min_type.style.display= 'flex'
        sub_product_type.innerHTML = `<option value="102">-</option>
        <option value="10">เฟอร์นิเจอร์</option>
        <option value="11">เครื่องใช้ไฟฟ้า</option>
        <option value="12">ผ้าม่านและของตกแต่ง</option>
        <option value="9">อื่น</option>
        `
    }else if(product_cate_value ==4){
        sub_product_type.style.display= 'flex'
        min_type.style.display= 'flex'
        sub_product_type.innerHTML = `<option value="104">-</option>
        <option value="14">รองเท้ากีฬา</option>
        <option value="15">อุปกรณ์ออกกำลังกาย</option>
        <option value="13">อื่น</option>
        `
    }else if(product_cate_value ==5){
        sub_product_type.style.display= 'flex'
        min_type.style.display= 'flex'
        sub_product_type.innerHTML = `<option value="105">-</option>
        <option value="17">หนังสือ</option>
        <option value="18">อุปกรณ์อ่าน e-book</option>
        <option value="16">อื่น</option>
        `
    }else if(product_cate_value ==6){
        sub_product_type.style.display= 'flex'
        min_type.style.display= 'flex'
        sub_product_type.innerHTML = `<option value="106">-</option>
        <option value="20">แหวน</option>
        <option value="21">สร้อย</option>
        <option value="22">นาฬิกา</option>
        <option value="19">อื่น</option>
        `
    }else if(product_cate_value ==7){
        sub_product_type.style.display= 'flex'
        min_type.style.display= 'flex'
        sub_product_type.innerHTML = `<option value="107">-</option>
        <option value="24">ของเล่น</option>
        <option value="25">เสื้อผ้าเด็ก</option>
        <option value="23">อื่น</option>
        `
    }else if(product_cate_value ==8){
        sub_product_type.style.display= 'flex'
        min_type.style.display= 'flex'
        sub_product_type.innerHTML = `<option value="108">-</option>
        <option value="27">ภาพวาดและภาพถ่าย</option>
        <option value="28">งานปั้นและงานหัตถกรรม</option>
        <option value="29">ของตกแต่งบ้าน</option>
        <option value="26">อื่น</option>
        `
    }else if(product_cate_value ==9){
        sub_product_type.style.display= 'flex'
        min_type.style.display= 'flex'
        sub_product_type.innerHTML = `<option value="109">-</option>
        <option value="31">เครื่องมือช่าง</option>
        <option value="32">วัสดุสำหรับ</option>
        <option value="30">อื่น</option>
        `
    }else if(product_cate_value ==10){
        sub_product_type.style.display= 'none'
        min_type.style.display= 'none'
        sub_product_type.innerHTML = `<option value="110">-</option>`
    }


    const type_value = document.getElementById('sub_product_type').value

    productContainer.innerHTML = '';
    console.log(type_value)

    fetch('/select-type-product/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type_value }),
    })
    .then(response => response.json())
    
    .then(totalProducts => {
        
        totalProducts.forEach(element => {
            createProductBoxsearch(element);
        });
    })
    .catch(error => {
        console.error('Error fetching product data:', error);
    });




});

document.getElementById('sub_product_type').addEventListener('change',()=>{
    const type_value = document.getElementById('sub_product_type').value
    productContainer.innerHTML = '';
    fetch('/select-type-product/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type_value }),
    })
    .then(response => response.json())
    
    .then(totalProducts => {
        
        totalProducts.forEach(element => {
            createProductBoxsearch(element);
        });
    })
    .catch(error => {
        console.error('Error fetching product data:', error);
    });
})