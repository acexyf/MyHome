import article from '../models/article.js';
article.addLike(1,7,function(result){
	console.log(result);
});