const express = require('express');
const router = express.Router();

//const apicall = require('./news_api')

router.get('/', async (req, res) => {
    res.render('news',{req:req})
})

module.exports = router;