// server.js
global.__base = __dirname + '/';
// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();

var port = process.env.PORT || 3000; //8080
var flash = require('connect-flash');
var path = require('path');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(express.static('public')); // to add CSS

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
// app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'sdfsdf289r2H(*)&$H#*(24trfwef(*H))&+RF',
    saveUninitialized: true,
    resave: false
}));

// Ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(flash()); // use connect-flash for flash messages stored in session

var ID_counter = 4;
var tasks = [
    { ID: 4, text: 'Licht uit doen' },
    { ID: 3, text: 'Hond lopen' },
    { ID: 2, text: 'Schoenen kopen' },
    { ID: 1, text: 'Eten kopen' }
];

app.get('/', function(req, res) {
    res.render('index', {
        tasks: tasks,
        message: req.flash('message'),
        errmessage: req.flash('errmessage')
    })
})

app.post('/add', function(req, res) {
    if (req.body.text.length < 1) {
        req.flash('errmessage', 'Task text can\'t be empty!')
    } else {
        req.flash('message', 'Task added!')
        console.log(req.body)
        ID_counter++;
        tasks.unshift({
            ID: ID_counter,
            text: req.body.text
        })
    }
    res.redirect('/')
})

app.get('/up/:order', function(req, res) {
    if (Number(req.params.order) < 1) {
        req.flash('errmessage', 'This task can\'t go up anymore..')
    } else {
        var y = Number(req.params.order)
        var x = y - 1
        var b = tasks[y];
        tasks[y] = tasks[x];
        tasks[x] = b;
    }
    res.redirect('/')
})

app.get('/down/:order', function(req, res) {
    if (Number(req.params.order) >= tasks.length - 1) {
        req.flash('errmessage', 'This task can\'t go down anymore..')
    } else {
        var y = Number(req.params.order)
        var x = y + 1
        var b = tasks[y];
        tasks[y] = tasks[x];
        tasks[x] = b;
    }
    res.redirect('/')
})

app.post('/reorder', function(req, res) {

    console.log(req.body)

    var reagangedTasks = []


    req.body.changedOrder.forEach(function(id, i) {

        function findById(task) {
            return task.ID == id;
        }


        reagangedTasks.push(tasks.find(findById))
    })

    tasks = reagangedTasks

    console.log(tasks)

    // console.log(tasks.find(findById))

    res.send(JSON.stringify({ status: 'ok' }))
})

// launch ======================================================================
app.listen(port);
console.log('Performance Matters started on port: ' + port);
