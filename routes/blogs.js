const express=require('express');
const multer=require('multer')
const{showAllBlogs,handleGetAddPage,handleGetMyBlogs,handleGetEditPage,handleShowBlogbyId,handlePostNewBlog,handleEditBlog,handleDeleteById}=require('../controller/blog')
const upload=multer({
    dest:"uploads/",
});
const router=express.Router();
router.get('/',showAllBlogs)
router.get('/add',handleGetAddPage)
router.get('/myblogs',handleGetMyBlogs)
router.get('/edit/:id',handleGetEditPage)
router.get('/:id',handleShowBlogbyId)
router.post('/add',upload.single("coverImage"),handlePostNewBlog)
router.post('/edit/:id',handleEditBlog)
router.post('/delete/:id',handleDeleteById)

module.exports=router;