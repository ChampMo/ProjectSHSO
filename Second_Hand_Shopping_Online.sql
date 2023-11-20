create schema Second_Hand_Shopping_Online;
use Second_Hand_Shopping_Online;
-- drop schema Second_Hand_Shopping_Online;

-- 1
create table Customer (
	customer_id numeric(10) primary key not null,
    username varchar(50),
    first_name varchar(50),
    last_name varchar(50),
    email varchar(50) UNIQUE not null,
    date_birth date,
    password varchar(255) not null,
    phone_number varchar(10)
);

-- 2
create table Seller (
	seller_id numeric(10) primary key not null,
	cart_id numeric(13) not null,
	bank varchar(20) not null,
	bank_number numeric(20) not null,
	picture varchar(255) not null,
    customer_id numeric(10),
    shop_name varchar(50),
    description varchar(255),
	foreign key (customer_id) references Customer(customer_id)
    -- เพิ่ม สถานะของการตรวจสอบบัญชี verifile, nonverifile
);

-- 3
create table Product (
	product_id numeric(10) not null primary key ,
    name varchar(20),
    detail varchar(255),
    picture varchar(255),
    price numeric(10),
    quantity numeric(10),
    seller_id numeric(10) not null,
	foreign key (seller_id) references Seller(seller_id)
);

-- 4
create table Type_of_product (
	type_id numeric(10) primary key not null,
    name varchar(50),
    product_id numeric(10),
    foreign key (product_id) references Product(product_id)
);

-- 5
create table Order_Product(
	order_id numeric(10),
    product_id numeric(10),
    primary key (order_id,product_id),
    foreign key (product_id) references Product(product_id)
);

-- 6
create table Order_list(
	order_id numeric(10) primary key not null,
	date datetime,
	amount numeric(10),
    customer_id numeric not null,
    foreign key (order_id) references Order_Product(order_id),
    foreign key (customer_id) references Customer(customer_id)
);

-- 7
create table Address (
	address_id numeric(10) not null primary key,
	village varchar(50),
    no_village varchar(50),
    road varchar(50),
    sub_district varchar(50),
    district varchar(50),
    city varchar(50),
    Postal_id numeric(10),
    customer_id numeric(10),
    foreign key (customer_id) references Customer(customer_id)
);

-- 8
create table Cart(
	cart_id numeric(10) primary key not null,
	customer_id numeric(10),
	foreign key (customer_id) references Customer(customer_id)
);

-- 9
create table Cart_Product(
	cart_id numeric(10),
    product_id numeric(10),
    primary key (cart_id,product_id),
    foreign key (cart_id) references Cart(cart_id),
    foreign key (product_id) references Product(product_id)
);

