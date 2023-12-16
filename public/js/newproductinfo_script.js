


async function handleFileUpload(point) {
    document.getElementById(`fileInput${point}`).click();
    console.log(point)
}

async function uploadFile(point) {
    const fileInput = document.getElementById(`fileInput${point}`);
    const file = fileInput.files[0];
    const upload = document.getElementById(`photo${point}`)
    const formData = new FormData(); 
    formData.append('productImage', file);
    console.log(formData)
    try {
        const response = await fetch('/upload/product_picture/', {
            method: 'POST',
            body: formData,
            });
            
  
        const result = await response.json();
    
        if (response.ok) {
            // Update the image source with the served image path
            document.getElementById(`upload_${point}`).src = `./uploads/product_picture/${result.filePath}`;

        } else {
            console.error('File upload failed:', result.error);
        }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    upload.style.display = 'flex';
}
async function InsertData() {
    const namePro = document.getElementById('product_name');
    const costPro = document.getElementById('product_cost');
    const quanPro = document.getElementById('product_quan');
    const descPro = document.getElementById('product_desc');
    const sub_product_cate = document.getElementById('sub_product_cate')
    console.log(sub_product_cate.value)
    // const catePro = document.getElementById('product_cate');
    // const selectedOption = catePro.options[catePro.selectedIndex];
    // const selectedText = selectedOption.text;
    const allData = {
        name:namePro.value,
        cost:costPro.value,
        quan:quanPro.value,
        /*cate:selectedText,*/
        desc:descPro.value,
        sub_type:sub_product_cate.value
    };
    console.log(allData);
    fetch('/upload/product_info/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: (JSON.stringify(allData)),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (!data){
            alert('กรุณากรอกข้อมูลให้ครบถ้วน')
        }else{
            alert('เพิ่มสินค้าสำเร็จ')
            window.location.href="/seller"
            
        }
      })
      .catch(error => {
        // การจัดการเมื่อเกิดข้อผิดพลาดในการส่งหรือรับข้อมูลจาก backend
        console.error('Error:', error);
    });
}
document.querySelector('.submit_seller').addEventListener('click',function (){
    InsertData()
})


const product_cate =  document.getElementById('product_cate')




product_cate.addEventListener("change", function() {
    const product_cate_value = product_cate.value;
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






