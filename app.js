const express = require('express');
var bodyParser = require('body-parser');
const app = express();

const port = 3000;

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', './views');

app.get('/', function(req, res) {
    res.sendFile('./views/index.ejs')
})

app.get('/users', function(req, res) {
    res.render('users.ejs', {user: "frank murphy"});
})

app.listen(port, function(err){
    if(err) {
        console.log("ERROR");
    } else {
        console.log("Server running on port: " +port);
    }
});

module.exports = app;

