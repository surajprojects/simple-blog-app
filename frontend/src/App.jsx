import { CssBaseline } from "@mui/material";
import "./App.css"

import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, padding: 2 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default App;
