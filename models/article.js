import db from './db.js';
db.connect();

function Article(article){
	this.article_id=article.article_id || 0;
	this.title=article.title;
	this.content=article.content;
	this.create_time=article.create_time;
	this.likes=article.likes || 0;
	this.comments=article.comments || 0;
	this.tags=article.tags;
	this.writer=article.writer;
	this.authority=article.authority || 0;
}

module.exports=Article;

/**
 * 保存文章
 * @return {[type]}
 */
Article.prototype.save=function(callback){
	let state='insert into blog_article values(?,?,?,?,?,?,?,?,?)',
		param=[this.article_id,this.title,this.content,this.create_time,this.likes,this.comments,this.tags,this.writer,this.authority];
	db.query(state,param,function(err,result){
		//db.end();
		if(err)
			callback(err);
		else
			callback(result);
	});
}

/**
 * 获取所有的文章
 * @return {[type]}
 */
Article.getAll=function(callback){
	let state='select * from blog_article';
	db.query(state,function(err,result){
		//db.end();
		if(err)
			return callback(err);

		if(result){
			callback(result);
		}
		else{
			callback([]);
		}
	});
}


Article.findById=function(id,callback){
	let state='select * from blog_article where article_id ='+id;
	db.query(state,function(err,result){
		if(err)
			return callback(err);

		if(result){
			callback(result);
		}
		else{
			callback(null);
		}
	});
}





