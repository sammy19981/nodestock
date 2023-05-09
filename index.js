//Stock Market Portfolio App by Sameer Saxena

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

//Set Handlebars middleware  

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff";

// Set handlebar routes
app.get('/', function (req, res) {
    res.render('home',{
        stuff: otherstuff
    });
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('server listening on port'+ PORT));