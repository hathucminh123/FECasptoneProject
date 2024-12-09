import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

import { queryClient } from "../Services/mainService";
// import { DeleteSkillSet } from "../Services/SkillSet/DeleteSkillSet";
import classes from "./CardSkill.module.css";
import { DeleteUserProfileCV } from "../Services/UserProfileService/DeleteUserProfileCV";

interface SkillSet {
  id: number;
  name: string;
  shorthand: string;
  description: string;
}


interface FormProps {
  title?: string;
  text?: string;
  icon?: JSX.Element;
  icon2?: JSX.Element;
  img?: string;
  onClick?: () => void;
  data?: SkillSet[];
}

const CardSkill: React.FC<FormProps> = ({
  title,
  text,
  icon,
  img,
  icon2,
  onClick,
  data,
}) => {
  //   const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const userId = localStorage.getItem("userId");
  const { mutate } = useMutation({
    mutationFn: DeleteUserProfileCV,
    onSuccess: () => {
      // Invalidate and refetch the cache to ensure the UI is updated immediately
      queryClient.invalidateQueries({
        queryKey: ["UserProfile"],
        refetchType: "active",
      });
      message.success("SkillSet Details Deleted Successfully");
      setDeletingId(null);
    },
    onError: () => {
      message.error("Failed to delete the skill set");
      setDeletingId(null);
    },
  });

  const handleDelete = (id: number) => {
    setDeletingId(id);
    mutate({
      data: {
        userId: Number(userId),
        skillSetId: id,
        proficiencyLevel: "",
      },
    });
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
          data.map((item) => (
            <div key={item.id}>
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
                      Skill name: 
                    </Typography>
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
                  <div className={classes.mainbenefit}>
                  <div className={classes.mainb1}>
                    <span className={classes.span}>{item?.name}</span>
                  </div>
                </div>
                  {/* <div className={classes.main6}>
                    Short Hand: {item.shorthand}
                  </div> */}
                  {/* <div
                    className={classes.main7}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  /> */}
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
          />
        </span>
      </div>
    </div>
  );
};

export default CardSkill;
