var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var profesori = require('./model/profesoriSchema');

const port = 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Profesori');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var profesoriRouter = express.Router();

profesoriRouter
    .get('/:id', function(req, res, next){
        profesori.findOne({
            "_id" : req.params.id
        }).exec(function(err, entry){
            if(err) next (err);
            res.json(entry);
        });
    })
    .get('/', function(req, res){
        profesori.find({}, function(err, data, next) {
            res.json(data);
        });
    })
    .post('/', function(req, res, next) {
        profesori.create(req.body, function(err, entry) {
            if(err) next (err);
            res.json(entry);
        });
    })
    .put('/:id', function(req, res, next) {
        profesori.findByIdAndUpdate({
            "_id:" : req.params.id
        }, new profesori(req.body), function(err, profesori){
            if(err) next (err);
            res.json(profesori);
        });
    })
    .delete('/:id', function(req, res, next){
        profesori.findOneAndRemove({
            "_id": req.params.id
        }, function(err, movie, successIndicator) {
            if(err) next(err);
            res.json(successIndicator);
        });
    });

    app.use('/api/profesori', profesoriRouter);

    app.use(function(err, req, res, next){
        var message = err.message;
        var error = err.error || err;
        var status = err.status || 500;

        res.status(status).json({
            message : message,
            error : error
        });
    });

    app.listen(port);

    console.log('Server running on port: ' + port);