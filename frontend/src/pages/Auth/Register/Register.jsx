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
import { BASE_URL } from "../../../utils/config";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            fullname: "",
            username: "",
            email: "",
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
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                console.log(result.message);
                alert(result.message);
            }
            else if (response.status === 409) {
                navigate(`/error?message=${result.message}`);
                console.error(result.message);
            }
            else {
                navigate(`/error?message=${result.message}`);
                console.log(result.message);
            }
        } catch (error) {
            console.error("Failed to submit the form!");
            alert("Failed to connect to server.");
        }
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 15 }}>
                <form onSubmit={handleSubmit}>
                    <Card sx={{ maxWidth: 345, paddingBottom: 1, borderRadius: "1%", boxShadow: "grey 0 0 10px 0px " }}>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "center" }} >
                                <Typography variant="h2" sx={{ mt: 1 }} gutterBottom>
                                    Register!
                                </Typography>
                            </Box>
                            <TextField
                                id="fullname"
                                name="fullname"
                                label="Full Name"
                                onChange={handleChange}
                                value={formData.fullname}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />

                            <TextField
                                id="username"
                                name="username"
                                label="Username"
                                onChange={handleChange}
                                value={formData.username}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />

                            <TextField
                                type="email"
                                id="email"
                                name="email"
                                label="Email"
                                onChange={handleChange}
                                value={formData.email}
                                variant="outlined"
                                margin="normal"
                                fullWidth
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
                            />

                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                type="submit"
                                color="success"
                                fullWidth
                            >
                                Register
                            </Button>
                        </CardActions>
                    </Card >
                </form>

            </Container>
        </>
    );
};