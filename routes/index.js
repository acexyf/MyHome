var path=require('path');
var article=require('../models/article.js');

module.exports=function(app){
	app.get('/',function(req,res){
		article.getAll(function(result){
			res.render('index',{
				title:'谢小飞的博客',
				articles:result
			});
		});
	});
}
