import { useState } from "react";
import {
  Toolbar,
  Box,
  Typography,
  FormControl,
  TextField,
  Dialog,
} from "@mui/material";

import Eye from "../assets/eye.png";
import Delete from "../assets/delete.png";
import Copy from "../assets/copy.png";
import Edit from "../assets/edit.png";
import Branching from "../assets/branching.png";
import Icon from "../assets/add.png";
import MyButton from "../components/Button";
import AddFieldPopup from "../components/AddFieldPopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearFormData } from "../redux/formDataSlice";

const FormBuilder = () => {
  const formData = useSelector((state) => state.formData);
  const additionalFields = formData.additionalFields || [];
  const [openPopup, setOpenPopup] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePopupOpen = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const formId = 3;

  const handleFormSubmit = async () => {
    try {
      const requiredFields = [
        "type",
        "fieldLabel",
        "variableName",
        "placeholderText",
        "customAlignment",
      ];
      const formDataCopy = { ...formData, form: formId };

      formDataCopy.position += 1;

      if (!formDataCopy.type) {
        formDataCopy.type = "text";
      }

      // Check if at least one required field is filled
      let hasFilledField = false;
      for (const field of requiredFields) {
        if (field in formDataCopy && formDataCopy[field]) {
          hasFilledField = true;
          break;
        }
      }

      if (!hasFilledField) {
        throw new Error(
          `Please fill in at least one required field.`
        );
      }

      const validTypes = ["text", "select", "checkbox"];
      if (!validTypes.includes(formDataCopy.type)) {
        throw new Error("Invalid type.");
      }

      // Optional: Set default label if empty
      if (!formDataCopy.label) {
        formDataCopy.label = "Default Label";
      }

      formDataCopy.color = {
        label: "color",
        type: "select",
        options: ["red", "yellow", "green"],
        required: true,
        form: formId,
      };

      const response = await axios.post(
        "https://staging-edc-api1.azurewebsites.net/api/v1/form-fields/",
        formDataCopy
      );

      console.log("Form submitted successfully:", response.data);
      setError(null);
      dispatch(clearFormData());
      handleClosePopup();
      navigate("/Subjects");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Validation error from backend. Ignoring...");
        setError(null);
        dispatch(clearFormData());
        handleClosePopup();
        navigate("/Subjects");
      } else {
        setError("An error occurred while submitting the form.");
        console.error("Error submitting form:", error);
      }
    }
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
            <img src={Icon} alt="" style={{ paddingBottom: "8px" }} />
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
                  {index + 1}.{" "}
                  {field.fieldLabel ||
                    field.fieldType ||
                    field.dateFormat ||
                    field.chip1 ||
                    field.chip2}
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
        <MyButton onClick={handlePopupOpen} title={"Add Field"} />
        <Dialog open={openPopup} onClose={handleClosePopup}>
          <AddFieldPopup onClose={handleClosePopup} />
        </Dialog>
        <MyButton onClick={handleFormSubmit} title={"Submit"} />
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FormBuilder;
