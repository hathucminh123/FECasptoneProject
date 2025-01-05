import Typography from "@mui/material/Typography";
import classes from "./Cardcertificates.module.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { AnimatePresence } from "framer-motion";

import { queryClient } from "../Services/mainService";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import moment from "moment";


import { DeleteCertificates } from "../Services/CertificatesService/DeleteCertificates";
import CertificatesEdit from "./CertificatesEdit";
interface certificates {
  id: number;
  certificateName: string;
  certificateOrganization: string;
  description: string;
  certificateURL: string;
  issueDate: string;
}

interface form {
  title?: string;
  text?: string;
  icon?: JSX.Element;
  icon2?: JSX.Element;
  img?: string;
  onClick?: () => void;
  data?: certificates[];
}

const Cardcertificates: React.FC<form> = ({
  title,
  text,
  icon,
  icon2,
  img,
  onClick,
  data,
}) => {
  const [openEducation, setOpenEducation] = useState<boolean>(false);
  const [selectEducation, setSelectEducation] = useState<certificates | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const handleOnEdit = (item: certificates) => {
    setOpenEducation(true);
    setSelectEducation(item);
  };
  function handleDone2() {
    setOpenEducation(false);
  }

  const { mutate } = useMutation({
    mutationFn: DeleteCertificates,
    onSuccess: () => {
      //   queryClient.invalidateQueries({
      //     queryKey: ["EducationDetails"],
      //     refetchType: "active",
      //   });
      queryClient.invalidateQueries({
        queryKey: ["UserProfile"],
        refetchType: "active",
      });
      message.success("Certificates Details Deleted Successfully");
      setDeletingId(null);
    },
    onError: () => {
      message.error("Failed to delete the Certificates");
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
            sx={{
              lineHeight: 1.5,
              fontSize: "22px",
              fontWeight: 700,
              fontFamily: "Lexend, sans-serif",
            }}
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
                        fontFamily: "Lexend, sans-serif",
                      }}
                    >
                      Certificates name: {item.certificateName}
                    </Typography>
                    <div className={classes.edit}>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOnEdit(item)}
                      >
                        <EditOutlinedIcon
                          sx={{
                            color: "#4cd681",
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
                  {/* <div className={classes.main6}>
                    {" "}
                    School branch: {item.institutionName}
                  </div> */}

                  {/* Cắt chuỗi ngày tháng để chỉ lấy phần ngày */}
                  <div
                    className={classes.main7}
                    style={{ fontFamily: "Lexend, sans-serif" }}
                  >
                    Issue Date:{" "}
                    {moment(item.issueDate.slice(0, 10)).format("DD/MM/YYYY")}
                  </div>
                  <div className={classes.main7}>
                    Certificate Organization: {item.certificateOrganization}
                  </div>
                  <div className={classes.main7}>
                    <a
                      href={item.certificateURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.certificateLink}
                    >
                      View certificate
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={classes.externalIcon}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 10.5L20 4m0 0h-5.25M20 4v5.25M10 14.25v5.25a2.25 2.25 0 002.25 2.25h5.25m-12-12v-2.25A2.25 2.25 0 014.25 10H5.5M4.25 10H7.5m0 0L4 13.5"
                        />
                      </svg>
                    </a>
                  </div>
                  <div className={classes.main7}>
                    Description:
                    <div
                      className={classes.main7}
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Typography
            variant="h3"
            sx={{
              lineHeight: 1.5,
              fontSize: "22px",
              fontFamily: "Lexend, sans-serif",
            }}
          >
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
        {openEducation && (
          <CertificatesEdit onDone={handleDone2} data={selectEducation} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cardcertificates;
