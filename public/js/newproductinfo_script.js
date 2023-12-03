


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
    // const catePro = document.getElementById('product_cate');
    // const selectedOption = catePro.options[catePro.selectedIndex];
    // const selectedText = selectedOption.text;
    const allData = {
        name:namePro.value,
        cost:costPro.value,
        quan:quanPro.value,
        /*cate:selectedText,*/
        desc:descPro.value};
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
