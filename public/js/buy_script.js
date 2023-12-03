
function formatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
}

async function cost_pay_produck(){
    const cost_allcp = document.getElementById("amountDisplay")

    try {
        // Fetch total product count from the server
        const response = await fetch(`/api/cost_pay_produck/`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const allcost = parseInt(data.check_cost) + parseInt( data.cost_car);
        cost_allcp.innerHTML = `${formatNumber(allcost)}  ฿`;


    } catch (error) {
        console.error('Error fetching shop data:', error);
    }
}

cost_pay_produck();






async function handleFileUpload() {
    document.getElementById('fileInput').click();
}

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('slipImage', file);
  
    try {
        const response = await fetch('/upload/silp/', {
            method: 'POST',
            body: formData,
            });
            
  
        const result = await response.json();
    
        if (response.ok) {
            // Update the image source with the served image path
            document.querySelector('.uploadphoto').style.visibility = 'visible';
            document.querySelector('.uploadphoto').src = `./uploads/slip/${result.filePath}`;

        } else {
            console.error('File upload failed:', result.error);
        }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
}



document.querySelector('.submit_success').addEventListener('click', function () {

    const date_time_slip = document.querySelector('.date_time').value;
    const check_slip = document.querySelector('.check_slip');

    if (date_time_slip != '') {
        // ส่ง request ไปยัง server
        fetch('/api/create/order/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date_time_slip }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.check_slip) {
                    check_slip.style.visibility = "hidden";
                    console.log('Data inserted successfully');
                    setTimeout(() => {
                        alert('Your order is successfully!!!');
                        window.location.href = '/status_order';
                    }, 500);
                    
                } else {
                    check_slip.style.visibility = "visible";
                    console.log('กรุณากรอกข้อมูลให้ครบถ้วน');
                }
            })
            .catch(error => {
                check_slip.style.visibility = "visible";
                console.error('Error:', error);
                // Handle the error, for example by displaying a user-friendly message
            });
    } else {
        check_slip.style.visibility = "visible";
        console.log('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
});



























