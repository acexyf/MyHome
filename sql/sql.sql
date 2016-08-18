create table blog_user
(
	userid int  primary key,
    username nvarchar(20) unique,
    userpwd nvarchar(20) not null,
	age int,
    phone nvarchar(20),
    sex nvarchar(20),
    email nvarchar(60)
);