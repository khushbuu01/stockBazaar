const express = require('express');
const router = express.Router();

const shares_model = require('../models/shares');
const shares = shares_model.Shares;

const {ensureAuthenticated}=require('../config/auth');

router.get('/', ensureAuthenticated, async (req, res) => {
    try{
        var data = await shares.find({},{_id:0}).sort({_id:-1});
        //res.send(data);
        //console.log(data);
        }
        catch (err) {
            res.json(err);
        }
    res.render('stocks', {data: data,req:req})
})

module.exports = router