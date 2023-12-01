
function formatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
}


function handleFileUpload() {
    // Trigger click on hidden file input
    document.getElementById('fileInput').click();

    // Listen for file input change
    document.getElementById('fileInput').addEventListener('change', function() {
        // Get the selected file
        const file = this.files[0];

        // Do something with the file (e.g., upload it)
        if (file) {
            uploadFile(file);
        }
    });
}

function uploadFile(file) {
    // You can implement your file upload logic here
    console.log('Uploading file:', file.name);
    // Add your code to handle the file upload, e.g., using AJAX or FormData
    // Example:
    // const formData = new FormData();
    // formData.append('file', file);
    // Use AJAX or another method to send the formData to the server
}

function displayAmount() {
    // สมมติว่าคำนวณจำนวนเงินแล้วเก็บไว้ในตัวแปร amount
    // เช่น ให้ amount เป็นตัวอย่างจำนวนเงินที่คำนวณได้
    var amount = 500; // ตัวอย่างจำนวนเงินที่คำนวณได้

    // ใช้ JavaScript เพื่อรับข้อมูลและแสดงในส่วนของ HTML
    document.getElementById('amountDisplay').innerHTML = `${amount}   บาท`;
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