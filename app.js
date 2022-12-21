const express = require('express');
var bodyParser = require('body-parser');
const {queryResult} = require("pg-promise");
const {json} = require("express");
const app = express();
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:password@localhost:5432/athenaeum')
const port = 3000;

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', './views');

app.get('/', function(req, res) {
    res.render('index.ejs')
})

app.get('/users', function(req, res) {
    var users;
    db.result('SELECT * FROM users').then((result) => {
        users = result.rows;
        console.log(users);
        res.get('user');

        res.render('users.ejs', {user: res.send(users)});


    }).catch(err => {
        console.error(err);
    }).finally(() => {
        res.end();
    })

});

app.listen(port, function(err){
    if(err) {
        console.log("ERROR");
    } else {
        console.log("Server running on port: " +port);
    }
});

module.exports = app;

