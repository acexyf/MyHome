var article=require('../models/article.js');
// var articles=article.getAll(function(result){
// 	console.log(result);
// });

article.findById(2,function(result){
	console.log(result[0]);
});








