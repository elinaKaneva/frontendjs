"use strict"

// load the express module
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// declare our app
var app = express();

// configuration and middleware
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

// this will serve as our resource on the server
// var json = {"students": [
//     { "id": "M24862", "name": "Elina Kaneva", "email": "eli@gmail.com", "classes": ["JS", "XML"] }
//     { "id": "86440", "name": "George Zhuhov", "email": "jore@gmail.com", "classes": ["FP", "OOP"] },
//     { "id": "12345", "name": "Haralampi", "email": "hara@lampi.com", "classes": ["101", "Java"] }
// ]};

var students = {
   "1": { "id": "M24862", "name": "Elina Kaneva", "email": "eli@gmail.com", "classes": ["JS", "XML"] },
   "2": { "id": "80644", "name": "George Zhuhov", "email": "jore@gmail.com", "classes": ["FP", "OOP"] },
   "3": { "id": "12345", "name": "Haralampi", "email": "hara@lampi.com", "classes": ["101", "Java"] }
};

// will return all the students in json format
// type /students in the browser
app.get('/students', function(req, res){

        var id = req.query.id;
        if(id === undefined){
            res.jsonp(students);
        }
        else{
            res.jsonp(students[id]);
        }
});

// will return only the info for this student
app.get('/students/:id', function(req, res){
    var id = req.params.id;
    res.jsonp(students[id]);
});

// post new user to the collection
app.post('/students', function(req, res){
    // req.body contains the incoming fields and values
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var classes = req.body.classes.split(",");

    students[id] = {
        name: name,
        email: email,
        classes: classes
    };

    res.jsonp({
        msg: 'user created',
        data: students[id]
    });
});

// put an updated version of a user by id
app.put('/students/:id', function(req, res){
    // get the id from the params
    var id = req.params.id;
    // update the info from the body if passed or use the existing one
    students[id].name = req.body.name || students[id].name;
    students[id].email = req.body.email || students[id].email;
    students[id].classes = req.body.classes || students[id].classes;

    res.jsonp({
        msg: 'user data updated',
        data: students[id]
    });
});

// delete an existing user by id
app.delete('/students/:id', function(req, res) {
    var id = req.params.id;

    if(students[id]) {
        delete(students[id]);
        res.jsonp('user ' + id + ' successfully deleted!');
    } else {
        res.jsonp('user ' + id + ' does not exist!');
    }
});

// launch the server
var server = app.listen(1337, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

})
