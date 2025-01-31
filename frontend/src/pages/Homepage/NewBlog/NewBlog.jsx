import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, Link } from "react-router-dom";
import { currentDate } from "../../../utils/Date";

export default function NewBlog() {

    const navigate = useNavigate();

    const quillRef = useRef(null);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        blogCreatedOn: "",
        blogTitle: "",
        blogCoverImage: "",
        blogContent: ""
    });

    useEffect(() => {
        let currDate = currentDate();
        setFormData((currData) => {
            return {
                ...currData,
                blogCreatedOn: currDate.date + "-" + currDate.month + "-" + currDate.year
            };
        });
    }, []);

    const modules = {
        toolbar: [
            [{ "header": "1" }, { "header": "2" }, { "font": [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ "list": "ordered" }, { "list": "bullet" }],
            ["link"],
            ["clean"] // remove formatting button
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
            const response = await fetch("http://localhost:3000/blogs/newblog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            const result = await response.json();

            if (response.ok) {
                navigate(`/blogs/${result.newBlog._id}`);
            } else {
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
                    New Blog
                </Typography>

                <form onSubmit={handleSubmit}>

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
                        placeholder="Content here..."
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
                            color="success"
                        >
                            Save
                        </Button>
                        <Button
                            color="error"
                            variant="contained"
                            component={Link}
                            to={"/blogs"}
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