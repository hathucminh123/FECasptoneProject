import React, { useEffect, useState } from "react";
import classes from "./CompanyInfoNew.module.css";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import { fetchCompanies } from "../../Services/CompanyService/GetCompanies";
import { useQuery } from "@tanstack/react-query";
import { GetJobPost } from "../../Services/JobsPost/GetJobPosts";
import ModalEmail from "../../components/NewUiEmployer/ModalEmail";
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

type OutletContextType = {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
};
export default function CompanyInfoNew() {
  const [companyId, setCompanyId] = useState<string | null>(
    localStorage.getItem("CompanyId")
  );

  const [openModal, setOnenModal] = useState<boolean>(false);

  const handleClose = () => {
    setOnenModal(false);
  };

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

  const { data: JobPosts } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal,boolean:true }),
    staleTime: 5000,
  });
  const JobPostsdata = JobPosts?.JobPosts;

  const jobincompanyData = JobPostsdata?.filter(
    (item) => item.companyId === Number(companyId)
  );

  const { notifications, setNotifications } =
    useOutletContext<OutletContextType>();

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/employerJob/company/Settings");
  };
  return (
    <div className={classes.main}>
      <ModalEmail open={openModal} onClose={handleClose} />
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <div className={classes.main5}>
                <section className={classes.section}>
                  <div className={classes.main6}>
                    <Link to="" className={classes.main7}>
                      <div className={classes.main8}>
                        <img
                          src={CompanyEmployer?.imageUrl}
                          alt=""
                          className={classes.img}
                        />
                      </div>
                    </Link>
                    <div className={classes.main9}>
                      <div className={classes.main10}>
                        <Link to="" className={classes.link2}>
                          <span className={classes.span}>
                            {CompanyEmployer?.companyName}
                          </span>
                        </Link>
                        <div className={classes.main11}>
                          <div className={classes.main12}></div>
                          Actively Hiring
                        </div>
                      </div>
                      <span className={classes.main13}>
                        {CompanyEmployer?.companyDescription && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: CompanyEmployer?.companyDescription,
                            }}
                          />
                        )}
                      </span>
                      <span className={classes.main14}>
                        {CompanyEmployer?.numberOfEmployees} employees
                      </span>
                    </div>
                  </div>
                  <div className={classes.main15}></div>
                </section>
                <div className={classes.main16}>
                  <div className={classes.main17}>
                    <div className={classes.main18}>
                      <nav className={classes.nav}>
                        <NavLink
                          to=""
                          className={({ isActive }) =>
                            isActive ? classes.active : undefined
                          }
                          end
                        >
                          {({ isActive }) => (
                            <div className={classes.main19}>
                              <span
                                style={
                                  isActive ? { color: "#050c26" } : undefined
                                }
                              >
                                OverView
                              </span>
                            </div>
                          )}
                        </NavLink>
                        <NavLink
                          to="jobs"
                          className={({ isActive }) =>
                            isActive ? classes.active : undefined
                          }
                          end
                        >
                          {({ isActive }) => (
                            <>
                              <div
                                className={classes.main19}
                                style={{ marginLeft: 30 }}
                              >
                                <span
                                  style={
                                    isActive ? { color: "#050c26" } : undefined
                                  }
                                >
                                  Jobs
                                </span>
                              </div>
                              <div className={classes.main37}>
                                <div className={classes.main38}>
                                  <span> {jobincompanyData?.length}</span>
                                </div>
                              </div>
                            </>
                          )}
                        </NavLink>
                        <NavLink
                          to="Notifications"
                          className={({ isActive }) =>
                            isActive ? classes.active : undefined
                          }
                          end
                        >
                          {({ isActive }) => (
                            <>
                              <div
                                className={classes.main19}
                                style={{ marginLeft: 30 }}
                              >
                                <span
                                  style={
                                    isActive ? { color: "#050c26" } : undefined
                                  }
                                >
                                  Notifications
                                </span>
                              </div>
                              <div className={classes.main37}>
                                <div className={classes.main38}>
                                  <span>
                                    {" "}
                                    {notifications &&
                                      notifications.some(
                                        (notify) => !notify.isRead
                                      ) && (
                                        <span className={classes.span5}>
                                          {
                                            notifications.filter(
                                              (notify) => !notify.isRead
                                            )?.length
                                          }
                                        </span>
                                      )}
                                  </span>
                                </div>
                              </div>
                            </>
                          )}
                        </NavLink>
                        {CompanyEmployer?.companyStatus === 2 && (
                          <NavLink
                            to="Settings"
                            className={({ isActive }) =>
                              isActive ? classes.active : undefined
                            }
                            end
                          >
                            {({ isActive }) => (
                              <>
                                <div
                                  className={classes.main19}
                                  style={{ marginLeft: 30 }}
                                >
                                  <span
                                    style={
                                      isActive
                                        ? { color: "#050c26" }
                                        : undefined
                                    }
                                  >
                                    Settings
                                  </span>
                                </div>
                                {/* <div className={classes.main37}>
                                  <div className={classes.main38}>
                                    <span>
                                      {" "}
                                      {notifications &&
                                        notifications.some(
                                          (notify) => !notify.isRead
                                        ) && (
                                          <span className={classes.span5}>
                                            {
                                              notifications.filter(
                                                (notify) => !notify.isRead
                                              )?.length
                                            }
                                          </span>
                                        )}
                                    </span>
                                  </div>
                                </div> */}
                              </>
                            )}
                          </NavLink>
                        )}
                      </nav>
                    </div>
                    <Outlet context={{ notifications, setNotifications }} />
                  </div>
                  <aside className={classes.main20}>
                    <div className={classes.main21}>
                      <div className={classes.main22}>
                        <Typography
                          variant="h6"
                          sx={{
                            margin: "3px 8px 0 0",
                            color: "#9e9e9e",
                            fontSize: "12px",
                            lineHeight: "20px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.4px",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          Recruit for {CompanyEmployer?.companyName}
                        </Typography>
                        <span className={classes.spanicon}>
                          <svg viewBox="0 0 24 24" className={classes.svg}>
                            <path d="M19.5,9.5h-.75V6.75a6.75,6.75,0,0,0-13.5,0V9.5H4.5a2,2,0,0,0-2,2V22a2,2,0,0,0,2,2h15a2,2,0,0,0,2-2V11.5A2,2,0,0,0,19.5,9.5Zm-9.5,6a2,2,0,1,1,3,1.723V19.5a1,1,0,0,1-2,0V17.223A1.994,1.994,0,0,1,10,15.5ZM7.75,6.75a4.25,4.25,0,0,1,8.5,0V9a.5.5,0,0,1-.5.5H8.25a.5.5,0,0,1-.5-.5Z">
                              {" "}
                            </path>
                          </svg>
                        </span>
                      </div>
                      <Link
                        to="/EmployerJob/jobs/create"
                        className={classes.link3}
                      >
                        <div className={classes.main23}>
                          <div className={classes.main24}>
                            <div className={classes.main25}>Post a Job</div>
                            <div className={classes.main26}>
                              To find job Seekers
                            </div>
                          </div>
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={classes.svg}
                          >
                            <path d="M8 21a.997.997 0 00.707-.293l8-8a.999.999 0 000-1.414l-8-8a.999.999 0 10-1.414 1.414L14.586 12l-7.293 7.293A.999.999 0 008 21z"></path>
                          </svg>
                        </div>
                      </Link>
                      {/* <Link
                        to=""
                        className={classes.link3}
                        onClick={() => setOnenModal(true)}
                      >
                        <div className={classes.main23}>
                          <div className={classes.main24}>
                            <div className={classes.main25}>
                              Invite Your Team
                            </div>
                            <div className={classes.main26}>to manage Job</div>
                          </div>
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={classes.svg}
                          >
                            <path d="M8 21a.997.997 0 00.707-.293l8-8a.999.999 0 000-1.414l-8-8a.999.999 0 10-1.414 1.414L14.586 12l-7.293 7.293A.999.999 0 008 21z"></path>
                          </svg>
                        </div>
                      </Link> */}
                    </div>
                    <div className={classes.main27}>
                      <div className={classes.main28}>
                        <div className={classes.main29}>
                          <Typography
                            variant="h3"
                            sx={{
                              color: "#9e9e9e",
                              fontSize: "12px",
                              lineHeight: "20px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.4px",
                              marginBottom: "0.75em",
                            }}
                          >
                            About {CompanyEmployer?.companyName}
                          </Typography>
                          <button
                            className={classes.button1}
                            onClick={handleNavigate}
                          >
                            <svg
                              className={classes.svg1}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21 20a1 1 0 110 2H3a1 1 0 110-2h18zM6.293 13.293l11-11a1 1 0 011.32-.083l.094.083 3 3a1 1 0 01.083 1.32l-.083.094-11 11a1 1 0 01-.576.284L10 18H7a1 1 0 01-.993-.883L6 17v-3a1 1 0 01.206-.608l.087-.1 11-11-11 11zM18 4.414l-10 10V16h1.586l10-10L18 4.414z"
                              ></path>
                            </svg>
                            <span className={classes.span1}>Edit</span>
                          </button>
                        </div>
                        <dl className={classes.main30}>
                          <dd className={classes.main31}>Website</dd>
                          <dt className={classes.main32}>
                            <div className={classes.main33}>
                              <ul className={classes.main34}>
                                <button className={classes.button}>
                                  {CompanyEmployer?.websiteURL}
                                </button>
                              </ul>
                            </div>
                          </dt>
                          <dd className={classes.main31}>Location</dd>
                          <dt className={classes.main35}>
                            <ul
                              className={classes.ul}
                              style={{ listStyle: "none" }}
                            >
                              <li className={classes.main36}>
                                <Link to={""} className={classes.main4}>
                                  {/* {CompanyEmployer?.address} in{" "}
                                  {CompanyEmployer?.city} */}
                                  {CompanyEmployer?.companyLocations.map(
                                    (location, index) => (
                                      <div key={index}>
                                        {location.city}
                                        {index !==
                                          CompanyEmployer.companyLocations
                                            ?.length -
                                            1 && " - "}
                                      </div>
                                    )
                                  )}
                                </Link>
                              </li>
                            </ul>
                          </dt>
                          <dd className={classes.main31}>Company Size</dd>
                          <dt className={classes.main32}>
                            {CompanyEmployer?.numberOfEmployees} employees
                          </dt>
                          <dd className={classes.main31}>Company Type</dd>

                          {CompanyEmployer?.businessStream && (
                            <dt className={classes.main32}>
                              {
                                CompanyEmployer?.businessStream
                                  .businessStreamName
                              }
                            </dt>
                          )}
                        </dl>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
