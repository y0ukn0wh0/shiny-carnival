import React from "react";
import Button from "@mui/material/Button";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const Header = () => {
  const style = {
    largeIcon: {
      width: 40,
      height: 40,
      color: "orange",
    },
  };

  return (
    <div className="flex items-center justify-center">
      <h1 className="text-[3rem] font-bold mb-4 text-center text-orange">
        Your Notes
      </h1>
      <Button onClick={() => setOpenModal(true)}>
        <BorderColorIcon style={style.largeIcon} />
      </Button>
    </div>
  );
};

export default Header;
