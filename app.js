const path = require('path');

const express =  require('express');

const app = express();

const landingRoutes = require('./routes/landing');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.set('views', 'views');

app.use('/' , landingRoutes);


app.listen(3000);