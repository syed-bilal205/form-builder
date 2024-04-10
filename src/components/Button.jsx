import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const DashedButton = styled(Button)(({ theme }) => ({
  border: `1px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  color: "#0E6ACE",
  fontWeight: 400,
  fontSize: "16px",
  margin: "1rem 0",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

function MyButton({ onClick, title }) {
  return (
    <DashedButton onClick={onClick} variant="contained">
      {title}
    </DashedButton>
  );
}

export default MyButton;
