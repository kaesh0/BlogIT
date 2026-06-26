const bcrypt=require('bcrypt')
const User=require('../models/users')
const {createSession,deleteSession}=require('../services/auth')
async function handleUserSignUp(req,res){
    const {name,email,password}=req.body
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.send("Email already exists");
        }
        const hashedPassword= await bcrypt.hash(password,10)
        const newUser=await User.create({
            name,
            email,
            password:hashedPassword,
        });
        const sessionId=createSession(newUser)
        res.cookie('uid',sessionId)
        return res.redirect("/");
    } 
    catch (err) {
        return res.send("Something went wrong");
    }
}
async function handleUserLogin(req,res) {
    const {email,password}=req.body
    try{
        const user=await User.findOne({email})


console.log("Email entered:", email);

console.log("User found:", user?.email);
        if(!user){ return res.send("INVALID EMAIL OR PASSWORD")}
        const isMatch=await bcrypt.compare(password,user.password)
        console.log("Password matched:", isMatch);
        if(!isMatch){
            return res.send("INVALID EMAIL OR PASSWORD")
        }
        const sessionId=createSession(user)
        res.cookie('uid',sessionId)
        return res.redirect("/")
    }
    catch(err){
        return res.send("something went wrong")
    }
}
function handleLogout(req,res){
    const currSessionId=req.cookies?.uid;
    deleteSession(currSessionId);
    res.clearCookie("uid");
    return res.redirect('/login')
}
module.exports={handleUserSignUp,handleUserLogin,handleLogout}