//Stock Market Portfolio App by Sameer Saxena

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;


//use body parser middleware

app.use(bodyParser.urlencoded({extended: false}));


//api key pk_1dff9cd36fb741debdbced5704040994
// create call api function

function call_api(finishedAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_1dff9cd36fb741debdbced5704040994', {json: true}, (err, res, body) =>{
    if (err) {return console.log(err);}
    if (res.statusCode===200){
        //console.log(body);
        finishedAPI(body);
    };
});
};


//Set Handlebars middleware  

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff";

// Set handlebar index GET route
app.get('/', function (req, res) {
    call_api(function(doneAPI){
        res.render('home',{
        stock: doneAPI
        });
    }, "fb");
    
});


// Set handlebar index POST route
app.post('/', function (req, res) {
    call_api(function(doneAPI){
        //posted_stuff = req.body.stock_ticker;
        res.render('home',{
        stock: doneAPI,
        });
    }, req.body.stock_ticker);
    
});
//create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('server listening on port'+ PORT));