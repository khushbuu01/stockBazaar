module.exports={
    ensureAuthenticated: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','Please login to view this page');
        res.redirect('/login');
    }
    ,
    redirectHome: function(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
    }
    ,
    portfolioRedirect: function(req,res,next){
        if(req.isAuthenticated()){
            res.redirect('/portfolio/req.user._id')
        }
        req.flash('error_msg','Please login to view this page');
        res.redirect('/login');
    }

}