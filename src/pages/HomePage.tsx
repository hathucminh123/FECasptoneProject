import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import classes from "./HomePage.module.css";
import FormSearch from "../components/FormSearch";
import CardService from "../components/CardService";
import CardEmployer from "../components/CardEmployer";
import CardJob from "../components/CardJob";
import { companyData } from "../assets/data/CompanyData";
import { useNavigate } from "react-router-dom";
import { jobData } from "../assets/data/CompanyData";

const skillsColumns = [
  "Java",
  "PHP",
  "JavaScript",
  "HTML5",
  "Manager",
  "SQL",
  "Android",
  "iOS",
];

interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  tags: string[];
  postDate: string;
  hotTag: boolean;
  companyId?: number;
  companyImage?: string;
}

export default function HomePage() {
  const navigate = useNavigate();

  // Handling profile navigation
  const handleProfileClick = () => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      navigate("/auth?mode=login", { state: { from: "/profile-cv" } });
    } else {
      navigate("/profile-cv");
    }
  };

  // Handling job navigation with job data
  const handleNavigateJob = (job: Job) => {
    navigate(`/jobs/detail/${job.id}`, {
      state:job
    });
  };

  return (
    <div className={classes.main_container}>
      <div className={classes.container}>
        <div className={classes.form}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "start",
              fontWeight: "bold",
              mb: 3,
              color: "#333",
            }}
          >
            934 IT Jobs For "Chất" Developers
          </Typography>

          <div style={{ width: "100%", maxWidth: "1000px" }}>
            <FormSearch />
          </div>

          <div
            style={{
              width: "100%",
              maxWidth: "1000px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              marginTop: "50px",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Suggestions for you:
            </Typography>
            {skillsColumns.map((item) => (
              <Button
                key={item}
                sx={{
                  borderRadius: "20px",
                  border: "1px solid #414042",
                  backgroundColor: "#121212",
                  color: "#dedede",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#dedede",
                    border: "1px solid #fff",
                    color: "white",
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* First section with tools for application journey */}
      <main className={classes.main}>
        <div className={classes.container1}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              mt: 2,
              textAlign: "center",
              fontWeight: "bold",
              mb: 3,
              color: "#121212",
            }}
          >
            Best tools for your application journey
          </Typography>
          <div className={classes.card}>
            <CardService
              url="https://itviec.com/assets/homepage/user-profile-704fabd6761d6f9a4efc54371bc6cc0bef771ff9ae1dce97b2cb137aa74732d6.svg"
              title="User Profile"
              text="Create an excellent profile with a well-structured format and specific guide"
              textButton="Update profile"
              onClick={handleProfileClick}
            />
            <CardService
              url="https://itviec.com/assets/homepage/cv-template-c6f6a4b0c4211ea345421e77c4e1ce22c2392cfebee8993324eee7015ea44d89.svg"
              title="CV Templates"
              text="Generate professional IT CV with new templates - recommended by recruiters"
              textButton="View templates"
              className={`${classes.card_shadow}`}
            />
            <CardService
              url="https://itviec.com/assets/homepage/blog-a0cee7c69f270172e8c4470bde32d5c15e0a113cb4c3aa92f9d8bfc9ab92c8c7.svg"
              title="Blog"
              text="Updates about salary, benefits, working policies, and careers in IT"
              textButton="Explore blog"
            />
          </div>
        </div>
      </main>

      {/* Section for Top Employers */}
      <main className={classes.main}>
        <div className={classes.container1}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              mt: 2,
              textAlign: "center",
              fontWeight: "bold",
              mb: 3,
              color: "#121212",
            }}
          >
            Top Employers
          </Typography>
          <div className={classes.card}>
            {companyData.map((company) => (
              <CardEmployer key={company.id} data={company} />
            ))}
          </div>
        </div>
      </main>

      {/* Section for IT Jobs */}
      <main className={classes.main}>
        <div className={classes.container1}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              mt: 2,
              textAlign: "center",
              fontWeight: "bold",
              mb: 3,
              color: "#121212",
            }}
          >
            168 IT Jobs "Chất" for user
          </Typography>
          <div className={classes.cardJob}>
            {jobData.map((job) => {
              const companys = companyData.find(
                (item) => item.id === job.companyId
              );
              return (
                <CardJob
                  key={job.id}
                  data={job}
                  img={job.companyImage}
                  company={companys}
                  onclick={() => handleNavigateJob(job)} // Correct the event handler name
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
