const express = require('express');

const controllers = require('../controllers/main-controller');

const app = express();

const router = express.Router();

router.get('/history', controllers.getSearchHistory);

module.exports = router;
