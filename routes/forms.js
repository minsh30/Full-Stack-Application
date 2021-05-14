const express = require('express');
const router = express.Router();
//User Form mode
const FormModel = require('../model/form');


// Step 7 - the GET request handler that provides the HTML UI
//applicant form
router.get('/applicantform', (req,res)=> {
    res.render('applicantform');
});



// router.post('/dashboard', upload.single('fileupload'), (req, res, next) => {

// 	var obj = {
// 		lname: req.body.lname,
//     fname: req.body.fname,
//     email: req.body.email,
//     // country: req.body.country,
//     visa: req.body.visa,
//     undergraduate: req.body.undergraduate,
//     semester: req.body.semester,
//     year: req.body.year,
//     // gender: req.body.gender,
//     // Degree_Con: req.body.Degree_Con,
//     gpa: req.body.gpa,
//     fileupload: {
// 			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
// 			contentType: 'file.contentType'
// 		}
//     // status: req.body.status	
// 	}
// 	FormModel.create(obj, (err, item) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		else {
// 			item.save();
// 			res.redirect('/dashboard');
// 		}
// 	});
// });



module.exports = router;

