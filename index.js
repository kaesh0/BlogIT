require("dotenv").config();
const express=require('express')
const mongoose=require('mongoose')
const userRoute=require('./routes/user')
const blogRouter=require('./routes/blogs')
const cookieParser=require('cookie-parser')
const {restrictToLoggedInOnly}=require('./middleware/auth')
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected successfully")).catch((err) =>console.log(err));
const app=express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads",express.static("uploads"));
app.set('view engine','ejs')
app.use(userRoute)
app.use('/',restrictToLoggedInOnly,blogRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});