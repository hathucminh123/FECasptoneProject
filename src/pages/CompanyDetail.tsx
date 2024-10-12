// import React, { useEffect, useState, useCallback } from "react";
// import classes from "./CompanyDetail.module.css";
// import Image from "./../assets/image/minh.jpg";
// import Typography from "@mui/material/Typography";
// import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import _ from "lodash";
// import CardJob from "../components/CardJob";
// import { renderButton } from "../components/RenderButton";
// import { Outlet } from "react-router-dom";

// export default function CompanyDetail() {
//   const [isScrolled, setIsScrolled] = useState<boolean>(false);

//   const handleScroll = useCallback(
//     _.debounce(() => {
//       const scrollPosition = window.scrollY;
//       const triggerHeight = 250;
//       setIsScrolled(scrollPosition >= triggerHeight);
//     }, 100), // Debounce với khoảng 100ms
//     []
//   );

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   return (
//     <div className={classes.main_container}>
//       <div
//         className={isScrolled ? classes.sticky_container : classes.container}
//       >
//         <div className={classes.container1}>
//           {/* <div className={classes.container2}> */}
//           {/* Conditionally render based on isScrolled */}
//           {isScrolled ? (
//             <div className={classes.container2}>
//               <div className={classes.containerscroll1}>
//                 <Typography
//                   variant="h5"
//                   gutterBottom
//                   sx={{
//                     textAlign: "start",
//                     fontWeight: "bold",
//                     mt: 3,
//                     color: "white",
//                   }}
//                 >
//                   9 Công ty 4 thành viên
//                 </Typography>
//               </div>
//               <div className={classes.containerscroll2}>
//                 {renderButton("Write review", "#ed1b2f", "contained")}
//                 {renderButton("Follow", "white", "outlined", {
//                   minWidth: "180px",
//                 })}
//               </div>
//             </div>
//           ) : (
//             <div className={classes.container3}>
//               <div style={{ paddingRight: "14px" }}>
//                 <img
//                   style={{ width: "200px" }}
//                   src={Image}
//                   alt="Company Image"
//                 />
//               </div>
//               <div className={classes.container4}>
//                 <Typography
//                   variant="h5"
//                   gutterBottom
//                   sx={{
//                     textAlign: "start",
//                     fontWeight: "bold",
//                     mt: 3,
//                     color: "white",
//                   }}
//                 >
//                   9 Công ty 4 thành viên
//                 </Typography>
//                 <div className={classes.locationjob}>
//                   <div className={classes.location}>
//                     <LocationOnOutlinedIcon />
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontSize: "14px",
//                         fontWeight: 400,
//                         color: "white",
//                       }}
//                     >
//                       Ho Chi Minh - Ha Noi - Da Nang - Others
//                     </Typography>
//                   </div>
//                   <div className={classes.job}>
//                     <WorkOutlineOutlinedIcon />
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontSize: "14px",
//                         fontWeight: 400,
//                         whiteSpace: "nowrap",
//                         textDecoration: "underline",
//                         color: "white",
//                       }}
//                     >
//                       9 job openings
//                     </Typography>
//                   </div>
//                 </div>
//                 <div className={classes.button}>
//                   {renderButton("Write review", "#ed1b2f", "contained")}
//                   {renderButton("Follow", "white", "outlined", {
//                     minWidth: "180px",
//                   })}
//                 </div>
//               </div>
//             </div>
//           )}
//           {/* </div> */}
//         </div>
//       </div>

//       <div className={classes.main}>
//         <div className={classes.main1}>
//           <div className={classes.main2}>
//             <div className={classes.containerLeft}>
//               <div className={classes.title}>
//                 <div className={classes.title1}>
//                   <Typography
//                     variant="h5"
//                     sx={{
//                       padding: "24px 0",
//                       fontSize: "14px",
//                       lineHeight: 1.5,
//                     }}
//                   >
//                     Overview
//                   </Typography>
//                 </div>
//               </div>

//                 <div className={classes.overview}>
//                   <Typography
//                     variant="h5"
//                     sx={{
//                       fontSize: "22px",
//                       fontWeight: 700,
//                       lineHeight: 1.5,
//                       borderBottom: "1px dashed #dedede",
//                       paddingBottom: "16px",
//                     }}
//                   >
//                     Company Overview
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       paddingTop: "16px",
//                       fontSize: "16px",
//                       fontWeight: 400,
//                       lineHeight: 1.8,
//                     }}
//                   >
//                     2024 Vietnam Best IT Companies! Delivering top-performing
//                     marketplace platforms in Switzerland. Welcome to SMG Swiss
//                     Marketplace Group Vietnam! We are an Innovation Centre in
//                     Vietnam of SMG Swiss Marketplace Group, a pioneering network
//                     of online marketplaces...
//                   </Typography>
//                 </div>
//                 <div className={classes.overview}>
//                   <Typography
//                     variant="h5"
//                     sx={{
//                       fontSize: "22px",
//                       fontWeight: 700,
//                       lineHeight: 1.5,
//                       borderBottom: "1px dashed #dedede",
//                       paddingBottom: "16px",
//                     }}
//                   >
//                     Our key skills
//                   </Typography>

//                   <Typography
//                     variant="body1"
//                     sx={{
//                       fontSize: "16px",
//                       fontWeight: 400,
//                       lineHeight: 1.8,
//                       paddingTop: "16px",
//                     }}
//                   >
//                     {" "}
//                     Our key skills
//                   </Typography>
//                   <div className={classes.job1}>
//                     <button className={classes.button1}>Java</button>
//                     <button className={classes.button1}>React</button>
//                     <button className={classes.button1}>Node.js</button>
//                     <button className={classes.button1}>CSS</button>
//                   </div>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       paddingTop: "16px",
//                       fontSize: "16px",
//                       fontWeight: 400,
//                       lineHeight: 1.8,
//                     }}
//                   >
//                     2024 Vietnam Best IT Companies! Delivering top-performing
//                     marketplace platforms in Switzerland. Welcome to SMG Swiss
//                     Marketplace Group Vietnam! We are an Innovation Centre in
//                     Vietnam of SMG Swiss Marketplace Group, a pioneering network
//                     of online marketplaces...
//                   </Typography>
//                 </div>
//                 <div className={classes.overview}>
//                   <Typography
//                     variant="h5"
//                     sx={{
//                       fontSize: "22px",
//                       fontWeight: 700,
//                       lineHeight: 1.5,
//                       borderBottom: "1px dashed #dedede",
//                       paddingBottom: "16px",
//                     }}
//                   >
//                     Why you'll love working here
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       paddingTop: "16px",
//                       fontSize: "16px",
//                       fontWeight: 400,
//                       lineHeight: 1.8,
//                     }}
//                   >
//                     Trải nghiệm Thu nhập hấp dẫn với gói đãi ngộ toàn diện: -
//                     Thưởng tháng lương 13; Thưởng thành tích 06 tháng, 1 năm ;
//                     Thưởng các dịp lễ tết trong năm ; Thưởng theo danh hiệu cá
//                     nhân và tập thể… - Du lịch nghỉ dưỡng hàng năm, Khám sức
//                     khỏe định kì; Gói bảo hiểm sức khỏe cá nhân và người thân
//                     (MIC); Quà tặng và ngày nghỉ sinh nhật hưởng nguyên lương Cơ
//                     hội nghề nghiệp và phát triển bản thân: - Được thử sức với
//                     các nền tảng công nghệ mới, tham gia vào những dự án chuyển
//                     đổi lớn của ngân hàng - Có cơ hội học hỏi từ các Chuyên gia,
//                     lãnh đạo nội bộ hàng đầu tại MB trong lĩnh vực IT, Tài chính
//                     ngân hàng - Được trải nghiệm các phương pháp học tập mới và
//                     phát triển năng lực theo lộ trình công danh. - Hưởng các
//                     chính sách hỗ trợ, khuyến khích học tập, nâng cao trình độ
//                     và phát triển bản thân (chứng chỉ nghề quốc tế...) Môi
//                     trường làm việc lý tưởng với: - Những người cộng sự thân
//                     thiện và tài năng - Cơ sở vật chất, không gian làm việc xanh
//                     và hiện đại.
//                   </Typography>
//                 </div>
//                 <Outlet/>

//             </div>
//             <div className={classes.containerRight}>
//               <div className={classes.scroll}>
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     fontSize: "22px",
//                     fontWeight: 700,
//                     lineHeight: 1.5,
//                     borderBottom: "1px dashed #dedede",
//                     paddingBottom: "16px",
//                   }}
//                 >
//                   21 job openings
//                 </Typography>
//                 <div className={classes.content}>
//                   <div style={{ width: "100%" }}>
//                     <CardJob Maxwidth="400px" />

//                     <CardJob Maxwidth="400px" />
//                     <CardJob Maxwidth="400px" />
//                     <CardJob Maxwidth="400px" />
//                     <CardJob Maxwidth="400px" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import classes from "./CompanyDetail.module.css";
// import Image from "./../assets/image/minh.jpg";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCompaniesById } from "../Services/CompanyService/GetCompanyById";
import { GetBusinessStream } from "../Services/BusinessStreamService/GetBusinessStream";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
import LanguageIcon from "@mui/icons-material/Language";
export default function CompanyDetail() {
  const { CompanyId } = useParams();
  console.log("id", CompanyId);
  const { data: CompanyData } = useQuery({
    queryKey: ["Company-details", CompanyId],
    queryFn: ({ signal }) =>
      fetchCompaniesById({ id: Number(CompanyId), signal }),
    enabled: !!CompanyId,
  });
  const { data: Company } = useQuery({
    queryKey: ["Companies"],
    queryFn: ({ signal }) => fetchCompanies({ signal }),
    staleTime: 5000,
  });
  const Companiesdata = Company?.Companies;
  console.log("companies", Companiesdata);
  const { data: BusinessStream } = useQuery({
    queryKey: ["BusinessStream"],
    queryFn: ({ signal }) => GetBusinessStream({ signal }),
    staleTime: 5000,
  });

  const BusinessStreamData = BusinessStream?.BusinessStreams;
  console.log("busines", BusinessStreamData);
  const companyDataa = CompanyData?.Companies;
  // console.log('name',companyDataa?.businessStream.businessStreamName)
  const detail = Companiesdata?.find((item) => item.id === companyDataa?.id);
  console.log("quao", detail);

  const BusinessStreamDatainCompany = BusinessStreamData?.find(
    (item) => detail?.businessStream?.id === item.id
  );
  console.log("haha", BusinessStreamDatainCompany);
  // console.log('sad',BusinessStreamDatainCompany?.businessStreamName)

  return (
    <>
      <div className={classes.info}>
        <Typography
          variant="h2"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: 1.5,
            borderBottom: "1px dashed #dedede",
            paddingBottom: "16px",
          }}
        >
          General information
        </Typography>
        <div className={classes.info1}>
          <div className={classes.info2}>
            <div className={classes.info3}>Company EstablishedYear</div>
            <div className={classes.info4}>{companyDataa?.establishedYear}</div>
          </div>
          <div className={classes.info2}>
            <div className={classes.info3}>Company industry</div>
            <div className={classes.info4}>
              {BusinessStreamDatainCompany?.businessStreamName}
            </div>
          </div>
          <div className={classes.info2}>
            <div className={classes.info3}>Company Size</div>
            <div className={classes.info4}>
              {companyDataa?.numberOfEmployees} employees
            </div>
          </div>
        </div>
        <div className={classes.info1}>
          <div className={classes.info2}>
            <div className={classes.info3}>Country</div>
            <div className={classes.info4}>{companyDataa?.country}</div>
          </div>
          <div className={classes.info2}>
            <div className={classes.info3}>Company Address</div>
            <div className={classes.info4}>
              {companyDataa?.address}, {companyDataa?.city}
            </div>
          </div>
          <div className={classes.info2}>
            <div className={classes.info3}>Company WebSite</div>
            <div className={classes.info5}>
              <LanguageIcon style={{ color: "blue" }} />{" "}
              {companyDataa?.websiteURL}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.overview}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: 1.5,
            borderBottom: "1px dashed #dedede",
            paddingBottom: "16px",
          }}
        >
          Company Overview
        </Typography>
        <Typography
          variant="body2"
          sx={{
            paddingTop: "16px",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: 1.8,
          }}
        >
          {companyDataa && (
            <div
              dangerouslySetInnerHTML={{
                __html: companyDataa?.companyDescription,
              }}
            />
          )}

          {/* {companyDataa?.companyDescription} */}
        </Typography>
      </div>
      <div className={classes.overview}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: 1.5,
            borderBottom: "1px dashed #dedede",
            paddingBottom: "16px",
          }}
        >
          Our key skills
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: 1.8,
            paddingTop: "16px",
          }}
        >
          {" "}
          Our key skills
        </Typography>
        <div className={classes.job1}>
          {companyDataa?.jobPosts.map((job) => (
            <div key={job.id}>
              {job.skillSets.map((skill, index) => (
                <button key={index} className={classes.button1}>
                  {skill}
                </button>
              ))}
            </div>
          ))}
          {/* <button className={classes.button1}>Java</button>
          <button className={classes.button1}>React</button>
          <button className={classes.button1}>Node.js</button>
          <button className={classes.button1}>CSS</button> */}
        </div>
        <Typography
          variant="body2"
          sx={{
            paddingTop: "16px",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: 1.8,
          }}
        >
          {companyDataa && (
            <div
              dangerouslySetInnerHTML={{
                __html: companyDataa?.companyDescription,
              }}
            />
          )}
          {/* {companyDataa?.companyDescription} */}
        </Typography>
      </div>
      <div className={classes.overview}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: 1.5,
            borderBottom: "1px dashed #dedede",
            paddingBottom: "16px",
          }}
        >
          Why you'll love working here
        </Typography>
        <Typography
          variant="body2"
          sx={{
            paddingTop: "16px",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: 1.8,
          }}
        >
          {companyDataa && (
            <div
              dangerouslySetInnerHTML={{
                __html: companyDataa?.companyDescription,
              }}
            />
          )}
          {/* {companyDataa?.companyDescription} */}
        </Typography>
      </div>
    </>
  );
}
