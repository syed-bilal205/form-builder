import { useState } from "react";
import {
  Toolbar,
  Box,
  Typography,
  FormControl,
  TextField,
  Dialog,
} from "@mui/material";
import Eye from "../assets/Vector.png";
import Delete from "../assets/delete.png";
import Copy from "../assets/copy.png";
import Edit from "../assets/edit.png";
import Branching from "../assets/branching.png";
import Icon from "../assets/Icon.png";
import MyButton from "../components/Button";
import AddFieldPopup from "../components/AddFieldPopup";

import { useSelector } from "react-redux";

const FormBuilder = () => {
  const formData = useSelector((state) => state.formData);
  const additionalFields = formData.additionalFields;
  const [openPopup, setOpenPopup] = useState(false);

  const handlePopupOpen = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "900px",
          margin: "auto",
          padding: "20px",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
          }}>
          <Typography
            variant="h2"
            sx={{ color: "#0F172A", fontSize: 24, fontWeight: 600 }}>
            Form 1
          </Typography>
          <Toolbar>
            <img src={Eye} alt="vector" />
          </Toolbar>
        </Box>

        <Box
          sx={{
            backgroundColor: "#F1F5F9",
            borderRadius: "5px",
            width: "100%",
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}>
          <Typography
            variant="h6"
            sx={{ color: "#2A4376", fontWeight: 600 }}>
            <img src={Icon} alt="" />
            Section 1
          </Typography>

          {additionalFields.map((field, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "#E2E8F0",
                padding: "1rem 0.5rem",
              }}>
              <div>
                <img src={Branching} alt="" />
                <img src={Copy} alt="" />
                <img src={Delete} alt="" />
                <img src={Edit} alt="" />
              </div>
              <FormControl>
                <Typography
                  variant="body1"
                  sx={{ color: "#2A4376", fontWeight: 600 }}>
                  {index + 1}. {field.fieldType}
                </Typography>
                <TextField
                  sx={{
                    backgroundColor: "#FFFF",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  size="small"
                />
              </FormControl>
            </Box>
          ))}
        </Box>
        <MyButton onClick={handlePopupOpen} />
        <Dialog open={openPopup} onClose={handleClosePopup}>
          <AddFieldPopup onClose={handleClosePopup} />
        </Dialog>
      </Box>
    </Box>
  );
};

export default FormBuilder;
