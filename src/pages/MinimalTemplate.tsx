import React, { useRef } from "react";
import classes from "./MinimalTemplate.module.css";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
// import html2pdf from "html2pdf.js";
import { GetUserProfile } from "../Services/UserProfileService/UserProfile";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import jsPDF from "jspdf";
const MinimalTemplate: React.FC = () => {
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
  //   const doc = new jsPDF("p", "mm", "a4");

  //   const main3 = document.getElementById("main3");
  //   if (!main3) {
  //     console.error("Element with id 'main3' not found!");
  //     return;
  //   }

  //   const content = main3.innerText || ""; // Extract plain text content
  //   const marginLeft = 10;
  //   const marginTop = 20;
  //   const lineHeight = 10;
  //   const pageHeight = doc.internal.pageSize.getHeight();
  //   let currentHeight = marginTop;

  //   doc.setFont("Helvetica", "normal");
  //   doc.setFontSize(12);

  //   // Split the text into lines that fit within the page width
  //   const lines = doc.splitTextToSize(content, 190); // 190mm width for A4
  //   lines.forEach((line: string) => {
  //     if (currentHeight + lineHeight > pageHeight - marginTop) {
  //       doc.addPage(); // Add a new page if the content overflows
  //       currentHeight = marginTop;
  //     }
  //     doc.text(line, marginLeft, currentHeight);
  //     currentHeight += lineHeight;
  //   });

  //   doc.save("Resume.pdf");
  // };

  // const handleDownload = () => {
  //   const doc = new jsPDF("p", "mm", "a4"); // A4 portrait PDF
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const marginLeft = 10;
  //   const marginTop = 20;
  //   const columnWidth = (pageWidth - 2 * marginLeft) / 2; // Split into two columns
  //   let currentY = marginTop;

  //   // Add Name Header
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(20);
  //   doc.setTextColor("#121212");
  //   doc.text(`${UserProfileData?.firstName} ${UserProfileData?.lastName}`, marginLeft, currentY);
  //   currentY += 10;

  //   // Add a line break for styling
  //   doc.setDrawColor(0, 0, 0);
  //   doc.setLineWidth(0.5);
  //   doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
  //   currentY += 10;

  //   // Left Section: Personal Details
  //   let leftColumnY = currentY; // Track the Y position for the left column

  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(12);
  //   doc.setTextColor("#ed1b2f");
  //   doc.text("PERSONAL DETAILS", marginLeft, leftColumnY);
  //   leftColumnY += 8;

  //   doc.setFont("Helvetica", "normal");
  //   doc.setFontSize(10);
  //   doc.setTextColor("#121212");
  //   doc.text(`Phone: ${UserProfileData?.phoneNumber || "N/A"}`, marginLeft, leftColumnY);
  //   leftColumnY += 6;
  //   doc.text(`Email: ${UserProfileData?.email || "N/A"}`, marginLeft, leftColumnY);
  //   leftColumnY += 12;

  //   // Right Section: Work Experience
  //   let rightColumnY = currentY; // Track the Y position for the right column
  //   const startXRight = marginLeft + columnWidth + 10;

  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(12);
  //   doc.setTextColor("#ed1b2f");
  //   doc.text("WORK EXPERIENCE", startXRight, rightColumnY);
  //   rightColumnY += 8;

  //   UserProfileData?.experienceDetails.forEach((exp) => {
  //     doc.setFont("Helvetica", "bold");
  //     doc.setFontSize(10);
  //     doc.setTextColor("#121212");
  //     doc.text(`Position: ${exp.position}`, startXRight, rightColumnY);
  //     rightColumnY += 6;

  //     doc.setFont("Helvetica", "normal");
  //     doc.text(`Company: ${exp.companyName}`, startXRight, rightColumnY);
  //     rightColumnY += 6;

  //     doc.text(`From: ${exp.startDate} To: ${exp.endDate || "Present"}`, startXRight, rightColumnY);
  //     rightColumnY += 6;

  //     doc.text("Responsibilities:", startXRight, rightColumnY);
  //     rightColumnY += 6;

  //     const responsibilities = exp.responsibilities.split(",").map((item) => item.trim());
  //     responsibilities.forEach((task) => {
  //       doc.text(`- ${task}`, startXRight + 5, rightColumnY);
  //       rightColumnY += 6;
  //     });

  //     rightColumnY += 12;
  //   });

  //   // Check if we need to extend the page for either column
  //   if (leftColumnY > rightColumnY) {
  //     currentY = leftColumnY;
  //   } else {
  //     currentY = rightColumnY;
  //   }

  //   // Add Education Section below both columns
  //   currentY += 10;

  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(12);
  //   doc.setTextColor("#ed1b2f");
  //   doc.text("EDUCATION", marginLeft, currentY);
  //   currentY += 8;

  //   UserProfileData?.educationDetails.forEach((edu) => {
  //     doc.setFont("Helvetica", "normal");
  //     doc.setFontSize(10);
  //     doc.setTextColor("#121212");
  //     doc.text(`School: ${edu.institutionName}`, marginLeft, currentY);
  //     currentY += 6;
  //     doc.text(`Major: ${edu.fieldOfStudy}`, marginLeft, currentY);
  //     currentY += 6;
  //     doc.text(`From: ${edu.startDate} To: ${edu.endDate || "Present"}`, marginLeft, currentY);
  //     currentY += 6;
  //     doc.text(`Degree: ${edu.degree}`, marginLeft, currentY);
  //     currentY += 12;
  //   });

  //   // Add Skills Section
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(12);
  //   doc.setTextColor("#ed1b2f");
  //   doc.text("SKILLS", marginLeft, currentY);
  //   currentY += 8;

  //   UserProfileData?.skillSets.forEach((skill) => {
  //     doc.setFont("Helvetica", "normal");
  //     doc.setFontSize(10);
  //     doc.setTextColor("#121212");
  //     doc.text(skill.name, marginLeft, currentY);
  //     currentY += 6;
  //   });

  //   // Save the PDF
  //   doc.save(`${UserProfileData?.firstName}_${UserProfileData?.lastName}_Resume.pdf`);
  // };

  // const handleDownload = () => {
  //   const doc = new jsPDF("p", "mm", "a4");
  //   const marginLeft = 10;
  //   const marginTop = 20;
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const sectionWidth = pageWidth - 2 * marginLeft;
  //   let currentY = marginTop;

  //   // Add Name Header
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(20);
  //   doc.setTextColor("#121212");
  //   doc.text(`${UserProfileData?.firstName} ${UserProfileData?.lastName}`, marginLeft, currentY);
  //   currentY += 10;

  //   // Add a line break for styling
  //   doc.setDrawColor(0, 0, 0);
  //   doc.setLineWidth(0.5);
  //   doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
  //   currentY += 10;

  //   // Personal Details Section
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(12);
  //   doc.setTextColor("#ed1b2f");
  //   doc.text("PERSONAL DETAILS", marginLeft, currentY);
  //   currentY += 8;

  //   doc.setFont("Helvetica", "normal");
  //   doc.setFontSize(10);
  //   doc.setTextColor("#121212");
  //   doc.text(`Phone: ${UserProfileData?.phoneNumber || "N/A"}`, marginLeft, currentY);
  //   currentY += 6;
  //   doc.text(`Email: ${UserProfileData?.email || "N/A"}`, marginLeft, currentY);
  //   currentY += 12; // Adjust to avoid unnecessary blank space

  //   // Education Section
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(12);
  //   doc.setTextColor("#ed1b2f");
  //   doc.text("EDUCATION", marginLeft, currentY);
  //   currentY += 8;

  //   UserProfileData?.educationDetails.forEach((edu) => {
  //     doc.setFont("Helvetica", "normal");
  //     doc.setFontSize(10);
  //     doc.setTextColor("#121212");
  //     doc.text(`School: ${edu.institutionName}`, marginLeft, currentY);
  //     currentY += 6;
  //     doc.text(`Major: ${edu.fieldOfStudy}`, marginLeft, currentY);
  //     currentY += 6;
  //     doc.text(`From: ${edu.startDate} To: ${edu.endDate || "Present"}`, marginLeft, currentY);
  //     currentY += 6;
  //     doc.text(`Degree: ${edu.degree}`, marginLeft, currentY);
  //     currentY += 12; // Only minimal spacing
  //   });

  //   // Skills Section
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(12);
  //   doc.setTextColor("#ed1b2f");
  //   doc.text("SKILLS", marginLeft, currentY);
  //   currentY += 8;

  //   UserProfileData?.skillSets.forEach((skill) => {
  //     doc.setFont("Helvetica", "normal");
  //     doc.setFontSize(10);
  //     doc.setTextColor("#121212");
  //     doc.text(skill.name, marginLeft, currentY);
  //     currentY += 6;
  //   });

  //   currentY += 10; // Avoid overlap with next section

  //   // Work Experience Section
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(12);
  //   doc.setTextColor("#ed1b2f");
  //   doc.text("WORK EXPERIENCE", marginLeft, currentY);
  //   currentY += 8;

  //   UserProfileData?.experienceDetails.forEach((exp) => {
  //     doc.setFont("Helvetica", "bold");
  //     doc.setFontSize(10);
  //     doc.setTextColor("#121212");
  //     doc.text(`Position: ${exp.position}`, marginLeft, currentY);
  //     currentY += 6;

  //     doc.setFont("Helvetica", "normal");
  //     doc.text(`Company: ${exp.companyName}`, marginLeft, currentY);
  //     currentY += 6;

  //     doc.text(`From: ${exp.startDate} To: ${exp.endDate || "Present"}`, marginLeft, currentY);
  //     currentY += 6;

  //     doc.text("Responsibilities:", marginLeft, currentY);
  //     currentY += 6;

  //     const responsibilities = exp.responsibilities.split(",").map((item) => item.trim());
  //     responsibilities.forEach((task) => {
  //       doc.text(`- ${task}`, marginLeft + 5, currentY);
  //       currentY += 6;

  //       // Handle dynamic page breaks
  //       if (currentY > 270) {
  //         doc.addPage();
  //         currentY = marginTop;
  //       }
  //     });

  //     currentY += 10; // Minimal spacing before the next experience
  //   });

  //   // Save the PDF
  //   doc.save(`${UserProfileData?.firstName}_${UserProfileData?.lastName}_Resume.pdf`);
  // };

  const handleDownload = () => {
    const doc = new jsPDF("p", "mm", "a4"); // A4 portrait PDF
    const marginLeft = 10;
    const marginTop = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const columnWidth = (pageWidth - 3 * marginLeft) / 2; // Two columns with spacing
    let currentY = marginTop; // Shared starting Y position for both columns

    // Function to clean HTML text
    const extractTextFromHTML = (htmlString: string) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlString;
      return tempDiv.textContent || tempDiv.innerText || "N/A";
    };

    // Add Name Header
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor("#121212");
    doc.text(
      `${UserProfileData?.firstName} ${UserProfileData?.lastName}`,
      marginLeft,
      currentY
    );
    currentY += 10;

    // Add a horizontal line for styling
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
    currentY += 10;

    // Starting positions for both columns
    let leftY = currentY; // Left column (Personal Details, Education, Skills)
    let rightY = currentY; // Right column (Work Experience)

    // Utility function to handle page breaks
    const checkPageBreak = (currentY: number) => {
      if (currentY > pageHeight - 20) {
        doc.addPage();
        return marginTop; // Reset Y-position to top margin
      }
      return currentY;
    };

    // Left Column: Personal Details, Education, Skills
    const renderLeftColumn = () => {
      // Personal Details
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#ed1b2f");
      doc.text("PERSONAL DETAILS", marginLeft, leftY);
      leftY += 8;

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor("#121212");
      doc.text(
        `Phone: ${UserProfileData?.phoneNumber || "No Phone Yet"}`,
        marginLeft,
        leftY
      );
      leftY += 6;
      doc.text(
        `Email: ${UserProfileData?.email || "No Email Yet"}`,
        marginLeft,
        leftY
      );
      leftY += 12;

      // Check for page break
      leftY = checkPageBreak(leftY);

      // Education
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#ed1b2f");
      doc.text("EDUCATION", marginLeft, leftY);
      leftY += 8;

      UserProfileData?.educationDetails.forEach((edu) => {
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor("#121212");
        doc.text(`School: ${edu.institutionName}`, marginLeft, leftY);
        leftY += 6;
        doc.text(`Major: ${edu.fieldOfStudy}`, marginLeft, leftY);
        leftY += 6;
        doc.text(
          `From: ${moment(edu.startDate).format("DD-MM-YYYY")} To: ${
            moment(edu.endDate).format("DD-MM-YYYY") || "Present"
          }`,
          marginLeft,
          leftY
        );
        leftY += 6;
        doc.text(`Degree: ${edu.degree}`, marginLeft, leftY);
        leftY += 12;

        // Check for page break
        leftY = checkPageBreak(leftY);
      });

      // Skills
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#ed1b2f");
      doc.text("SKILLS", marginLeft, leftY);
      leftY += 8;

      UserProfileData?.skillSets.forEach((skill) => {
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor("#121212");

        doc.text(`${skill.proficiencyLevel}: ${skill.name}`, marginLeft, leftY);
        leftY += 12;

        // Check for page break
        leftY = checkPageBreak(leftY);
      });

      // Benefit
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#ed1b2f");
      doc.text("Benefits", marginLeft, leftY);
      leftY += 8;

      UserProfileData?.benefits.forEach((benefit) => {
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor("#121212");
        doc.text(benefit.name, marginLeft, leftY);
        leftY += 6;

        // Check for page break
        leftY = checkPageBreak(leftY);
      });
    };

    // Right Column: Work Experience
    const renderRightColumn = () => {
      const startXRight = marginLeft + columnWidth + marginLeft; // Starting X position for the right column
    
      // WORK EXPERIENCE Section
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#ed1b2f");
      doc.text("WORK EXPERIENCE", startXRight, rightY);
      rightY += 8;
    
      UserProfileData?.experienceDetails.forEach((exp) => {
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor("#121212");
        doc.text(`Position: ${exp.position}`, startXRight, rightY);
        rightY += 6;
    
        doc.setFont("Helvetica", "normal");
        doc.text(`Company: ${exp.companyName}`, startXRight, rightY);
        rightY += 6;
    
        doc.text(
          `From: ${moment(exp.startDate).format("DD-MM-YYYY")} To: ${
            moment(exp.endDate).format("DD-MM-YYYY") || "Present"
          }`,
          startXRight,
          rightY
        );
        rightY += 6;
    
        doc.text("Responsibilities:", startXRight, rightY);
        rightY += 6;
    
        const responsibilities = doc.splitTextToSize(
          extractTextFromHTML(exp.responsibilities || ""),
          columnWidth
        );
        responsibilities.forEach((task: string) => {
          doc.text(`- ${task}`, startXRight + 5, rightY);
          rightY += 6;
    
          // Check for page break
          rightY = checkPageBreak(rightY);
        });
    
        const achievements = doc.splitTextToSize(
          extractTextFromHTML(exp.achievements || ""),
          columnWidth
        );
        achievements.forEach((ach: string) => {
          doc.text(`- ${ach.trim()}`, startXRight + 5, rightY);
          rightY += 6;
    
          // Check for page break
          rightY = checkPageBreak(rightY);
        });
    
        rightY += 10; // Add spacing between experiences
        rightY = checkPageBreak(rightY); // Check for page break
      });
    
      // CERTIFICATES Section
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#ed1b2f");
      doc.text("CERTIFICATES", startXRight, rightY);
      rightY += 8;
    
      UserProfileData?.certificates.forEach((cert) => {
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor("#121212");
        doc.text(`Certificate: ${cert.certificateName}`, startXRight, rightY);
        rightY += 6;
    
        doc.text(`Organization: ${cert.certificateOrganization}`, startXRight, rightY);
        rightY += 6;
    
        doc.text(
          `Issue Date: ${moment(cert.issueDate).format("DD-MM-YYYY")}`,
          startXRight,
          rightY
        );
        rightY += 6;
    
        // Handle certificate URL (with wrapping for long URLs)
        if (cert.certificateURL) {
          const wrappedURL = doc.splitTextToSize(
            `URL: ${cert.certificateURL}`,
            columnWidth
          );
          wrappedURL.forEach((line: string) => {
            doc.text(line, startXRight, rightY);
            rightY += 6;
          });
        }
    
        doc.text(`Description: ${cert.description || "Not Provided"}`, startXRight, rightY);
        rightY += 12;
    
        // Check for page break
        rightY = checkPageBreak(rightY);
      });
      rightY += 10;
      // AWARDS Section
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#ed1b2f");
      doc.text("AWARDS", startXRight, rightY);
      rightY += 8;
    
      UserProfileData?.awards.forEach((award) => {
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor("#121212");
        doc.text(`Award: ${award.awardName}`, startXRight, rightY);
        rightY += 6;
    
        doc.text(`Organization: ${award.awardOrganization}`, startXRight, rightY);
        rightY += 6;
    
        doc.text(
          `Issue Date: ${moment(award.issueDate).format("DD-MM-YYYY")}`,
          startXRight,
          rightY
        );
        rightY += 6;
    
        doc.text(`Description: ${award.description || "Not Provided"}`, startXRight, rightY);
        rightY += 12;
    
        // Check for page break
        rightY = checkPageBreak(rightY);
      });
    };
    

    // Render the two columns
    renderLeftColumn();
    renderRightColumn();

    // Save the PDF
    doc.save(
      `${UserProfileData?.firstName}_${UserProfileData?.lastName}_Resume.pdf`
    );
  };

  // const handleDownload = () => {
  //   const doc = new jsPDF("p", "mm", "a4"); // A4 portrait PDF
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const marginLeft = 10;
  //   const marginTop = 20;
  //   const sectionWidth = (pageWidth - 2 * marginLeft) / 2;
  //   let currentY = marginTop;

  //   // Add Name Header
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(20);
  //   doc.setTextColor("#121212");
  //   doc.text(`${UserProfileData?.firstName} ${UserProfileData?.lastName}`, marginLeft, currentY);
  //   currentY += 10;

  //   // Add a line break for styling
  //   doc.setDrawColor(0, 0, 0);
  //   doc.setLineWidth(0.5);
  //   doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
  //   currentY += 10;

  //   // Left Section - Personal Details, Education, and Skills
  //   const startXLeft = marginLeft;
  //   const startXRight = pageWidth / 2 + 5;

  //   // Personal Details
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(12);
  //   doc.setTextColor("#ed1b2f");
  //   doc.text("PERSONAL DETAILS", startXLeft, currentY);
  //   currentY += 8;

  //   doc.setFont("Helvetica", "normal");
  //   doc.setFontSize(10);
  //   doc.setTextColor("#121212");
  //   doc.text(`Phone: ${UserProfileData?.phoneNumber || "N/A"}`, startXLeft, currentY);
  //   currentY += 6;
  //   doc.text(`Email: ${UserProfileData?.email || "N/A"}`, startXLeft, currentY);
  //   currentY += 12;

  //   // Education
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(12);
  //   doc.setTextColor("#ed1b2f");
  //   doc.text("Education", startXLeft, currentY);
  //   currentY += 8;

  //   UserProfileData?.educationDetails.forEach((edu) => {
  //     doc.setFont("Helvetica", "normal");
  //     doc.setFontSize(10);
  //     doc.setTextColor("#121212");
  //     doc.text(`School: ${edu.institutionName}`, startXLeft, currentY);
  //     currentY += 6;
  //     doc.text(`Major: ${edu.fieldOfStudy}`, startXLeft, currentY);
  //     currentY += 6;
  //     doc.text(`From: ${edu.startDate} To: ${edu.endDate || "Present"}`, startXLeft, currentY);
  //     currentY += 6;
  //     doc.text(`Degree: ${edu.degree}`, startXLeft, currentY);
  //     currentY += 12;

  //     if (currentY > 270) {
  //       doc.addPage();
  //       currentY = marginTop;
  //     }
  //   });

  //   // Skills
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(12);
  //   doc.setTextColor("#ed1b2f");
  //   doc.text("Skills", startXLeft, currentY);
  //   currentY += 8;

  //   UserProfileData?.skillSets.forEach((skill) => {
  //     doc.setFont("Helvetica", "normal");
  //     doc.setFontSize(10);
  //     doc.setTextColor("#121212");
  //     doc.text(`${skill.name}`, startXLeft, currentY);
  //     currentY += 6;
  //     // doc.text(`Description: ${skill.description || "N/A"}`, startXLeft, currentY);
  //     currentY += 10;

  //     if (currentY > 270) {
  //       doc.addPage();
  //       currentY = marginTop;
  //     }
  //   });

  //   // Right Section - Work Experience
  //   currentY = marginTop; // Reset Y for the right section

  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(12);
  //   doc.setTextColor("#ed1b2f");
  //   doc.text("Work Experience", startXRight, currentY);
  //   currentY += 8;

  //   UserProfileData?.experienceDetails.forEach((exp) => {
  //     doc.setFont("Helvetica", "bold");
  //     doc.setFontSize(10);
  //     doc.setTextColor("#121212");
  //     doc.text(`Position: ${exp.position}`, startXRight, currentY);
  //     currentY += 6;

  //     doc.setFont("Helvetica", "normal");
  //     doc.text(`Company: ${exp.companyName}`, startXRight, currentY);
  //     currentY += 6;

  //     doc.text(`From: ${exp.startDate} To: ${exp.endDate || "Present"}`, startXRight, currentY);
  //     currentY += 6;

  //     doc.text("Responsibilities:", startXRight, currentY);
  //     currentY += 6;
  //     const extractTextFromHTML = (htmlString:string) => {
  //       const tempDiv = document.createElement("div");
  //       tempDiv.innerHTML = htmlString;
  //       return tempDiv.textContent || tempDiv.innerText || "N/A";
  //     };
  //     const responsibilitiesText = extractTextFromHTML(exp.responsibilities || "N/A");
  //     const responsibilities = doc.splitTextToSize( responsibilitiesText, sectionWidth);
  //     responsibilities.forEach((line:string) => {
  //       doc.text(line, startXRight, currentY);
  //       currentY += 6;
  //     });

  //     doc.text("Achievements:", startXRight, currentY);
  //     currentY += 6;
  //     const achievementsText = extractTextFromHTML(exp.achievements || "N/A");
  //     const achievements = doc.splitTextToSize(achievementsText, sectionWidth);
  //     achievements.forEach((line:string) => {
  //       doc.text(line, startXRight, currentY);
  //       currentY += 6;
  //     });

  //     currentY += 12;

  //     if (currentY > 270) {
  //       doc.addPage();
  //       currentY = marginTop;
  //     }
  //   });

  //   // Save the PDF
  //   doc.save(`${UserProfileData?.firstName}_${UserProfileData?.lastName}_Resume.pdf`);
  // };
  // const handleDownload = () => {
  //   const doc = new jsPDF("p", "mm", "a4");
  //   const marginLeft = 15;
  //   const marginTop = 20;
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const pageHeight = doc.internal.pageSize.getHeight();
  //   const sectionWidth = pageWidth - 2 * marginLeft;
  //   let currentY = marginTop;

  //   // Header Section
  //   doc.setFillColor(33, 33, 33); // Dark background
  //   doc.rect(0, 0, pageWidth, 40, "F");
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(22);
  //   doc.setTextColor(255, 255, 255); // White text
  //   doc.text(`${UserProfileData?.firstName} ${UserProfileData?.lastName}`, marginLeft, 25);

  //   // Contact Details
  //   doc.setFontSize(12);
  //   doc.text(`Phone: ${UserProfileData?.phoneNumber || "N/A"}`, marginLeft, 35);
  //   doc.text(`Email: ${UserProfileData?.email || "N/A"}`, marginLeft + 60, 35);

  //   currentY = 50; // Start below the header

  //   // Section Title Function
  //   const addSectionTitle = (title) => {
  //     doc.setFont("Helvetica", "bold");
  //     doc.setFontSize(14);
  //     doc.setTextColor(237, 27, 47); // Red color for titles
  //     doc.text(title, marginLeft, currentY);
  //     currentY += 6;
  //     doc.setDrawColor(200, 200, 200); // Light gray line
  //     doc.setLineWidth(0.5);
  //     doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
  //     currentY += 10;
  //   };

  //   // Add Section Content
  //   const addSectionContent = (contentArray) => {
  //     doc.setFont("Helvetica", "normal");
  //     doc.setFontSize(12);
  //     doc.setTextColor(33, 33, 33); // Default dark text
  //     contentArray.forEach((line) => {
  //       doc.text(line, marginLeft, currentY);
  //       currentY += 6;

  //       // Add page break if content overflows
  //       if (currentY > pageHeight - 30) {
  //         doc.addPage();
  //         currentY = marginTop;
  //       }
  //     });
  //     currentY += 10;
  //   };

  //   // Personal Details Section
  //   addSectionTitle("PERSONAL DETAILS");
  //   addSectionContent([
  //     `Phone: ${UserProfileData?.phoneNumber || "N/A"}`,
  //     `Email: ${UserProfileData?.email || "N/A"}`,
  //   ]);

  //   // Education Section
  //   addSectionTitle("EDUCATION");
  //   const educationContent = UserProfileData?.educationDetails.map((edu) => [
  //     `School Name: ${edu.institutionName || "N/A"}`,
  //     `Major: ${edu.fieldOfStudy || "N/A"}`,
  //     `From: ${edu.startDate || "N/A"} - To: ${edu.endDate || "Present"}`,
  //     `Degree: ${edu.degree || "N/A"}`,
  //   ]) || [];
  //   addSectionContent(educationContent.flat());

  //   // Skills Section
  //   addSectionTitle("SKILLS");
  //   const skillsContent = UserProfileData?.skillSets.map((skill) => `Skill Name: ${skill.name}`) || [];
  //   addSectionContent(skillsContent);

  //   // Work Experience Section
  //   addSectionTitle("WORK EXPERIENCE");
  //   UserProfileData?.experienceDetails.forEach((exp) => {
  //     addSectionContent([
  //       `Position: ${exp.position}`,
  //       `Company Name: ${exp.companyName}`,
  //       `From: ${exp.startDate} - To: ${exp.endDate || "Present"}`,
  //     ]);

  //     // Responsibilities
  //     doc.text("Daily Tasks:", marginLeft, currentY);
  //     currentY += 6;
  //     const responsibilities =
  //       typeof exp.responsibilities === "string"
  //         ? exp.responsibilities.split(",")
  //         : exp.responsibilities || [];
  //     responsibilities.forEach((task) => {
  //       doc.text(`- ${task.trim()}`, marginLeft + 5, currentY);
  //       currentY += 6;

  //       if (currentY > pageHeight - 30) {
  //         doc.addPage();
  //         currentY = marginTop;
  //       }
  //     });

  //     // Achievements
  //     doc.text("Achievements:", marginLeft, currentY);
  //     currentY += 6;
  //     const achievements =
  //       typeof exp.achievements === "string"
  //         ? exp.achievements.split(",")
  //         : exp.achievements || [];
  //     achievements.forEach((ach) => {
  //       doc.text(`- ${ach.trim()}`, marginLeft + 5, currentY);
  //       currentY += 6;

  //       if (currentY > pageHeight - 30) {
  //         doc.addPage();
  //         currentY = marginTop;
  //       }
  //     });

  //     currentY += 12;
  //   });

  //   // Save the PDF
  //   doc.save(`${UserProfileData?.firstName}_${UserProfileData?.lastName}_Resume.pdf`);
  // };

  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3} id="main3" ref={cvRef}>
            <div className={classes.main4}>
              <div className={classes.main5}>
                <div className={classes.header}>
                  <div className={classes.header1}></div>
                  <div className={classes.header2}>
                    <div className={classes.header3}>
                      <div className={classes.header4}>
                        <div className={classes.header5}>
                          <Typography
                            variant="h1"
                            sx={{
                              fontWeight: 500,
                              fontSize: "36px",
                              wordBreak: "break-word",
                              wordWrap: "break-word",
                              width: "100%",
                              lineHeight: 1.5,
                              marginTop: 0,
                              marginBottom: 0,
                              boxSizing: "border-box",
                              display: "block",
                              fontFamily: "Lexend, sans-serif",
                            }}
                          >
                            {UserProfileData?.firstName}{" "}
                            {UserProfileData?.lastName}
                          </Typography>
                        </div>
                      </div>
                      <div className={classes.header6}>
                        <div className={classes.img}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.main6}>
                  <div className={classes.main7}>
                    <div className={classes.main8}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#ed1b2f",
                          paddingBottom: "12px",
                          fontWeight: 700,
                          fontSize: "16px",
                          textTransform: "uppercase",
                          lineHeight: 1.5,
                          marginTop: 0,
                          marginBottom: 0,
                          boxSizing: "border-box",
                          display: "block",

                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        Personal Details
                      </Typography>
                      <div className={classes.main9}>
                        <img
                          src="https://itviec.com/assets/cv_templates/icons/minimal-phone-16ff110181006af27cc6139e229a10bf6b13b6ee9901dff55b5c2245be310494.svg"
                          alt="phone"
                          className={classes.img1}
                        />
                        <div
                          className={classes.main10}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          {UserProfileData?.phoneNumber}
                        </div>
                      </div>
                      <div
                        className={classes.main9}
                        style={{ paddingTop: "10px" }}
                      >
                        <img
                          src="https://itviec.com/assets/cv_templates/icons/minimal-mail-2a7565291c2e36bf20fbf4450bc65b770fe7b2a92d6152418abbdc0d42e3d012.svg"
                          alt="email"
                          className={classes.img1}
                        />
                        <div
                          className={classes.main10}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          {UserProfileData?.email}
                        </div>
                      </div>
                    </div>
                    <div className={classes.education}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#ed1b2f",
                          paddingBottom: "12px",
                          fontWeight: 700,
                          fontSize: "16px",
                          textTransform: "uppercase",
                          lineHeight: 1.5,
                          marginTop: 0,
                          marginBottom: 0,
                          boxSizing: "border-box",
                          display: "block",
                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        Education
                      </Typography>
                      {UserProfileData?.educationDetails.map((edu) => (
                        <div className={classes.education1} key={edu.id}>
                          <div
                            className={classes.education2}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            School name: {edu.institutionName}
                          </div>
                          <div
                            className={classes.education3}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Major: {edu.fieldOfStudy}
                          </div>
                          <div
                            className={classes.education3}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            {" "}
                            From:{""}
                            {moment(edu.startDate).format("DD-MM-YYYY")} - To:{" "}
                            {moment(edu.endDate).format("DD-MM-YYYY")}
                          </div>
                          <div
                            className={classes.education3}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Degree: {edu.degree}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={classes.Skill}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#ed1b2f",
                          paddingBottom: "12px",
                          fontWeight: 700,
                          fontSize: "16px",
                          textTransform: "uppercase",
                          lineHeight: 1.5,
                          marginTop: 0,
                          marginBottom: 0,
                          boxSizing: "border-box",
                          display: "block",
                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        Skills
                      </Typography>
                      {UserProfileData?.skillSets.map((skills) => (
                        <div style={{ marginBottom: "30px" }} key={skills.id}>
                          <div className={classes.skilldes}>
                            <div className={classes.skill2}>
                              <span className={classes.span1}>
                                <strong>Skill Name:</strong>
                              </span>
                            </div>
                            <div className={classes.skill3}>
                              <span
                                style={{ fontFamily: "Lexend, sans-serif" }}
                                className={classes.span2}
                              >
                                {skills.name}
                              </span>
                            </div>
                          </div>
                          <div className={classes.skilldes}>
                            <div className={classes.skill2}>
                              <span
                                className={classes.span1}
                                style={{ fontFamily: "Lexend, sans-serif" }}
                              >
                                <strong>Description:</strong>
                              </span>
                            </div>
                            <div>
                              <span className={classes.span2}>
                                <div
                                  style={{ fontFamily: "Lexend, sans-serif" }}
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      skills.description ??
                                      "No Description yet",
                                  }}
                                />
                              </span>
                            </div>
                          </div>
                          <div className={classes.skilldes}>
                            <div className={classes.skill2}>
                              <span
                                className={classes.span1}
                                style={{ fontFamily: "Lexend, sans-serif" }}
                              >
                                <strong>Skill levels:</strong>
                              </span>
                            </div>
                            <div>
                              <span className={classes.span2}>
                                <div
                                  style={{ fontFamily: "Lexend, sans-serif" }}
                                  dangerouslySetInnerHTML={{
                                    __html: skills.proficiencyLevel ?? "",
                                  }}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={classes.Skill}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#ed1b2f",
                          paddingBottom: "12px",
                          fontWeight: 700,
                          fontSize: "16px",
                          textTransform: "uppercase",
                          lineHeight: 1.5,
                          marginTop: 0,
                          marginBottom: 0,
                          boxSizing: "border-box",
                          display: "block",
                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        Benefits
                      </Typography>
                      {UserProfileData?.benefits.map((benefit) => (
                        <div style={{ marginBottom: "30px" }} key={benefit.id}>
                          <div className={classes.skilldes}>
                            <div className={classes.skill2}>
                              <span className={classes.span1}>
                                <strong>Benefits Name:</strong>
                              </span>
                            </div>
                            <div className={classes.skill3}>
                              <span
                                style={{ fontFamily: "Lexend, sans-serif" }}
                                className={classes.span2}
                              >
                                {benefit.name}
                              </span>
                            </div>
                          </div>
                          {/* <div className={classes.skilldes}>
                            <div className={classes.skill2}>
                              <span
                                className={classes.span1}
                                style={{ fontFamily: "Lexend, sans-serif" }}
                              >
                                <strong>Description:</strong>
                              </span>
                            </div>
                            <div>
                              <span className={classes.span2}>
                                <div
                                  style={{ fontFamily: "Lexend, sans-serif" }}
                                  dangerouslySetInnerHTML={{
                                    __html: skills.description,
                                  }}
                                />
                              </span>
                            </div>
                          </div> */}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={classes.line}></div>
                  <div className={classes.mainright}>
                    <div className={classes.main12}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#ed1b2f",
                          paddingBottom: "12px",
                          fontWeight: 700,
                          fontSize: "16px",
                          textTransform: "uppercase",
                          lineHeight: 1.5,
                          marginTop: 0,
                          marginBottom: 0,
                          boxSizing: "border-box",
                          display: "block",
                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        Work Experience
                      </Typography>

                      {UserProfileData?.experienceDetails.map((exp) => (
                        <div className={classes.main13} key={exp.id}>
                          <div className={classes.main14}>
                            <div
                              className={classes.exp2}
                              style={{ fontFamily: "Lexend, sans-serif" }}
                            >
                              Position: {exp.position}
                            </div>
                            <div className={classes.exp3}>
                              {" "}
                              From:{""}
                              {moment(exp.startDate).format("DD-MM-YYYY")} - To:{" "}
                              {moment(exp.endDate).format("DD-MM-YYYY")}
                            </div>
                          </div>
                          <div
                            className={classes.exp4}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Company Name: {exp.companyName}
                          </div>
                          <div className={classes.exp5}>
                            <div
                              style={{ fontFamily: "Lexend, sans-serif" }}
                              dangerouslySetInnerHTML={{
                                __html: exp.responsibilities,
                              }}
                            />
                          </div>
                          <div
                            className={classes.exp6}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Project
                          </div>
                          <div className={classes.exp7}>
                            <div
                              style={{ fontFamily: "Lexend, sans-serif" }}
                              dangerouslySetInnerHTML={{
                                __html: exp.achievements,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={classes.education}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#ed1b2f",
                          paddingBottom: "12px",
                          fontWeight: 700,
                          fontSize: "16px",
                          textTransform: "uppercase",
                          lineHeight: 1.5,
                          marginTop: 0,
                          marginBottom: 0,
                          boxSizing: "border-box",
                          display: "block",
                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        Certificate
                      </Typography>
                      {UserProfileData?.certificates.map((edu) => (
                        <div className={classes.education1} key={edu.id}>
                          <div
                            className={classes.education2}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Certificate name: {edu.certificateName}
                          </div>
                          <div
                            className={classes.education3}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Organization: {edu.certificateOrganization}
                          </div>
                          <div
                            className={classes.education3}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            {" "}
                            Issue Date:{""}
                            {moment(edu.issueDate).format("DD-MM-YYYY")}
                            {/* {moment(edu.endDate).format("DD-MM-YYYY")} */}
                          </div>
                          <div
                            className={classes.education3}
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
                              {edu.certificateURL.length > 50
                                ? `${edu.certificateURL.substring(0, 47)}...`
                                : edu.certificateURL}
                            </a>
                          </div>
                          <div
                            className={classes.education3}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Description: {edu.description}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={classes.education}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#ed1b2f",
                          paddingBottom: "12px",
                          fontWeight: 700,
                          fontSize: "16px",
                          textTransform: "uppercase",
                          lineHeight: 1.5,
                          marginTop: 0,
                          marginBottom: 0,
                          boxSizing: "border-box",
                          display: "block",
                          fontFamily: "Lexend, sans-serif",
                        }}
                      >
                        Award
                      </Typography>
                      {UserProfileData?.awards.map((edu) => (
                        <div className={classes.education1} key={edu.id}>
                          <div
                            className={classes.education2}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Award name: {edu.awardName}
                          </div>
                          <div
                            className={classes.education3}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Organization: {edu.awardOrganization}
                          </div>
                          <div
                            className={classes.education3}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            {" "}
                            Issue Date:{""}
                            {moment(edu.issueDate).format("DD-MM-YYYY")}
                            {/* {moment(edu.endDate).format("DD-MM-YYYY")} */}
                          </div>
                      
                          <div
                            className={classes.education3}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Description: {edu.description}
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
      </div>
      <div className={classes.main15}>
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
export default MinimalTemplate;
