const http = require('http'),
    hostname = '127.0.0.1',
    port = 3001;

const express = require('express'),
    session = require('express-session'),
    es6Renderer = require('express-es6-template-engine');

const app = express();

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(session({
    secret: 'dont tell nobody',
    resave: false,
    saveUninitialized: false,
    is_logged_in: false
}));


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const server = http.createServer(app);

server.listen(port, hostname, ()=> {
    console.log(`Server is running on http://${hostname}:${port}`)
});

const rootController = require('./routes/index');
const usersController = require('./routes/users');

app.use('/', rootController);
app.use('/users', usersController);
