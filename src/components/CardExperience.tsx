import Typography from "@mui/material/Typography";
import classes from "./CardProfile.module.css";
import { AnimatePresence } from "framer-motion";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ExperienceEdit from "./ExperienceEdit";
import { useMutation } from "@tanstack/react-query";
import { DeleteExperienceDetail } from "../Services/ExperienceDetailService/DeleteExperienceDetail";
import { queryClient } from "../Services/mainService";
import { message } from "antd";
import moment from "moment";
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
  const [openExperience, setOpenExperience] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectExperience, setSelectExperience] =
    useState<ExperienceDetail | null>(null);
  const handleOnEdit = (item: ExperienceDetail) => {
    setOpenExperience(true);
    setSelectExperience(item);
  };
  function handleDone2() {
    setOpenExperience(false);
  }
  const { mutate } = useMutation({
    mutationFn: DeleteExperienceDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ExperienceDetails"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["UserProfile"],
        refetchType: "active",
      });
      message.success("Experience Details Deleted Successfully");
      setDeletingId(null);
    
    },
    onError: () => {
      message.error("Failed to delete the Experience");
      setDeletingId(null);
    },
  });

  const handleDelete = (id: number) => {
    setDeletingId(id);
    mutate({ id: id });
  };

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
                    <div className={classes.edit}>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOnEdit(item)}
                      >
                        <EditOutlinedIcon
                          sx={{
                            color: "#ed1b2f",
                          }}
                        />
                      </div>
                      {deletingId === item.id ? (
                        <>Please wait a second...</>
                      ) : (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(item.id)}
                        >
                          <DeleteIcon />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={classes.main6}>
                    Company: {item.companyName}
                  </div>

                  {/* Cắt chuỗi ngày tháng để chỉ lấy phần ngày */}
                  <div className={classes.main7}>
                    From:{" "}
                    {moment(item.startDate.slice(0, 10)).format("DD/MM/YYYY")} -
                    To: {moment(item.endDate.slice(0, 10)).format("DD/MM/YYYY")}
                  </div>
                  {/* <div className={classes.main7}>{item.responsibilities}</div> */}
                  {/* <div className={classes.main7}>{item.achievements}</div> */}
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
                    Responsibilities:
                  </Typography>
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
                    Achievements:
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
      <AnimatePresence>
        {openExperience && (
          <ExperienceEdit onDone={handleDone2} data={selectExperience} />
        )}
      </AnimatePresence>
    </div>
  );
}
