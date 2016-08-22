var path=require('path');
var article=require('../models/article.js');

module.exports=function(app){
	app.get('/',function(req,res){
		var date=new Date();
		var bgIndex=date.getHours()%9+1;
		article.getAll(function(result){
			res.render('index',{
				title:'谢小飞的博客',
				articles:result,
				bgIndex:bgIndex
			});
		});
	});

	app.get('/article',function(req,res){
		var id=req.param('id');
		article.findById(id,function(result){
			res.render('article',{
				title:'article',
				article:result[0],
			});
		});
	})
}
