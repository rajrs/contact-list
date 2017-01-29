var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('contactlist', ['contatlist']);
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"))
app.get('/contactlist', function(req, res) {
    //console.log('I received a GET request');
    db.contatlist.find(function(err, docs) {
        //console.log(docs);
        res.json(docs);
    });
});
app.post('/contactlist', function(req, res) {
    // console.log("get req from");
    //// console.log(req.body);
    db.contatlist.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});
app.delete('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    db.contatlist.remove({ _id: mongojs.ObjectId(id) }, function(err, doc) {
        res.json(doc);
    });
});
app.get('/contactlist/:id', function(req, res) {

    var id = req.params.id;
    //console.log(" get one record" + id);
    db.contatlist.findOne({ _id: mongojs.ObjectId(id) }, function(err, doc) {
        res.json(doc);
    });
});
app.put('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    // console.log(req.body);
    db.contatlist.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: { name: req.body.name, email: req.body.email, number: req.body.number } },
        new: true
    }, function(err, doc) {
        res.json(doc);
    });
});
app.listen(3000);
console.log("server running on port 3000 ");
