import Container from "@mui/material/Container";

import { Link } from "react-router-dom";

export default function Homepage() {
    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 25 }}>
                <h1>Homepage!!!</h1>
                <h2>Welcome to Tiger Blog!!!</h2>
                <Link to="/blogs"><button>View blogs!</button></Link>
            </Container>
        </>
    );
};