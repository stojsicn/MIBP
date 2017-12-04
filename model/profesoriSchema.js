var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profesoriSchema = new Schema({
	ime : {
		type : String,
		required : true
	},
	grad : {
		type : String,
		required : true
	},
	institucije : [String],
	komentari : [
	{
		komentar : [
			{
				ocena : {
					type : Number,
					required : true,
					pattern : '[1-5]{1}'
				},
				pisac : {
					type : String,
					required : true
				},
				tekst : {
					type : String,
					required : true
				},
				likes : {
					type : Number,
					required : true,
					min : 0
				},
				dislikes : {
					type : Number,
					required : true,
					min : 0
				}
			}
		]
		

	}
	]
}, {collection: 'profesori' });

var profesori = mongoose.model('profesori', profesoriSchema);

module.exports = profesori;
		