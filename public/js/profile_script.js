

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

document.getElementById('edit_data_username_button').addEventListener('click', function() {
    let edit_address_button = document.getElementById('edit_data_username_button');
    let xc_button = document.querySelector('.xc_button_all');
    let change_username = document.getElementById('show_data_username');
    let change_fname = document.getElementById('show_data_fname');
    let change_lname = document.getElementById('show_data_lname');
    let change_date = document.getElementById('show_data_date');
    let change_tol = document.getElementById('show_data_tol');
    

    // ให้ input ได้รับการ focus
    edit_address_button.style.display = 'none';
    xc_button.style.display = 'flex';
    change_username.removeAttribute('readonly');
    change_username.focus();
    change_username.select();
    change_username.style.border= '2px solid #d4803c';
    change_username.style.background = '#fffaf5';
    change_fname.removeAttribute('readonly');
    change_fname.focus();
    change_fname.select();
    change_fname.style.border= '2px solid #d4803c';
    change_fname.style.background = '#fffaf5';
    change_lname.removeAttribute('readonly');
    change_lname.focus();
    change_lname.select();
    change_lname.style.border= '2px solid #d4803c';
    change_lname.style.background = '#fffaf5';
    change_date.removeAttribute('readonly');
    change_date.focus();
    change_date.select();
    change_date.style.border= '2px solid #d4803c';
    change_date.style.background = '#fffaf5';
    change_date.type="date"
    change_tol.removeAttribute('readonly');
    change_tol.focus();
    change_tol.select();
    change_tol.style.border= '2px solid #d4803c';
    change_tol.style.background = '#fffaf5';
    
});

document.querySelector('.x_button_all').addEventListener('click', function() {
    let edit_address_button = document.getElementById('edit_data_username_button');
    let xc_button = document.querySelector('.xc_button_all');
    let change_username = document.getElementById('show_data_username');
    let change_fname = document.getElementById('show_data_fname');
    let change_lname = document.getElementById('show_data_lname');
    let change_date = document.getElementById('show_data_date');
    let change_tol = document.getElementById('show_data_tol');

    change_username.setAttribute('readonly', 'true');
    change_username.style.border= '2px solid #dedede';
    change_username.style.background = 'none';
    change_fname.setAttribute('readonly', 'true');
    change_fname.style.border= '2px solid #dedede';
    change_fname.style.background = 'none';
    change_lname.setAttribute('readonly', 'true');
    change_lname.style.border= '2px solid #dedede';
    change_lname.style.background = 'none';
    change_date.setAttribute('readonly', 'true');
    change_date.style.border= '2px solid #dedede';
    change_date.style.background = 'none';
    change_date.type="text"
    change_tol.setAttribute('readonly', 'true');
    change_tol.style.border= '2px solid #dedede';
    change_tol.style.background = 'none';

    // ให้ input ได้รับการ focus
    edit_address_button.style.display = 'flex';
    xc_button.style.display = 'none';
    load_data();
    console.log("เปลี่ยนข้อมูลไม่สำเร็จ")
});
// ถ้าถูกบันทึกใน db และนำข้อมูลมาโช
document.querySelector('.c_button_all').addEventListener('click', function() {

    let edit_address_button = document.getElementById('edit_data_username_button');
    let xc_button = document.querySelector('.xc_button_all');
    let change_username = document.getElementById('show_data_username');
    let change_fname = document.getElementById('show_data_fname');
    let change_lname = document.getElementById('show_data_lname');
    let change_date = document.getElementById('show_data_date');
    let change_tol = document.getElementById('show_data_tol');

    change_username.setAttribute('readonly', 'true');
    change_username.style.border= '2px solid #dedede';
    change_username.style.background = 'none';
    change_fname.setAttribute('readonly', 'true');
    change_fname.style.border= '2px solid #dedede';
    change_fname.style.background = 'none';
    change_lname.setAttribute('readonly', 'true');
    change_lname.style.border= '2px solid #dedede';
    change_lname.style.background = 'none';
    change_date.setAttribute('readonly', 'true');
    change_date.style.border= '2px solid #dedede';
    change_date.style.background = 'none';
    change_date.type="text"
    change_tol.setAttribute('readonly', 'true');
    change_tol.style.border= '2px solid #dedede';
    change_tol.style.background = 'none';

    // ให้ input ได้รับการ focus
    edit_address_button.style.display = 'flex';
    xc_button.style.display = 'none';
    updateProfile(change_username.value,change_fname.value,change_lname.value,change_date.value,change_tol.value);
    load_data()
    alert('Update information successfully!!!');

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
    load_address()
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
    load_data();
    console.log("เปลี่ยนข้อมูลไม่สำเร็จ");
});
// ถ้าถูกบันทึกใน db และนำข้อมูลมาโช
document.querySelector('.c_button').addEventListener('click', function() {
    let inputField = document.querySelector('.edit_data_address');
    let show_data_address = document.querySelector('.show_data_address');
    let edit_address_button = document.querySelector('.edit_address_button');
    let xc_button = document.querySelector('.xc_button');
    let change_village = document.getElementById('village');
    let change_no_village = document.getElementById('no_village');
    let change_road = document.getElementById('road');
    let change_sub_district = document.getElementById('sub_district');
    let change_district = document.getElementById('district');
    let change_city = document.getElementById('city');
    let change_postal = document.getElementById('Postal_id');


    // ให้ input ได้รับการ focus
    show_data_address.style.display = 'flex';
    inputField.style.display = 'none';
    edit_address_button.style.display = 'flex';
    xc_button.style.display = 'none';
    updateAddress(change_village.value
        ,change_no_village.value
        ,change_road.value
        ,change_sub_district.value
        ,change_district.value
        ,change_city.value
        ,change_postal.value)
    load_data()
    alert('Update information successfully!!!');
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


function load_data(){
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
                const date_format = new Date(date).toLocaleDateString('en-GB');
                // const date_store = new Date(date_format).toISOString().split('T')[0]
                // console.log(date_store);
                const phone = customer.phone_number
                let village = customer.village
                let no_village = customer.no_village
                let road = customer.road
                let sub_district = customer.sub_district
                let district = customer.district
                let city = customer.city
                let postal_id = customer.Postal_id
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
                if (date_format!='null'){
                    show_date.value = date_format;
                }
                if (phone!='null'){
                    show_phone.value = phone;
                }
                if(village=='null'){
                    village=''
                }
                if(no_village=='null'){
                    no_village=''
                }
                if(road=='null'){
                    road=''
                }
                if(sub_district=='null'){
                    sub_district=''
                }
                if(district=='null'){
                    district=''
                }
                if(city=='null'){
                    city=''
                }
                if(postal_id=='null'){
                    postal_id=''
                }
                if(village=='' && no_village==''&& road==''&& sub_district==''&& district==''&& city==''&& postal_id==''){
                    show_address.innerHTML =`<div class="add_address">กรุณากรอกที่อยู่ของท่าน</div>`
                }
                else{
                    show_address.innerHTML =
                `<div>${village}&nbsp;</div>
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
                <div>${date_format}</div>
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
}
document.addEventListener('DOMContentLoaded', function() {
    load_data();
});

// เรียกใช้ฟังก์ชันเมื่อเกิดการกดปุ่มหรือเหตุการณ์ที่ต้องการอัพเดท username


function updateProfile(newUsername, newFname, newLname, newDate, newTol){

    const updatedData = {
      username: newUsername,
      fname: newFname,
      lname: newLname,
      date: newDate,
      tol: newTol
      // สามารถเพิ่มข้อมูลอื่น ๆ ที่ต้องการอัปเดตได้ใน object นี้ตามต้องการ
    };
    // if (updatedData.username =''){
    //     updatedData.username = null
    // }
    // if (updatedData.fname =''){
    //     updatedData.fname = null
    // }
    // if (updatedData.lname =''){
    //     updatedData.lname = null
    // }
    // if (updatedData.date =''){
    //     updatedData.date = null
    // }
    // if (updatedData.tol =''){
    //     updatedData.tol = null
    // }
    fetch('/api/profile/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(result => {
      console.log(result); // แสดงผลลัพธ์ที่ได้จากการอัพเดต
      // ทำสิ่งที่ต้องการเมื่ออัพเดตข้อมูลสำเร็จ
    })
    .catch(error => {
      console.error('Error updating data:', error);
      // จัดการข้อผิดพลาด เช่น แสดงข้อความว่ามีปัญหาในการอัพเดท
    });
}

function updateAddress(newVillage, newNo, newRoad, newSub, newDistrict, newCity, newPostal) {
  const updatedData = {
    village: newVillage,
    no_village: newNo,
    road: newRoad,
    sub_district: newSub,
    district: newDistrict,
    city: newCity,
    postal: newPostal
  };

  fetch('/api/update/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(result => {
      console.log(result); // Handle the result from the server as needed
      // Perform actions after successful update
    })
    .catch(error => {
      console.error('Error updating data:', error);
      // Handle errors during the update process
    });
}

function load_address(){
    let change_village = document.getElementById('village');
    let change_no_village = document.getElementById('no_village');
    let change_road = document.getElementById('road');
    let change_sub_district = document.getElementById('sub_district');
    let change_district = document.getElementById('district');
    let change_city = document.getElementById('city');
    let change_postal = document.getElementById('Postal_id');
    fetch(`/api/profile/`)
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            const customer = data[0];
            const village = customer.village
            const no_village = customer.no_village
            const road = customer.road
            const sub_district = customer.sub_district
            const district = customer.district
            const city = customer.city
            const postal = customer.Postal_id
            change_village.value = village;
            change_no_village.value = no_village;
            change_road.value = road;
            change_sub_district.value = sub_district;
            change_district.value = district;
            change_city.value = city;
            change_postal.value = postal;
        }})
}