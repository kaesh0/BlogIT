const {getUser}=require("../services/auth");
function restrictToLoggedInOnly(req,res,next){
    const currSessionId=req.cookies?.uid;
    const user=getUser(currSessionId);
    if(!user){
        return res.redirect('/login')
    }
    req.user = user;
    res.locals.user = req.user;
    return next()
}
function  checkLoggedIn(req,res,next) {
    const currSessionId=req.cookies?.uid;
    const user=getUser(currSessionId);
    if(user){req.user=user}
    return next();
}
module.exports={checkLoggedIn,restrictToLoggedInOnly}