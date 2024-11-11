import React, { useEffect } from "react";
import classes from "./ListJobDetails.module.css";
import { Link, NavLink, Outlet, useOutletContext } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { GetJobPost } from "../../Services/JobsPost/GetJobPosts";
import moment from "moment";
import { fetchCompaniesById } from "../../Services/CompanyService/GetCompanyById";

// import NoJob from "../../components/NewUiEmployer/NoJob";
type JobContextType = {
  selectJobId: number | null;
  setSelectJobId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function ListJobDetailsApplicants() {
  const companyId = localStorage.getItem("CompanyId");
  const { selectJobId, setSelectJobId } = useOutletContext<JobContextType>();
  const { data: JobPosts } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal }),
    staleTime: 5000,
  });
  const JobPostsdata = JobPosts?.JobPosts;

  const {
    data: CompanyDa,
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["Company-details", companyId], // Sửa lại tên key cho chính xác
    queryFn: ({ signal }) =>
      fetchCompaniesById({ id: Number(companyId), signal }),
    enabled: !!companyId,
  });

  const companyDataa = CompanyDa?.Companies;
  // Lọc các công việc thuộc về công ty hiện tại
  const jobincompanyData = JobPostsdata?.filter(
    (item) => item.companyId === Number(companyId)
  );

  useEffect(() => {
    if (!selectJobId && jobincompanyData && jobincompanyData.length > 0) {
      setSelectJobId(jobincompanyData[0].id);
    }
  }, [selectJobId, jobincompanyData, setSelectJobId]);

  const city = JobPostsdata?.map((city) => city.jobLocationCities);
  const flattenedArrayCity = city?.flat();
  const uniqueArrayCity = [...new Set(flattenedArrayCity)];

  const cityColumn = uniqueArrayCity;
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <div className={classes.main5}>
                <div className={classes.main6}>
                  <header className={classes.header}>Applicants</header>
                  <Link to="/EmployerJob/jobs/create" className={classes.link}>
                    {" "}
                    + Post Jobs
                  </Link>
                </div>
                <div className={classes.main7}>
                  <input
                    type="search"
                    name="search"
                    className={classes.input}
                  />
                  <div className={classes.icon}>
                    <SearchIcon />
                  </div>
                </div>
                <nav className={classes.main8}>
                  <NavLink to="" className={classes.link1}>
                    <div className={classes.main9}>
                      <span>Active ({jobincompanyData?.length})</span>
                    </div>{" "}
                  </NavLink>
                  {/* <NavLink to="" className={classes.link1}>
                    <div className={classes.main9}>
                      <span>Active(0)</span>
                    </div>{" "}
                  </NavLink> */}
                </nav>
                <div className={classes.main10}>
                  {jobincompanyData?.map((job) => (
                    <NavLink
                      to={`jobs/${job.id}`}
                      // className={({ isActive }) =>
                      //   isActive ? classes.active : undefined
                      // }
                      className={() =>
                        `${classes.link2} ${
                          location.pathname.startsWith(
                            `/EmployerJob/applicants/jobs/${job.id}`
                          )
                            ? classes.active
                            : ""
                        }`
                      }
                      onClick={() => setSelectJobId(job.id)}
                      end
                    >
                      <div className={classes.main14}>
                        <div className={classes.main15}>
                          <div className={classes.main16}>
                            {" "}
                            From:{" "}
                            {moment(job?.postingDate.slice(0, 10)).format(
                              "DD-MM-YYYY"
                            )}{" "}
                            - To:{" "}
                            {moment(job?.expiryDate.slice(0, 10)).format(
                              "DD-MM-YYYY"
                            )}
                          </div>
                        </div>
                      </div>
                      <p className={classes.p}>Job name: {job.jobTitle}</p>
                      {cityColumn && cityColumn.length > 0 ? (
                        <p className={classes.p1}>{cityColumn.join(",")}</p>
                      ) : (
                        <p className={classes.p1}>
                          {companyDataa?.address} {" in "} {companyDataa?.city}
                        </p>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.main11}>
            {/* <div className={classes.main12}>
              <NoJob />
            </div> */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}