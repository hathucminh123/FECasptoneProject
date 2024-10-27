import React, { useEffect, useState } from "react";
import classes from "./SideBarEmployer.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SecurityIcon from "@mui/icons-material/Security";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import {
  HttpTransportType,
  HubConnectionBuilder,
  IHttpConnectionOptions,
} from "@microsoft/signalr";
import { signalR } from "../../Services/mainService";
import { AxiosResponse } from "axios";
import { GetNotifications } from "../../Services/JobsPostActivity/GetNotifications";
import { GetUserProfile } from "../../Services/UserProfileService/UserProfile";
import { useQuery } from "@tanstack/react-query";
interface props {
  open: boolean;
  token:unknown
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}
export interface Notification {
  id: number;
  title: string;
  description: string;
  receiverId: number;
  isRead: boolean;
  jobPostActivityId: number;
  jobPostActivity: any;
  userAccount: any;
  createdDate: string;
  modifiedDate: any;
  createdBy: any;
  modifiedBy: any;
  isDeleted: boolean;
}

export default function SideBarEmployer({ open,token,notifications,setNotifications }: props) {
  const [drop, setDrop] = useState<boolean>(false);
  // const [notifications, setNotifications] = useState<Notification[]>([]);

  const userId=localStorage.getItem("userId")

  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    staleTime: 1000,
  });

  // const UserProfileData = UserProfile?.UserProfiles;
  const userName = `${UserProfile?.UserProfiles?.firstName ?? ""} ${
    UserProfile?.UserProfiles?.lastName ?? ""
  }`;

  const startConnection = async () => {
    try {
      const options: IHttpConnectionOptions = {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => {
          return `${token}`;
        },
      };

      const connection = new HubConnectionBuilder()
        .withUrl(signalR.employer.getNotificationsURL, options)
        .build();

      connection.on(
        signalR.employer.groupNotificationsKey,
        async (receivedMessage) => {
          await fetchNotifications();
          console.log(`Notify: ${receivedMessage}`);
        }
      );

      connection.onclose(() => {
        console.log("closed");
      });

      await connection.start();
      return () => {
        connection.stop();
      };
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response: AxiosResponse = await GetNotifications();
      if (response?.status === 200) {
        const notifications = response.data as Notification[];
        setNotifications(notifications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    startConnection();
    fetchNotifications();
  }, []);

  // const username = localStorage.getItem("name");
  const handleOpen = () => {
    setDrop(!drop);
  };
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/employer-verify/jobs/account");
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
                  <Link to={"#"} className={classes.link1}>
                    {userName}
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
                onClick={handleNavigate}
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
            <li className={classes.li}>
              <div className={classes.div8}>
                <NavLink
                  to="/employer-verify/jobs/system-notification"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  <>
                    <div className={classes.div9}>
                      <span className={classes.span4}>
                        <NotificationImportantOutlinedIcon
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
                      <span className={classes.span5}>System notification</span>
                    </div>
                    <div className={classes.div11}>
                      {notifications &&
                      notifications.some((notify) => !notify.isRead) ? (
                        <span
                          className={`${
                            open ? classes.span6 : classes.span6Open
                          } `}
                        >
                         {
                            notifications.filter((notify) => !notify.isRead)
                              ?.length
                          }
                        </span>
                      ) : (
                        // <span className={classes.span5}>
                        
                        // </span>
                        undefined
                      )}

                      {/* <span
                        className={`${
                          open ? classes.span6 : classes.span6Open
                        } `}
                      >
                        47
                      </span> */}
                    </div>
                    <div className={classes.div11}></div>
                  </>
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
