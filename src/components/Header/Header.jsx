import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openState } from "../../store/openStateSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.jwtToken);
  return (
    <div style={{ background: "#F6FAFD" }} className=" sticky top-0 z-10">
      <div className="container h-16 mx-auto text-primary text-2xl font-extrabold flex justify-between items-center">
        <h2>
          {location.pathname == "/"
            ? "DASHBOARD"
            : location.pathname.split("/").splice(1, 1).join("").toUpperCase()}
        </h2>
        <div className="flex gap-4 items-center">
          <Button
            onClick={() => dispatch(openState(true))}
            sx={{
              display:
                user?.role === "admin" && location.pathname == "/users"
                  ? "block"
                  : "none",
              background: "#4b48e2",
              ":hover": { background: "#514eec" },
              borderRadius: "70px",
              paddingX: "20px",
              paddingY: "10px",
            }}
            variant="contained"
          >
            Add new User <i className="fa-solid fa-user-plus fa-lg ml-2"></i>
          </Button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
