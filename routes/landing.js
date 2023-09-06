const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', getLanding = (req , res , next) => {

res.render('landing', { pageTitle: 'Landing Page'} )

} );

module.exports = router;
