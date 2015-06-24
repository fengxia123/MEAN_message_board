module.exports = function(app){
	var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({extended: true}));
	
	var Models = require('../models/main')();

	var validationErrors;

	app.get('/', function(req, res){
		Models.post.find({})
		.populate('comments')
		.exec(function(err, posts){
			if(err){
				res.render('index', {err: err, validationErrors: validationErrors});
			} else {
				console.log(validationErrors);
				res.render('index', {posts: posts, validationErrors: validationErrors});
			}
		});
		
	});

	app.post('/post',function(req, res){
		var post = Models.post(req.body);
		post.save(function(err){
			if(err){
				validationErrors = err;
				res.redirect('/');
			} else {
				res.redirect('/');
			}
		});
	});

	app.post('/post/comment', function(req, res){
		Models.post.findOne({_id: req.body.id}, function(err, post){
			var comment = Models.comment(req.body);
	        comment._post = post._id;
	        post.comments.push(comment);
	        // now save both to the DB
	        comment.save(function(err){
	            post.save(function(err){
			      	if(err) {
			           	console.log('Error');
			           	validationErros = err;
			           	res.redirect('/');
			      	} else {
			          	res.redirect('/');
			      	}
	            });
	        });
	    });
	});
};