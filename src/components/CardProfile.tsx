import Typography from "@mui/material/Typography";
import classes from "./CardProfile.module.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { AnimatePresence } from "framer-motion";
import EducationEdit from "./EducationEdit";
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

interface form {
  title?: string;
  text?: string;
  icon?: JSX.Element;
  icon2?: JSX.Element;
  img?: string;
  onClick?: () => void;
  data?: EducationDetail[];
}

export default function CardProfile({
  title,
  text,
  icon,
  icon2,
  img,
  onClick,
  data,
}: form) {
  const [openEducation, setOpenEducation] = useState<boolean>(false);
  const [selectEducation, setSelectEducation] = useState<EducationDetail | null>(null);
  const handleOnEdit = (item: EducationDetail) => {
    setOpenEducation(true);
    setSelectEducation(item);
  };
  function handleDone2() {
    setOpenEducation(false);
  }

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
                      School name: {item?.name}
                    </Typography>
                    <div className={classes.edit}>
                      <div style={{cursor:'pointer'}} onClick={() => handleOnEdit(item)}>
                        <EditOutlinedIcon
                          sx={{
                            color: "#ed1b2f",
                          }}
                        />
                      </div>
                      <DeleteIcon />
                    </div>
                  </div>
                  <div className={classes.main6}>
                    {" "}
                    School branch: {item.institutionName}
                  </div>

                  {/* Cắt chuỗi ngày tháng để chỉ lấy phần ngày */}
                  <div className={classes.main7}>
                    From: {item.startDate.slice(0, 10)} - To:{" "}
                    {item.endDate.slice(0, 10)}
                  </div>
                  <div className={classes.main7}>Degree: {item.degree}</div>
                  <div className={classes.main7}>GPA: {item.gpa}</div>
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
      <AnimatePresence>
        {openEducation && <EducationEdit onDone={handleDone2} data={selectEducation}  />}
      </AnimatePresence>
    </div>
  );
}
