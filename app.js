var express=require('express');
var app=express();
var path=require('path');
var port=process.env.PORT || 3000;
var routes = require('./routes/index.js');
var favicon = require('serve-favicon');
var flash=require('connect-flash');
var session = require('express-session');
var tool=require('./models/tool.js');
tool();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use('/public',express.static('public'));
routes(app);
app.use(session({
	secret: 'myblog',
	key: 'blog', //cookie name
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30
	}, //30 days
}));

var server=app.listen(port,function(){
	console.log('server is listening on port:'+port);
});




