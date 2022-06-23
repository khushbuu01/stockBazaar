const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const signup_model = require('../models/signup');
const signup = signup_model.Signup;

const shares_model = require("../models/shares");
const shares = shares_model.Shares;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))

const {ensureAuthenticated}=require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('portfolio',{req:req})
})

router.post('/:id', async (req, res) => {
    //const user = await signup.findById(req.params.id)
    //console.log(user.name)
    try {
        const {stock, qty} = req.body;
        console.log(stock)
        let share = await shares.findOne({"Name": stock})
        console.log(share)
        var price = share.Open
        var investedAmt = qty*price;
        
        console.log(investedAmt)
        //updateOne({where}, {set});
        let u = await signup.findOne({"_id": req.params.id});
        if (investedAmt < u.balance) {
            if (!Array.isArray(u.portfolio)) {
                u.portfolio = [];
            }
            u.portfolio.push({
                stock: stock,
                qty: qty
            })
            u.investment = u.investment + investedAmt;
            u.balance = u.balance - investedAmt;
            const updated = await u.save()
            res.redirect('/portfolio/'+updated._id)
        }else {
            res.jsonp({message: 'Insufficient Balance'})
        }
    }catch(e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    var data = await shares.find().sort({_id:-1});
    const user = await signup.findById(req.params.id)
    res.render('portfolio', { user: user, shares: data ,req:req})
})

router.post('/:edit/:qty/:id', async (req, res) => {
    try {
        //let u = await signup.findOne({"_id": req.params.id});
        let stk = req.params.edit
        let qty = req.params.qty
        let share = await shares.findOne({"Name": stk});
        await signup.update( 
            { "_id" : req.params.id} , 
            { "$pull" : { "portfolio" : { "stock" :  stk } } } , 
            { "multi" : true }  
        )
        let u = await signup.findOne({"_id": req.params.id});
        const investedAmt = share.Open * qty;
        console.log(investedAmt)
        u.investment = u.investment - investedAmt;
        u.balance = u.balance + investedAmt;
        if (u.investment < 1) { u.investment = 0}
        const updated = await u.save()
        console.log(stk)
        console.log(u)
        res.redirect('/portfolio/'+updated._id);
    }catch(e) {
        console.log(e)
    }
})

module.exports = router;