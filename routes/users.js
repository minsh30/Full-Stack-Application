const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//User mode
const User = require('../model/User');

//User Form mode
const Form = require('../model/Form');
const { response } = require('express');
//Login Page
router.get('/login',(req, res) => res.render('login'));

//Register Page
router.get('/register',(req, res) => res.render('register'));

//review applicant 


router.get("/review", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        //const regex1 = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all keywords from DB
        Form.find({$or:[{semester: regex},{Degree_Con: regex},{year: regex},{fname: regex},
        {lname: regex}, {gender: regex}, {status: regex}, {visa: regex}]},function(err, form){
           if(err){
               console.log(err);
           } else {
              if(form.length < 1) {
                  noMatch = "No Keywords match that query, please try again.";
              }
              res.render("review",{form:form, noMatch: noMatch});
           }
        });
    } else {
        // Get all keywords from DB
        Form.find({}, function(err, form){
           if(err){
               console.log(err);
           } else {
              res.render("review",{form:form, noMatch: noMatch});
           }
        });
    }
});




//update applicant

function updateRecord(req, res) {
    Form.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('review'); }
        else {
          
                res.render("updateinfo", {
                   // viewTitle: 'Update Employee',
                    form: req.body
                });
            
        }
    });
}

router.post('/updateinfo', (req,res) => {

    updateRecord(req, res);
});


// Update a new idetified user by user id
router.get('/review/:id', (req, res) => {
    Form.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("updateinfo", {
              //  viewTitle: "Update ApplicantForm",
                form: doc
            });
        }
    });
});


//delete applicant
router.get('/review/delete/:id', (req, res) => {
    Form.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('review');
        }
        else { console.log('Error in Applicant delete :' + err); }
    });
});


//applicant form
router.get('/applicantform', (req,res)=> {
    res.render('applicantform');
});
//update form
router.get('/updateinfo', (req,res)=> {
    res.render('updateinfo');
});


//add to applicant form
router.post('/applicantform', (req, res) => {
    const{lname,
        fname,
        email,
        country,
        visa,
        undergraduate,
        semester,
        year,
        gender,
        Degree_Con,
        gpa,
        status,	
        defsem,
        defyear,
        notes} = req.body;
        // let errors = [];

        // //check required fields
        // if(!lname || !fname || !email)
        // {
        //     errors.push({msg: 'Please fill in required fields'});
        // }
        // if(errors.length > 0)
        // {
        //     res.render('applicantform',{
        //     errors,
        //     lname,
        //     fname,
        //     email,
        //     country,
        //     visa,
        //     undergraduate,
        //     semester,
        //     year,
        //     gender,
        //     Degree_Con,
        //     status,	
        //     defsem,
        //     defyear,
        //     notes    
        //     });
        // }

            //Validation passed
              Form.findOne({ email:email }) 
              .then(form => {
               if(form){
                   //User exist
                   errors.push({ msg: 'Applicant already registered'});
                   res.render('applicantform',{
                       errors,
                       lname,
                        fname,
                        email,
                        country,
                        visa,
                        undergraduate,
                        semester,
                        year,
                        gender,
                        Degree_Con,
                        gpa,
                        status,	
                        defsem,
                        defyear,
                        notes    
                   });
               }
               else{
                   const newForm = new Form({
                    lname,
                    fname,
                    email,
                    country,
                    visa,
                    undergraduate,
                    semester,
                    year,
                    gender,
                    Degree_Con,
                    gpa,
                    status,	
                    defsem,
                    defyear,
                    notes  
                   });
                       //save user
                       newForm.save()
                       .then(form => {
                           req.flash('success_msg', 'Applicant added succesfully');
                           res.redirect('/dashboard');
                       })
                       .catch(err => console.log(err));
                   }

               
       
              });
       
            
        


});



//Register Handle
router.post('/register',(req,res)=> {
 const{ name, email,password,password2 } = req.body;
 let errors = [];

 //check required fields
 if(!name || !email || !password || !password2)
 {
     errors.push({msg: 'Please fill in all fields'});
 }

 //check password match
 if(password != password2)
 {
     errors.push({msg: 'Password do not match'});
 }

 //check password length
 if(password.length < 6)
 {
     errors.push({msg: 'Password should be at least 6 Charactres long!'});
 }

 if(errors.length > 0)
 {
     res.render('register',{
     errors,
     name,
     email,
     password,
     password2    
     });
 }
 else{
     //Validation passed
       User.findOne({ email:email }) 
       .then(user => {
        if(user){
            //User exist
            errors.push({ msg: 'Email is already registered'});
            res.render('register',{
                errors,
                name,
                email,
                password,
                password2    
            });
        }
        else{
            const newUser = new User({
          name,
          email,
          password      
            });

            //Hash Password
            bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(newUser.password, salt, (err,hash) => {
                if(err) throw err;
                //set password to hashed
                newUser.password = hash;
                //save user
                newUser.save()
                .then(user => {
                    req.flash('success_msg', 'you are now registered and can log in!');
                    res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            }))
            // console.log(newUser);
            // res.send('Registered Sucessfully!');
        }

       });

     
 }
    // console.log(req.body)
    // res.send('HELLO');


});

//Login Handle
router.post('/login', (req,res,next) =>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
    });

//Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });


  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports = router;
