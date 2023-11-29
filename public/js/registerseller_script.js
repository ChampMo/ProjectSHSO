




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
    const card_id = document.querySelector('.card_id').value.trim();
    const shop_name = document.querySelector('.shop_name').value;
    const shop_address = document.querySelector('.shop_address').value;
    const shop_description = document.querySelector('.shop_description').value;
    const shop_bank = document.querySelector('.shop_bank').value.trim();
    const shop_bank_id = document.querySelector('.shop_bank_id').value.trim();
    const text_up_alert = document.querySelector('.text_up_alert');
    // ตรวจสอบรหัสผ่านและอีเมล
    if (card_id != '' && shop_name != '' && shop_address != '' && shop_description != '' && shop_bank != '' && shop_bank_id != '') {
        // ส่ง request ไปยัง server
        fetch('/api/register/seller/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ card_id, shop_name, shop_address, shop_description, shop_bank, shop_bank_id }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.check_seller) {
                    text_up_alert.style.visibility = "hidden";
                    console.log('Data inserted successfully');
                    setTimeout(() => {
                        alert('Register to seller successfully!!!');
                        window.location.href = '/';
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


