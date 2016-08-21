var article=require('../models/article.js');

var temp={
	article_id:0,
	title:'只要一把椅子，坚持让你变女神',
	content:'当然，如果有人觉得很难学，那就重点做的我说的动作要点，一套动作，你只要抓住了动作要点，那么就是成功的动作，是十分有效的动作',
	create_time:1471786011401,
	likes:6,
 	comments:1,
	authority:0
}
var newArticle=new article(temp);
newArticle.save(function(result){
	console.log(result);
});



// var articles=article.getAll(function(result){
// 	console.log(result);
// });







