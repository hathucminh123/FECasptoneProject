import React, { useEffect, useState } from "react";
import classes from "./HeaderEmployerSystem.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { GetUserProfile } from "../../Services/UserProfileService/UserProfile";
import { useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../../Services/CompanyService/GetCompanies";
import {
  HttpTransportType,
  HubConnectionBuilder,
  IHttpConnectionOptions,
} from "@microsoft/signalr";
import { GetNotifications } from "../../Services/JobsPostActivity/GetNotifications";
import { signalR } from "../../Services/mainService";
import { AxiosResponse } from "axios";
import PaymentModal from "./PaymentModal";
import { AnimatePresence } from "framer-motion";
import ModalEmail from "./ModalEmail";
export interface Notification {
  id: number;
  title: string;
  description: string;
  receiverId: number;
  isRead: boolean;
  jobPostActivityId: number;
  // jobPostActivity: any;
  // userAccount: any;
  createdDate: string;
  // modifiedDate: any;
  // createdBy: any;
  // modifiedBy: any;
  isDeleted: boolean;
}
interface props {
  selectJobId?: number | undefined | null;
  notifications: Notification[];
  token: unknown;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export default function HeaderEmployerSystem({
  selectJobId,
  token,
  notifications,
  setNotifications,
}: props) {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [companyId, setCompanyId] = useState<string | null>(
    localStorage.getItem("CompanyId")
  );
  // const [IsPremium, setIsPremium] = useState<string | null>(null);
  const [openSettings, SetOpenSettings] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);


  useEffect(() => {
    const storedCompanyId = localStorage.getItem("CompanyId");
    // const IsPremium = localStorage.getItem("IsPremium");
    setCompanyId(storedCompanyId);
    // setIsPremium(IsPremium);
  }, []);

  const {
    data: Company,
    refetch: refetchCompanies,
    // isLoading: isCompanyLoading,
    // isError: isCompanyError,
  } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal: signal }),
    staleTime: 5000,
  });

  useEffect(() => {
    // Sync companyId from localStorage if it changes
    const storedCompanyId = localStorage.getItem("CompanyId");
    setCompanyId(storedCompanyId);
    refetchCompanies();
  }, [companyId, refetchCompanies]);

  const Companiesdata = Company?.Companies;
  const CompanyEmployer = Companiesdata?.find(
    (company) => company.id === Number(companyId)
  );

  const [open, setOpen] = useState<boolean>(false);
  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    staleTime: 1000,
  });
  const handleLogout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expiration');
    localStorage.clear();
    navigate("/employers/login");
  };

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

  useEffect(() => {
    startConnection();
    fetchNotifications();
  }, []);

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

  const UserProfileData = UserProfile?.UserProfiles;

  const handleCloseModalPayment = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    SetOpenSettings(true);
  };

  const handleClose = () => {
    SetOpenSettings(false);
  };

  const [openModalEmail, setOnpenModalEmail] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOnpenModalEmail(false);
  };


  return (
    <header className={classes.header}>
        <ModalEmail open={openModalEmail} onClose={handleCloseModal} />
      <AnimatePresence>
        {openModal && (
          <PaymentModal
            onClose={handleCloseModalPayment}
            // profile={profileScore}
            // id={idApplicants}
            // idJob={id}
          />
        )}
      </AnimatePresence>

      <div className={classes.header1}>
        <div className={classes.header2}>
          <NavLink to="" className={classes.link1}>
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
                fontFamily: "Lexend, sans-serif",
              }}
            >
              Amazing Job
            </Typography>
          </NavLink>
        </div>
        <nav className={classes.header3}>
          <NavLink
            to={
              companyId && companyId !== "null"
                ? `/EmployerJob/listjobs/OverView/${selectJobId}`
                : "/EmployerJob"
            }
            className={() =>
              `${classes.link2} ${
                location.pathname.startsWith(
                  `/EmployerJob/listjobs/OverView/${selectJobId}`
                )
                  ? classes.spanactive
                  : ""
              }`
            }
            end
          >
            {() => (
              <div className={classes.header4}>
                <div className={classes.header5}>
                  <span
                  // className={`${isActive ? classes.spanactive : ""} ${
                  //   classes.span
                  // }`}
                  >
                    <span style={{ display: "inline" }}>Jobs</span>
                  </span>
                </div>
              </div>
            )}
          </NavLink>

          <NavLink
            to={
              companyId && companyId !== "null"
                ? `/EmployerJob/applicants/jobs/${selectJobId}`
                : "/EmployerJob"
            }
            className={() =>
              `${classes.link2} ${
                location.pathname.startsWith(
                  `/EmployerJob/applicants/jobs/${selectJobId}`
                )
                  ? classes.spanactive
                  : ""
              }`
            }
            end
          >
            {() => (
              <div className={classes.header4}>
                <div className={classes.header5}>
                  <span
                  // className={`${isActive ? classes.spanactive : ""} ${
                  //   classes.span
                  // }`}
                  >
                    <span style={{ display: "inline" }}>Applicants</span>
                  </span>
                </div>
              </div>
            )}
          </NavLink>
          <NavLink
            to={
              companyId && companyId !== "null"
                ? `/EmployerJob/FindTalents/talent/${selectJobId}`
                : "/EmployerJob"
            }
            className={classes.link2}
          >
            {({ isActive }) => (
              <div className={classes.header4}>
                <div className={classes.header5}>
                  <span
                    className={`${isActive ? classes.spanactive : ""} ${
                      classes.span
                    }`}
                  >
                    <span style={{ display: "inline" }}>Find Talents</span>
                  </span>
                </div>
              </div>
            )}
          </NavLink>
        </nav>
        {/* {IsPremium !== "True" && ( */}
          <div className={classes.discover} onClick={() => setOpenModal(true)}>
            <span>Payment</span>
          </div>
        {/* )} */}

        <div className={classes.header6}></div>
        <div className={classes.header7}>
          <div className={classes.header22} onMouseEnter={handleOpen}>
            <button type="button" className={classes.button}>
              <span className={classes.span4}>
                <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  className={classes.svg1}
                >
                  <path
                    d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    d="M9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  ></path>
                </svg>
                {/* <span>Settings</span> */}
              </span>
            </button>
          </div>
          {openSettings && (
            <div className={classes.header23} onMouseLeave={handleClose}>
              <div className={classes.header24}>
                <div className={classes.header25}>
                  <div>
                    <ul className={classes.ul1}>
                      <li className={classes.li4}>
                        <span className={classes.span5}>
                          <span className={classes.span6}>Settings</span>
                        </span>
                      </li>
                      <hr className={classes.hr} />
                      <li className={classes.li5}>
                        <Link
                          className={classes.link6}
                          to="/employerJob/recruit"
                        >
                          <span className={classes.span7}>Billing</span>
                        </Link>
                      </li>
                      <li
                        className={classes.li6}
                        onClick={() => setOnpenModalEmail(true)}
                      >
                        <button className={classes.button1}>
                          <span className={classes.span8}>
                            Invite Team member
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={classes.header8}>
            <Link to="/employerJob/company" className={classes.link3}>
              <div className={classes.header9}>
                <svg
                  fill="none"
                  height={24}
                  width={24}
                  viewBox="0 0 24 24"
                  className={classes.svg}
                >
                  <path
                    d="M3 21H21M5 21V7L13 3V21M19 21V11L13 7M9 9V9.01M9 12V12.01M9 15V15.01M9 18V18.01"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  ></path>
                </svg>
                <span></span>
                {notifications &&
                notifications.some((notify) => !notify.isRead) ? (
                  <div className={classes.header10}>
                    {/* {notifications.filter((notify) => !notify.isRead)?.length} */}
                  </div>
                ) : undefined}
                {/* <div className={classes.header10}></div> */}
              </div>
            </Link>
          </div>
          <div className={classes.header11}>
            <div className={classes.header12}>
              <button
                className={classes.header13}
                onClick={() => setOpen((prev) => !prev)}
              >
                <div className={classes.header14}>
                  <div className={classes.header15}>
                    <img
                      src="https://wellfound.com/images/shared/nopic.png"
                      alt="logo"
                      height={30}
                      width={30}
                      className={classes.img}
                    />
                  </div>
                  <div className={classes.header16}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#fff",
                        lineHeight: "16px",
                        whiteSpace: "nowrap",
                        margin: 0,
                        fontWeight: 600,
                        fontSize: 14,
                        padding: 0,
                        boxSizing: "border-box",
                      }}
                    >
                      {UserProfileData?.firstName} {UserProfileData?.lastName}
                    </Typography>
                  </div>
                </div>
              </button>
              {open && (
                <div style={{ position: "relative" }}>
                  <div className={classes.header17}>
                    <div className={classes.header18}>
                      <div className={classes.header19}>
                        <div>
                          <ul className={classes.ul}>
                            <li className={classes.li}>
                              <Link to="" className={classes.link4}>
                                <span className={classes.span1}>
                                  <div className={classes.header20}>
                                    <div className={classes.img1}>
                                      <img
                                        src="https://wellfound.com/images/shared/nopic.png"
                                        alt="logo"
                                        height={30}
                                        width={30}
                                        className={classes.img}
                                      />
                                    </div>
                                    <div className={classes.header21}>
                                      <Typography
                                        variant="h5"
                                        sx={{
                                          lineHeight: "20px",
                                          whiteSpace: "nowrap",
                                          marginBottom: "4px",
                                          fontWeight: 500,
                                          fontSize: "16px",
                                          padding: 0,
                                          boxSizing: "border-box",
                                        }}
                                      >
                                        {UserProfileData?.firstName}{" "}
                                        {UserProfileData?.lastName}
                                      </Typography>
                                    </div>
                                  </div>
                                </span>
                              </Link>
                            </li>
                            <hr className={classes.hr} />
                            <li className={classes.li1}>
                              <span className={classes.span2}>Recruit for</span>
                            </li>
                            <li className={classes.li2}>
                              <span className={classes.span3}>
                                {CompanyEmployer?.companyName}
                              </span>
                            </li>
                            {/* <li
                              className={classes.li3}
                              style={{ cursor: "pointer" }}
                            >
                              <Link to="" className={classes.link5}>
                                <span className={classes.span2}>
                                  Create New Company
                                </span>
                              </Link>
                            </li> */}
                            <hr className={classes.hr} />
                            <li
                              className={classes.li3}
                              style={{ cursor: "pointer" }}
                            >
                              <Link
                                to="Account/setting"
                                className={classes.link5}
                              >
                                <span className={classes.span2}>
                                  Account Setting
                                </span>
                              </Link>
                            </li>
                            <li
                              className={classes.li3}
                              style={{ cursor: "pointer" }}
                              onClick={handleLogout}
                            >
                              <Link to="" className={classes.link5}>
                                <span className={classes.span2}>Logout</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
