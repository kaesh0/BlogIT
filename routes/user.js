const {checkLoggedIn,restrictToLoggedInOnly}=require('../middleware/auth')
const express=require('express');
const {handleUserSignUp,handleUserLogin,handleLogout}=require('../controller/user')
const router=express.Router();
router.get("/signup",checkLoggedIn,(req,res)=>{
    res.render('signup')
})
router.post("/signup",handleUserSignUp)
router.get('/login',checkLoggedIn,(req,res)=>{
    res.render('login')
})
router.post("/login",handleUserLogin)
router.post('/logout',restrictToLoggedInOnly,handleLogout)
module.exports=router;