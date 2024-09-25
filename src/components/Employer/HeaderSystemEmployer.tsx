import React, { Dispatch, SetStateAction } from "react";
import classes from "./HeaderSystemEmployer.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink } from "react-router-dom";
import Image from "./../../assets/image/logo.jpg.webp";
import CreateIcon from "@mui/icons-material/Create";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface props{
  setOpen?: Dispatch<SetStateAction<boolean>>;
  open?:boolean
}

export default function HeaderSystemEmployer({setOpen,open}:props) {
 
  const handleOpen =()=>{
    if (setOpen) {
      setOpen(!open);
    }
}
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <button className={classes.logo}  onClick={handleOpen}>
          <MenuIcon  className={classes.iconMenu} />
        </button>
        <Link to={"/"} className={classes.link}>
          <img src={Image} alt="logo" className={classes.img} />
        </Link>
        <div className={classes.div}>
          <ul className={classes.ul}>
            <li className={classes.li}>
              <NavLink className={classes.navlink} to='create-jobs'>
                <CreateIcon className={classes.icon} />
                Job Posts
              </NavLink>
            </li>
            <li className={classes.li}>
              <NavLink className={classes.navlink} to={"/"}>
                <CreateIcon className={classes.icon} />
                Find CV
              </NavLink>
            </li>
            <li className={classes.li}>
              <NavLink className={classes.navlink1} to={"/"}>
                <CircleNotificationsIcon className={classes.iconNotification} />
              </NavLink>
            </li>
            <li className={classes.li}>
              <NavLink className={classes.navlink2} to={"/"}>
               <div className={classes.div1}></div>

               <ArrowDropDownIcon sx={{color:'white',marginLeft:'.57rem',}}/>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
