

function expandContact() {
    let con_all = document.querySelector('.con_all');
    let contactBg = document.querySelector('.contact_bg');
    con_all.style.zIndex = '5';
    contactBg.style.transform = 'scale(1)';
}
// function closeContact() {
//     let con_all = document.querySelector('.con_all');
//     let contactBg = document.querySelector('.contact_bg');
//     contactBg.style.transform = 'scale(0)';
//     setTimeout(() => {
//         con_all.style.zIndex = '-5';
//     }, 200);
// }
  

function expandResetpass() {
    let pass_reset_all = document.querySelector('.pass_reset_all');
    pass_reset_all.style.display = 'flex';
    
}
function closeContact() {
    let con_all = document.querySelector('.con_all');
    let pass_reset_all = document.querySelector('.pass_reset_all');
    let pass_reset_bg = document.querySelector('.pass_reset_bg');
    let contactBg = document.querySelector('.contact_bg');
    let isClickInsideContact = contactBg.contains(event.target);
    let isClickInsidepass_reset_bg = pass_reset_bg.contains(event.target);
    if (!isClickInsidepass_reset_bg) {
        pass_reset_all.style.display = 'none';
    }
    if (!isClickInsideContact) {
        contactBg.style.transform = 'scale(0)';
        setTimeout(() => {
            con_all.style.zIndex = '-5';
        }, 200);
    }
}
  

//---------------------------------------
function borderpass(){
    let old_pass = document.querySelector('.old_pass');
    old_pass.style.border = '2px solid #ed6a53';
}
function borderpassout(){
    let old_pass = document.querySelector('.old_pass');
    old_pass.style.border = '2px solid #d4803c';
}
function borderpass2(){
    let new_pass = document.querySelector('.new_pass');
    new_pass.style.border = '2px solid #ed6a53';
}
function borderpassout2(){
    let new_pass = document.querySelector('.new_pass');
    new_pass.style.border = '2px solid #d4803c';
}
function borderpass3(){
    let re_new_pass = document.querySelector('.re_new_pass');
    re_new_pass.style.border = '2px solid #ed6a53';
}
function borderpassout3(){
    let re_new_pass = document.querySelector('.re_new_pass');
    re_new_pass.style.border = '2px solid #d4803c';
}
//---------------------------------------1

document.addEventListener('click', function(event) {
    let inputField = document.getElementById('show_data_username');
    let editButton = document.getElementById('edit_data_username_button');

    // ตรวจสอบว่าคลิกนอกปุ่มและนอก input
    if (!inputField.contains(event.target) && event.target !== editButton) {
        inputField.setAttribute('readonly', 'true');
        inputField.style.border= '2px solid #dedede';
        inputField.style.background = 'none';
        //inputField.value = 'ค่าทีร่แก้แล้วในdb';
    }
});

document.getElementById('edit_data_username_button').addEventListener('click', function() {
    let inputField = document.getElementById('show_data_username');

    // ให้ input ได้รับการ focus
    inputField.removeAttribute('readonly');
    inputField.focus();
    inputField.select();
    inputField.style.border= '2px solid #d4803c';
    inputField.style.background = '#fffaf5';
});

//---------------------------------------2
document.addEventListener('click', function(event) {
    let inputField = document.getElementById('show_data_fname');
    let editButton = document.getElementById('edit_data_fname_button');

    // ตรวจสอบว่าคลิกนอกปุ่มและนอก input
    if (!inputField.contains(event.target) && event.target !== editButton) {
        inputField.setAttribute('readonly', 'true');
        inputField.style.border= '2px solid #dedede';
        inputField.style.background = 'none';
        //inputField.value = 'ค่าทีร่แก้แล้วในdb';
    }
});

document.getElementById('edit_data_fname_button').addEventListener('click', function() {
    let inputField = document.getElementById('show_data_fname');

    // ให้ input ได้รับการ focus
    inputField.removeAttribute('readonly');
    inputField.focus();
    inputField.select();
    inputField.style.border= '2px solid #d4803c';
    inputField.style.background = '#fffaf5';
});
//---------------------------------------3
document.addEventListener('click', function(event) {
    let inputField = document.getElementById('show_data_lname');
    let editButton = document.getElementById('edit_data_lname_button');

    // ตรวจสอบว่าคลิกนอกปุ่มและนอก input
    if (!inputField.contains(event.target) && event.target !== editButton) {
        inputField.setAttribute('readonly', 'true');
        inputField.style.border= '2px solid #dedede';
        inputField.style.background = 'none';
        //inputField.value = 'ค่าทีร่แก้แล้วในdb';
    }
});

document.getElementById('edit_data_lname_button').addEventListener('click', function() {
    let inputField = document.getElementById('show_data_lname');

    // ให้ input ได้รับการ focus
    inputField.removeAttribute('readonly');
    inputField.focus();
    inputField.select();
    inputField.style.border= '2px solid #d4803c';
    inputField.style.background = '#fffaf5';
});
//---------------------------------------4
document.addEventListener('click', function(event) {
    let inputField = document.getElementById('show_data_date');
    let editButton = document.getElementById('edit_data_date_button');

    // ตรวจสอบว่าคลิกนอกปุ่มและนอก input
    if (!inputField.contains(event.target) && event.target !== editButton) {
        inputField.setAttribute('readonly', 'true');
        inputField.style.border= '2px solid #dedede';
        inputField.style.background = 'none';
        //inputField.value = 'ค่าทีร่แก้แล้วในdb';
    }
});

document.getElementById('edit_data_date_button').addEventListener('click', function() {
    let inputField = document.getElementById('show_data_date');

    // ให้ input ได้รับการ focus
    inputField.removeAttribute('readonly');
    inputField.focus();
    inputField.select();
    inputField.style.border= '2px solid #d4803c';
    inputField.style.background = '#fffaf5';
});
//---------------------------------------5
document.addEventListener('click', function(event) {
    let inputField = document.getElementById('show_data_tol');
    let editButton = document.getElementById('edit_data_tol_button');

    // ตรวจสอบว่าคลิกนอกปุ่มและนอก input
    if (!inputField.contains(event.target) && event.target !== editButton) {
        inputField.setAttribute('readonly', 'true');
        inputField.style.border= '2px solid #dedede';
        inputField.style.background = 'none';
        //inputField.value = 'ค่าทีร่แก้แล้วในdb';
    }
});

document.getElementById('edit_data_tol_button').addEventListener('click', function() {
    let inputField = document.getElementById('show_data_tol');

    // ให้ input ได้รับการ focus
    inputField.removeAttribute('readonly');
    inputField.focus();
    inputField.select();
    inputField.style.border= '2px solid #d4803c';
    inputField.style.background = '#fffaf5';
});

//---------------------------------------



document.querySelector('.edit_address_button').addEventListener('click', function() {
    let inputField = document.querySelector('.edit_data_address');
    let show_data_address = document.querySelector('.show_data_address');
    let edit_address_button = document.querySelector('.edit_address_button');
    let xc_button = document.querySelector('.xc_button');

    // ให้ input ได้รับการ focus
    show_data_address.style.display = 'none';
    inputField.style.display = 'flex';
    edit_address_button.style.display = 'none';
    xc_button.style.display = 'flex';
});

document.querySelector('.x_button').addEventListener('click', function() {
    let inputField = document.querySelector('.edit_data_address');
    let show_data_address = document.querySelector('.show_data_address');
    let edit_address_button = document.querySelector('.edit_address_button');
    let xc_button = document.querySelector('.xc_button');

    // ให้ input ได้รับการ focus
    show_data_address.style.display = 'flex';
    inputField.style.display = 'none';
    edit_address_button.style.display = 'flex';
    xc_button.style.display = 'none';
});
// ถ้าถูกบันทึกใน db และนำข้อมูลมาโช
document.querySelector('.c_button').addEventListener('click', function() {
    let inputField = document.querySelector('.edit_data_address');
    let show_data_address = document.querySelector('.show_data_address');
    let edit_address_button = document.querySelector('.edit_address_button');
    let xc_button = document.querySelector('.xc_button');

    // ให้ input ได้รับการ focus
    show_data_address.style.display = 'flex';
    inputField.style.display = 'none';
    edit_address_button.style.display = 'flex';
    xc_button.style.display = 'none';
});


//---------------------------------------
// function handleFileUpload() {
//     // Trigger click on hidden file input
//     document.getElementById('fileInput').click();

//     // Listen for file input change
//     document.getElementById('fileInput').addEventListener('change', function () {
//         // Get the selected file
//         const file = this.files[0];

//         // Do something with the file (e.g., upload it and display)
//         if (file) {
//             uploadAndDisplayImage(file);
//         }
//     });
// }


// function uploadAndDisplayImage(file) {
//     // Create a FormData object to append the file
//     const formData = new FormData();
//     formData.append('files', file);

//     // Use AJAX or another method to send the formData to the server
//     // In this example, we'll use the Fetch API
//     fetch('/upload', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => {
//         console.log(response);
//         return response.json();
//     })
//     .then(data => {
//         // Assuming the server responds with the path
//         const path = data.path;

//         // Update your logic to handle the path
//         displayImage(path);
//     })
//     .catch(error => {
//         console.error('Error uploading file:', error);
//         // Handle the error, for example, display an error message
//     });
// }

// function displayImage(path) {
//     // Assuming you have an element to display the image
//     const imgElement = document.getElementById('uploadedImage');

//     // Check if the element exists before setting its properties
//     if (imgElement) {
//         imgElement.src = path;
//     } else {
//         console.error('Image element not found.');
//     }
// }


//---------------------------------------


// in app.js or your client-side JavaScript file
async function handleFileUpload() {
    document.getElementById('fileInput').click();
}
  
// in app.js or your client-side JavaScript file
// in app.js or your client-side JavaScript file
async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    const formData = new FormData();
    formData.append('profileImage', file);
  
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
            });
            
  
        const result = await response.json();
    
        if (response.ok) {
            // Update the image source with the served image path
            document.getElementById('uploadedImage').src = `./uploads/profile/${result.filePath}`;

        } else {
            console.error('File upload failed:', result.error);
        }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  
  





