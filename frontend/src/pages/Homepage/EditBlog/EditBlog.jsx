import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import { currentDate } from "../../../utils/Date";
import BASE_URL from "../../../utils/config";

export default function EditBlog() {

    const navigate = useNavigate();

    const { blogId } = useParams();

    const quillRef = useRef(null);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        blogCreatedOn: "Date Here",
        blogEditedOn: "Date Here",
        blogTitle: "Edit Title",
        blogCoverImage: "Edit Cover Image",
        blogContent: "<h1>Edit Blog</h1>",
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
                    let currDate = currentDate();
                    setFormData((prevData) => {
                        return {
                            ...prevData,
                            blogCreatedOn: result.blogData.blogCreatedOn,
                            blogEditedOn: currDate.date + "-" + currDate.month + "-" + currDate.year,
                            blogTitle: result.blogData.blogTitle,
                            blogAuthor: result.blogData.blogAuthor.username,
                            blogCoverImage: result.blogData.blogCoverImage,
                            blogContent: result.blogData.blogContent,
                        }
                    });
                } else {
                    console.error(result.message);
                    navigate(`/error?message=${result.message}`);
                }
            } catch (error) {
                console.error("Failed to submit the form!");
                alert("Failed to connect to server.");
            }
        }
        getBlogData();
    }, []);

    const modules = {
        toolbar: [
            [{ "header": "1" }, { "header": "2" }, { "font": [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ "list": "ordered" }, { "list": "bullet" }],
            ["link"],
            ["clean"]
        ],
    };

    const handleChange = (evt) => {
        const changedField = evt.target.name;
        const newValue = evt.target.value;
        setFormData((currData) => {
            return {
                ...currData,
                [changedField]: newValue
            };
        });
    };

    const handleBlogChange = (evt) => {
        setFormData((currData) => {
            return {
                ...currData, blogContent: evt
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/blogs/${blogId}/editblog`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                navigate(`/blogs/${blogId}`, { state: { formData } });
            }
            else {
                console.error(result.message);
                navigate(`/error?message=${result.message}`);
            }
        } catch (error) {
            console.error("Failed to submit the form!");
            alert("Failed to connect to server.");
        }
    };

    useEffect(() => {
        const quill = quillRef.current.getEditor();

        quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {

            const mediaDetected = delta.ops.some(op => op.insert?.image || op.insert?.video);

            if (mediaDetected) {
                setError('Media content is not allowed!');
                setTimeout(() => setError(''), 3000);
                return { ops: [] };
            }
            return delta;
        });


        quill.root.addEventListener('drop', (e) => {
            e.preventDefault();
            setError('Drag-and-drop media is not allowed!');
            setTimeout(() => setError(''), 3000);
        });

    }, []);

    return (
        <>
            <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >

                <Typography variant="h2" sx={{ mt: 3 }} gutterBottom>
                    Edit Blog
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ color: "text.secondary", mt: 2 }}>
                            Created on: {formData.blogCreatedOn}
                        </Typography>
                        <Typography sx={{ color: "text.secondary", mt: 2 }}>
                            Edited on: {formData.blogEditedOn}
                        </Typography>
                    </Box>

                    <TextField
                        id="blogTitle"
                        name="blogTitle"
                        label="Title"
                        onChange={handleChange}
                        value={formData.blogTitle}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />

                    <TextField
                        type="url"
                        id="blogCoverImage"
                        name="blogCoverImage"
                        label="Cover Image"
                        onChange={handleChange}
                        value={formData.blogCoverImage}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />

                    <ReactQuill
                        style={{ height: "24em", width: "50em", marginTop: "1em" }}
                        theme="snow"
                        id="blogContent"
                        name="blogContent"
                        value={formData.blogContent}
                        onChange={handleBlogChange}
                        modules={modules}
                        ref={quillRef}
                    />
                    {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                    <Box sx={{ mt: 8, display: "flex", justifyContent: "center", }} >
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            component={Link}
                            to={`/blogs/${blogId}`}
                            sx={{ marginLeft: 5 }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Container>
        </>
    );
};