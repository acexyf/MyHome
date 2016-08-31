import path from 'path';
import urls from './urls.js';
var markdown = require("markdown").markdown;
import captchapng from 'captchapng';
import multerUtil from '../models/multerUtil.js';
let upload=multerUtil.array('image',5);
//console.log( markdown.toHTML( "Hello *World*!" ) );

import Article from '../models/article.js';
import User from '../models/user.js';

module.exports = function(app) {
	app.get(urls.home, function(req, res) {
		let date = new Date(),
			bgIndex = date.getHours() % 9 + 1;
		Article.getArticleFrom(0,40,function(result) {
			res.render('index', {
				title: '谢小飞的博客',
				articles: result,
				bgIndex: bgIndex,
				user:req.session.user
			});
		});
	});

	app.get(urls.article+'/:id', function(req, res) {
		let id = req.param('id'),
			date = new Date(),
			bgIndex = date.getHours() % 9 + 1;
		Article.findById(id, function(result) {
			if(result){
				res.render('article', {
					title: 'article',
					article: result,
					bgIndex: bgIndex,
					user:req.session.user
				});
			}
			else{
				res.render('404');
			}
		});
	});

	app.post(urls.addLike, function(req, res) {
		let id = req.body.id || -1,
			count = req.body.count || -1;
		Article.addLike(id, count, function(result) {
			if (result.affectedRows && result.affectedRows == 1) {
				res.json({
					"status": true
				});
			} else {
				res.json({
					"status": false
				});
			}
		});
	});


	app.get(urls.login,function(req, res){
		res.render('login',{
			title: 'login',
			user:req.session.user
		});
	});

	app.post(urls.login,function(req, res){
		
	});

	app.get(urls.verifyCode,function(req,res){
		var code=parseInt(Math.random()*9000+1000);
        //console.log(code);
        var p = new captchapng(80,50,code); // width,height,numeric captcha
		p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(0, 0, 0, 200); // Second color: paint (red, green, blue, alpha)
        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
	});

	//图片上传
	app.post('/upload',function(req,res){
		upload(req, res, function (err) {
		    if (err) {
		        
		    }
		    else{
			    
		    }
		});
	});


	app.get('/love', function(req, res) {
		res.render('love', {
			title: 'love',
			user:req.session.user
		});
	});


	app.use(function(req, res) {
		res.render("404");
	});

	function checkLogin(req, res, next) {
		if (!req.session.user) {
			return res.redirect('/login');
		}
		next();
	}

	function checkNotLogin(req, res, next) {
		if (req.session.user) {
			return res.redirect('back');
		}
		next();
	}
}