use Second_Hand_Shopping_Online;

insert into Customer values (01,'champ','monthol','sukjinda','champ@gmail.com','2003-08-08','champ01','0810120500','../uploads/product_picture/Shiboy.JPG')
											,(02,'peet','nawapon','sanchaisakulkij','peet@gmail.com','2003-06-23','$2b$12$RWrAF7yojyuwDVyRO7ZuIeajmD1mys90uMiL2.stxUY9LYHKFaIn6','0917451614','../uploads/product_picture/Shiboy.JPG');

insert into Seller values (01,01,'SCB','1234567890','myself',01,'champchamp','happy','home','verifile')
									  ,(02,01,'ABC','1234567890','myself',02,'nawapon','happy','home','verifile');

insert into Product values (01,'mouse','wireless',500,10,01),(02,'shirt','long' ,1000,5,01),(03,'hat','long' ,1500,10,02);
insert into Product values (05,'shose','wireless',500,10,02);

insert into Picture_product values (01,01,'../uploads/product_picture/Shirocmt.jpg','../uploads/product_picture/ShiandShi.JPG','../uploads/product_picture/linedang2.jpg','../uploads/product_picture/Shiboy.JPG'),
														(02,02,'../uploads/product_picture/Shirocmt.jpg','../uploads/product_picture/ShiandShi.JPG','../uploads/product_picture/linedang2.jpg','../uploads/product_picture/Shiboy.JPG'),
														(03,03,'../uploads/product_picture/Shirocmt.jpg','../uploads/product_picture/ShiandShi.JPG','../uploads/product_picture/linedang2.jpg','../uploads/product_picture/Shiboy.JPG');
insert into Picture_product values 
(05,05,'../uploads/product_picture/Shirocmt.jpg','../uploads/product_picture/ShiandShi.JPG','../uploads/product_picture/linedang2.jpg','../uploads/product_picture/Shiboy.JPG');									
insert into Type_of_product values (01,'electronic',01),(02,'clothes',02);

insert into Order_Product values (01,02);

insert into Order_list values (01,'2023-11-14 04:34:33',2000,01,'slip');

insert into Address values (01,'123/123','5','-','บางมด','ทุ่งครุ','Bangkok',10140,01)
											,(02,'555/555','1','-','บางปะกอก','ราษฎร์บูรณะ','Bangkok',10140,02);

insert into Cart values (01,01),(02,02);
#insert into Cart values (03,03);

insert into Cart_Product values (02,01,01) , (02,02,05) , (02,03,10);
#insert into Cart_Product values (03,01,01),(03,02,05),(03,03,10);
