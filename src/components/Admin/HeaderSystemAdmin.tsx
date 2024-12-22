import React, { Dispatch, SetStateAction, useState } from "react";
import classes from "./HeaderSystemAdmin.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
// import Image from "./../../assets/image/logo.jpg.webp";
import CreateIcon from "@mui/icons-material/Create";
// import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
// import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography  from "@mui/material/Typography";
import Box  from "@mui/material/Box";




interface props {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  open?: boolean;
  token: unknown;
}

// export default function HeaderSystemAdmin({ setOpen, open, token }: props) {
  const HeaderSystemAdmin: React.FC<props> = ({ setOpen, open, token }) => {
  const handleOpen = () => {
    if (setOpen) {
      setOpen(!open);
    }
  };
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  // const [readOpen, setReadOpen] = useState<{ [key: number]: boolean }>({});
  const [openModalNotification, setOpenModalNotification] =
    useState<boolean>(false);

  // Handle clicking "More" to toggle the "Mark as read" option

  // Close the modal when clicking outside of it
  const handleClickOutside = () => {
    setOpenModalNotification(false);
  };

  const handleOpenProfile = () => {
    setOpenProfile(!openProfile);
    console.log("dsdasda");
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.clear();
    navigate("/auth/Admin");
  };
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <button className={classes.logo} onClick={handleOpen}>
          <MenuIcon className={classes.iconMenu} />
        </button>
        <Link to={"#"} className={classes.link} style={{textDecoration:'none'}}>
        {/* <Typography
                  variant="h2"
                  sx={{
                    lineHeight: 1.5,
                    fontSize: "22px",
                    fontWeight: 700,
                    marginTop: 0,
                    marginBottom: 0,
                    boxSizing: "border-box",
                    display: "block",
                    color: "#fff",
                  }}
                >
                  Amazing Job
                </Typography> */}
                <Box
                sx={{
                  display: "flex",
                  alignItems: "center", // Căn giữa theo chiều dọc
                }}
              >
                {/* Phần chữ "it" */}
                <Box
                  sx={{
                    backgroundColor: "#ff0000",
                    color: "#fff",
                    fontWeight: 700, 
                    fontSize: "22px", 
                    fontFamily: "Lexend, sans-serif", 
                    lineHeight: "1",
                    width: "32px", 
                    height: "32px", 
                    borderRadius: "50%", 
                    display: "flex",
                    justifyContent: "center", 
                    alignItems: "center",
                    marginRight: "3px", 
                  }}
                >
                  A
                </Box>

             
                <Typography
                  variant="h2"
                  sx={{
                    color: "#fff",
                    fontWeight: 700, 
                    fontSize: "22px", 
                    fontFamily: "Lexend, sans-serif",
                    lineHeight: "1.5", 

                  }}
                >
                mazingJob
                </Typography>
              </Box>
        </Link>
        <div className={classes.div}>
          <ul className={classes.ul}>
            {/* <li className={classes.li}>
              <NavLink className={classes.navlink} to="Account">
                <CreateIcon className={classes.icon} />
                User Manage
              </NavLink>
            </li> */}
            <li className={classes.li}>
              <NavLink className={classes.navlink} to="">
                <CreateIcon className={classes.icon} />
                Manage Company Info
              </NavLink>
            </li>
            <li className={classes.li}>
              <NavLink className={classes.navlink} to="skillSet">
                <CreateIcon className={classes.icon} />
                Manage SkillSets
              </NavLink>
            </li>
            <li className={classes.li}>
              <NavLink className={classes.navlink} to="JobType">
                <CreateIcon className={classes.icon} />
                Manage JobType
              </NavLink>
            </li>
            <li className={classes.li}>
              <NavLink className={classes.navlink} to="Benefits">
                <CreateIcon className={classes.icon} />
                Manage Benefits
              </NavLink>
            </li>
            <li className={classes.li}>
              <NavLink className={classes.navlink} to="BusinessStream">
                <CreateIcon className={classes.icon} />
                Manage BusinessStream Stream
              </NavLink>
            </li>
            {/* <li className={classes.li} onClick={handleOpenNotification}>
              <NavLink className={classes.navlink1} to={"#"}>
                <CircleNotificationsIcon className={classes.iconNotification} />
                <span className={classes.span5}>{notifications.length}</span>
              </NavLink>
              {openModalNotification && (
                <div
                  className={classes.div2}
                  onClick={(e) => e.stopPropagation()}
                >
                  <li className={classes.li1}>
                    <span className={classes.span}>Notification</span>
                    <div className={classes.div3}>
                      <a href="#" role="button" className={classes.a}>
                        Mark all as read
                      </a>
                    </div>
                  </li>
                  <li className={classes.li2}>
                    <ul className={classes.ul1}>
                      {notifications.map((notification) => (
                        <li key={notification.id} className={classes.li3}>
                          <div className={classes.div4}>
                            <Link to="#" className={classes.link4}>
                              <div className={classes.div5}>
                                <span className={classes.span1}>
                                  <PriorityHighOutlinedIcon fontSize="small" />
                                </span>
                              </div>
                              <div className={classes.div6}>
                                <div className={classes.div7}>
                                  <span className={classes.span2}>
                                    {notification.title}
                                  </span>
                                </div>
                                <div className={classes.div8}>
                                  {notification.message}
                                </div>
                              </div>
                            </Link>
                            <div className={classes.div9}>
                              <div className={classes.div10}>
                                <span
                                  className={classes.span3}
                                  onClick={(e) =>
                                    handleOpenReadMark(e, notification.id)
                                  }
                                >
                                  <MoreHorizOutlinedIcon fontSize="small" />
                                </span>
                                {readOpen[notification.id] && (
                                  <div className={classes.div11}>
                                    <Link to="#" className={classes.link2}>
                                      Mark as read
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className={classes.div12}>
                            <div className={classes.div13}>
                              <span className={classes.span4}>
                                {notification.date}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                </div>
              )}
            </li> */}
            {Boolean(token) && (
              <li className={classes.li} onClick={handleOpenProfile}>
                <NavLink className={classes.navlink2} to="#">
                  <div className={classes.div1}></div>
                  <ArrowDropDownIcon
                    sx={{ color: "white", marginLeft: ".57rem" }}
                  />
                </NavLink>
                {openProfile && (
                  <div className={classes.account}>
                    <div className={classes.acc1} onClick={handleLogout}>
                      <LogoutIcon sx={{ color: "black" }} />
                      <span style={{ boxSizing: "border-box" }}> logout</span>
                    </div>
                  </div>
                )}
              </li>
            )}
            {/* <li className={classes.li}>
              <NavLink className={classes.navlink2} to={"#"}>
                <div className={classes.div1}></div>
                <ArrowDropDownIcon
                  sx={{ color: "white", marginLeft: ".57rem" }}
                />
              </NavLink>
            </li> */}
          </ul>
        </div>
      </nav>

      {/* Click outside of the modal to close it */}
      {openModalNotification && (
        <div className={classes.overlay} onClick={handleClickOutside}></div>
      )}
    </header>
  );
}
export default HeaderSystemAdmin