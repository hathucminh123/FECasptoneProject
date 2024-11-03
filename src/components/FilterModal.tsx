import React, { useState } from "react";
import classes from "./FilterModal.module.css";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

interface Props {
  onDone?: () => void;
}

export default function FilterModal({ onDone }: Props) {
  const [salary, setSalary] = useState<number[]>([500, 10000]);
  const [selectedSkill, setSelectedSkill] = useState<string>("");

  const handleSalaryChange = (_event: Event, newValue: number | number[]) => {
    setSalary(newValue as number[]);
  };

  const handleSkillSelect = (skill: string) => {
    setSelectedSkill((prevSkill) => (prevSkill === skill ? "" : skill));
  };

  return (
    <Modal title="Filter" onClose={onDone}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className={classes.maine}
      >
        <section className={classes.main}>
          <Typography variant="h4" className={classes.sectionTitle}>
            Skills
          </Typography>
          <div className={classes.workingModelButtons}>
            <Button
              variant={selectedSkill === "atOffice" ? "contained" : "outlined"}
              onClick={() => handleSkillSelect("atOffice")}
              className={classes.modelButton}
            >
              At office
            </Button>
            <Button
              variant={selectedSkill === "remote" ? "contained" : "outlined"}
              onClick={() => handleSkillSelect("remote")}
              className={classes.modelButton}
            >
              Remote
            </Button>
            <Button
              variant={selectedSkill === "hybrid" ? "contained" : "outlined"}
              onClick={() => handleSkillSelect("hybrid")}
              className={classes.modelButton}
            >
              Hybrid
            </Button>
          </div>
        </section>

        <section className={classes.main}>
          <Typography variant="h4" className={classes.sectionTitle}>
            Salary
          </Typography>
          <div className={classes.main1}>
            <div className={classes.main2}>
              <div className={classes.main3}>
                <div className={classes.salaryRange}>
                  {`${salary[0]}$ - ${salary[1]}$`}
                </div>
              </div>
              <Slider
                value={salary}
                onChange={handleSalaryChange}
                min={500}
                max={10000}
                valueLabelDisplay="auto"
                // className={classes.slider}
                sx={{
                  width: "60%",
                  marginTop: "16px",
                  color: "#4CAF50",
                }}
              />
            </div>
          </div>
        </section>

        <section className={classes.main}>
          <Typography variant="h4" className={classes.sectionTitle}>
           Company
          </Typography>
          <input placeholder="Search Company" type="text" className={classes.input} />
          <div className={classes.industryList}>
            <label className={classes.label}>
              <input type="checkbox" className={classes.inputchecked} />
              <span className={classes.span2}>Consumer Goods</span>
            </label>
            <label className={classes.label}>
              <input type="checkbox" className={classes.inputchecked} />
              <span className={classes.span2}>E-commerce</span>
            </label>
            <label className={classes.label}>
              <input type="checkbox" className={classes.inputchecked} />
              <span className={classes.span2}>E-commerce</span>
            </label>
            <label className={classes.label}>
              <input type="checkbox" className={classes.inputchecked} />
              <span className={classes.span2}>E-commerce</span>
            </label>
            <label className={classes.label}>
              <input type="checkbox" className={classes.inputchecked} />
              <span className={classes.span2}>E-commerce</span>
            </label>
            <label className={classes.label}>
              <input type="checkbox" className={classes.inputchecked} />
              <span className={classes.span2}>E-commerce</span>
            </label>
          </div>
        </section>
      </Box>
    </Modal>
  );
}
