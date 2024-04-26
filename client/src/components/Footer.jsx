import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export function Copyright() {
  return (
    <Typography variant="body2" color="orange" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/IMinevitable-3">
        komal
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-4 text-center">
      <Copyright></Copyright>
    </footer>
  );
};

export default Footer;
