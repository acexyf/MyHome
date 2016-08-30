import db from './db.js';

function User(user) {
	this.userid = user.userid;
	this.username = user.username;
	this.userpwd = user.userpwd;
	this.age = user.age;
	this.phone = user.phone;
	this.sex = user.sex;
	this.email = user.email;
	this.head = user.head;
	this.authority = user.authority;
}

module.exports = User;

/**
 * 根据用户名找到用户
 * @param  {string}   username 要查询的用户名
 * @param  {Function} callback 回掉函数
 * @return {[type]}            [description]
 */
User.findUserByName = function(username, callback) {
	let state = 'select * from blog_user where username = ?',
		param = username;
	db.getConnection(function(err, con) {
		if (err)
			return callback(err);
		con.query(state, param, function(err, result) {
			con.release();
			if (err)
				callback(err);
			else
				callback(result);
		});
	})
}