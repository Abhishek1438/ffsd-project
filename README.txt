FFSD project

How to run the project

!!IMPORTANT!! Internet connection is mandatory.

1.create database named ffsd in your mysql server.
2.create table users using following syntax
create tablel users(id int not null auto_increment, name varchar(40), email varchar(40), pass varchar(250), primary key(id))

3.edit .env file present in src directory and replace the DATABASE_PASS with the your mysql server password and also change other variables if different for you.

4.open terminal and go to src directory. (using cd src command);
5.run command node App.js
6.Open browser and go to http://localhost:3000/.
