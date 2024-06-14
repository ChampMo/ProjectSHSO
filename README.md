# ProjectSHSO

project
└── HTML
│   └── cart.html
│   └── main.html
│   └── product.html
│   └── profile.html
│   └── status_order.html
└── public
│   ├── css
│   │   └── cart_style.css
│   │   └── main_style.css
│   │   └── product_style.css
│   │   └── profile_style.css
│   │   └── status_order_style.css
│   ├── js
│   │   └── cart_script.js
│   │   └── main_script.js
│   │   └── product_script.js
│   │   └── profile_script.js
│   │   └── status_order_script.js
│   └── images
└── routes
│    └── index.js
└── app.js
└── Second_Hand_Shopping_Online_Data.sql
└── Second_Hand_Shopping_Online.sql
└── README.md

วิธีการ run
1.เปิด code ใน vs code

2.เข้าไปเปลี่ยน Your_User_SQL, Your_Password_SQL, Your_Mongodb_Connection ในไฟล์ passdb.js

3.run ไฟล์ Database[Second_Hand_Shopping_Online_Data.sql, Second_Hand_Shopping_Online.sql] ใน MySQL Workbench

4.npm init

5.npm install

6.node --watch app.js

7.ใส่ข้อมูล NoSQL ใน mongodb ด้วยการ เข้าไปที่ไฟล์ app.js และ uncomment บรรทัดที่ 85-86 เมื่อรันเสร็จให้ comment กลับเหมือนเดิม

8.เข้าถึง localhost:3000 ในเว็บ browser

9.เริ่มต้นใช้งานเว็บ
