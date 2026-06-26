const Blog=require("../models/blog");
async function showAllBlogs(req,res){
    const blogs=await Blog.find({})
    return res.render('home',{blogs})
}
function handleGetAddPage(req,res){
    return res.render('addblog')
}
async function handleGetMyBlogs(req,res){
    try{
        const thisUserBlogs=await Blog.find({createdBy:req.user._id})
        return res.render('myblog',{thisUserBlogs})
    }
    catch(err){
        console.log(err)
        res.send(err.message)
    }
}
async function handleGetEditPage(req,res){
    const blog=await Blog.findById(req.params.id)
    if (blog.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).send("Unauthorized");
    }
    return res.render('editblog',{blog})
}
async function handleShowBlogbyId(req,res){
    try{
        const thisBlog=await Blog.findById(req.params.id).populate("createdBy","name email")
        return res.render('blog',{thisBlog})
    }
    catch(err){
        console.log(err)
        res.send(err.message)
    }
}
async function handlePostNewBlog(req,res){
    try{const {title,content}=req.body;
    await Blog.create({
        title,
        content,
        coverImage:req.file.path,
        createdBy:req.user._id,
    })
    return res.redirect('/')}
    catch(err){
        console.log(err)
        return res.send(err.message)
    }
}
async function handleEditBlog(req,res){
    try{
        const blog=await Blog.findById(req.params.id)
        if (blog.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send("Unauthorized");
        }
        const {title,content}=req.body;
        await Blog.findByIdAndUpdate(req.params.id,{
            title,
            content,
        })
        return res.redirect(`/${req.params.id}`)
    }
    catch(err){
        console.log(err)
        return res.send(err.message)
    }
}
async function handleDeleteById(req,res){
    const blog=await Blog.findById(req.params.id)
    if (blog.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).send("Unauthorized");
    }
    await Blog.findByIdAndDelete(req.params.id);
    return res.redirect('/myblogs')
}
module.exports={showAllBlogs,handleGetAddPage,handleGetMyBlogs,handleGetEditPage,handleShowBlogbyId,handlePostNewBlog,handleEditBlog,handleDeleteById}