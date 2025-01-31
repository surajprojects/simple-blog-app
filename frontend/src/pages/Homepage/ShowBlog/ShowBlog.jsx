import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "../../../utils/config";

import { useState, useEffect } from "react";

import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ShowBlog() {

    const navigate = useNavigate();
    const { blogId } = useParams();

    const [blogData, setBlogData] = useState({
        blogCreatedOn: "",
        blogEditedOn: "",
        blogTitle: "Title here",
        blogAuthor: "Author here",
        blogContent: "blog content here",
        blogReviews: []
    });

    useEffect(() => {
        async function getBlogData() {
            try {
                const response = await fetch(`${BASE_URL}/blogs/${blogId}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                const result = await response.json();

                if (response.ok) {
                    setBlogData((prevData) => {
                        return {
                            ...prevData,
                            blogCreatedOn: result.blogData.blogCreatedOn,
                            blogEditedOn: result.blogData.blogEditedOn,
                            blogTitle: result.blogData.blogTitle,
                            blogAuthor: result.blogData.blogAuthor.username,
                            blogContent: result.blogData.blogContent,
                        }
                    });
                }
                else {
                    console.error(result.message);
                    navigate(`/error?${result.message}`);
                }
            } catch (error) {
                console.log("Failed to submit the form!");
                alert("Failed to connect to server.");
            }
        }
        getBlogData();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/blogs/${blogId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const result = await response.json();

            if (response.ok) {
                navigate("/blogs");
            } else {
                console.error(result.message);
                navigate(`/error?message=${result.message}`);
            }
        } catch (error) {
            console.error("Failed to submit the form!");
            alert("Failed to connect to server.");
        }
    };

    return (
        <>
            <Container maxWidth="md" sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>

                    <Typography variant="h2" component="h2">
                        {blogData.blogTitle}
                    </Typography>

                    <Typography component="p" sx={{ color: "text.secondary", mt: 2 }}>
                        Author: {blogData.blogAuthor}
                    </Typography>

                    <Box sx={{ mt: 1.5, mb: 2, display: "flex", justifyContent: "space-between" }}>
                        <Typography component="p" sx={{ color: "text.secondary" }}>
                            Created on: {blogData.blogCreatedOn}
                        </Typography>

                        {blogData.blogEditedOn && <Typography component="p" sx={{ color: "text.secondary" }}>
                            Edited on: {blogData.blogEditedOn}</Typography>
                        }
                    </Box>

                    <Box sx={{ backgroundColor: "#fafbfb", p: 2, borderRadius: "0.7%", borderTop: "2px solid grey", borderBottom: "2px solid grey", marginBottom: 3 }}>
                        <Typography component="div" variant="body2" gutterBottom>
                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: blogData.blogContent }} />
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                        <Button component={Link} to={`/blogs/${blogId}/editblog`} variant="contained" color="secondary" >Edit</Button>
                        <Button onClick={handleDelete} variant="contained" color="error" >Delete</Button>
                    </Box>

                </Box>
            </Container>
        </>
    );
};