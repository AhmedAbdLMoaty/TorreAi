const express = require('express');

const controllers = require('../controllers/main-controller');

const app = express();

const router = express.Router();

router.get('/fav', controllers.getFav);

module.exports = router;
