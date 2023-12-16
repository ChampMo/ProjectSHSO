




document.addEventListener('DOMContentLoaded', function () {
    sub_product_cateadd()
    const product_name = document.getElementById('product_name')
    const product_cost = document.getElementById('product_cost')
    const product_quan = document.getElementById('product_quan')
    const product_desc = document.getElementById('product_desc')
    const product_cate = document.getElementById('product_cate')
    const sub_product_cate = document.getElementById('sub_product_cate')
    const upload_1 = document.getElementById('upload_1')
    const upload_2 = document.getElementById('upload_2')
    const upload_3 = document.getElementById('upload_3')
    const upload_4 = document.getElementById('upload_4')

    fetch(`/api/get_old_data/`)
            .then(response => response.json())
            
            .then(old_data => {
                console.log(old_data)
                upload_1.src = old_data.products[0].picture1
                upload_2.src = old_data.products[0].picture2
                upload_3.src = old_data.products[0].picture3
                upload_4.src = old_data.products[0].picture4
                product_name.value = old_data.products[0].name
                product_cost.value = old_data.products[0].price
                product_quan.value = old_data.products[0].quantity
                product_desc.value = old_data.products[0].detail
                const proId = parseInt(old_data.types_product[0].type_id)

                if(proId === 0){
                    product_cate.value = '0'
                    sub_product_cate.innerHTML = `<option value="0"> - </option>`
                }else if(proId >= 1 && proId <= 4){
                    product_cate.value = '1'
                    sub_product_cate.innerHTML = `<option value="1">อื่น</option>
                        <option value="2">เสื้อผ้าแฟชั่น</option>
                        <option value="3">รองเท้า</option>
                        <option value="4">กระเป๋า</option>
                        `
                }else if(proId >= 5 && proId <= 8){
                    product_cate.value = '2'
                    sub_product_cate.innerHTML = `<option value="5">อื่น</option>
                        <option value="6">โทรศัพท์</option>
                        <option value="7">แท็บเล็ต</option>
                        <option value="8">คอมพิวเตอร์</option>
                        `
                }else if(proId >= 9 && proId <= 12){
                    product_cate.value = '3'
                    sub_product_cate.innerHTML = `<option value="9">อื่น</option>
                        <option value="10">เฟอร์นิเจอร์</option>
                        <option value="11">เครื่องใช้ไฟฟ้า</option>
                        <option value="12">ผ้าม่านและของตกแต่ง</option>
                        `
                }else if(proId >= 13 && proId <= 15){
                    product_cate.value = '4'
                    sub_product_cate.innerHTML = `<option value="13">อื่น</option>
                        <option value="14">รองเท้ากีฬา</option>
                        <option value="15">อุปกรณ์ออกกำลังกาย</option>
                        `
                }else if(proId >= 16 && proId <= 18){
                    product_cate.value = '5'
                    sub_product_cate.innerHTML = `<option value="16">อื่น</option>
                        <option value="17">หนังสือ</option>
                        <option value="18">อุปกรณ์อ่าน e-book</option>
                        `
                }else if(proId >= 19 && proId <= 22){
                    product_cate.value = '6'
                    sub_product_cate.innerHTML = `<option value="19">อื่น</option>
                        <option value="20">แหวน</option>
                        <option value="21">สร้อย</option>
                        <option value="22">นาฬิกา</option>
                        `
                }else if(proId >= 23 && proId <= 25){
                    product_cate.value = '7'
                    sub_product_cate.innerHTML = `<option value="23">อื่น</option>
                        <option value="24">ของเล่น</option>
                        <option value="25">เสื้อผ้าเด็ก</option>
                        `
                }else if(proId >= 26 && proId <= 29){
                    product_cate.value = '8'
                    sub_product_cate.innerHTML = `<option value="26">อื่น</option>
                        <option value="27">ภาพวาดและภาพถ่าย</option>
                        <option value="28">งานปั้นและงานหัตถกรรม</option>
                        <option value="29">ของตกแต่งบ้าน</option>
                        `
                }else if(proId >= 30 && proId <= 32){
                    product_cate.value = '9'
                    sub_product_cate.innerHTML = `<option value="30">อื่น</option>
                        <option value="31">เครื่องมือช่าง</option>
                        <option value="32">วัสดุสำหรับ</option>
                        `
                }
                sub_product_cate.value = old_data.types_product[0].type_id
                
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
});

function sub_product_cateadd(){
    product_cate.addEventListener("change", function() {
        let product_cate_value = product_cate.value;
        const sub_product_cate = document.getElementById('sub_product_cate')
    
        if(product_cate_value ==0){
            sub_product_cate.innerHTML = `<option value="0"> - </option>`
        }else if(product_cate_value ==1){
            sub_product_cate.innerHTML = `<option value="1">อื่น</option>
            <option value="2">เสื้อผ้าแฟชั่น</option>
            <option value="3">รองเท้า</option>
            <option value="4">กระเป๋า</option>
            `
        }else if(product_cate_value ==2){
            sub_product_cate.innerHTML = `<option value="5">อื่น</option>
            <option value="6">โทรศัพท์</option>
            <option value="7">แท็บเล็ต</option>
            <option value="8">คอมพิวเตอร์</option>
            `
        }else if(product_cate_value ==3){
            sub_product_cate.innerHTML = `<option value="9">อื่น</option>
            <option value="10">เฟอร์นิเจอร์</option>
            <option value="11">เครื่องใช้ไฟฟ้า</option>
            <option value="12">ผ้าม่านและของตกแต่ง</option>
            `
        }else if(product_cate_value ==4){
            sub_product_cate.innerHTML = `<option value="13">อื่น</option>
            <option value="14">รองเท้ากีฬา</option>
            <option value="15">อุปกรณ์ออกกำลังกาย</option>
            `
        }else if(product_cate_value ==5){
            sub_product_cate.innerHTML = `<option value="16">อื่น</option>
            <option value="17">หนังสือ</option>
            <option value="18">อุปกรณ์อ่าน e-book</option>
            `
        }else if(product_cate_value ==6){
            sub_product_cate.innerHTML = `<option value="19">อื่น</option>
            <option value="20">แหวน</option>
            <option value="21">สร้อย</option>
            <option value="22">นาฬิกา</option>
            `
        }else if(product_cate_value ==7){
            sub_product_cate.innerHTML = `<option value="23">อื่น</option>
            <option value="24">ของเล่น</option>
            <option value="25">เสื้อผ้าเด็ก</option>
            `
        }else if(product_cate_value ==8){
            sub_product_cate.innerHTML = `<option value="26">อื่น</option>
            <option value="27">ภาพวาดและภาพถ่าย</option>
            <option value="28">งานปั้นและงานหัตถกรรม</option>
            <option value="29">ของตกแต่งบ้าน</option>
            `
        }else if(product_cate_value ==9){
            sub_product_cate.innerHTML = `<option value="30">อื่น</option>
            <option value="31">เครื่องมือช่าง</option>
            <option value="32">วัสดุสำหรับ</option>
            `
        }
    });
}
























