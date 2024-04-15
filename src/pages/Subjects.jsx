import { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Search from "../assets/search.png";
import FormDetails from "./FormDetails"; // Import the FormDetails component

const Subjects = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null); // State to store the selected subject ID

  const handleClick = () => {
    navigate("/form-builder");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://staging-edc-api1.azurewebsites.net/api/v1/form-responses?search=${search}`
        );

        setData(response.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Error fetching data");
      }
    };
    fetchData();
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubjectClick = (event, subjectId) => {
    const isSubjectIdCell = event.target.tagName === "A";
    if (isSubjectIdCell) {
      setSelectedSubjectId(subjectId);
    }
  };

  if (selectedSubjectId) {
    return <FormDetails id={selectedSubjectId} />;
  }

  return (
    <div
      style={{
        padding: "0 20px",
        maxWidth: "800px",
        margin: "auto",
      }}>
      <Typography variant="h6">Subjects</Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}>
        <TextField
          id="outlined-search"
          placeholder="Search"
          type="search"
          size="small"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <img src={Search} alt="" />
              </InputAdornment>
            ),
            sx: { backgroundColor: "#F1F5F9" },
          }}
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                outline: "none",
              },
            },
          }}
        />
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          style={{ width: "150px" }}>
          Add Subject
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ marginTop: "20px", borderRadius: "5px" }}>
        <Table aria-label="simple table">
          <TableHead
            sx={{ backgroundColor: "#0E6ACE", color: "white" }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  border: "1px solid #ffffff",
                  color: "white",
                }}>
                Subject ID
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  border: "1px solid #ffffff",
                  color: "white",
                }}>
                Site ID
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  border: "1px solid #ffffff",
                }}>
                Created By
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  border: "1px solid #ffffff",
                }}>
                Created On
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  border: "1px solid #ffffff",
                }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {error ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {error}
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data
                .filter((row) =>
                  row.values.some(
                    (value) =>
                      typeof value?.value === "string" &&
                      value?.value
                        .toLowerCase()
                        .includes(search.toLowerCase())
                  )
                )
                .map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={(event) =>
                      handleSubjectClick(event, row.id)
                    }
                    style={{ cursor: "pointer" }}>
                    <TableCell
                      align="center"
                      sx={{ border: "1px solid #dddddd" }}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/subject/${row.id}`}>
                        {row.id}
                      </Link>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: "1px solid #dddddd" }}>
                      {row.values[0]?.value || "N/A"}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: "1px solid #dddddd" }}>
                      {row.values[1]?.value || "N/A"}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: "1px solid #dddddd" }}>
                      {row.values[2]?.value || "N/A"}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: "1px solid #dddddd" }}>
                      {row.values[3]?.value || "N/A"}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Subjects;
