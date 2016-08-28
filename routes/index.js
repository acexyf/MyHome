import path from 'path';
import article from '../models/article.js';
import urls from '../models/urls.js';

module.exports = function(app) {
	app.get(urls.home, function(req, res) {
		let date = new Date(),
			bgIndex = date.getHours() % 9 + 1;
		article.getAll(function(result) {
			res.render('index', {
				title: '谢小飞的博客',
				articles: result,
				bgIndex: bgIndex
			});
		});
	});

	app.get(urls.article, function(req, res) {
		let id = req.param('id'),
			date = new Date(),
			bgIndex = date.getHours() % 9 + 1;
		article.findById(id, function(result) {
			res.render('article', {
				title: 'article',
				article: result[0],
				bgIndex: bgIndex
			});
		});
	});

	app.post(urls.addLike,function(req,res){
		let id=req.body.id || -1,
			count=req.body.count || -1;
		article.addLike(id,count,function(result){
			if(result.affectedRows && result.affectedRows==1){
				res.json({"status":true});
			}
			else{
				res.json({"status":false});
			}
		});
	});
}