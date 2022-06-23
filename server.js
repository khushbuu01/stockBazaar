//Modules
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const express = require('express');
const mongoose = require('mongoose')

//Routers
const stocksRouter = require('./routes/stocks')
const loginsRouter = require('./routes/login')
const newsRouter = require('./routes/news')
const portfolioRouter = require('./routes/portfolio')
const apicall = require('./routes/news_api')

//new
const path=require('path');

const app = express();
app.use('/views', express.static('views'));
app.set('view engine', 'ejs');

//URI
const dbs=require('./config/keys').URI;

//Connecting to Atlas DB
mongoose.connect(dbs,{ useNewUrlParser:true,useUnifiedTopology: true  })
.then((conn)=>{
    console.log("Database Connected")
}).catch((err)=>console.log(err))

require('./config/passport')(passport);
app.use(express.json());

//Body Parser
app.use(express.urlencoded({extended:false}));
//Express session
app.use(session({
    secret: 'root',
    resave: true,
    saveUninitialized: true,
  }))
  
//Password middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global Vars
app.use((req,res,next)=>{
 res.locals.success_msg=req.flash('success_msg');
 res.locals.error_msg=req.flash('error_msg');
 next();
})

app.use('/stocks', stocksRouter);
app.use('/login', loginsRouter);
app.use('/news', newsRouter);
app.use('/portfolio', portfolioRouter);

app.get("/api/news", async (req, res) => {
	apicall.callNewsAPI(function(response) {
		res.write(response);
		res.end();
	})
})

app.get('/', (req, res) => {
    res.render('index',{req:req})
})
app.listen(8000)
