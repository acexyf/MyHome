var article=require('../models/article.js');

var arr=[{
	article_id:0,
	title:'只要一把椅子，坚持让你变女神',
	content:'当然，如果有人觉得很难学，那就重点做的我说的动作要点，一套动作，你只要抓住了动作要点，那么就是成功的动作，是十分有效的动作',
	create_time:1471786011401,
	likes:6,
 	comments:1,
 	tags:'',
 	category:'随笔',
 	writer:1,
 	ismarkdown:0,
	authority:0,
	href:''
},{
	article_id:0,
	title:'不知道简书，你就OUT了!',
	content:'我第一次在网页里输入‘简书’ 点击进去就看到这样的页面，这是简书给我的第一印象，感觉和微博差不多，但深入了解后就发现大大不同了，可以说包罗万象，超乎我的想象。',
	create_time:1471716815401,
	likes:3,
 	comments:3,
 	tags:'',
 	category:'随笔',
 	writer:1,
 	ismarkdown:0,
	authority:0,
	href:''
},{
	article_id:0,
	title:'别人不回复你，是因为你不会聊天',
	content:'良性的聊天应当是两个彼此感到舒服的人的交谈。聊天首先应该讲求的就是舒服，就像两个人的相处一样，自在不累才是能够继续聊天的法则。其次是对味，也就是聊天的话题是否迎合双方的趣味。',
	create_time:1475716765431,
	likes:7,
 	comments:9,
 	tags:'',
 	category:'随笔',
 	writer:1,
 	ismarkdown:0,
	authority:0,
	href:''
}];


for(var i=0;i<arr.length;i++){
	var newArticle=new article(arr[i]);
	newArticle.save(function(result){
		console.log(result);
	});
}









