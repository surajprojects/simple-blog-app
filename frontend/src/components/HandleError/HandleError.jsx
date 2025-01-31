import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Container from "@mui/material/Container";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { useSearchParams } from "react-router-dom";

const color = red[500];

export default function HandleError() {

    const [searchParams] = useSearchParams();
    const errorData = searchParams.get('message');

    return (
        <>
            <CssBaseline />
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Header />
                <Box component="main" sx={{ flexGrow: 1, padding: 2 }}>

                    <Container maxWidth="md"  >
                        <Typography variant="h2" sx={{ color: color, mt: 5 }} >
                            {errorData ? errorData : "Caught an error!!!"}
                        </Typography>
                    </Container>

                </Box>
                <Footer />
            </Box>
        </>
    );
};