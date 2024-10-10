import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { queryClient } from "../Services/mainService";
import { DeleteSkillSet } from "../Services/SkillSet/DeleteSkillSet";
import classes from "./CardSkillModal.module.css";

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
  setSelectedCvId: (id: number | null) => void;
   selectedCvId?: number| null
}

export default function CardSkillModal({
  title,
  text,
  icon,
  img,
  icon2,
  selectedCvId,
  setSelectedCvId,
  onClick,
  data,
}: FormProps) {
  //   const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<number | null>(null);
//   const [selectedCvId, setSelectedCvId] = useState<number | null>(null);
  const handleCVSelect = (cvId: number) => {
    setSelectedCvId(cvId); // Lưu ID của CV được chọn
  };

  const { mutate } = useMutation({
    mutationFn: DeleteSkillSet,
    onSuccess: () => {
      // Invalidate and refetch the cache to ensure the UI is updated immediately
      queryClient.invalidateQueries({
        queryKey: ["SkillSetDetails"],
        refetchType: "active", // Ensure an active refetch
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
    mutate({ id });
  };

  return (
    <div className={classes.main} style={{ width: "100%" }}>
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
          data.map((item) => (
            <div key={item.id}>
              <div className={classes.main3}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCvId === item.id}
                        onChange={() => handleCVSelect(item.id)}
                        name="form"
                      />
                    }
                    label=""
                  />
                </FormGroup>
                <div className={classes.main4} style={{ flexGrow: 1 }}>
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
                      Skill name: {item?.name}
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
                  <div className={classes.main6}>
                    Short Hand: {item.shorthand}
                  </div>
                  <div
                    className={classes.main7}
                    dangerouslySetInnerHTML={{ __html: item.description }}
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
          />
        </span>
      </div>
    </div>
  );
}
