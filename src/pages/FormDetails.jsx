import { useState, useEffect } from "react";
import { Toolbar, Box, Typography, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Eye from "../assets/eye.png";
import Icon from "../assets/add.png";

const FormDetails = () => {
  const { id } = useParams();
  const [subjectData, setSubjectData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response = await axios.get(
          `https://staging-edc-api1.azurewebsites.net/api/v1/form-responses/${id}`
        );
        setSubjectData(response.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Error fetching subject data");
      }
    };

    fetchSubjectData();
  }, [id]);

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!subjectData) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  // Format date and time
  const submittedAt = new Date(
    subjectData.submitted_at
  ).toLocaleString();

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
            Subject ID: {subjectData.id}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#2A4376", fontWeight: 600 }}>
            <img src={Icon} alt="" style={{ paddingBottom: "8px" }} />
            Visit 1
          </Typography>
          <TextField
            label="Submitted At"
            value={submittedAt}
            fullWidth
            variant="outlined"
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              // Apply styling to the label
              sx: {
                fontWeight: "bold",
              },
            }}
          />
          {subjectData.values.map((value, index) => (
            <TextField
              key={index}
              label={`Field ${value.field}`}
              value={
                Array.isArray(value.value)
                  ? value.value.join(", ")
                  : value.value
              }
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                sx: {
                  fontWeight: "bold",
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FormDetails;
