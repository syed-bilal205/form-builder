import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  Chip,
  FormControlLabel,
  TextField,
  Grid,
  MenuItem,
  Switch,
} from "@mui/material";

const AddFieldPopup = ({ onClose, addFields }) => {
  const [tab, setTab] = useState("General");
  const [generalField, setGeneralField] = useState({
    fieldType: "",
    fieldLabel: "",
    name: "",
    identifier: true,
    tooltip: "Tooltip",
    helpText: "Help Text",
    placeholderText: "Placeholder Text",
    customAlignment: "left",
  });

  useEffect(() => {
    setGeneralField((prevGeneralField) => ({
      ...prevGeneralField,
      fieldLabel: getDefaultLabelForFieldType(
        prevGeneralField.fieldType
      ),
    }));
  }, [generalField.fieldType]);

  const handleClose = () => onClose();

  const handleTabChange = (newTab) => setTab(newTab);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setGeneralField((prevGeneralField) => ({
      ...prevGeneralField,
      [name]: fieldValue,
    }));
  };

  const getDefaultLabelForFieldType = (fieldType) => {
    switch (fieldType) {
      case "text":
        return "Text Label";
      case "number":
        return "Number Label";
      case "email":
        return "Email Label";
      default:
        return "Default Label";
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addFields(generalField);
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

      <form onSubmit={onSubmit}>
        {tab === "General" && (
          <Box>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel htmlFor="fieldType">Field Type</InputLabel>
              <Select
                id="fieldType"
                name="fieldType"
                value={generalField.fieldType}
                onChange={handleChange}
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
                id="fieldLabel"
                name="fieldLabel"
                value={generalField.fieldLabel}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                multiline
                rows={2}
              />
            </FormControl>

            <Grid container spacing={1} alignItems="center">
              <Grid item xs={6}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel>Variable Name</InputLabel>
                  <TextField
                    name="name"
                    value={generalField.name}
                    onChange={handleChange}
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      name="identifier"
                      checked={generalField.identifier}
                      onChange={handleChange}
                    />
                  }
                  label="Identifier"
                  sx={{ marginLeft: "auto" }}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  name="tooltip"
                  value={generalField.tooltip}
                  onChange={handleChange}
                  label="Tooltip"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Tooltip"
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  name="helpText"
                  value={generalField.helpText}
                  onChange={handleChange}
                  label="Help Text"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Help Text"
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
                  value={generalField.placeholderText}
                  onChange={handleChange}
                  label="Placeholder Text"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Placeholder Text"
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  name="customAlignment"
                  value={generalField.customAlignment}
                  onChange={handleChange}
                  label="Custom Alignment"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Custom Alignment"
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
                value={generalField.placeholderText}
                onChange={handleChange}
                label="Add Options"
                variant="outlined"
                fullWidth
              />
            </FormControl>
            <Chip
              sx={{ bgcolor: "primary.main", color: "white" }}
              label="Deletable"
              onDelete={() => {}}
            />

            <Chip
              sx={{ bgcolor: "primary.main", color: "white" }}
              label="Deletable"
              onDelete={() => {}}
            />
          </Box>
        )}
        {tab === "Validation" && (
          <Box>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel htmlFor="date-format-select">
                Date Format
              </InputLabel>
              <Select
                id="date-format-select"
                name="fieldType"
                value={generalField.fieldType}
                onChange={handleChange}
                label="Choose Date Format"
                variant="outlined">
                <MenuItem value="MM/dd/yyyy">
                  <Typography>MM/dd/yyyy</Typography>
                </MenuItem>
                <MenuItem value="dd/MM/yyyy">
                  <Typography>dd/MM/yyyy</Typography>
                </MenuItem>
                <MenuItem value="yyyy-MM-dd">
                  <Typography>yyyy-MM-dd</Typography>
                </MenuItem>
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
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddFieldPopup;
