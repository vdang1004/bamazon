create database bamazon;

use bamazon;

create table products (item_id integer not null auto_increment, product_name varchar(50) not null,  department_name varchar(50) not null, price integer default 0, stock_quantity integer default 0, primary key (item_id) );

insert into products (product_name, department_name, price, stock_quantity)
values ("macbook pro", "electronics", 1300, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("macbook elite", "electronics", 1400, 9);

insert into products (product_name, department_name, price, stock_quantity)
values ("iPhone X", "electronics", 1000, 30);

insert into products (product_name, department_name, price, stock_quantity)
values ("iPhone 7", "electronics", 800, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("iPhone 7S", "electronics", 900, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("AirPods", "electronics", 200, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("EarPods", "electronics", 20, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("iPad Pro", "electronics", 1300, 10);

select *
from products;