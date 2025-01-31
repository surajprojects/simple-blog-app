import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';


import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            username: "",
            password: ""
        }
    );

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://simple-blog-app-vxnb.onrender.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            const result = await response.json();

            if (response.ok) {
                console.log(result.message);
                alert(result.message);

            }
            else if (response.status === 401) {
                console.error(result.message);
                navigate(`/error?message=${result.message}`);
            }
            else {
                console.log(result.message);
                navigate(`/error?message=${result.message}`);
            }
        } catch (error) {
            console.error("Failed to submit the form!");
            alert("Failed to connect to server.");
        }

    };

    return (
        <>
            <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 25 }}>
                <form onSubmit={handleSubmit}>
                    <Card sx={{ maxWidth: 345, paddingBottom: 1, borderRadius: "1%", boxShadow: "grey 0 0 10px 0px " }}>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "center" }} >
                                <Typography variant="h2" sx={{ mt: 1 }} gutterBottom>
                                    Login
                                </Typography>
                            </Box>

                            <TextField
                                id="username"
                                name="username"
                                label="Username"
                                onChange={handleChange}
                                value={formData.username}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />

                            <TextField
                                type="password"
                                id="password"
                                name="password"
                                label="Password"
                                onChange={handleChange}
                                value={formData.password}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />

                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                type="submit"
                                color="success"
                                fullWidth
                            >
                                Login
                            </Button>
                        </CardActions>
                    </Card >
                </form>

            </Container>
        </>
    );
};