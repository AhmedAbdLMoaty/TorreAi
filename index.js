const path = require('path');

const express =  require('express');

const app = express();

const landingRoutes = require('./routes/landing');

const searchRoutes = require('./routes/search');

const searchHistoryRoutes = require('./routes/search-history');

const favRoutes = require('./routes/fav')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.engine('ejs', require('ejs').renderFile);

app.set('view engine', 'ejs'); // Set the view engine to EJS
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));


// Paths

app.get('/search-page', searchRoutes);

app.post('/search-page', searchRoutes);

app.get('/fav', favRoutes);

app.get('/history', searchHistoryRoutes );

app.use('/' , landingRoutes );



app.listen(3000);