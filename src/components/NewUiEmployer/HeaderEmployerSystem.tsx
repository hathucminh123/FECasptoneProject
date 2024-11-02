import React, { useEffect, useState } from "react";
import classes from "./HeaderEmployerSystem.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { GetUserProfile } from "../../Services/UserProfileService/UserProfile";
import { useQuery } from "@tanstack/react-query";
interface props {
  selectJobId?: number | undefined | null;
}

export default function HeaderEmployerSystem({ selectJobId }: props) {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [companyId, setCompanyId] = useState<string | null>(
    localStorage.getItem("CompanyId")
  );
  console.log("adu ma ", selectJobId);

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("CompanyId");
    setCompanyId(storedCompanyId);
  }, []);
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

  const UserProfileData = UserProfile?.UserProfiles;
  return (
    <header className={classes.header}>
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
            className={classes.link2}
            end
          >
            {({ isActive }) => (
              <div className={classes.header4}>
                <div className={classes.header5}>
                  <span
                    className={`${isActive ? classes.spanactive : ""} ${
                      classes.span
                    }`}
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
            className={classes.link2}
            end
          >
            {({ isActive }) => (
              <div className={classes.header4}>
                <div className={classes.header5}>
                  <span
                    className={`${isActive ? classes.spanactive : ""} ${
                      classes.span
                    }`}
                  >
                    <span style={{ display: "inline" }}>Applicants</span>
                  </span>
                </div>
              </div>
            )}
          </NavLink>
          <NavLink to="asd" className={classes.link2}>
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
        <div className={classes.header6}></div>
        <div className={classes.header7}>
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
                <div className={classes.header10}></div>
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
                            <span className={classes.span3}>hathucminh</span>
                          </li>
                          <li
                            className={classes.li3}
                            style={{ cursor: "pointer" }}
                          >
                            <Link to="" className={classes.link5}>
                              <span className={classes.span2}>
                                Create New Company
                              </span>
                            </Link>
                          </li>
                          <hr className={classes.hr} />
                          <li
                            className={classes.li3}
                            style={{ cursor: "pointer" }}
                          >
                            <Link to="" className={classes.link5}>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
