const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const { authenticateToken } = require("../middlewares/auth");

router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate({
            path: "blogAuthor",
            select: "username -_id",
        });
        res.status(200).json({ message: "Found all blogs!", blogs });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const blogData = await Blog.findById(id).populate({
            path: "blogAuthor",
            select: "username -_id",
        });

        if (blogData) {
            res.status(200).json({ message: "Blog found successfully!", blogData });
        }
        else {
            res.status(404).json({ message: "Blog not found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.post("/newblog", authenticateToken, async (req, res) => {
    try {
        const { blogCreatedOn, blogTitle, blogCoverImage, blogContent } = req.body;
        const newBlog = new Blog({ blogCreatedOn, blogTitle, blogCoverImage, blogContent });
        newBlog.blogAuthor = req.user.id;
        await newBlog.save();
        res.status(201).json({ message: "Blog created successfully", newBlog });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put("/:id/editblog", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const blogData = await Blog.findById(id);

        if ((blogData.blogAuthor._id).toString() === req.user.id) {
            const { blogCreatedOn, blogEditedOn, blogTitle, blogCoverImage, blogContent } = req.body;

            Object.assign(blogData, {
                blogCreatedOn,
                blogEditedOn,
                blogTitle,
                blogCoverImage,
                blogContent
            });

            await blogData.save();

            if (blogData) {
                res.status(200).json({ message: "Blog updated successfully!", blogData });
            }
            else {
                res.status(404).json({ message: "Blog not found!" });
            }
        }
        else {
            res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/:id", authenticateToken, async (req, res) => {
    try {

        const { id } = req.params;
        let blogData = await Blog.findById(id);

        if ((blogData.blogAuthor._id).toString() === req.user.id) {

            blogData = await Blog.findByIdAndDelete(id);

            if (blogData) {
                res.status(200).json({ message: "Blog deleted successfully!", blogData });
            }
            else {
                res.status(404).json({ message: "Blog not found!" });
            }
        }
        else {
            res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;