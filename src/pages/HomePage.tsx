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
    const auth = localStorage.getItem("Auth");
    if (!auth) {
      navigate("/JobSeekers/login", { state: { from: "/profile-cv" } });
    } else {
      navigate("/profile-cv");
    }
  };

  // Handling job navigation with job data
  const handleNavigateJob = (job: Job) => {
    navigate(`/jobs/detail/${job.id}`, {
      state: job,
    });
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.form}>
          <div className={classes.form1}>
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

            <div style={{ display: "block" }}>
              <FormSearch />
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: "1000px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                marginTop: "28px",
                gap: "16px",
                flexWrap: "nowrap",
                flexDirection: "row",
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
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {skillsColumns.map((item) => (
                  <Button
                    key={item}
                    sx={{
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: "black",
                      color: "white",
                      padding: "10px 20px",
                      cursor: "pointer",
                      fontSize: "14px",
                      margin: "5px",
                      "&:hover": {
                        backgroundColor: "#333",
                      },
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* First section with tools for application journey */}
      <div className={classes.main}>
        <div className={classes.container1}>
          <section className={classes.section}>
            <div className={classes.divtitle}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  mt: 0,
                  lineHeight: 1.5,
                  textAlign: "center",
                  fontSize: "28px",
                  boxSizing: "border-box",
                  fontWeight: 700,
                  mb: 0,
                  color: "#121212",
                }}
              >
                Best tools for your application journey
              </Typography>
            </div>

            <div className={classes.card}>
              <CardService
                url="https://itviec.com/assets/homepage/user-profile-704fabd6761d6f9a4efc54371bc6cc0bef771ff9ae1dce97b2cb137aa74732d6.svg"
                title="User Profile"
                text="Create an excellent profile with a well-structured format and specific guide"
                textButton="Update profile"
                onClick={handleProfileClick}
              >
                <div className={classes.divne1}></div>
              </CardService>
              <CardService
                url="https://itviec.com/assets/homepage/cv-template-c6f6a4b0c4211ea345421e77c4e1ce22c2392cfebee8993324eee7015ea44d89.svg"
                title="CV Templates"
                text="Generate professional IT CV with new templates - recommended by recruiters"
                textButton="View templates"
                // className={`${classes.card_shadow}`}
              >
                <div className={classes.divne}></div>
              </CardService>

              <CardService
                url="https://itviec.com/assets/homepage/blog-a0cee7c69f270172e8c4470bde32d5c15e0a113cb4c3aa92f9d8bfc9ab92c8c7.svg"
                title="Blog"
                text="Updates about salary, benefits, working policies, and careers in IT"
                textButton="Explore blog"
              />
            </div>
          </section>
        </div>
      </div>

      {/* Section for Top Employers */}
      <main className={classes.main}>
        <div className={classes.container1}>
          <section className={classes.section}>
            <div className={classes.divtitle}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  mt: 0,
                  lineHeight: 1.5,
                  textAlign: "center",
                  fontSize: "28px",
                  boxSizing: "border-box",
                  fontWeight: 700,
                  mb: 0,
                  color: "#121212",
                }}
              >
                Top Employers
              </Typography>
            </div>

            <div className={classes.card1}>
              {companyData.map((company) => (
                <CardEmployer key={company.id} data={company} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Section for IT Jobs */}
      <main className={classes.main}>
        <div className={classes.container1}>
          <section className={classes.section}>
            <div className={classes.divtitle}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  mt: 0,
                  lineHeight: 1.5,
                  textAlign: "center",
                  fontSize: "28px",
                  boxSizing: "border-box",
                  fontWeight: 700,
                  mb: 0,
                  color: "#121212",
                }}
              >
                IT Jobs "Chất" for user
              </Typography>
            </div>
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
          </section>
        </div>
      </main>
    </>
  );
}
