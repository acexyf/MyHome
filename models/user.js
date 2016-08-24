import db from './db.js';
db.connect();

function User(user){
	this.userid=user.userid;
	this.username=user.username;
	this.userpwd=user.userpwd;
	this.age=user.age;
	this.phone=user.phone;
	this.sex=user.sex;
	this.email=user.email;
	this.head=user.head;
	this.authority=user.authority;
}

module.exports=User;


