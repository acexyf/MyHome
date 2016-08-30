import db from './db.js';

function Article(article) {
	this.article_id = article.article_id || 0;
	this.title = article.title;
	this.content = article.content;
	this.create_time = article.create_time;
	this.likes = article.likes || 0;
	this.comments = article.comments || 0;
	this.tags = article.tags;
	this.category = article.category;
	this.writer = article.writer;
	this.ismarkdown = article.ismarkdown || 0;
	this.authority = article.authority || 0;
	this.href = article.href || '';
}

module.exports = Article;

/**
 * 保存文章
 * @return {[type]}
 */
Article.prototype.save = function(callback) {
	let state = 'insert into blog_article values(?,?,?,?,?,?,?,?,?,?,?,?)',
		param = [this.article_id, this.title, this.content, this.create_time, this.likes, this.comments, this.tags, this.category, this.writer, this.ismarkdown, this.authority, this.href];
	db.getConnection(function(err,con){
		con.query(state, param, function(err, result) {
			con.release();
			if (err)
				callback(err);
			else
				callback(result);
		});
	});
}

/**
 * 获取所有的文章
 * @return {[type]}
 */
Article.getAll = function(callback) {
	let state = 'select * from blog_article';
	db.getConnection(function(err,con){
		con.query(state, function(err, result) {
			con.release();
			if (err)
				return callback(err);
			if (result) {
				//去除html元素
				for(let elem of result){
					if(elem.ismarkdown==0){
						let temp=elem.content;
						temp = temp.replace(/<[^>]*?>(.*?)/gi,'$1'); //删除左部
						temp = temp.replace(/(.*?)<\/[^>]*?>/gi,'$1');  //删除右部
						elem.content=temp;
					}
					else{

					}
				}
				callback(result);
			} else {
				callback([]);
			}
		});
	});
}

/**
 * 根据文章id找到文章
 * @param  {int}   id       文章id
 * @param  {Function} callback 回调函数
 * @return {[type]}            [description]
 */
Article.findById = function(id, callback) {
	let state = 'select * from blog_article where article_id =' + id;
	db.getConnection(function(err,con){
		con.query(state, function(err, result) {
			con.release();
			if (err)
				return callback(err);
			if (result) {
				callback(result);
			} else {
				callback(null);
			}
		});
	})
}

/**
 * 文章的喜欢增加1
 * @param {string}   id       文章id
 * @param {string}   number   喜欢数量
 * @param {Function} callback [description]
 */
Article.addLike = function(id, number, callback) {
	let state = 'update blog_article set likes=? where article_id=?',
		numbers = parseInt(number) + 1;
	db.getConnection(function(err,con){
		con.query(state, [numbers, id], function(err, result) {
			con.release();
			if (err)
				callback(err);
			callback(result);
		});
	})
}