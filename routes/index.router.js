const express = require('express');
const router = express.Router();

const mongoose=require('mongoose')

const ctrlUser = require('../controllers/user.controller');


const ctrlAdmin= require('../controllers/admin.controller');
const ctrlBenificery= require('../controllers/firstappeal.controllers');
const ctrlRequestform= require('../controllers/requestform.controller');
const ctrlLogout= require('../controllers/logout.controllers');
const ctrlHead= require('../controllers/head.controller');
const ctrlDept= require('../controllers/departments.controllers')

const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/user.controller");

//importing cloudinary and config
const cloudinary=require('cloudinary');
cloudinary.config({
    cloud_name:'scls',
    api_key:'244319535524477',
    api_secret:'qKkTQqGIYEzHpnB4ijfsEIhy-Zc'
})
//importing multer storage
const storage=require('multer-storage-cloudinary');
var cloudstorage=storage({
    cloudinary:cloudinary,
    folder:'movie',
    allowedFormats:['jpg','png','zip','pdf','rar'],
    filename:function(req,file,cb){
        cb(undefined,file.fieldname+'_'+Date.now())
    }
})

//importing & configmulter
const multer=require('multer');

var upload=multer({storage:cloudstorage}); 

//signout
router.get('/signout', ctrlUser.signout);


router.post('/userlogin', ctrlUser.userlogin);
router.post('/register', ctrlUser.register);
router.get('/userprofile', ctrlUser.userprofile);
router.post('/updateprofile', ctrlUser.updateprofile);
router.post('/hodnodalcre',adminMiddleware, ctrlUser.hodnodalcre);
router.post('/getdepartment', ctrlUser.getdepartment);
router.post('/nodalregister',adminMiddleware, ctrlUser.nodalregister);
router.post('/callCenterCreation', ctrlUser.callCenterCreation);

router.post('/sicregister', ctrlUser.sicregister);


router.post('/publicpio', ctrlUser.publicpio);


router.post('/activateuser', ctrlUser.activateuser);
router.get('/getusers', ctrlUser.getusers);
router.post('/deleteuser', ctrlUser.deleteuser);
router.post('/deleteuser', ctrlUser.deleteuser);
router.post('/edituser', ctrlUser.edituser);
router.post('/updateuser', ctrlUser.updateuser);
router.post('/logindata', ctrlAdmin.logindata);
router.post('/getlogintime', ctrlAdmin.getlogintime);
router.get('/getlogdata', ctrlAdmin.getlogdata);
router.post('/message', ctrlUser.message);
router.get('/getAllHOD', ctrlUser.getAllHOD);
router.get('/getAllPIO', ctrlUser.getAllPIO);





//benificery
router.get('/getAppealform', ctrlBenificery.getAppealform);
router.post('/updateAppealform', ctrlBenificery.updateAppealform);
router.post('/registerAppealform', ctrlBenificery.registerAppealform);
router.post('/verifyAppealform', ctrlBenificery.verifyAppealform);
router.post('/editAppealform', ctrlBenificery.editAppealform);
router.post('/deleteAppealform', ctrlBenificery.deleteAppealform);
router.get('/firstformdetails', ctrlBenificery.firstformdetails);

// router.post('/activebank', ctrlBenificery.activebank);
// router.post('/disaablebank', ctrlBenificery.disaablebank);
// router.post('/getactivebanks', ctrlBenificery.getactivebanks);

//logoutdata
router.post('/logoutdata', ctrlLogout.logoutdata);
router.get('/getlogoutdata', ctrlLogout.getlogoutdata);
router.post('/getlogoutdatabyid', ctrlLogout.getlogoutdatabyid);





//promotions
router.get('/getRequestform', ctrlRequestform.getRequestform);
router.post('/updateRequestform', ctrlRequestform.updateRequestform);
router.post('/verifyregistereddata', ctrlRequestform.verifyregistereddata);
router.post('/registerRequestform',upload.single('document'), ctrlRequestform.registerRequestform);
router.post('/editRequestform', ctrlRequestform.editRequestform);
router.post('/deleteRequestform', ctrlRequestform.deleteRequestform);
router.get('/Requestformdetails', ctrlRequestform.Requestformdetails);
router.put('/updateAppStatus', ctrlRequestform.updateAppStatus);
router.post('/reqdatabymail', ctrlRequestform.reqdatabymail);
router.post('/getccdata', ctrlRequestform.getccdata);
router.post('/updatereqsts', ctrlRequestform.updatereqsts);
router.post('/updatePioDecision', ctrlRequestform.updatePioDecision);

router.post('/transferapplication', ctrlRequestform.transferapplication);

router.post('/reqdatabyregisterid', ctrlRequestform.reqdatabyregisterid);
router.post('/Requestformdetail', ctrlRequestform.Requestformdetail);

router.post('/getbydeptname', ctrlRequestform.getbydeptname);
router.post('/allPendingRequest', ctrlRequestform.allPendingRequest);
router.post('/documentuser',upload.single('avatar'), ctrlRequestform.documentuser);
router.post('/Requestformbypub', ctrlRequestform.Requestformbypub);
router.post('/transdata', ctrlRequestform.transdata);
router.post('/getbytwodates', ctrlRequestform.getbytwodates);
router.post('/pendingList', ctrlRequestform.pendingList);
router.post('/ReviewList', ctrlRequestform.ReviewList);
router.post('/ClosedList', ctrlRequestform.ClosedList);
router.post('/departmentnameList', ctrlRequestform.departmentnameList);
router.post('/HodPendingList', ctrlRequestform.HodPendingList);
router.post('/HodClosedList', ctrlRequestform.HodClosedList);
router.post('/HodReviewList', ctrlRequestform.HodReviewList);
router.get('/getAllRequests', ctrlRequestform.getAllRequests);
router.get('/getAllPending', ctrlRequestform.getAllPending);
router.get('/getAllReview', ctrlRequestform.getAllReview);
router.get('/getAllClosed', ctrlRequestform.getAllClosed);
router.post('/PioTotalDealed', ctrlRequestform.PioTotalDealed);
router.get('/testget', ctrlRequestform.testget);








//test
router.get('/testrequest', ctrlRequestform.testrequest);
router.post('/testnodalreg', adminMiddleware,ctrlUser.testnodalreg);


//end test


// addbeneficiary
// router.post('/addbeneregister', ctrlAddben.addbeneregister);
// router.get('/gatAddbene', ctrlAddben.gatAddbene);
// router.post('/editaddbene', ctrlAddben.editaddbene);
// router.post('/updatebenificery', ctrlAddben.updatebenificery);
// router.post('/deletebene', ctrlAddben.deletebene);
// router.post('/rejectbank', ctrlAddben.rejectbank);
// router.post('/approvebank', ctrlAddben.approvebank);
// router.post('/getaddbenf', ctrlAddben.getaddbenf);


//ctrlHead
router.post('/headregister', ctrlHead.headregister);
router.post('/adminlogin', ctrlHead.adminlogin);
router.post('/headtest', ctrlHead.headtest);
router.get('/getheaddata', ctrlHead.getheaddata);


//ctrlDept
router.post('/newdept',adminMiddleware,ctrlDept.newdept);
router.post('/particulardept',ctrlDept.particulardept);
router.post('/deptpush',adminMiddleware,ctrlDept.deptpush);
router.get('/getAllDepts',ctrlDept.getAllDepts);





module.exports = router;

