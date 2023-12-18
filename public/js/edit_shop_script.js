





async function get_infoshop(){
    
    const shop_name = document.querySelector('.shop_name')
    const uploadedProshop = document.getElementById('uploadedProshop')
    const shop_address = document.querySelector('.shop_address')
    const shop_description = document.querySelector('.shop_description')
    const card_id = document.querySelector('.card_id')
    const shop_bank = document.querySelector('.shop_bank')
    const shop_bank_id = document.querySelector('.shop_bank_id')


    const shoResponse = await fetch(`/api/get_infoshop/`);
    if (!shoResponse.ok) {
        throw new Error(`HTTP error! Status: ${shoResponse.status}`);
    }
    const seller_info = await shoResponse.json();
    console.log(seller_info[0])
    uploadedProshop.src = seller_info[0].picture
    shop_name.value = seller_info[0].shop_name
    shop_address.value = seller_info[0].address_shop
    shop_description.value = seller_info[0].description
    card_id.value = seller_info[0].card_id
    shop_bank.value = seller_info[0].bank
    shop_bank_id.value = seller_info[0].bank_number

    }
document.addEventListener('DOMContentLoaded', function() {
    get_infoshop()
});





async function handleFileUpload() {
    document.getElementById('fileInput').click();
}

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('profileImage', file);
  
    try {
        const response = await fetch('/edit/proshop/', {
            method: 'POST',
            body: formData,
            });
            
  
        const result = await response.json();
    
        if (response.ok) {
            // Update the image source with the served image path
            document.getElementById('uploadedProshop').src = `./uploads/profile_shop/${result.filePath}`;

        } else {
            console.error('File upload failed:', result.error);
        }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
}

document.querySelector('.submit_seller').addEventListener('click', function () {
    // ดึงค่า input จากฟอร์ม
    const shop_name = document.querySelector('.shop_name').value;
    const shop_address = document.querySelector('.shop_address').value;
    const shop_description = document.querySelector('.shop_description').value;
    const shop_bank = document.querySelector('.shop_bank').value.trim();
    const shop_bank_id = document.querySelector('.shop_bank_id').value.trim();
    const text_up_alert = document.querySelector('.text_up_alert');
    // ตรวจสอบรหัสผ่านและอีเมล
    if ( shop_name != '' && shop_address != '' && shop_description != '' && shop_bank != '' && shop_bank_id != '') {
        // ส่ง request ไปยัง server
        fetch('/api/edit/seller/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shop_name, shop_address, shop_description, shop_bank, shop_bank_id }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.check_seller) {
                    text_up_alert.style.visibility = "hidden";
                    console.log('Update Shop successfully!!!');
                    setTimeout(() => {
                        alert('Update Shop successfully!!!');
                        window.location.href = '/seller';
                    }, 500);
                    
                } else {
                    text_up_alert.style.visibility = "visible";
                    console.log('กรุณากรอกข้อมูลให้ครบถ้วน');
                }
            })
            .catch(error => {
                text_up_alert.style.visibility = "visible";
                console.error('Error:', error);
                // Handle the error, for example by displaying a user-friendly message
            });
    } else {
        text_up_alert.style.visibility = "visible";
        console.log('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
});







    