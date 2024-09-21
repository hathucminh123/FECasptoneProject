import React, { useState } from "react";
import classes from "./CreateJobs.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import Typography from "@mui/material/Typography";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export default function CreateJobs() {
  const [title, setTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);

  const onChange = (value: number) => {
    setCount(Number(value));
  };

  const handleChangeCount = (type: string, limited: boolean) => {
    if (type === "increase") {
      if (!limited) {
        setCount(count + 1);
        console.log("Tăng");
      }
    } else {
      if (!limited && count > 1) {
        setCount(count - 1);
      }
    }
  };

  const handleIconClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleControl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const maxLength = 50;

  const stripHTML = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const remainingChars = maxLength - stripHTML(title).length;

  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem title="Recruitment Post" buttonstring="Save and Post " />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.mainLeft}>
            <div className={classes.div}>
              <div className={classes.div1}>
                <div className={classes.div2}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "16px",
                      color: "#212f3f",
                      fontWeight: 600,
                      marginBottom: ".5rem",
                      lineHeight: 1.2,
                      marginTop: "0px",
                      boxSizing: "border-box",
                      display: "block",
                    }}
                  >
                    General information
                  </Typography>
                </div>
                <div className={classes.div}>
                  <div className={classes.div3}>
                    <label htmlFor="title" className={classes.label}>
                      Job Title
                      <span className={classes.span}>*</span>
                    </label>
                    <div className={classes.div}>
                      <div className={classes.form}>
                        <span className={classes.span1}>
                          <span className={classes.span2}>
                            <i onClick={() => setTitle("")}>
                              <HighlightOffOutlinedIcon
                                fontSize="small"
                                sx={{ color: "#868d94" }}
                              />
                            </i>
                          </span>
                          {remainingChars}/50
                        </span>
                        <input
                          value={title}
                          type="text"
                          autoComplete="true"
                          onChange={handleControl}
                          placeholder="Job Title"
                          className={classes.input}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.div4}>
                  <div className={classes.div5}>
                    <label
                      htmlFor="application-deadline"
                      className={classes.label}
                    >
                      Application deadline
                      <span className={classes.span}>*</span>
                    </label>
                    <div className={`${classes.div6} date-picker-wrapper`}>
                      <i className={classes.i1} style={{ cursor: "pointer" }}>
                        <EventNoteOutlinedIcon fontSize="small" />
                      </i>
                      <input
                        onClick={handleIconClick}
                        type="text"
                        placeholder="dd/mm/yyyy"
                        value={
                          selectedDate
                            ? selectedDate.toLocaleDateString("en-GB")
                            : ""
                        }
                        className={classes.inputdate}
                        readOnly
                      />
                      {isDatePickerOpen && (
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => {
                            setSelectedDate(date);
                            setIsDatePickerOpen(false);
                          }}
                          onClickOutside={() => setIsDatePickerOpen(false)}
                          dateFormat="dd/MM/yyyy"
                          inline
                        />
                      )}
                    </div>
                  </div>
                  <div className={classes.div7}>
                    <label
                      htmlFor="Number of recruitment"
                      className={classes.label}
                    >
                      Number of recruitment
                      <span className={classes.span}>*</span>
                    </label>
                    <div className={classes.div8}>
                      <div
                        className={classes.div9}
                        onClick={() =>
                          handleChangeCount("decrease", count === 1)
                        }
                      >
                        <RemoveOutlinedIcon />
                      </div>
                      <input
                        type="number"
                        min={1}
                        value={count}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className={classes.inputcount}
                      />
                      <div
                        className={classes.div10}
                        onClick={() => handleChangeCount("increase", false)}
                      >
                        <AddOutlinedIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
