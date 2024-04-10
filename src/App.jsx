import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
} from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
        <AppBar position="sticky" sx={{ backgroundColor: "#2A4376" }}>
          <Container maxWidth="lg">
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 1rem",
              }}>
              <Typography>
                <img src={Logo} alt="Logo" width={90} />
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <img src={Noti} alt="Notification" width={28} />
                <img src={Avatar} alt="Avatar" width={28} />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Container maxWidth="md">
          <Box sx={{ mt: 5 }}>
            <BreadCrumbs />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/eCRF" />} />
              <Route path="/eCRF" element={<Ecrf />} />
              <Route path="/Form-Builder" element={<FormBuilder />} />
              <Route path="/Subjects" element={<Subjects />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </BrowserRouter>
  );
};

export default App;
