import React, { useRef } from "react";
import classes from "./ElegantTemplate.module.css";
import DownloadIcon from "@mui/icons-material/Download";
// import html2pdf from "html2pdf.js";
import { GetUserProfile } from "../Services/UserProfileService/UserProfile";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

import jsPDF from "jspdf";
interface ExperienceDetail {
  id: number;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  achievements: string;
}
interface SkillSet {
  id: number;
  name: string;
  shorthand: string;
  description: string;
  proficiencyLevel?: string;
}
interface EducationDetail {
  id: number;
  name: string;
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa: number;
}
interface certificates {
  id: number;
  certificateName: string;
  certificateOrganization: string;
  description: string;
  certificateURL: string;
  issueDate: string;
}

interface Awards {
  id: number;
  awardName: string;
  awardOrganization: string;
  description: string;
  issueDate: string;
}
interface Benefits {
  id: number;
  name: string;
  // shorthand: string;
  // description: string;
}
const ElegantTemplate: React.FC = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const userId = localStorage.getItem("userId");

  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile", userId],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    staleTime: 1000,
    enabled: !!Number(userId),
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
  // const handleDownload = () => {
  //   const doc = new jsPDF("p", "mm", "a4");
  //   const marginLeft = 15;
  //   const marginTop = 15;
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const pageHeight = doc.internal.pageSize.getHeight();
  //   const sectionWidth = pageWidth - 2 * marginLeft;
  //   let currentY = marginTop;

  //   // Header Section
  //   doc.setFillColor(33, 33, 33); // Dark background color
  //   doc.rect(0, 0, pageWidth, 40, "F");
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(22);
  //   doc.setTextColor(255, 255, 255); // White text
  //   doc.text(
  //     `${UserProfileData?.firstName} ${UserProfileData?.lastName}`,
  //     marginLeft,
  //     25
  //   );

  //   // Contact Details
  //   doc.setFontSize(12);
  //   doc.setTextColor(255, 255, 255);
  //   doc.text(
  //     `Phone Number : ${UserProfileData?.phoneNumber || "No Phone Number"}`,
  //     marginLeft,
  //     35
  //   );

  //   doc.text(
  //     `Email: ${UserProfileData?.email || "No Email Yet"}`,
  //     marginLeft + 80,
  //     35
  //   );

  //   currentY = 50; // Move below the header

  //   // Section Title Function
  //   const addSectionTitle = (title: string) => {
  //     doc.setFont("Helvetica", "bold");
  //     doc.setFontSize(14);
  //     doc.setTextColor(33, 33, 33); // Dark font color
  //     doc.text(title, marginLeft, currentY);
  //     currentY += 5;

  //     doc.setDrawColor(200, 200, 200); // Light gray line
  //     doc.setLineWidth(0.5);
  //     doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
  //     currentY += 5;
  //   };
  //   const addEducationSection = (educationDetails: EducationDetail[]) => {
  //     // Title for Education Section
  //     addSectionTitle("Education");

  //     // Iterate through each education detail
  //     educationDetails.forEach((edu) => {
  //       // School Name and Major on the same line
  //       doc.setFont("Helvetica", "bold");
  //       doc.setFontSize(12);
  //       doc.text(
  //         `School name: ${edu?.institutionName || "Not Provided"}`,
  //         marginLeft,
  //         currentY
  //       );

  //       // Display Date Range, Vertical Bar, and Major
  //       const dateRange = `From: ${moment(edu.startDate).format(
  //         "DD-MM-YYYY"
  //       )} - To: ${moment(edu.endDate).format("DD-MM-YYYY")}`;
  //       const major = `Major: ${edu?.fieldOfStudy || "Not Provided"}`;
  //       const separator = " | ";

  //       const combinedText = `${dateRange}${separator}${major}`;
  //       doc.setFontSize(12);
  //       doc.setFont("Helvetica", "normal");
  //       doc.text(combinedText, marginLeft, currentY + 6);

  //       // Degree
  //       currentY += 12;
  //       doc.text(
  //         `Degree: ${edu.degree || "Not Provided"}`,
  //         marginLeft,
  //         currentY
  //       );
  //       currentY += 12; // Add spacing for the next section
  //     });
  //   };

  //   // Example call for the above function
  //   addEducationSection(UserProfileData?.educationDetails || []);

  //   const addCertificatesSection = (certificatesDetails: certificates[]) => {
  //     // Title for Certificates Section
  //     addSectionTitle("Certificates");

  //     // Iterate through each certificate detail
  //     certificatesDetails.forEach((edu) => {
  //       // Certificate Name
  //       doc.setFont("Helvetica", "bold");
  //       doc.setFontSize(12);
  //       doc.text(
  //         `Certificate Name: ${edu?.certificateName || "Not Provided"}`,
  //         marginLeft,
  //         currentY
  //       );

  //       // Organization and Issue Date
  //       const dateRange = `Issue Date: ${moment(edu.issueDate).format("DD-MM-YYYY")}`;
  //       const organization = `Organization: ${edu?.certificateOrganization || "Not Provided"}`;
  //       const separator = " | ";

  //       const combinedText = `${dateRange}${separator}${organization}`;
  //       doc.setFontSize(12);
  //       doc.setFont("Helvetica", "normal");
  //       doc.text(combinedText, marginLeft, currentY + 6);

  //       // URL with Text Wrapping or Clickable Link
  //       currentY += 12;
  //       if (edu.certificateURL) {
  //         doc.textWithLink("Certificate URL", marginLeft, currentY, {
  //           url: edu.certificateURL,
  //         });
  //       } else {
  //         doc.text("Certificate URL: Not Provided", marginLeft, currentY);
  //       }

  //       // Description
  //       currentY += 12;
  //       const wrappedDescription = doc.splitTextToSize(
  //         `Description: ${edu.description || "Not Provided"}`,
  //         sectionWidth
  //       );
  //       doc.text(wrappedDescription, marginLeft, currentY);

  //       // Update currentY for the next certificate
  //       currentY += wrappedDescription.length * 6 + 6;

  //       // Add a new page if content overflows
  //       if (currentY > pageHeight - 30) {
  //         doc.addPage();
  //         currentY = marginTop;
  //       }
  //     });
  //   };

  //   // Example call for the above function
  //   addCertificatesSection(UserProfileData?.certificates || []);

  //   const addAwardsSection = (certificatesDetails: Awards[]) => {
  //     // Title for Certificates Section
  //     addSectionTitle("Adward");

  //     // Iterate through each certificate detail
  //     certificatesDetails.forEach((edu) => {
  //       // Certificate Name
  //       doc.setFont("Helvetica", "bold");
  //       doc.setFontSize(12);
  //       doc.text(
  //         `Award Name: ${edu?.awardName || "Not Provided"}`,
  //         marginLeft,
  //         currentY
  //       );

  //       // Organization and Issue Date
  //       const dateRange = `Issue Date: ${moment(edu.issueDate).format("DD-MM-YYYY")}`;
  //       const organization = `Organization: ${edu?.awardOrganization || "Not Provided"}`;
  //       const separator = " | ";

  //       const combinedText = `${dateRange}${separator}${organization}`;
  //       doc.setFontSize(12);
  //       doc.setFont("Helvetica", "normal");
  //       doc.text(combinedText, marginLeft, currentY + 6);

  //       // URL with Text Wrapping or Clickable Link
  //       // currentY += 12;
  //       // if (edu.certificateURL) {
  //       //   doc.textWithLink("Certificate URL", marginLeft, currentY, {
  //       //     url: edu.certificateURL,
  //       //   });
  //       // } else {
  //       //   doc.text("Certificate URL: Not Provided", marginLeft, currentY);
  //       // }

  //       // Description
  //       currentY += 12;
  //       const wrappedDescription = doc.splitTextToSize(
  //         `Description: ${edu.description || "Not Provided"}`,
  //         sectionWidth
  //       );
  //       doc.text(wrappedDescription, marginLeft, currentY);

  //       // Update currentY for the next certificate
  //       currentY += wrappedDescription.length * 6 + 6;

  //       // Add a new page if content overflows
  //       if (currentY > pageHeight - 30) {
  //         doc.addPage();
  //         currentY = marginTop;
  //       }
  //     });
  //   };

  //   // Example call for the above function
  //   addAwardsSection(UserProfileData?.awards || []);
  //   // Add Education Section
  //   // addSectionTitle("Education");

  //   // UserProfileData?.educationDetails.forEach((edu) => {
  //   //   doc.setFont("Helvetica", "normal");
  //   //   doc.setFontSize(12);
  //   //   doc.text(`School: ${edu?.institutionName || ""}`, marginLeft, currentY);
  //   //   currentY += 6;
  //   //   doc.text(`Major: ${edu?.fieldOfStudy || ""}`, marginLeft, currentY);
  //   //   currentY += 6;
  //   //   doc.text(
  //   //     `From: ${moment(edu.startDate).format("DD-MM-YYYY") || ""} To: ${moment(
  //   //       edu.endDate
  //   //     ).format("DD-MM-YYYY") || "Present"
  //   //       }`,
  //   //     marginLeft,
  //   //     currentY
  //   //   );
  //   //   currentY += 6;
  //   //   doc.text(
  //   //     `Degree:${edu.degree || ""}`,
  //   //     marginLeft,
  //   //     currentY
  //   //   );
  //   //   currentY += 12;

  //   //   // Add Skills Section

  //   // });
  //   // addSectionTitle("Skills");
  //   //   doc.setFont("Helvetica", "normal");
  //   //   UserProfileData?.skillSets.forEach((skill) => {
  //   //     doc.text(`- ${skill.name}`, marginLeft, currentY);
  //   //     currentY += 6;
  //   //   });
  //   //   currentY += 10;
  //   const addSkillsSection = (skillSets: SkillSet[]) => {
  //     // Add Skills Title
  //     addSectionTitle("Skills");

  //     const boxHeight = 8; // Height of each skill box
  //     const boxPadding = 3; // Padding inside the box for text
  //     const boxMargin = 5; // Space between boxes
  //     let currentX = marginLeft; // Start from the left margin
  //     const maxWidth = pageWidth - marginLeft * 2; // Maximum width of the section

  //     // Reduce the vertical gap after the title (smaller than before)

  //     skillSets.forEach((skill) => {
  //       const skillText = skill.name || "Skill";
  //       const skillLevel = skill.proficiencyLevel || "Level";
  //       const textWidth =
  //         doc.getTextWidth(`${skillLevel}: ${skillText}`) + boxPadding * 2;

  //       // Wrap to next row if it exceeds the page width
  //       if (currentX + textWidth > maxWidth) {
  //         currentX = marginLeft; // Reset X position
  //         currentY += boxHeight + boxMargin; // Move to the next row
  //       }

  //       // Draw the rectangle for the skill
  //       doc.setDrawColor(200, 200, 200); // Light gray border color
  //       doc.setFillColor(240, 240, 240); // Light background color
  //       doc.rect(currentX, currentY, textWidth, boxHeight, "FD"); // Draw filled rectangle with border

  //       // Add the skill text inside the rectangle
  //       doc.setFont("Helvetica", "normal");
  //       doc.setFontSize(10);
  //       doc.setTextColor(33, 33, 33); // Dark text color
  //       doc.text(
  //         ` ${skillLevel}: ${skillText} `,
  //         currentX + boxPadding,
  //         currentY + boxHeight / 2 + 2.5
  //       ); // Center text vertically

  //       // Update X position for the next box
  //       currentX += textWidth + boxMargin;
  //     });

  //     // Update Y position for the next section
  //     currentY += 20;
  //   };

  //   // Example call for the above function
  //   addSkillsSection(UserProfileData?.skillSets || []);

  //   //benefits
  //   const addBenefitsSection = (Benefits: Benefits[]) => {
  //     // Add Skills Title
  //     addSectionTitle("Benefits");

  //     const boxHeight = 8; // Height of each skill box
  //     const boxPadding = 3; // Padding inside the box for text
  //     const boxMargin = 5; // Space between boxes
  //     let currentX = marginLeft; // Start from the left margin
  //     const maxWidth = pageWidth - marginLeft * 2; // Maximum width of the section

  //     // Reduce the vertical gap after the title (smaller than before)

  //     Benefits.forEach((benefit) => {
  //       const skillText = benefit.name || "Skill";
  //       const textWidth = doc.getTextWidth(skillText) + boxPadding * 2; // Calculate box width

  //       // Wrap to next row if it exceeds the page width
  //       if (currentX + textWidth > maxWidth) {
  //         currentX = marginLeft; // Reset X position
  //         currentY += boxHeight + boxMargin; // Move to the next row
  //       }

  //       // Draw the rectangle for the skill
  //       doc.setDrawColor(200, 200, 200); // Light gray border color
  //       doc.setFillColor(240, 240, 240); // Light background color
  //       doc.rect(currentX, currentY, textWidth, boxHeight, "FD"); // Draw filled rectangle with border

  //       // Add the skill text inside the rectangle
  //       doc.setFont("Helvetica", "normal");
  //       doc.setFontSize(10);
  //       doc.setTextColor(33, 33, 33); // Dark text color
  //       doc.text(
  //         skillText,
  //         currentX + boxPadding,
  //         currentY + boxHeight / 2 + 2.5
  //       ); // Center text vertically

  //       // Update X position for the next box
  //       currentX += textWidth + boxMargin;
  //     });

  //     // Update Y position for the next section
  //     currentY += 20;
  //   };

  //   // Example call for the above function
  //   addBenefitsSection(UserProfileData?.benefits || []);
  //   // Add Work Experience Section

  //   addSectionTitle("Work Experience");
  //   UserProfileData?.experienceDetails.forEach((exp) => {
  //     doc.setFont("Helvetica", "bold");
  //     doc.text(
  //       `Position: ${exp.position} | CompanyName:${exp.companyName}`,
  //       marginLeft,
  //       currentY
  //     );
  //     currentY += 6;
  //     doc.setFont("Helvetica", "normal");
  //     doc.text(
  //       `From: ${moment(exp.startDate).format("DD-MM-YYYY")} To: ${
  //         moment(exp.endDate).format("DD-MM-YYYY") || "Present"
  //       }`,
  //       marginLeft,
  //       currentY
  //     );
  //     currentY += 6;

  //     doc.text("Daily Tasks:", marginLeft, currentY);
  //     currentY += 6;

  //     const extractTextFromHTML = (htmlString: string) => {
  //       const tempDiv = document.createElement("div");
  //       tempDiv.innerHTML = htmlString;
  //       return tempDiv.textContent || tempDiv.innerText || "";
  //     };
  //     const responsibilitiesText = extractTextFromHTML(
  //       exp.responsibilities || ""
  //     );
  //     const responsibilities = doc.splitTextToSize(
  //       responsibilitiesText,
  //       sectionWidth
  //     );
  //     responsibilities.forEach((task: string) => {
  //       doc.text(`- ${task.trim()}`, marginLeft + 5, currentY);
  //       currentY += 6;
  //     });

  //     doc.text("Achievements:", marginLeft, currentY);
  //     currentY += 6;

  //     // Handle achievements (convert to array if it's a string)
  //     const achievementsText = extractTextFromHTML(exp.achievements || "");
  //     const achievements = doc.splitTextToSize(achievementsText, sectionWidth);
  //     achievements.forEach((ach: string) => {
  //       doc.text(`- ${ach.trim()}`, marginLeft + 5, currentY);
  //       currentY += 6;
  //     });

  //     currentY += 12;

  //     if (currentY > pageHeight - 30) {
  //       doc.addPage();
  //       currentY = marginTop;
  //     }
  //   });

  //   // Save the PDF
  //   doc.save(
  //     `${UserProfileData?.firstName}_${UserProfileData?.lastName}_Resume.pdf`
  //   );
  // };
  const handleDownload = (): void => {
    const doc = new jsPDF("p", "mm", "a4");
    const marginLeft = 15;
    const marginTop = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const sectionWidth = pageWidth - 2 * marginLeft;
    let currentY = marginTop;
  
    // Utility function to handle page breaks
    const checkPageBreak = (currentY: number): number => {
      if (currentY > pageHeight - 30) {
        doc.addPage();
        return marginTop;
      }
      return currentY;
    };
  
    // Utility function to strip HTML tags
    const stripHTMLTags = (html: string): string => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      return tempDiv.textContent || tempDiv.innerText || "";
    };
  
    // Header Section
    const addHeader = () => {
      doc.setFillColor(33, 33, 33);
      doc.rect(0, 0, pageWidth, 40, "F");
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text(
        `${UserProfileData?.firstName || ""} ${UserProfileData?.lastName || ""}`,
        marginLeft,
        25
      );
  
      doc.setFontSize(12);
      doc.text(
        `Phone: ${UserProfileData?.phoneNumber || "No Phone Number"}`,
        marginLeft,
        35
      );
      doc.text(
        `Email: ${UserProfileData?.email || "No Email"}`,
        marginLeft + 80,
        35
      );
      currentY = 50;
    };
  
    addHeader();
  
    // Section Title Function
    const addSectionTitle = (title: string): void => {
      currentY = checkPageBreak(currentY);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(33, 33, 33);
      doc.text(title, marginLeft, currentY);
      currentY += 5;
  
      doc.setDrawColor(200, 200, 200);
      doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
      currentY += 5;
    };
  
    // Education Section
    const addEducationSection = (educationDetails: EducationDetail[]): void => {
      if (!educationDetails?.length) return;
      addSectionTitle("Education");
  
      educationDetails.forEach((edu) => {
        currentY = checkPageBreak(currentY);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(12);
        doc.text(
          `School: ${edu?.institutionName || "Not Provided"}`,
          marginLeft,
          currentY
        );
  
        const details = `From: ${moment(edu.startDate).format(
          "DD-MM-YYYY"
        )} - To: ${
          moment(edu.endDate).format("DD-MM-YYYY") || "Present"
        } | Major: ${edu.fieldOfStudy || "Not Provided"}`;
        doc.setFont("Helvetica", "normal");
        doc.text(details, marginLeft, currentY + 6);
  
        currentY += 12;
        doc.text(`Degree: ${edu.degree || "Not Provided"}`, marginLeft, currentY);
        currentY += 12;
      });
    };
  
    addEducationSection(UserProfileData?.educationDetails || []);
  
    // Certificates Section
    const addCertificatesSection = (certificates: certificates[]): void => {
      if (!certificates?.length) return;
      addSectionTitle("Certificates");
  
      certificates.forEach((cert) => {
        currentY = checkPageBreak(currentY);
        doc.setFont("Helvetica", "bold");
        doc.text(
          `Certificate: ${cert.certificateName || "Not Provided"}`,
          marginLeft,
          currentY
        );
  
        const details = `Issue Date: ${moment(cert.issueDate).format(
          "DD-MM-YYYY"
        )} | Organization: ${cert.certificateOrganization || "Not Provided"}`;
        doc.setFont("Helvetica", "normal");
        doc.text(details, marginLeft, currentY + 6);
  
        currentY += 12;
  
        if (cert.certificateURL) {
          doc.textWithLink("View Certificate", marginLeft, currentY, {
            url: cert.certificateURL,
          });
          currentY += 6;
        }
  
        const description = doc.splitTextToSize(
          `Description: ${cert.description || "Not Provided"}`,
          sectionWidth
        );
        description.forEach((line: string) => {
          currentY = checkPageBreak(currentY);
          doc.text(line, marginLeft, currentY);
          currentY += 6;
        });
      });
    };
  
    addCertificatesSection(UserProfileData?.certificates || []);
  
    // Skills Section
    const addSkillsSection = (skills: SkillSet[]): void => {
      if (!skills?.length) return;
      addSectionTitle("Skills");
  
      const boxHeight = 8;
      const boxMargin = 5;
      let currentX = marginLeft;
  
      skills.forEach((skill) => {
        const skillText = `${skill.proficiencyLevel || ""}: ${skill.name || ""}`;
        const textWidth = doc.getTextWidth(skillText) + 6;
  
        if (currentX + textWidth > pageWidth - marginLeft) {
          currentX = marginLeft;
          currentY += boxHeight + boxMargin;
          currentY = checkPageBreak(currentY);
        }
  
        doc.setDrawColor(200, 200, 200);
        doc.setFillColor(240, 240, 240);
        doc.rect(currentX, currentY, textWidth, boxHeight, "FD");
  
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.text(skillText, currentX + 3, currentY + boxHeight / 2 + 2.5);
  
        currentX += textWidth + boxMargin;
      });
  
      currentY += boxHeight + 10;
    };
  
    addSkillsSection(UserProfileData?.skillSets || []);
  
    // Benefits Section
    const addBenefitsSection = (benefits: Benefits[]): void => {
      if (!benefits?.length) return;
      addSectionTitle("Benefits");
  
      const boxHeight = 8;
      const boxMargin = 5;
      let currentX = marginLeft;
  
      benefits.forEach((benefit) => {
        const benefitText = benefit.name || "Benefit";
        const textWidth = doc.getTextWidth(benefitText) + 6;
  
        if (currentX + textWidth > pageWidth - marginLeft) {
          currentX = marginLeft;
          currentY += boxHeight + boxMargin;
          currentY = checkPageBreak(currentY);
        }
  
        doc.setDrawColor(200, 200, 200);
        doc.setFillColor(240, 240, 240);
        doc.rect(currentX, currentY, textWidth, boxHeight, "FD");
  
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.text(benefitText, currentX + 3, currentY + boxHeight / 2 + 2.5);
  
        currentX += textWidth + boxMargin;
      });
  
      currentY += boxHeight + 10;
    };
  
    addBenefitsSection(UserProfileData?.benefits || []);
  
    // Work Experience Section
    const addWorkExperienceSection = (experiences: ExperienceDetail[]): void => {
      if (!experiences?.length) return;
      addSectionTitle("Work Experience");
  
      experiences.forEach((exp) => {
        currentY = checkPageBreak(currentY);
  
        // Title
        doc.setFont("Helvetica", "bold");
        doc.text(
          `Position: ${exp.position || ""} | Company: ${exp.companyName || ""}`,
          marginLeft,
          currentY
        );
  
        // Dates
        doc.setFont("Helvetica", "normal");
        doc.text(
          `From: ${moment(exp.startDate).format("DD-MM-YYYY")} To: ${
            moment(exp.endDate).format("DD-MM-YYYY") || "Present"
          }`,
          marginLeft,
          currentY + 6
        );
  
        currentY += 12;
  
        // Daily Tasks
        doc.text("Daily Tasks:", marginLeft, currentY);
        currentY += 6;
  
        const tasks = doc.splitTextToSize(
          stripHTMLTags(exp.responsibilities || "No details provided"),
          sectionWidth
        );
        tasks.forEach((line: string) => {
          currentY = checkPageBreak(currentY);
          doc.text(`${line}`, marginLeft + 5, currentY);
          currentY += 6;
        });
  
        // Achievements
        doc.text("Achievements:", marginLeft, currentY);
        currentY += 6;
  
        const achievements = doc.splitTextToSize(
          stripHTMLTags(exp.achievements || "No achievements provided"),
          sectionWidth
        );
        achievements.forEach((line: string) => {
          currentY = checkPageBreak(currentY);
          doc.text(`${line}`, marginLeft + 5, currentY);
          currentY += 6;
        });
      });
    };
  
    addWorkExperienceSection(UserProfileData?.experienceDetails || []);
  
    // Awards Section
    const addAwardsSection = (awards: Awards[]): void => {
      if (!awards?.length) return;
      addSectionTitle("Awards");
  
      awards.forEach((award) => {
        currentY = checkPageBreak(currentY);
        doc.setFont("Helvetica", "bold");
        doc.text(
          `Award: ${award.awardName || "Not Provided"}`,
          marginLeft,
          currentY
        );
  
        const details = `Issue Date: ${moment(award.issueDate).format(
          "DD-MM-YYYY"
        )} | Organization: ${award.awardOrganization || "Not Provided"}`;
        doc.setFont("Helvetica", "normal");
        doc.text(details, marginLeft, currentY + 6);
  
        currentY += 12;
        const description = doc.splitTextToSize(
          `Description: ${award.description || "Not Provided"}`,
          sectionWidth
        );
        description.forEach((line: string) => {
          currentY = checkPageBreak(currentY);
          doc.text(line, marginLeft, currentY);
          currentY += 6;
        });
      });
    };
  
    addAwardsSection(UserProfileData?.awards || []);
  
    // Save PDF
    doc.save(
      `${UserProfileData?.firstName || "User"}_${
        UserProfileData?.lastName || "Profile"
      }_Resume.pdf`
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
                    Skills
                  </div>

                  <div className={classes.skill2}>
                    <div className={classes.education3}>
                      <div className={classes.skill3}>
                        <div className={classes.skill5}>
                          {UserProfileData?.skillSets.map((skill) => (
                            <>
                              <div
                                className={classes.skill4}
                                style={{
                                  fontFamily: "Lexend, sans-serif",
                                  marginLeft: 5,
                                }}
                              >
                                {skill.proficiencyLevel}
                              </div>
                              <span
                                key={skill.id}
                                style={{ fontFamily: "Lexend, sans-serif" }}
                                className={classes.spanskill}
                              >
                                {skill.name}
                              </span>
                            </>
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
                <div className={classes.skill}>
                  <div
                    className={classes.skill1}
                    style={{ fontFamily: "Lexend, sans-serif" }}
                  >
                    Benefits
                  </div>

                  <div className={classes.skill2}>
                    <div className={classes.education3}>
                      <div className={classes.skill3}>
                        <div
                          className={classes.skill4}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          Benefits name
                        </div>
                        <div className={classes.skill5}>
                          {UserProfileData?.benefits.map((benefit) => (
                            <span
                              key={benefit.id}
                              style={{ fontFamily: "Lexend, sans-serif" }}
                              className={classes.spanskill}
                            >
                              {benefit.name}
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
                <div className={classes.education}>
                  <div
                    className={classes.education1}
                    style={{ fontFamily: "Lexend, sans-serif" }}
                  >
                    Certificates
                  </div>

                  <div className={classes.education2}>
                    {UserProfileData?.certificates.map((edu) => (
                      <div className={classes.education3} key={edu.id}>
                        <span
                          className={classes.span}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          Certificate name: {edu.certificateName}
                        </span>
                        <div className={classes.education4}>
                          <p
                            className={classes.p1}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            IssueDate:{""}
                            {moment(edu.issueDate).format("DD-MM-YYYY")}
                            {/* {moment(edu.endDate).format("DD-MM-YYYY")} */}
                          </p>
                          <div className={classes.line}></div>
                          <p
                            className={classes.education5}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Organization: {edu.certificateOrganization}
                          </p>
                        </div>
                        {/* <span
                          className={classes.span1}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          URL: {edu.certificateURL}
                        </span> */}
                        <span
                          className={classes.span1}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          Certificate URL:{" "}
                          <a
                            href={edu.certificateURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "underline",
                              color: "blue",
                              fontFamily: "Lexend, sans-serif",
                            }}
                          >
                            {edu.certificateURL}
                          </a>
                        </span>
                        <span
                          className={classes.span1}
                          style={{
                            fontFamily: "Lexend, sans-serif",
                            display: "block",
                          }}
                        >
                          Description: {edu.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={classes.education}>
                  <div
                    className={classes.education1}
                    style={{ fontFamily: "Lexend, sans-serif" }}
                  >
                    Award
                  </div>

                  <div className={classes.education2}>
                    {UserProfileData?.awards.map((edu) => (
                      <div className={classes.education3} key={edu.id}>
                        <span
                          className={classes.span}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          Award name: {edu.awardName}
                        </span>
                        <div className={classes.education4}>
                          <p
                            className={classes.p1}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            IssueDate:{""}
                            {moment(edu.issueDate).format("DD-MM-YYYY")}
                            {/* {moment(edu.endDate).format("DD-MM-YYYY")} */}
                          </p>
                          <div className={classes.line}></div>
                          <p
                            className={classes.education5}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Organization: {edu.awardOrganization}
                          </p>
                        </div>
                        {/* <span
                          className={classes.span1}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          URL: {edu.certificateURL}
                        </span> */}
                        {/* <span
                          className={classes.span1}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          Certificate URL:{" "}
                          <a
                            href={edu.}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "underline",
                              color: "blue",
                              fontFamily: "Lexend, sans-serif",
                            }}
                          >
                            {edu.certificateURL}
                          </a>
                        </span> */}
                        <span
                          className={classes.span1}
                          style={{
                            fontFamily: "Lexend, sans-serif",
                            display: "block",
                          }}
                        >
                          Description: {edu.description}
                        </span>
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
