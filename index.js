const express=require('express')
const mongoose=require('mongoose')
const userRoute=require('./routes/user')
const blogRouter=require('./routes/blogs')
const cookieParser=require('cookie-parser')
const {restrictToLoggedInOnly}=require('./middleware/auth')
mongoose.connect("mongodb://127.0.0.1:27017/blogit").then(()=> console.log("MongoDB connected succesfully")).catch((err)=>console.log(err))
const app=express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads",express.static("uploads"));
app.set('view engine','ejs')
app.use(userRoute)
app.use('/',restrictToLoggedInOnly,blogRouter)
app.listen(3000,()=>{
    console.log("Server running succesfully")
})
