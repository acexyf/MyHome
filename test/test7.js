import article from '../models/article.js';

var times=50;
for(let i=0;i<times;i++){
	(function(i){
		setTimeout(function(){
			let temp_article={
				article_id:0,
				title:'这里是标题'+i,
				content:'这里是内容'+i,
				create_time:1471786011401,
				likes:getRandom(),
			 	comments:getRandom(),
			 	tags:'',
			 	category:'随笔',
			 	writer:1,
			 	ismarkdown:0,
				authority:0,
				href:''
			};
			let newArticle=new article(temp_article);
			newArticle.save(function(result){
				console.log(result.affectedRows);
			});
		},10*i);
	})(i)

}





function getRandom(){
	return Math.ceil(Math.random()*10);
}
