import path from 'path';
import crypto from 'crypto';
import urls from './urls.js';
var markdown = require("markdown").markdown;
import captchapng from 'captchapng';
import multerUtil from '../models/multerUtil.js';
let upload=multerUtil.array('image',5);
//console.log( markdown.toHTML( "Hello *World*!" ) );

import Article from '../models/article.js';
import User from '../models/user.js';

module.exports = function(app) {
	//主页
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

	//文章详细
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

	//喜欢+1
	app.post(urls.addLike, function(req, res) {
		let id = req.body.id || -1,
			count = req.body.count || -1;
		Article.addLike(id, count, function(result) {
			if (result.affectedRows && result.affectedRows == 1) {
				res.json({'status': true});
			} else {
				res.json({'status': false});
			}
		});
	});

	//登录
	app.get(urls.login,function(req, res){
		res.render('login',{
			title: 'login',
			user:req.session.user
		});
	});

	/**
	 * 登录
	 * @param  {[type]} req         [description]
	 * @param  {[type]} res){		let session_verifycode [description]
	 * @return {int}     0:数据不完整 
	 *         			 1:验证码不对 
	 *         			 2:该用户不存在
	 *         			 3:密码不对
	 *         			 4:登录成功
	 */
	app.post(urls.login,function(req, res){
		let session_verifycode=req.session.verifycode,
			username=req.body.username,
			password=req.body.password,
			verifycode=req.body.verifycode;
		if(session_verifycode&&username&&password&&verifycode){
			if(session_verifycode==verifycode){
				User.findUserByName(username,function(result){
					if(result){
						let md5 = crypto.createHash('md5'),
							temp_password=md5.update(req.body.password).digest('hex');
						if(result.userpwd==temp_password){
							req.session.user=result;
							res.json({'status': true,flag:4,text:'登录成功'});
						}
						else{
							res.json({'status': false,flag:3,text:'密码不对'});
						}
					}
					else{
						res.json({'status': false,flag:2,text:'该用户不存在'});
					}
				});
			}
			else{
				res.json({'status': false,flag:1,text:'验证码不对'});
			}
		}
		else{
			res.json({'status': false,flag:0,text:'数据不完整'});
		}
	});

	app.get(urls.logout,function(req,res){
		req.session.user=null;
		res.redirect('back');
	});

	app.get(urls.verifyCode,function(req,res){
		let verifycode=Math.floor(Math.random()*9000+1000);
		let code=parseInt(verifycode);
        let p = new captchapng(80,50,code); // width,height,numeric captcha
		p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(0, 0, 0, 200); // Second color: paint (red, green, blue, alpha)
        let img = p.getBase64();
        let imgbase64 = new Buffer(img,'base64');
        req.session.verifycode=verifycode;
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
	});

	//图片上传
	app.post('/upload',checkLogin);
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