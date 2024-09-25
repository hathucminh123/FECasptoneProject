import React, { useState } from "react";
import classes from "./SideBarEmployer.module.css";
import { Link, NavLink } from "react-router-dom";
import SecurityIcon from "@mui/icons-material/Security";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
interface props {
  open: boolean;
}

export default function SideBarEmployer({ open }: props) {
  const [drop, setDrop] = useState<boolean>(false);
  const handleOpen = () => {
    setDrop(!drop);
  };
  return (
    <nav
      className={` ${classes.nav}  `}
      style={open ? { width: "64px" } : { width: "260px" }}
    >
      <div className={classes.div}>
        <div className={classes.div1}>
          <div className={classes.div2}>
            <div className={classes.div3}>
              <div className={classes.div4}>
                <Link to="account" className={classes.link}>
                  <div className={classes.img}></div>
                </Link>
              </div>
              <div className={`${open ? classes.div5 : classes.div5Open} `}>
                <span className={classes.span}>
                  <Link to={"/"} className={classes.link1}>
                    Ha Thuc Minh
                  </Link>
                </span>
                <span className={classes.span1}>Employer</span>
                <div className={classes.div7}>Welcome Back!</div>
              </div>
            </div>
            <div className={classes.updateButtonContainer}>
              <button
                className={`${
                  open ? classes.updateButton : classes.updateButtonOpen
                } `}
              >
                <i className={classes.i}>
                  {" "}
                  <SecurityIcon fontSize="small" />
                </i>

                <span
                  className={`${
                    open ? classes.updateText : classes.updateTextOpen
                  } `}
                >
                  Update account information
                  <NavigateNextIcon className={classes.icon} />
                  {/* <NavigateNextIcon className={classes.icon} /> */}
                </span>

                {/* <NavigateNextIcon className={classes.icon1} /> */}
              </button>
            </div>
          </div>
        </div>
        <div className={classes.menu}>
          <ul className={classes.ul}>
            <li className={classes.li}>
              <div className={classes.div8}>
                <NavLink
                  to="/employer-verify/jobs"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  <>
                    <div className={classes.div9}>
                      <span className={classes.span4}>
                        <PostAddOutlinedIcon
                          fontSize="large"
                          sx={{
                            fontSize: "14px",
                            display: "block",
                            fontWeight: 400,
                          }}
                        />
                      </span>
                    </div>
                    <div
                      className={`${open ? classes.div10 : classes.div10Open} `}
                    >
                      <span className={classes.span5}>Recruitment news</span>
                    </div>
                    <div className={classes.div11}></div>
                  </>
                </NavLink>
              </div>
            </li>
            <li className={classes.li}>
              <div className={classes.div8}>
                <NavLink
                  to="manageCVs"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  <div className={classes.div9}>
                    <span className={classes.span4}>
                      <AccountCircleOutlinedIcon
                        fontSize="large"
                        sx={{
                          fontSize: "14px",
                          display: "block",
                          fontWeight: 400,
                        }}
                      />
                    </span>
                  </div>
                  <div
                    className={`${open ? classes.div10 : classes.div10Open} `}
                  >
                    <span className={classes.span5}>Manage CVs</span>
                  </div>
                  <div className={classes.div11}></div>
                </NavLink>
                <div style={{ cursor: "pointer" }} onClick={handleOpen}>
                  {drop ? (
                    <ArrowDropDownIcon className={classes.icon1} />
                  ) : (
                    <NavigateNextIcon className={classes.icon} />
                  )}
                </div>
              </div>

              {drop && (
                <ul className={classes.ul1}>
                  <li className={classes.li1}>
                    <NavLink to={"/"} className={classes.navlink}>
                      <div
                        className={`${
                          open ? classes.div10 : classes.div10Open
                        } `}
                      >
                        <span className={classes.span5}>Find cv</span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
