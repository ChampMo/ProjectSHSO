




async function handleFileUpload() {
    document.getElementById('fileInput').click();
}

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('profileImage', file);
  
    try {
        const response = await fetch('/upload/proshop/', {
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

  
//---------------------------------------

document.querySelector('.submit_seller').addEventListener('click', function () {
    // ดึงค่า input จากฟอร์ม
    const cart_id = document.querySelector('.cart_id').value.trim();
    const shop_name = document.querySelector('.shop_name').value;
    const shop_address = document.querySelector('.shop_address').value;
    const shop_description = document.querySelector('.shop_description').value;
    const shop_bank = document.querySelector('.shop_bank').value.trim();
    const shop_bank_id = document.querySelector('.shop_bank_id').value.trim();
    const text_up_alert = document.querySelector('.text_up_alert');
    // ตรวจสอบรหัสผ่านและอีเมล
    if (cart_id != '' && shop_name != '' && shop_address != '' && shop_description != '' && shop_bank != '' && shop_bank_id != '') {
        // ส่ง request ไปยัง server
        fetch('/api/register/seller/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart_id, shop_name, shop_address, shop_description, shop_bank, shop_bank_id, text_up_alert }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.check_mail) {
                    match_mail.style.visibility = "hidden";
                    console.log('Data inserted successfully');
                    setTimeout(() => {
                        login_click.click()
                        alert('Register successfully!!!');
                    }, 500);
                    
                } else {
                    match_mail.style.visibility = "visible";
                    console.log('Email is already registered');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle the error, for example by displaying a user-friendly message
            });
    } else {
        text_up_alert.style.visibility = "visible";
        console.log('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
});


