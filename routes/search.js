const express = require('express');

const path = require('path');

const axios = require('axios');

const controllers = require('../controllers/main-controller')

const app = express();

const port = 3000;

const router = express.Router();


router.get('/search-page' , controllers.getSearch );

router.post('/search-results' , controllers.postReq );

module.exports = router;
