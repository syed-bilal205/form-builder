import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ecrf from "./pages/Ecrf";
import FormBuilder from "./pages/FormBuilder";
import Subjects from "./pages/Subjects";
import BreadCrumbs from "./components/BreadCrumbs";
import Logo from "./assets/Frame104.png";
import Noti from "./assets/notification-alert.png";
import Avatar from "./assets/Frame2399.png";

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky"
          width="100%"
          sx={{
            backgroundColor: "#2A4376",
            padding: "0 2rem",
          }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Typography>
              <img src={Logo} alt="Logo" width={"90px"} />
            </Typography>
            <Toolbar sx={{ display: "flex", gap: 2 }}>
              <img src={Noti} alt="Notification" width={"28px"} />
              <img src={Avatar} alt="Avatar" width={"28px"} />
            </Toolbar>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 5 }}>
          <BreadCrumbs />
        </Box>
        <Box sx={{ mt: 3, padding: "0 14rem" }}>
          <Routes>
            <Route path="/eCRF" element={<Ecrf />} />
            <Route path="/Form-Builder" element={<FormBuilder />} />
            <Route path="/Subjects" element={<Subjects />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
