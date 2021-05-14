
const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');
const passport = require('passport');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const once = require('once');
const app = express();


//Passport config
require('./config/passport')(passport);

// connecting to mongodb
// DB Config
// const db = require('./config/keys').mongoURI;

// // Connect to MongoDB
// mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true})
//   .then(() => console.log('Sucessful in connecting to mongoDB'))
//   .catch(err => console.log(err));
//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//Bodyparser
 app.use(express.urlencoded({ extended: false}));

 app.use(methodOverride('_method'));
// Mongo URI
const mongoURI = "mongodb://localhost:27017/Mongocon";

// Create mongo connection
mongoose.connect(mongoURI,{ useNewUrlParser: true ,useUnifiedTopology: true});


//file upload
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));


//Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    })
  );

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());
//Global vars
app.use(function (req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
    });


//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
