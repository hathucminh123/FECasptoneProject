import Typography from "@mui/material/Typography";
import classes from "./CardProfile.module.css";

import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
interface ExperienceDetail {
  id: number;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  achievements: string;
}

interface form {
  title?: string;
  text?: string;
  icon?: JSX.Element;
  icon2?: JSX.Element;
  img?: string;
  onClick?: () => void;
  data?: ExperienceDetail[];
}

export default function CardExperience({
  title,
  text,
  icon,
  img,
  icon2,
  onClick,
  data,
}: form) {
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <Typography
            variant="h2"
            sx={{ lineHeight: 1.5, fontSize: "22px", fontWeight: 700 }}
          >
            {title}
          </Typography>
          {data?.length ? (
            <div onClick={onClick} className={classes.mainab}>
              {icon2}
            </div>
          ) : (
            <div onClick={onClick} className={classes.mainab}>
              {icon}
            </div>
          )}
          {/* <div onClick={onClick} className={classes.mainab}>
            {icon}
          </div> */}
        </div>
        <div className={classes.separator}></div>

        {data?.length ? (
          data.map((item, index) => (
            <div key={index}>
              <div className={classes.main3}>
                <div className={classes.main4}>
                  <div className={classes.main5}>
                    <Typography
                      variant="h3"
                      sx={{
                        lineHeight: 1.5,
                        fontSize: "18px",
                        color: "#121212",
                        fontWeight: 700,
                        mt: 0,
                        mb: 0,
                      }}
                    >
                      Position: {item?.position}
                    </Typography>
                    <div>
                      <DeleteIcon />
                    </div>
                  </div>
                  <div className={classes.main6}>
                    Company: {item.companyName}
                  </div>

                  {/* Cắt chuỗi ngày tháng để chỉ lấy phần ngày */}
                  <div className={classes.main7}>
                    From: {item.startDate.slice(0, 10)} - To:{" "}
                    {item.endDate.slice(0, 10)}
                  </div>
                  {/* <div className={classes.main7}>{item.responsibilities}</div> */}
                  {/* <div className={classes.main7}>{item.achievements}</div> */}
                  <div
                    className={classes.main7}
                    dangerouslySetInnerHTML={{ __html: item.responsibilities }}
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: "18px",
                      color: "#121212",
                      fontWeight: 700,
                      mt: 0,
                      mb: 0,
                    }}
                  >
                    Project
                  </Typography>

                  <div
                    className={classes.main7}
                    dangerouslySetInnerHTML={{ __html: item.achievements }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="h3" sx={{ lineHeight: 1.5, fontSize: "22px" }}>
            {text}
          </Typography>
        )}

        <span className={classes.img}>
          <img
            style={{ width: "80px", height: "80px", verticalAlign: "middle" }}
            src={img}
            alt="custom image"
          />{" "}
        </span>
      </div>
    </div>
  );
}
