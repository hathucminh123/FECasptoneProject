import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import classes from "./OverViewJob.module.css";
import { useQuery } from "@tanstack/react-query";
import { GetJobPostById } from "../../Services/JobsPost/GetJobPostById";


const OverViewJob:React.FC =()=> {
  const { id } = useParams();

  // const [searchParams] = useSearchParams();
  // const isEdit = searchParams.get("mode") === "Edit";
  console.log(id);
  const JobId = Number(id);
  const { data: jobData } = useQuery({
    queryKey: ["Job-details", JobId],
    queryFn: ({ signal }) => GetJobPostById({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });
  const job = jobData?.JobPosts;

  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <div className={classes.main1}>
          <div className={classes.main2}>
            <p className={classes.p}>{job?.jobTitle}</p>
            <div className={classes.main3}>
              <span className={classes.span}>Live</span>
            </div>
          </div>
          {/* {isEdit && <div className={classes.main5}>
            <div className={classes.main6}>
              <button type="button" className={classes.button}>
                Save Changes
              </button>
            </div>
            </div>} */}
        </div>
        <nav className={classes.nav}>
          <NavLink
            to={`/EmployerJob/listjobs/OverView/${id}`}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            {({ isActive }) =>
            <div className={classes.main4}>
              <span  style={isActive ?{color:'#050c26'} :undefined}>OverView</span>
            </div>
}
          </NavLink>
          <NavLink
            to="Edit?mode=Edit"
            style={{ marginLeft: "24px" }}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
                    {({ isActive }) =>
            <div className={classes.main4}>
              <span  style={isActive ?{color:'#050c26'} :undefined}>Edit</span>
            </div>
}
          </NavLink>
          {/* <NavLink
            to="asdas"
            style={{ marginLeft: "24px" }}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <div className={classes.main4}>
              <span>Applicants</span>
            </div>
          </NavLink> */}
        </nav>
      </header>
      <Outlet 
  
      
      />
    </div>
  );
}
export default OverViewJob