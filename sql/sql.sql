create table blog_user
(
	userid int  primary key,
    username nvarchar(20) unique,
    userpwd nvarchar(64) not null,
	age int,
    phone nvarchar(20),
    sex nvarchar(20),
    email nvarchar(60),
    authority int
);


select * from blog_user;

insert into blog_user values(0,'ace','360e2ece07507675dced80ba867d6dcd',22,12345678911,'男','ace@qq.com',10);
insert into blog_user values(0,'xyf','32680ff476e617af7d5017b8fd3a3a16',22,12345678911,'男','xyf@qq.com',10);

create table blog_article
(
	article_id int primary key,
    title nvarchar(64) unique,
    content nvarchar(512) not null,
    create_time long not null,
    likes long not null,
    comments long not null,
    authority int not null
);
