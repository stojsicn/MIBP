const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var mongodb = require('mongodb');

const Profesor = require("../models/professorModel");
const Comment = require("../models/CommentModel");

// On our router variable, we'll be able to include various methods. For our app we'll only make use of GET requests, so the method router.get will handle that interaction. This method takes a string as its first parameter and that is the URL path, so for the first route, we are just giving it '/', which means the default route.
router.get('/', (req, res) => {
    res.render("homepage");
});

var Users = [];

router.get('/professorList', (req, res) => { //moze background i transparency

    var url = 'mongodb://localhost:27017/ProfessorsDB';

    mongoose.connect(url, (err) => {
        if (err) {
            console.log('Unable to connect to the Server:', err);
        } 
        else {
            console.log('Connected to Server');
        }

        Profesor.find({}, (err, result) => {
            if(err)
            {
                res.send(err);
            }
            else if(result.length)
            {
                res.render("professorList", {"ProfessorList" : result});
            }
            else
            {
                res.send("No docs found!");
            }
        });
    });
});

router.get('/addProfessor', (req, res) => { //majstorski odradjeno
    res.render("addProfessor", {title : "Dodavanje profesora"});
});

router.post("/addProfessor", (req, res) => {

    var url = 'mongodb://localhost:27017/ProfessorsDB';

    mongoose.connect(url, (err) => {
        if (err) {
            console.log('Unable to connect to the Server:', err);
        } 
        else {
            console.log('Connected to Server');
        };

        var prof = { name: req.body.name, school: req.body.school };

        Profesor.find({}).lean().exec(function(err, result) {
            if(err)
            {
                throw err;
            }

            var bool = false;

            for(var i = 0; i < result.length; i++)
            {
                if(result[i].name === prof.name)
                {
                    console.log("Profesor sa tim imenom vec postoji!");
                    bool = true;
                }
            }

            if(!bool)
            {
                Profesor.insertMany([prof], (err, result) => {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        res.redirect("/professorList");
                    }
                });
            }
        });
       
    });
});

router.get("/professor/:name", (req, res) => { //valja malo srediti, inace radi

    var url = 'mongodb://localhost:27017/ProfessorsDB';

    mongoose.connect(url, (err) => {
        if (err) {
            console.log('Unable to connect to the Server:', err);
        } 
        else {
            console.log('Connected to Server');
        }

        Profesor.findOne({"name": req.params.name}, (err, result) => {
            if(err)
            {
                console.log(err);
            }
            Comment.find({ id: {$in: result.commentsID} }, (err, docs) => {
                if(err)
                {
                    res.render("error");
                }
                else
                {
                    const GRADES = result.grades;
                    var GRADE = 0;
                    for(let i = 0; i < GRADES.length; i++)
                    {
                        GRADE += GRADES[i];
                    }
                    GRADE /= GRADES.length;

                    Profesor.update({"name": req.params.name}, {$set: {grade: GRADE.toFixed(2)}}, err => {
                        if(err)
                        {
                            res.render("error");
                        }
                    });
                    console.log(result);
                    //console.log(docs);
                    res.render("professor", {"prof": result,  "CommentList" : docs});
                }
            });
        });
    });

});

router.post("/professor/:name", (req, res) => { //RADI

    var url = 'mongodb://localhost:27017/ProfessorsDB';

    mongoose.connect(url, (err) => {
        if (err) {
            console.log('Unable to connect to the Server:', err);
        } 
        else {
            console.log('Connected to Server');
        }

        Profesor.findOne({"name": req.params.name}, (err, result) => {
            if(err)
            {
                console.log(err);
            }

            var ocena = req.body.grade;
            console.log(ocena);

            Profesor.update({"name": req.params.name}, {$push: {grades: ocena}}, err => {
                if(err)
                {
                    res.render("error");
                }
                else
                {
                    res.redirect("/professor/" + req.params.name);
                }
            });
        });
    });

});

router.get("/:name/addComment", (req, res) => {
    var url = 'mongodb://localhost:27017/ProfessorsDB';

    mongoose.connect(url, (err) => {
        if (err) {
            console.log('Unable to connect to the Server:', err);
        } 
        else {
            console.log('Connected to Server');
        }

        Profesor.findOne({"name": req.params.name}, (err, result) => {
            if(err)
            {
                res.render("error");
            }
            else
            {
                res.render("addComment", {"prof": result});
            }
        });
    });
});

router.post("/:name/addComment", (req, res) => { //onclick za like i disike
    var url = 'mongodb://localhost:27017/ProfessorsDB';

    mongoose.connect(url, (err) => {
        if (err) {
            console.log('Unable to connect to the Server:', err);
        } 
        else {
            console.log('Connected to Server');
        };

        Profesor.findOne({"name": req.params.name}, (err, result) => {
            if(err)
            {
                res.render("error");
            }
            else
            {
                Comment.find({}, (err, docs) => {
                    if(err)
                    {
                        res.render("error");
                    }
                    else
                    {
                        var comm = { id: docs.length + 1, username: req.body.username, likes: 0, dislikes: 0, comment: req.body.comment };
                        console.log(comm);
                        Profesor.update({"name": req.params.name}, {$push: {commentsID: comm.id}}, err => {
                            if(err)
                            {
                                res.render("error");
                            }
                        });
                        Comment.insertMany([comm], (err, docs) => {
                            if(err)
                            {
                                console.log(err);
                                res.render("error");
                            }
                            else
                            {
                                res.redirect("/professor/" + req.params.name);
                            }
                        });
                    }
                });    
            }
        });
    });
});

router.get("/like/:id", (req, res) => {
    var url = 'mongodb://localhost:27017/ProfessorsDB';

    mongoose.connect(url, (err) => {
        if (err) {
            console.log('Unable to connect to the Server:', err);
        } 
        else {
            console.log('Connected to Server');
        }

        Comment.findOne({"id": req.params.id}, (err, result) => {
            if(err)
            {
                res.render("error");
            }
            else
            {
                console.log(result);
                Comment.update({ id: result.id }, {$inc: {likes: +1}}, (err, docs) => {
                    if(err)
                    {
                        res.render("error");
                    }
                    else
                    {
                        console.log("uspesno");
                        console.log(result.likes);
                        res.redirect("/professorList");
                    }
                });
            }
        });
    });
});

router.get("/dislike/:id", (req, res) => {
    var url = 'mongodb://localhost:27017/ProfessorsDB';

    mongoose.connect(url, (err) => {
        if (err) {
            console.log('Unable to connect to the Server:', err);
        } 
        else {
            console.log('Connected to Server');
        }

        Comment.findOne({"id": req.params.id}, (err, result) => {
            if(err)
            {
                res.render("error");
            }
            else
            {
                Comment.update({ id: result.id }, {$inc: {dislikes: +1}}, (err, docs) => {
                    if(err)
                    {
                        res.render("error");
                    }
                    else
                    {
                        res.redirect("/professorList");
                    }
                });
            }
        });
    });
});

// Finally, we export this module so that we can import it in our app.js file and gain access to the routes we defined.
module.exports = router;