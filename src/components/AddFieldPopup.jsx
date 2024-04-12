import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Chip,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addAdditionalField } from "../redux/formDataSlice";
import PropTypes from "prop-types";

const AddFieldPopup = ({ onClose }) => {
  const [tab, setTab] = useState("General");
  const dispatch = useDispatch();
  const generalField = useSelector((state) => state.formData);

  const handleTabChange = (newTab) => setTab(newTab);

  const handleAddField = (fieldName, fieldValue, value) => {
    let labelValue = fieldValue;
    if (fieldName === "fieldType") {
      labelValue =
        fieldValue === "text" ? "Text Field" : "Date Field";
    }
    const addedField = {
      id: Date.now(),
      [fieldName]: fieldValue,
      [fieldValue]: value,
      label: fieldName !== "fieldLabel" ? labelValue : null,
    };
    dispatch(addAdditionalField(addedField));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onClose();
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
          onClick={onClose}
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
                onClick={(e) =>
                  handleAddField(
                    "fieldLabel",
                    "Field Label",
                    e.target.value
                  )
                }
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel htmlFor="variableName">
                Variable Name
              </InputLabel>
              <TextField
                id="variableName"
                variant="outlined"
                fullWidth
                onClick={(e) =>
                  handleAddField(
                    "fieldLabel",
                    "Variable Name",
                    e.target.value
                  )
                }
              />
            </FormControl>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
              }}>
              <FormControl sx={{ m: 1, flex: 1 }}>
                <TextField
                  name="tooltip"
                  label="Tooltip"
                  variant="outlined"
                  fullWidth
                  onClick={(e) =>
                    handleAddField(
                      "fieldLabel",
                      "Tooltip",
                      e.target.value
                    )
                  }
                />
              </FormControl>

              <FormControl sx={{ m: 1, flex: 1 }}>
                <TextField
                  name="helpText"
                  label="Help Text"
                  variant="outlined"
                  fullWidth
                  onClick={(e) =>
                    handleAddField(
                      "fieldLabel",
                      "Help Text",
                      e.target.value
                    )
                  }
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
              }}>
              <FormControl sx={{ m: 1, flex: 1 }}>
                <TextField
                  name="placeholderText"
                  label="Placeholder Text"
                  variant="outlined"
                  fullWidth
                  onClick={(e) =>
                    handleAddField(
                      "fieldLabel",
                      "Placeholder Text",
                      e.target.value
                    )
                  }
                />
              </FormControl>

              <FormControl sx={{ m: 1, flex: 1 }}>
                <TextField
                  name="customAlignment"
                  label="Custom Alignment"
                  variant="outlined"
                  fullWidth
                  onClick={(e) =>
                    handleAddField(
                      "fieldLabel",
                      "Custom Alignment",
                      e.target.value
                    )
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
                onClick={(e) =>
                  handleAddField(
                    "fieldLabel",
                    "Add Options",
                    e.target.value
                  )
                }
              />
            </FormControl>

            <Chip
              sx={{ backgroundColor: "primary.main", color: "white" }}
              label="Deletable"
              onClick={(e) =>
                handleAddField("chip1", "Deletable", e.target.value)
              }
              onDelete={() => {}}
            />

            <Chip
              sx={{ backgroundColor: "primary.main", color: "white" }}
              label="Deletable"
              onClick={(e) =>
                handleAddField("chip2", "Deletable", e.target.value)
              }
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
                value={generalField.dateFormat || ""}
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
            onClick={onClose}
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
