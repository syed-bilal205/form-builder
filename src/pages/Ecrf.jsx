import {
  Button,
  Box,
  Typography,
  InputAdornment,
  TextField,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Search from "../assets/search.png";
import EcrfForm from "../components/EcrfForm";

const Ecrf = () => {
  const navigate = useNavigate();

  const handleCreateForm = () => {
    navigate("/Form-Builder");
  };

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ color: "#0F172A", fontSize: 24, fontWeight: 600 }}>
        eCRF
      </Typography>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-search"
            placeholder="Search"
            type="search"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <img src={Search} alt="Search" />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: "#F1F5F9",
                ":focus": {
                  outline: "none",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  outline: "none",
                },
              },
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: {
              xs: "flex",
              marginTop: 1,
              justifyContent: "end",
              alignItems: "center",
            },
          }}>
          <Button
            variant="contained"
            onClick={handleCreateForm}
            sx={{ padding: "6px 6px" }}>
            New Form
          </Button>
        </Grid>
      </Grid>
      <Box mt={2}>
        <EcrfForm />
      </Box>
    </Box>
  );
};

export default Ecrf;
