

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


// in app.js or your client-side JavaScript file
async function handleFileUpload() {
    document.getElementById('fileInput').click();
}
  
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
            document.getElementById('uploadedImage').src = `../uploads/profile/${result.profile_picture}`;

        } else {
            console.error('File upload failed:', result.error);
        }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
}
  
  

 document.addEventListener('DOMContentLoaded', function() {


    document.querySelector('.sidelogout').addEventListener("click",function(){
        const relog = document.querySelector('.relog')
        relog.style.transform = "scale(1)"
    })
});



document.addEventListener('DOMContentLoaded', function() {
    fetch(`/api/profile/`)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                const customer = data[0];
                // Access the properties based on the structure of the data received
                const username = customer.username
                const fname = customer.first_name
                const lname = customer.last_name
                const date = customer.date_birth
                const phone = customer.phone_number
                var village = customer.village
                var no_village = customer.no_village
                var road = customer.road
                var sub_district = customer.sub_district
                var district = customer.district
                var city = customer.city
                var postal_id = customer.Postal_id
                const window = document.querySelector('.username')
                const show_address = document.querySelector('.profile_address_data')
                const show_user = document.getElementById('show_data_username')
                const show_fname = document.getElementById('show_data_fname')
                const show_lname = document.getElementById('show_data_lname')
                const show_date = document.getElementById('show_data_date')
                const show_phone = document.getElementById('show_data_tol')
                if (username!='null'){
                    show_user.value = username;
                }
                if (fname!='null'){
                    show_fname.value = fname;
                }
                if (lname!='null'){
                    show_lname.value = lname;
                }
                if (date!='null'){
                    show_date.value = date;
                }
                if (phone!='null'){
                    show_phone.value = phone;
                }
                if(village='null'){
                    village=''
                }
                if(no_village='null'){
                    no_village=''
                }
                if(road='null'){
                    road=''
                }
                if(sub_district='null'){
                    sub_district=''
                }
                if(district='null'){
                    district=''
                }
                if(city='null'){
                    city=''
                }
                if(postal_id='null'){
                    postal_id=''
                }
                if(village==='' && (no_village==='') &&(road==='')&&(sub_district==='')&&(district==='')&&(city==='')&&(postal_id==='')){
                    show_address.innerHTML =`<div class="add_address">กรุณากรอกที่อยู่ของท่าน</div>`
                }
                else{
                    show_address.innerHTML =`
                <div>${village}&nbsp;</div>
                <div>${no_village}&nbsp;</div>
                <div>${road}&nbsp;</div>
                <div>${sub_district}&nbsp;</div>
                <div>${district}&nbsp;</div>
                <div>${city}&nbsp;</div>
                <div>${postal_id}&nbsp;</div>`
                }
                
                window.innerHTML =`
                <div>${username}</div>
                <div>${fname}</div>
                <div>${lname}</div>
                <div>${date}</div>
                <div>${phone}</div>
                <div>
                    <div>${village}</div>
                    <div>${no_village}</div>
                    <div>${road}</div>
                    <div>${sub_district}</div>
                    <div>${district}</div>
                    <div>${city}</div>
                    <div>${postal_id}</div>
                </div>
                `;
                console.log(username);
                console.log(fname);
                console.log(lname);
                console.log(date);
                console.log(phone);
                console.log(village)
                console.log(no_village);
                console.log(road);
                console.log(sub_district);
                console.log(district);
                console.log(city);
                console.log(postal_id);
                
                // Proceed with manipulating the DOM or using the fetched data
            } else {
                console.error('No data received or empty array.');
                // Handle the case where no data is received or the array is empty
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle the error or display a message to the user
        });
});
function change_username(){
}

