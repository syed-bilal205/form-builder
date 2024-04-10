import {
  Table,
  TableBody,
  TableCell,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const EcrfForm = () => {
  const [selectedActions, setSelectedActions] = useState(
    Array(9).fill("")
  );

  const row = [
    {
      name: "Demographics",
      sectionFields: "2/25",
      actions: ["Edit", "Duplicate"],
    },
    {
      name: "Contact Information",
      sectionFields: "6/24",
      actions: ["View", "Delete"],
    },
    {
      name: "Medical History",
      sectionFields: "8/30",
      actions: ["Create", "Update"],
    },
    {
      name: "Allergies",
      sectionFields: "4/15",
      actions: ["Add", "Remove"],
    },
    {
      name: "Medications",
      sectionFields: "10/40",
      actions: ["Review", "Prescribe"],
    },
    {
      name: "Vital Signs",
      sectionFields: "3/12",
      actions: ["Record", "Analyze"],
    },
    {
      name: "Family History",
      sectionFields: "5/20",
      actions: ["View", "Edit"],
    },
    {
      name: "Procedures",
      sectionFields: "7/28",
      actions: ["Schedule", "Cancel"],
    },
    {
      name: "Laboratory Tests",
      sectionFields: "12/50",
      actions: ["Order", "Review"],
    },
  ];

  const handleChange = (index, event) => {
    const newSelectedActions = [...selectedActions];
    newSelectedActions[index] = event.target.value;
    setSelectedActions(newSelectedActions);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        aria-label="ecrf form"
        sx={{ borderCollapse: "collapse" }}>
        <TableHead
          sx={{ backgroundColor: "#0E6ACE", color: "#FFFFFF" }}>
          <TableRow>
            <TableCell
              sx={{
                border: "1px solid #FFFFFF",
                fontWeight: "bold",
              }}>
              Forms
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: "1px solid #FFFFFF",
                fontWeight: "bold",
              }}>
              Section/Fields
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: "1px solid #FFFFFF",
                fontWeight: "bold",
              }}>
              Enabled as Survey
            </TableCell>
            <TableCell
              align="right"
              sx={{
                border: "1px solid #FFFFFF",
                fontWeight: "bold",
              }}>
              Form Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ backgroundColor: "#F1F5F9" }}>
          {row.map((item, index) => (
            <TableRow key={index}>
              <TableCell
                component="th"
                scope="row"
                sx={{ border: "1px solid #FFFFFF" }}>
                {item.name}
              </TableCell>
              <TableCell
                align="center"
                sx={{ border: "1px solid #FFFFFF" }}>
                {item.sectionFields}
              </TableCell>
              <TableCell
                align="center"
                sx={{ border: "1px solid #FFFFFF" }}>
                <Button
                  sx={{
                    backgroundColor: "#FEF3C7",
                    color: "#000",
                    border: "1px solid #FFFFFF",
                  }}>
                  Enable
                </Button>
              </TableCell>
              <TableCell
                align="right"
                style={{ width: "200px" }}
                sx={{ border: "1px solid #FFFFFF" }}>
                <Select
                  size="small"
                  value={selectedActions[index]}
                  sx={{
                    backgroundColor: "#FFFF",
                    width: "100%",
                    color: "#94A3B8",
                  }}
                  onChange={(event) => handleChange(index, event)}
                  displayEmpty
                  inputProps={{ "aria-label": "Choose action" }}>
                  <MenuItem value="" disabled>
                    Choose action
                  </MenuItem>
                  {item.actions.map((action) => (
                    <MenuItem key={action} value={action}>
                      {action}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EcrfForm;
