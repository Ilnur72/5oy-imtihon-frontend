import { IconButton } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.scss";

//img
import { useSelector } from "react-redux";
import dashboardIcon from "../../assets/SidebarIcon/dashboard.svg";
import guideIcon from "../../assets/SidebarIcon/guides.svg";
import profileIcon from "../../assets/SidebarIcon/profile.svg";
import userIcon from "../../assets/SidebarIcon/users.svg";
import nofiocationIcon from "../../assets/SidebarIcon/notification.svg";

const forbiddenLinks = ["User", "Dashboard"];

const Sidebar = () => {
  const navigate = useNavigate();
  const [state, setstate] = React.useState(false);
  const { user } = useSelector((state) => state.jwtToken);
  let links = [
    { img: dashboardIcon, link: "Dashboard", url: "/" },
    { img: userIcon, link: "User", url: "/users" },
    { img: guideIcon, link: "Guide", url: "/guides" },
    { img: profileIcon, link: "Profile", url: `/profile/me` },
    { img: nofiocationIcon, link: "Notification", url: `/notification` },
  ];
  return (
    <aside
      style={{
        width: state ? "15%" : "5.5%",
        height: "91vh",
        border: "none",
        top: "62px",
        borderLeft: "none",
        borderRight: "2px solid #EAEEF4",
        transition: "0.4s all",
      }}
      onMouseEnter={() => setstate(true)}
      onMouseLeave={() => setstate(false)}
      className="sidebar sticky left-0 pt-4 flex flex-col justify-between items-start gap-4 border"
    >
      <div className="flex flex-col gap-4">
        {links.map((item, index) => {
          return (
            <NavLink
              className={`${
                user?.role === "employee" && forbiddenLinks.includes(item.link)
                  ? "hidden"
                  : "block"
              }`}
              key={index}
              to={item.url}
            >
              {({ isActive }) => (
                <div className="flex items-center  relative">
                  <IconButton
                    sx={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                      border: "2px solid #EAEEF4",
                      background: isActive ? "#514EF3" : "#fff",
                      transition: "all 0.4s",
                      zIndex: 1,
                      "&:hover": {
                        backgroundColor: isActive ? "#514EF3" : "#fff",
                      },
                    }}
                  >
                    <img
                      style={{
                        filter: isActive ? "brightness(2000%)" : null,
                      }}
                      className="fill-white "
                      src={item.img}
                      alt=""
                    />
                  </IconButton>
                  <strong
                    style={{ transition: "0.3s all" }}
                    className={`text-xl absolute text-primary ${
                      state ? "left-16" : "left-0 opacity-0"
                    }`}
                  >
                    {item.link}
                  </strong>
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
      <div
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        className="flex items-center mb-5"
      >
        <IconButton
          sx={{
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            border: "2px solid #EAEEF4",
            backgroundColor: "#fff",
            zIndex: 1,
          }}
        >
          <i
            className="fa-solid fa-arrow-right-from-bracket fa-rotate-180"
            style={{ color: "#7B8F9E" }}
          ></i>
        </IconButton>
        <strong
          style={{ transition: "0.4s all" }}
          className={`text-xl absolute text-primary ${
            state ? "left-20" : "left-0 opacity-0"
          }`}
        >
          Logout
        </strong>
      </div>
    </aside>
  );
};

export default Sidebar;
