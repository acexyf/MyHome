var db=require('../models/db.js');
db.connect();
var sql='select * from blog_user';

db.query(sql,function(err,result){
	if(err)
		return;
	console.log(result[0].username);
	db.end();
});