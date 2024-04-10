import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  Chip,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addAdditionalField } from "../redux/formDataSlice";
import PropTypes from "prop-types";
const AddFieldPopup = ({ onClose }) => {
  const [tab, setTab] = useState("General");
  const [addedFields, setAddedFields] = useState({});
  const dispatch = useDispatch();
  const generalField = useSelector((state) => state.formData);

  const handleClose = () => onClose();

  const handleTabChange = (newTab) => setTab(newTab);

  const handleAddField = (fieldName, fieldValue) => {
    let labelValue;

    switch (fieldName) {
      case "fieldLabel":
        labelValue = fieldValue;
        break;
      case "fieldType":
        labelValue =
          fieldValue === "text" ? "Text Field" : "Date Field";
        break;
      case "dateFormat":
        labelValue = fieldValue;
        break;
      case "chip1":
      case "chip2":
        setAddedFields((prevFields) => ({
          ...prevFields,
          [fieldName]: fieldValue,
        }));
        return; // Exit early
      default:
        break;
    }

    setAddedFields((prevFields) => ({
      ...prevFields,
      [fieldName]: fieldValue,
      label: labelValue,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const fieldsWithLabel = {
      ...addedFields,
      label: addedFields.fieldLabel,
    };
    dispatch(addAdditionalField(fieldsWithLabel));
    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "10px",
        backgroundColor: "#FFFF",
        maxWidth: "90%",
        width: "900px",
        margin: "auto",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Typography variant="h6">Add a Field</Typography>
        <Typography
          onClick={handleClose}
          sx={{ cursor: "pointer" }}
          variant="h6">
          X
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 0.5 }}>
        {["General", "Advance", "Validation"].map((tabName) => (
          <Button
            key={tabName}
            sx={{
              backgroundColor:
                tab === tabName ? "#0E6ACE" : "#F1F5F9",
              color: tab === tabName ? "#FFF" : "#94A3B8",
            }}
            onClick={() => handleTabChange(tabName)}>
            {tabName}
          </Button>
        ))}
      </Box>

      <form>
        {tab === "General" && (
          <Box>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel htmlFor="fieldType">Field Type</InputLabel>
              <Select
                id="fieldType"
                name="fieldType"
                value={generalField.fieldType || ""}
                onChange={(e) =>
                  handleAddField("fieldType", e.target.value)
                }
                variant="outlined"
                fullWidth>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="email">Email</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel htmlFor="fieldLabel">
                Field Label
              </InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                onClick={() =>
                  handleAddField("fieldLabel", "Field Label")
                }
              />
            </FormControl>

            <Grid item xs={6}>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel>Variable Name</InputLabel>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  onClick={() =>
                    handleAddField("fieldLabel", "Variable Name")
                  }
                />
              </FormControl>
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  name="tooltip"
                  label="Tooltip"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Tooltip"
                  onClick={() =>
                    handleAddField("fieldLabel", "Tooltip")
                  }
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  name="helpText"
                  label="Help Text"
                  variant="outlined"
                  fullWidth
                  onClick={() =>
                    handleAddField("fieldLabel", "Help Text")
                  }
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  name="placeholderText"
                  label="Placeholder Text"
                  variant="outlined"
                  fullWidth
                  onClick={() =>
                    handleAddField("fieldLabel", "Placeholder Text")
                  }
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  name="customAlignment"
                  label="Custom Alignment"
                  variant="outlined"
                  fullWidth
                  onClick={() =>
                    handleAddField("fieldLabel", "Custom Alignment")
                  }
                />
              </FormControl>
            </Box>
          </Box>
        )}

        {tab === "Advance" && (
          <Box sx={{ padding: "16px 0" }}>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <TextField
                name="placeholderText"
                label="Add Options"
                variant="outlined"
                fullWidth
                onClick={() =>
                  handleAddField("fieldLabel", "Add Options")
                }
              />
            </FormControl>
            <Chip
              sx={{ backgroundColor: "primary.main", color: "white" }}
              label="Deletable"
              onClick={() => {
                handleAddField("chip1", "Deletable");
              }}
              onDelete={() => {}}
            />

            <Chip
              sx={{ backgroundColor: "primary.main", color: "white" }}
              label="Deletable"
              onClick={() => {
                handleAddField("chip2", "Deletable");
              }}
              onDelete={() => {}}
            />
          </Box>
        )}
        {tab === "Validation" && (
          <Box>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="date-format-label">
                Date Format
              </InputLabel>
              <Select
                labelId="date-format-label"
                id="date-format"
                value={addedFields.dateFormat || ""}
                onChange={(e) =>
                  handleAddField("dateFormat", e.target.value)
                }
                variant="outlined"
                fullWidth>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="dd/MM/yyyy">DD/MM/YYYY</MenuItem>
                <MenuItem value="MM/dd/yyyy">MM/DD/YYYY</MenuItem>
                <MenuItem value="yyyy-MM-dd">YYYY-MM-DD</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 2,
            marginTop: "auto",
          }}>
          <Button
            onClick={handleClose}
            sx={{ backgroundColor: "#F1F5F9", color: "#000" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={onSubmit}
            variant="contained">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

AddFieldPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddFieldPopup;
