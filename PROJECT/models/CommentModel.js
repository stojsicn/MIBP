const mongoose = require('mongoose');

const comm = new mongoose.Schema({
    id : {
        type: Number,
        unique: true
    },
    username : {
        type: String,
        required: true
    },
    likes : {
        type: Number,
        min: 0.0
    },
    dislikes: {
        type: Number,
        min: 0.0
    },
    comment: {
        type: String,
        required: true
    }
},{collection:'Comments'});

comm.plugin(require('mongoose-timestamp'));
comm.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('Comment', comm);