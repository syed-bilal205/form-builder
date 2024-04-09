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
import DatePicker from "@mui/lab/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { addAdditionalField } from "../redux/formDataSlice";

const AddFieldPopup = ({ onClose }) => {
  const [tab, setTab] = useState("General");
  const dispatch = useDispatch();
  const generalField = useSelector((state) => state.formData);

  const handleClose = () => onClose();

  const handleTabChange = (newTab) => setTab(newTab);

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(addAdditionalField({ [name]: value }));
  };

  const handleDateChange = (date) => {
    dispatch(addAdditionalField({ date }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!generalField.fieldType || !generalField.fieldLabel) {
      alert("Please Select Field.");
      return;
    }
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
                value={generalField.advancedField}
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
              <DatePicker
                label="Choose Date"
                value={generalField.date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
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

export default AddFieldPopup;
