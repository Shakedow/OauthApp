const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const profileRoutes = require('./routes/profile-routes');
const app = express();
const mongoose=require('mongoose');
const keys=require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

//set up view engine
app.set('view engine', 'ejs');
app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongoose
mongoose.connect(keys.mongodb.dbURI,() =>{console.log('connected to mongodb');});
// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
// create home route
app.get('/', (req,res)=>{
	res.render('home');
});


app.listen(3000,()=> {
	console.log('app now listening for requests on port 3000');
});
