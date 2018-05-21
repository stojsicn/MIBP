const mongoose = require('mongoose');

const prof = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    school : {
        type: String,
        required: true
    },
    grades : {
        type: [Number]
    },
    grade : {
        type: Number,
        min: 1.0,
		max: 5.0,
    },
    commentsID: {
        type: [Number]
    }
},{collection:'Professors'});

prof.plugin(require('mongoose-timestamp'));
prof.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('Professor', prof);