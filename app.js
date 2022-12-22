const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {Client} = require('pg');
const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'athenaeum',
    password: 'password',
    port: 5432
});
db.connect();
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
//GetAllUsers
app.get('/users', async function (req, res) {
    const results = await db.query('SELECT * FROM users');
    console.log(results.rows);
    res.render('users.ejs', {user: results.rows});
});
//GetUserById
app.get('/users/:id', async function (req, res) {
    const results = await db.query('SELECT * FROM users WHERE id = $1', [parseInt(req.params.id)]);
    console.log(results.rows);
    res.render('users.ejs', {user: results.rows});
});
//CreateUser
app.post('/createuser/:username', async function (req, res) {
    const username = req.params.username;
    const results = await db.query('INSERT INTO users (username) VALUES ($1) RETURNING *', [username]);
    console.log(results.rows);
    res.send( {user: results.rows});
});


app.listen(port, function(err){
    if(err) {
        console.log("ERROR");
    } else {
        console.log("Server running on port: " +port);
    }
});

module.exports = app;

