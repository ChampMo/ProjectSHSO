use Second_Hand_Shopping_Online;

insert into Customer values (01,'champ','monthol','sukjinda','champ@gmail.com','2003-08-08','champ01','0810120500')
											,(02,'peet','nawapon','sanchaisakulkij','peet@gmail.com','2003-06-23','peet01','0917451614');
select * from Cart_Product;
insert into Seller values (01,01,'SCB','1234567890','myself',01,'champchamp','happy');

insert into Product values (01,'mouse','wireless','cool',500,1,01),(02,'shirt','long','hot',1000,5,01);

insert into Type_of_product values (01,'electronic',01),(02,'clothes',02);

insert into Order_Product values (01,02);

insert into Order_list values (01,'2023-11-14 04:34:33',2000,01);

insert into Address values (01,'123/123','5','-','บางมด','ทุ่งครุ','Bangkok',10140,01)
											,(02,'555/555','1','-','บางปะกอก','ราษฎร์บูรณะ','Bangkok',10140,02);

insert into Cart values (01,01),(02,02);

insert into Cart_Product values (02,01);

