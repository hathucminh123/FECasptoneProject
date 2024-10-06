import React, { useState } from "react";
import ReactQuill from "react-quill";
import Box from "@mui/material/Box";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Typography from "@mui/material/Typography";
import Modal from "./Modal";
import "react-quill/dist/quill.snow.css";
import classes from "./PersonalProject.module.css";
import TextField from "@mui/material/TextField";
import { message } from "antd";
import { queryClient } from "../Services/mainService";
import { PostSkillSets } from "../Services/SkillSet/PostSkillSet";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

interface Props {
  onDone?: () => void;
}

export default function PersonalProject({ onDone }: Props) {
  // const [value, setValue] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    shorthand: "",
    description: "",
  });

  const maxLength = 2500;

  // Strip HTML tags to count only text characters
  const stripHTML = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const remainingChars = maxLength - stripHTML(formData.description).length;

  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: PostSkillSets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["SkillSetDetails"] });
      navigate("#");
      setFormData({
        name: "",
        shorthand: "",
        description: "",
      });
      onDone?.();
      message.success("SkillSet Details Updated Successfully");
    },
    onError: () => {
      message.error("Failed to update experience details");
    },
  });

  const handleSubmit = () => {
    // Perform validation and submit formData
    if (!formData.name || !formData.shorthand || !formData.description) {
      alert("Please fill in all fields.");
      return;
    }

    mutate({
      data: {
        name: formData.name,
        shorthand: formData.shorthand,
        description: formData.description,
      },
    });
    // Call your API or perform any action with the form data
    console.log("Submitting:", formData);
  };

  return (
    <Modal title="Skill Sets" onClose={onDone} isPending={isPending} onClickSubmit={handleSubmit}>
      <Box component="form" noValidate autoComplete="off">
        <div style={{ display: "block" }}>
          <div className={classes.tipContainer}>
            <div className={classes.iconContainer}>
              <CreateOutlinedIcon
                sx={{
                  width: "20px",
                  height: "20px",
                  color: "white",
                }}
              />
            </div>
            <div className={classes.tipText}>
              <b>
                <span className={classes.tipHighlight}>Tips: </span>
                You can share the project that relates to your skills and
                capabilities
              </b>
            </div>
          </div>

          <div className={classes.form}>
            {/* Project Name (name) */}
            <div className={classes.projectname}>
              <TextField
                label="Skill Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                variant="outlined"
                className={classes.inputGroup}
              />
            </div>

            {/* Short Description (shorthand) */}
            <div className={classes.description}>
              <div style={{ display: "block" }}>
                <Typography
                  variant="h4"
                  sx={{
                    lineHeight: 1.5,
                    fontSize: "16px",
                    fontWeight: 600,
                    mt: 0,
                    mb: 0,
                  }}
                >
                  Short Hand
                </Typography>
                <TextField
                  label="shorthand"
                  value={formData.shorthand}
                  onChange={(e) =>
                    setFormData({ ...formData, shorthand: e.target.value })
                  }
                  required
                  variant="outlined"
                  multiline
                  rows={4}
                  className={classes.inputGroup}
                />
              </div>
            </div>

            {/* Detailed Description (description) */}
            <div className={classes.description}>
              <div style={{ display: "block" }}>
                <Typography
                  variant="h4"
                  sx={{
                    lineHeight: 1.5,
                    fontSize: "16px",
                    fontWeight: 600,
                    mt: 0,
                    mb: 0,
                  }}
                >
                  Detailed Description
                </Typography>
                <ReactQuill
                  value={formData.description}
                  onChange={(value) =>
                    setFormData({ ...formData, description: value })
                  }
                  placeholder="Enter your detailed description"
                  style={{ height: "300px", marginBottom: "16px" }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "right",
                    color: remainingChars < 0 ? "red" : "#a6a6a6",
                    fontSize: "14px",
                  }}
                >
                  {remainingChars} of 2500 characters remaining
                </Typography>
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: "20px" }}>
              {/* <button type="button" onClick={handleSubmit}>
                Submit
              </button> */}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
