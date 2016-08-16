var express=require('express');
var app=express();
var path=require('path');
var port=process.env.PORT||3000;
var routes = require('./routes/index.js');
var favicon = require('serve-favicon');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use('/public',express.static('public'));
routes(app);


var server=app.listen(port,function(){
	console.log('server is listening on port:'+port);
});




