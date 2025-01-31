import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import BlogCards from "../../../components/BlogCards/BlogCards";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Blogs() {

    const [result, setResult] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function getAllBlogsData() {
            try {
                const response = await fetch("http://localhost:3000/blogs", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                const result = await response.json();

                if (response.ok) {
                    setResult(result.blogs);
                } else {
                    console.error(result.message);
                    navigate(`/error?message=${result.message}`);
                }
            } catch (error) {
                console.error("Failed to submit the review!");
                alert("Failed to connect to server.");
            }
        }
        getAllBlogsData();
    }, []);

    return (
        <>
            <Container maxWidth="lg" sx={{ marginTop: 1.5, p: 1, backgroundColor: "#fafbfb", borderRadius: "1%" }} >

                <Typography variant="h2" sx={{ marginLeft: 5 }} gutterBottom>
                    All Blogs!
                </Typography>

                <BlogCards blogData={result} />

            </Container>
        </>
    );
};