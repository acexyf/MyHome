create table blog_user
(
	userid int primary key auto_increment,
    username nvarchar(32) not null unique,
    userpwd nvarchar(64) not null,
	age int,
    phone nvarchar(32),
    sex nvarchar(8),
    email nvarchar(64),
    head nvarchar(64),
    authority int not null
);


select * from blog_user where username='ace';

insert into blog_user values(0,'ace','360e2ece07507675dced80ba867d6dcd',22,12345678911,'男','ace@qq.com','',10);
insert into blog_user values(0,'xyf','32680ff476e617af7d5017b8fd3a3a16',22,12345678911,'男','xyf@qq.com','',10);


create table blog_article
(
	article_id int primary key auto_increment,
    title nvarchar(64) not null unique,
    content nvarchar(1024) not null,
    create_time long not null,
    likes long not null,
    comments long not null,
    tags nvarchar(64),
    writer int not null,
    ismarkdown int not null,
    authority int not null,
    constraint fk_writer foreign key (writer) references blog_user(userid)
);



update blog_article set likes=7 where article_id=1;


