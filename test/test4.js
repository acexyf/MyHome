var user=require('../models/user.js');
user.findUserByName('ace',function(result){
	console.log(result);
})