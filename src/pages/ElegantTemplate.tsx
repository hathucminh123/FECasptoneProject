import React, { useRef } from "react";
import classes from "./ElegantTemplate.module.css";
import DownloadIcon from "@mui/icons-material/Download";
// import html2pdf from "html2pdf.js";
import { GetUserProfile } from "../Services/UserProfileService/UserProfile";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

import jsPDF from "jspdf";

const ElegantTemplate: React.FC = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const userId = localStorage.getItem("userId");

  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    staleTime: 1000,
  });

  const UserProfileData = UserProfile?.UserProfiles;

  // const handleDownload = () => {
  //   const element = cvRef.current;
  //   if (element) {
  //     html2pdf()
  //       .from(element)
  //       .save(`${UserProfileData?.firstName}${UserProfileData?.lastName}.pdf`);
  //   }
  // };
  const handleDownload = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const marginLeft = 15;
    const marginTop = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const sectionWidth = pageWidth - 2 * marginLeft;
    let currentY = marginTop;

    // Header Section
    doc.setFillColor(33, 33, 33); // Dark background color
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255); // White text
    doc.text(
      `${UserProfileData?.firstName} ${UserProfileData?.lastName}`,
      marginLeft,
      25
    );

    // Contact Details
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(`Phone: ${UserProfileData?.phoneNumber || "N/A"}`, marginLeft, 35);
    doc.text(`Email: ${UserProfileData?.email || "N/A"}`, marginLeft + 80, 35);

    currentY = 50; // Move below the header

    // Section Title Function
    const addSectionTitle = (title: string) => {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(33, 33, 33); // Dark font color
      doc.text(title, marginLeft, currentY);
      currentY += 5;
      doc.setDrawColor(200, 200, 200); // Light gray line
      doc.setLineWidth(0.5);
      doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
      currentY += 10;
    };

    // Add Education Section
    addSectionTitle("Education");
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
      `School: ${
        UserProfileData?.educationDetails[0]?.institutionName || "N/A"
      }`,
      marginLeft,
      currentY
    );
    currentY += 6;
    doc.text(
      `Major: ${UserProfileData?.educationDetails[0]?.fieldOfStudy || "N/A"}`,
      marginLeft,
      currentY
    );
    currentY += 6;
    doc.text(
      `From: ${UserProfileData?.educationDetails[0]?.startDate || "N/A"} To: ${
        UserProfileData?.educationDetails[0]?.endDate || "Present"
      }`,
      marginLeft,
      currentY
    );
    currentY += 6;
    doc.text(
      `Degree: ${UserProfileData?.educationDetails[0]?.degree || "N/A"}`,
      marginLeft,
      currentY
    );
    currentY += 12;

    // Add Skills Section
    addSectionTitle("Skills");
    doc.setFont("Helvetica", "normal");
    UserProfileData?.skillSets.forEach((skill) => {
      doc.text(`- ${skill.name}`, marginLeft, currentY);
      currentY += 6;
    });
    currentY += 10;

    // Add Work Experience Section

    addSectionTitle("Work Experience");
    UserProfileData?.experienceDetails.forEach((exp) => {
      doc.setFont("Helvetica", "bold");
      doc.text(`${exp.position} | ${exp.companyName}`, marginLeft, currentY);
      currentY += 6;
      doc.setFont("Helvetica", "normal");
      doc.text(
        `From: ${exp.startDate} To: ${exp.endDate || "Present"}`,
        marginLeft,
        currentY
      );
      currentY += 6;

      doc.text("Daily Tasks:", marginLeft, currentY);
      currentY += 6;

      const extractTextFromHTML = (htmlString: string) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlString;
        return tempDiv.textContent || tempDiv.innerText || "N/A";
      };
      const responsibilitiesText = extractTextFromHTML(
        exp.responsibilities || "N/A"
      );
      const responsibilities = doc.splitTextToSize(
        responsibilitiesText,
        sectionWidth
      );
      responsibilities.forEach((task: string) => {
        doc.text(`- ${task.trim()}`, marginLeft + 5, currentY);
        currentY += 6;
      });

      doc.text("Achievements:", marginLeft, currentY);
      currentY += 6;

      // Handle achievements (convert to array if it's a string)
      const achievementsText = extractTextFromHTML(exp.achievements || "N/A");
      const achievements = doc.splitTextToSize(achievementsText, sectionWidth);
      achievements.forEach((ach:string) => {
        doc.text(`- ${ach.trim()}`, marginLeft + 5, currentY);
        currentY += 6;
      });

      currentY += 12;

      if (currentY > pageHeight - 30) {
        doc.addPage();
        currentY = marginTop;
      }
    });

    // Save the PDF
    doc.save(
      `${UserProfileData?.firstName}_${UserProfileData?.lastName}_Resume.pdf`
    );
  };

  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3} ref={cvRef}>
            <header className={classes.header}>
              <div className={classes.main4}>
                <img
                  src="https://tuyendung.topcv.vn/app/_nuxt/img/noavatar-2.18f0212.svg"
                  alt="image"
                  className={classes.main4}
                />
              </div>
              <div className={classes.main5}>
                <div className={classes.main6}>
                  <div
                    className={classes.main7}
                    style={{ fontFamily: "Lexend, sans-serif" }}
                  >
                    {UserProfileData?.firstName}
                    {UserProfileData?.lastName}
                  </div>
                </div>
                <div className={classes.main8}>
                  <div className={classes.main9}>
                    <div className={classes.main10}>
                      <div className={classes.main11}>
                        <img
                          src="https://itviec.com/assets/cv_templates/icons/phone-8ec46b9e46b6e6ea3bf01fa198bbb8dbcbfb86b33a2c2766e7ccfa4b1c694d5c.svg"
                          alt="phone"
                          className={classes.img}
                        />
                        <p
                          className={classes.p}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          {UserProfileData?.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <div className={classes.main10}>
                      <div className={classes.main11}>
                        <img
                          src="https://itviec.com/assets/cv_templates/icons/mail-f5038b679849f3bc3747122a3108a84d59cd05ad6c23f3b5e60e816cf45d9f0a.svg"
                          alt="phone"
                          className={classes.img}
                        />
                        <p
                          style={{ fontFamily: "Lexend, sans-serif" }}
                          className={classes.p}
                        >
                          {UserProfileData?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className={classes.main12}>
              <div className={classes.main13}>
                <div className={classes.education}>
                  <div
                    className={classes.education1}
                    style={{ fontFamily: "Lexend, sans-serif" }}
                  >
                    Education
                  </div>

                  <div className={classes.education2}>
                    {UserProfileData?.educationDetails.map((edu) => (
                      <div className={classes.education3} key={edu.id}>
                        <span
                          className={classes.span}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          School name: {edu.institutionName}
                        </span>
                        <div className={classes.education4}>
                          <p
                            className={classes.p1}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            From:{""}
                            {moment(edu.startDate).format("DD-MM-YYYY")} - To:{" "}
                            {moment(edu.endDate).format("DD-MM-YYYY")}
                          </p>
                          <div className={classes.line}></div>
                          <p
                            className={classes.education5}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Major: {edu.fieldOfStudy}
                          </p>
                        </div>
                        <span
                          className={classes.span1}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          Degree: {edu.degree}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={classes.skill}>
                  <div
                    className={classes.skill1}
                    style={{ fontFamily: "Lexend, sans-serif" }}
                  >
                    Skill
                  </div>

                  <div className={classes.skill2}>
                    <div className={classes.education3}>
                      <div className={classes.skill3}>
                        <div
                          className={classes.skill4}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          Skill Name
                        </div>
                        <div className={classes.skill5}>
                          {UserProfileData?.skillSets.map((skill) => (
                            <span
                              key={skill.id}
                              style={{ fontFamily: "Lexend, sans-serif" }}
                              className={classes.spanskill}
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* <div className={classes.skill3}>
                          <div className={classes.skill4}>Description</div>
                          <div className={classes.skill5}>
                            <p className={classes.education5}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: skill.description,
                                }}
                              />
                            </p>
                          </div>
                        </div> */}
                    </div>
                  </div>
                </div>
                <div className={classes.experience}>
                  <div
                    className={classes.experience1}
                    style={{ fontFamily: "Lexend, sans-serif" }}
                  >
                    Work Experience
                  </div>

                  <div className={classes.experience2}>
                    {UserProfileData?.experienceDetails.map((exp) => (
                      <div className={classes.experience3} key={exp.id}>
                        <div
                          className={classes.experience4}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          {" "}
                          From:{""}
                          {moment(exp.startDate).format("DD-MM-YYYY")} - To:{" "}
                          {moment(exp.endDate).format("DD-MM-YYYY")}
                        </div>
                        <div className={classes.experience5}>
                          <p
                            className={classes.pex}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Position: {exp.position}
                          </p>
                          <div className={classes.line}></div>
                          <p
                            className={classes.pex}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            CompanyName: {exp.companyName}{" "}
                          </p>
                        </div>
                        <div className={classes.experience6}>
                          <div className={classes.experience7}>
                            <div className={classes.experience8}>
                              <div
                                style={{ fontFamily: "Lexend, sans-serif" }}
                                dangerouslySetInnerHTML={{
                                  __html: exp.responsibilities,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div
                            className={classes.experience9}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Achievements:
                          </div>
                          <div className={classes.experience6}>
                            <div className={classes.experience7}>
                              <div className={classes.experience8}>
                                <div
                                  style={{ fontFamily: "Lexend, sans-serif" }}
                                  dangerouslySetInnerHTML={{
                                    __html: exp.achievements,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.main14}>
        <div
          className={classes.button}
          style={{ cursor: "pointer" }}
          onClick={handleDownload}
        >
          <div className={classes.button1}>
            <DownloadIcon />
            Download CV
          </div>
        </div>
      </div>
    </div>
  );
};
export default ElegantTemplate;
