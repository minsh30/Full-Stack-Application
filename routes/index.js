const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const multer = require("multer");
const path = require("path");
const bodyparser = require("body-parser");
const File = require("../model/fileSchema");
const Form = require('../model/Form');
const { group } = require('console');
const { count } = require('../model/fileSchema');

//Configuration for Multer
// const upload = multer({ dest: "public/files" });
//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};

//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.use("/fileUpload", (req, res) => {
  res.status(200).render("fileUpload");
});


//Upload mode
router.post("/api/uploadFile", upload.single("myFile"), async(req, res) => {
  // Stuff to be added later
  //console.log(req.file);
  try {
    const newFile = await File.create({
      name: req.file.filename,
    });
    res.status(200).json({
      status: "success",
      message: "File created successfully!!",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});


router.get("/api/getFiles", async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json({
      status: "success",
      files,
    });
  } catch (error) {
    res.json({
      status: "Fail",
      error,
    });
  }
});


//Welcome page
router.get('/',(req, res) => 
res.render('welcome'));

//Dashboard
router.get('/dashboard', (req ,res)=> {
    res.render('dashboard');
});


//Data visualisation
router.get('/bargraph', (req ,res)=> {
    let spring,fall;
    Form.find({})
      .then(users => {
        spring = users.filter(user => user.semester == 'Spring');
        fall = users.filter(user => user.semester == 'Fall');
        res.render('bargraph', {spring: spring.length, fall: fall.length});
      })
      .catch(err => console.error(err));
});


router.get('/bargraph2', (req ,res)=> {
  let greater, lesser, year1,year2,year3,year4;
  let Greater, Lesser, Year1,Year2,Year3,Year4;
 let spring, fall;
  Form.find({})
    .then(users => {
      spring = users.filter(user => user.semester == 'Spring');
      fall = users.filter(user => user.semester == 'Fall');

      year1 = users.filter(user => user.year == 2018  & user.semester == 'Fall');
      year2 = users.filter(user => user.year == 2019  & user.semester == 'Fall');
      year3 = users.filter(user => user.year == 2020  & user.semester == 'Fall');
      year4 = users.filter(user => user.year == 2021  & user.semester == 'Fall');
      greater = users.filter(user => user.year > 2021 & user.semester == 'Fall');
      lesser = users.filter(user => user.year < 2018  & user.semester == 'Fall');


      Year1 = users.filter(user => user.year == 2018  & user.semester == 'Spring');
      Year2 = users.filter(user => user.year == 2019  & user.semester == 'Spring');
      Year3 = users.filter(user => user.year == 2020  & user.semester == 'Spring');
      Year4 = users.filter(user => user.year == 2021  & user.semester == 'Spring');
      Greater = users.filter(user => user.year > 2021 & user.semester == 'Spring');
      Lesser = users.filter(user => user.year < 2018  & user.semester == 'Spring');

      res.render('bargraph2', {greater: greater.length, lesser: lesser.length,year1: year1.length,year2: year2.length
      ,year3: year3.length,year4: year4.length, Greater: Greater.length, Lesser: Lesser.length,Year1: Year1.length,Year2: Year2.length
      ,Year3: Year3.length,Year4: Year4.length,spring: spring.length, fall: fall.length});
    })
    .catch(err => console.error(err));
});



router.get('/bargraph3', (req ,res)=> {
 
  let greater, lesser, year1,year2,year3,year4;
  let Greater, Lesser, Year1,Year2,Year3,Year4;
  let Greater1, Lesser1, Year1p,Year2p,Year3p,Year4p;
  let Greater2, Lesser2, Year1d,Year2d,Year3d,Year4d;
  let Greater3, Lesser3, Year1r,Year2r,Year3r,Year4r;
  Form.find({})
    .then(users => {
      year1 = users.filter(user => user.year == 2018  & user.status == 'Admit Full');
      year2 = users.filter(user => user.year == 2019  & user.status == 'Admit Full');
      year3 = users.filter(user => user.year == 2020  & user.status == 'Admit Full');
      year4 = users.filter(user => user.year == 2021  & user.status == 'Admit Full');
      greater = users.filter(user => user.year > 2021 & user.status == 'Admit Full');
      lesser = users.filter(user => user.year < 2018  & user.status == 'Admit Full');


      Year1 = users.filter(user => user.year == 2018  & user.status == 'Admit Conditional');
      Year2 = users.filter(user => user.year == 2019  & user.status == 'Admit Conditional');
      Year3 = users.filter(user => user.year == 2020  & user.status == 'Admit Conditional');
      Year4 = users.filter(user => user.year == 2021  & user.status == 'Admit Conditional');
      Greater = users.filter(user => user.year > 2021 & user.status == 'Admit Conditional');
      Lesser = users.filter(user => user.year < 2018  & user.status == 'Admit Conditional');

      Year1p = users.filter(user => user.year == 2018  & user.status == 'Admit Provisional');
      Year2p = users.filter(user => user.year == 2019  & user.status == 'Admit Provisional');
      Year3p = users.filter(user => user.year == 2020  & user.status == 'Admit Provisional');
      Year4p = users.filter(user => user.year == 2021  & user.status == 'Admit Provisional');
      Greater1 = users.filter(user => user.year > 2021 & user.status == 'Admit Provisional');
      Lesser1 = users.filter(user => user.year < 2018  & user.status == 'Admit Provisional');

      Year1d = users.filter(user => user.year == 2018  & user.status == 'Admit Defer');
      Year2d = users.filter(user => user.year == 2019  & user.status == 'Admit Defer');
      Year3d = users.filter(user => user.year == 2020  & user.status == 'Admit Defer');
      Year4d = users.filter(user => user.year == 2021  & user.status == 'Admit Defer');
      Greater2 = users.filter(user => user.year > 2021 & user.status == 'Admit Defer');
      Lesser2 = users.filter(user => user.year < 2018  & user.status == 'Admit Defer');

      Year1r = users.filter(user => user.year == 2018  & user.status == 'Reject');
      Year2r = users.filter(user => user.year == 2019  & user.status == 'Reject');
      Year3r = users.filter(user => user.year == 2020  & user.status == 'Reject');
      Year4r = users.filter(user => user.year == 2021  & user.status == 'Reject');
      Greater3 = users.filter(user => user.year > 2021 & user.status == 'Reject');
      Lesser3 = users.filter(user => user.year < 2018  & user.status == 'Reject');




      res.render('bargraph3', {greater: greater.length, lesser: lesser.length,year1: year1.length,year2: year2.length
        ,year3: year3.length,year4: year4.length, Greater: Greater.length, Lesser: Lesser.length,Year1: Year1.length,Year2: Year2.length
        ,Year3: Year3.length,Year4: Year4.length,
        Greater1: Greater1.length, Lesser1: Lesser1.length,Year1p: Year1p.length,Year2p: Year2p.length
        ,Year3p: Year3p.length,Year4p: Year4p.length,
        Greater2: Greater2.length, Lesser2: Lesser2.length,Year1d: Year1d.length,Year2d: Year2d.length
        ,Year3d: Year3d.length,Year4d: Year4d.length,
        Greater3: Greater3.length, Lesser3: Lesser3.length,Year1r: Year1r.length,Year2r: Year2r.length
        ,Year3r: Year3r.length,Year4r: Year4r.length
      });

      
    })
    .catch(err => console.error(err));
});


router.get('/linegraph', (req ,res)=> {
    let admitF, admitC, admitP, defer, reject;
    Form.find({})
      .then(users => {
        admitF = users.filter(user => user.status == 'Admit Full');
        admitC = users.filter(user => user.status == 'Admit Conditional');
        admitP = users.filter(user => user.status == 'Admit Provisional');
        defer = users.filter(user => user.status == 'Admit Defer');
        reject = users.filter(user => user.status == 'Reject');
        res.render('linegraph', {admitF: admitF.length, admitC: admitC.length, admitP: admitP.length, defer: defer.length, reject: reject.length});
      })
      .catch(err => console.error(err));
});

router.get('/piechart', (req ,res)=> {
    let WD, AI, CS, G;
    Form.find({})
      .then(users => {
        WD = users.filter(user => user.Degree_Con == 'Web and Databases');
        AI = users.filter(user => user.Degree_Con == 'Artificial Intelligence');
        CS = users.filter(user => user.Degree_Con == 'Cyber Security');
        G = users.filter(user => user.Degree_Con == 'General');
        res.render('piechart', {WD: WD.length, AI: AI.length, CS: CS.length, G: G.length});
      })
      .catch(err => console.error(err));
});





//Filtering groupby basis:
//not working correctly
// router.get('/filterbargraph',(req,res)=>
// {
  
// Form.find({})
//   .then(user => {
// const flag = Form.aggregate('$group'[Form.year,'$sum'[Form.id]],'$count'[Form.semester]);
//  console.log(flag);
//     //res.render('filterbargraph',{flag: flag.length});
//   })
//   .catch(err => console.error(err));
// });


module.exports = router;
