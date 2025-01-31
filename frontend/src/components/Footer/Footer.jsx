// Importing necessary Material UI components for building the footer
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Footer() {
    return (

        // AppBar is used as a footer, positioned at the bottom of the screen
        <AppBar position="static" sx={{ top: "auto", bottom: 0, bgcolor: "primary.main" }}>

            {/* Container to manage the layout and spacing */}
            <Container maxWidth="xl">

                {/* Toolbar to align and space out content within the AppBar */}
                <Toolbar>

                    {/* Box to center the footer text horizontally */}
                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>

                        {/* Typography component for the footer text */}
                        <Typography variant="body1" color="inherit">
                            &copy; Tiger Blog 2024 | Made by Tiger
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};