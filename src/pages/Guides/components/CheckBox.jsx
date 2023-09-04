import { Checkbox } from "@mui/material";
import React from "react";

const CheckBox = ({ username, handleCheck }) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <>
      <Checkbox
        onClick={() => setChecked(!checked)}
        checked={checked}
        name={username}
        onChange={handleCheck}
        color={"primary"}
        sx={{ color: "auto" }}
      />
    </>
  );
};

export default CheckBox;
