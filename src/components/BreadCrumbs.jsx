import { Breadcrumbs, Link as MuiLink } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnameArray = location.pathname
    .split("/")
    .filter((item) => item !== "");

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator=">"
      style={{ padding: "0.5rem 0", textDecoration: "none" }}>
      <MuiLink
        component={Link}
        to="/eCRF"
        color="inherit"
        style={{
          color: "black",
          textDecoration: "none",
          backgroundColor: "#F1F5F9",
          padding: "5px 10px",
          borderRadius: "5px",
        }}>
        Home
      </MuiLink>
      {pathnameArray.map((routeName, index) => (
        <MuiLink
          key={routeName}
          component={Link}
          to={`/${pathnameArray.slice(0, index + 1).join("/")}`}
          color="inherit"
          style={{ textDecoration: "none" }}>
          {routeName}
        </MuiLink>
      ))}
    </Breadcrumbs>
  );
};
export default BreadCrumbs;
