import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import classes from "./HeaderSystemEmployer.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import Image from "./../../assets/image/logo.jpg.webp";
import CreateIcon from "@mui/icons-material/Create";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
interface props {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  open?: boolean;
  token: unknown;
}

const notifications = [
  {
    id: 1,
    title: "Thông báo từ hệ thống",
    message: "Bạn quá giỏi nên không có gì thông báo",
    date: "26/9/2024",
    isRead: false, // track whether the notification is read or unread
  },
  {
    id: 2,
    title: "Cập nhật hệ thống",
    message: "Phiên bản mới đã được phát hành.",
    date: "27/9/2024",
    isRead: false,
  },
  {
    id: 3,
    title: "Lịch bảo trì",
    message: "Hệ thống sẽ bảo trì vào cuối tuần.",
    date: "28/9/2024",
    isRead: true,
  },
];

export default function HeaderSystemEmployer({ setOpen, open, token }: props) {
  const handleOpen = () => {
    if (setOpen) {
      setOpen(!open);
    }
  };
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [readOpen, setReadOpen] = useState<{ [key: number]: boolean }>({});
  const [openModalNotification, setOpenModalNotification] =
    useState<boolean>(false);
  const [companyId, setCompanyId] = useState<string | null>(
    localStorage.getItem("CompanyId")
  );
  useEffect(() => {
    const storedCompanyId = localStorage.getItem("CompanyId");
    setCompanyId(storedCompanyId);
  }, []);
  console.log("quao", readOpen);

  // Handle clicking "More" to toggle the "Mark as read" option
  const handleOpenReadMark = (event: React.MouseEvent, id: number) => {
    event.stopPropagation(); // Prevent event from closing the modal
    setReadOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  // Handle opening/closing the notification modal
  const handleOpenNotification = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenModalNotification(!openModalNotification);
  };

  // Close the modal when clicking outside of it
  const handleClickOutside = () => {
    setOpenModalNotification(false);
  };

  const handleOpenProfile = () => {
    setOpenProfile(!openProfile);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expiration');
    localStorage.clear();
    navigate("/employers/login");
  };

  const handleNavigate = () => {
    if (companyId === "null") {
      navigate("/employer-verify/jobs/InfoVerification");
      return;
    }
    navigate("create-jobs");
  };
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <button className={classes.logo} onClick={handleOpen}>
          <MenuIcon className={classes.iconMenu} />
        </button>
        <Link to={"/"} className={classes.link}>
        <Typography
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
              </Typography>
          {/* <img src={Image} alt="logo" className={classes.img} /> */}
        </Link>
        <div className={classes.div}>
          <ul className={classes.ul}>
            <li className={classes.li} onClick={handleNavigate}>
              <NavLink className={classes.navlink} to="#">
                <CreateIcon className={classes.icon} />
                Job Posts
              </NavLink>
            </li>
            <li className={classes.li}>
              <NavLink className={classes.navlink} to={"#"}>
                <CreateIcon className={classes.icon} />
                Find CV
              </NavLink>
            </li>
            <li className={classes.li} onClick={handleOpenNotification}>
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
            </li>

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
              <NavLink className={classes.navlink2} to={"/"}>
                <div className={classes.div1}></div>
                <ArrowDropDownIcon sx={{ color: "white", marginLeft: ".57rem" }} />
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
