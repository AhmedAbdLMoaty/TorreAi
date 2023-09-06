const path = require('path');

const express =  require('express');

const app = express();

const landingRoutes = require('./routes/landing');

const searchRoutes = require('./routes/search');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Paths

app.get('/search-page', searchRoutes);

app.post('/search-page', searchRoutes);

app.use('/' , landingRoutes );



app.listen(3000);