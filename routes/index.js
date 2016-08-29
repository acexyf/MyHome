import path from 'path';
import urls from '../models/urls.js';
var markdown = require("markdown").markdown;
//console.log( markdown.toHTML( "Hello *World*!" ) );

import Article from '../models/article.js';
import User from '../models/user.js';

module.exports = function(app) {
	app.get(urls.home, function(req, res) {
		let date = new Date(),
			bgIndex = date.getHours() % 9 + 1;
		Article.getAll(function(result) {
			res.render('index', {
				title: '谢小飞的博客',
				articles: result,
				bgIndex: bgIndex
			});
		});
	});

	app.get(urls.article, function(req, res) {
		let id = req.param('id'),
			date = new Date(),
			bgIndex = date.getHours() % 9 + 1;
		Article.findById(id, function(result) {
			res.render('article', {
				title: 'article',
				article: result[0],
				bgIndex: bgIndex
			});
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

	app.get('/love', function(req, res) {
		res.render('love', {
			title: 'love',
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