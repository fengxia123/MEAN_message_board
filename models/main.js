module.exports = function(){
	var mongoose = require('mongoose');
	var moment = require('moment');
	var validate = require('mongoose-validator');

	mongoose.connect('mongodb://localhost/message_board'); 

	// VALIDATION RULES
	var nameValidator = [
	  validate({
	    validator: 'isLength',
	    arguments: [4],
	    message: 'Name should be at least {ARGS[0]} characters'
	  })];

	var Schema = mongoose.Schema;

	var PostSchema = new mongoose.Schema({
	 	name: {type: String, required: true, validate: nameValidator},
	 	message: {type: String, required: true},
	 	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
	 	date:  {type: String, default: moment().format('ddd, MMM Do')},
	 	created_at: {type: Date, default: new Date}
	});

	var CommentSchema = new mongoose.Schema({
	 	_post: {type: Schema.ObjectId, ref: 'Post'},
	 	name: {type: String, required: true, validate: nameValidator},
	 	text: {type: String, required: true},
	 	date:  {type: String, default: moment().format('ddd, MMM Do')},
	 	created_at: {type: Date, default: new Date}
	});

	return {
		post: mongoose.model('Post', PostSchema),
		comment: mongoose.model('Comment', CommentSchema)
		};
};