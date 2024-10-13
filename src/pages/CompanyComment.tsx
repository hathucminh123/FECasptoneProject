import React, { useState } from "react";
import classes from "./CompanyComment.module.css";

import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Flex, Rate } from "antd";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

import RenderButton from "../components/RenderButton";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];
export default function CompanyComment() {
  const [coverLetter, setCoverLetter] = useState("");
  const [coverLetterr, setCoverLetterr] = useState("");
  const [state, setState] = React.useState({
    yes: false,
    no: false,
    antoine: false,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const { yes, no } = state;

  const handleCoverLetterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCoverLetter(event.target.value);
  };
  const handleCoverLetterChangee = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCoverLetterr(event.target.value);
  };
  const [value, setValue] = useState(3);
  return (
    <main className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.background}></div>
        <div className={classes.icontainer}>
          <div className={classes.icontainer1}>
            <div className={classes.back}>
              <div className={classes.iconback}>
                <ArrowBackIosNewOutlinedIcon
                  sx={{ width: "20px", height: "20px", color: "#fff" }}
                />
                <Typography
                  sx={{ display: "flex", color: "#fff", textAlign: "center" }}
                >
                  Back
                </Typography>
              </div>
            </div>
            <div className={classes.logo}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShDXOd1EUVLnkgF9P9P9ZAGyBSv6f_lmq6CA&s"
                alt="logo"
                style={{
                  width: "81px",
                  height: "50px",
                  aspectRatio: "auto 81/82",
                  textAlign: "center",
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes.container}>
          <div className={classes.container1}>
            <div className={classes.container2}>
              <div className={classes.containerLeft}>
                <div className={classes.content}>
                  <Typography
                    variant="h2"
                    sx={{
                      marginBottom: "8px",
                      color: "#121212",
                      lineHeight: 1.5,
                      fontSize: "22px",
                      fontWeight: 700,
                    }}
                  >
                    Review Bosch Global Software Technologies Company Limited
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: "0px",
                      color: "#414042 ",
                      lineHeight: 1.8,
                      fontSize: "16px",
                      fontWeight: 400,
                      marginTop: "0px",
                    }}
                  >
                    It only takes you 1 minute to complete this review form.
                    Your opinion will be very helpful for the Developer
                    community who are looking for a job.
                  </Typography>
                  <Box
                    component="form"
                    sx={{ marginTop: "24px", display: "block" }}
                  >
                    <div className={classes.rating}>
                      <Typography
                        variant="h3"
                        sx={{
                          marginBottom: "8px",
                          color: "#121212",
                          lineHeight: 1.5,
                          fontSize: "18px",
                          fontWeight: 700,
                        }}
                      >
                        Overall rating
                        <span
                          style={{
                            paddingLeft: "10px",
                            color: "#f60d00",
                            lineHeight: 1.5,
                            fontSize: "18px",
                            fontWeight: 700,
                          }}
                        >
                          *
                        </span>
                      </Typography>
                      <Flex
                        gap="20px"
                        style={{
                          marginLeft: "60px",
                          marginTop: "0px",
                          justifyContent: "flex-start",
                          display: "flex",
                        }}
                        vertical={false}
                      >
                        <Rate
                          tooltips={desc}
                          onChange={setValue}
                          value={value}
                        />
                        {value ? (
                          <span style={{ marginTop: "2px" }}>
                            {desc[value - 1]}
                          </span>
                        ) : null}
                      </Flex>
                    </div>
                    <div className={classes.field}>
                      <TextField
                        id="summary"
                        variant="outlined"
                        label="Summary"
                        required
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className={classes.field}>
                      <Typography
                        variant="h3"
                        sx={{
                          marginBottom: "8px",
                          color: "#121212",
                          lineHeight: 1.5,
                          fontSize: "18px",
                          fontWeight: 700,
                        }}
                      >
                        What makes you love working here
                        <span
                          style={{
                            paddingLeft: "10px",
                            color: "#f60d00",
                            lineHeight: 1.5,
                            fontSize: "18px",
                            fontWeight: 700,
                          }}
                        >
                          *
                        </span>
                      </Typography>
                      <TextField
                        id="description"
                        variant="outlined"
                        placeholder="Input Your experiences"
                        multiline
                        rows={6}
                        value={coverLetter}
                        onChange={handleCoverLetterChange}
                        sx={{ width: "100%", height: "100%" }}
                      />
                      <Typography
                        variant="h4"
                        sx={{
                          marginBottom: "12px",
                          textAlign: "left",
                          color: "#a6a6a6",
                          lineHeight: 1.5,
                          fontSize: "18px",
                          display: "inline-block",
                          marginTop: "0px",
                        }}
                      >
                        {500 - coverLetter.length} of 500 characters remaining
                      </Typography>
                    </div>
                    <div className={classes.field}>
                      <Typography
                        variant="h3"
                        sx={{
                          marginBottom: "8px",
                          color: "#121212",
                          lineHeight: 1.5,
                          fontSize: "18px",
                          fontWeight: 700,
                        }}
                      >
                        Suggestion for improvement
                        <span
                          style={{
                            paddingLeft: "10px",
                            color: "#f60d00",
                            lineHeight: 1.5,
                            fontSize: "18px",
                            fontWeight: 700,
                          }}
                        >
                          *
                        </span>
                      </Typography>
                      <TextField
                        id="suggestion"
                        variant="outlined"
                        placeholder="Input Your Suggestion"
                        multiline
                        rows={6}
                        value={coverLetterr}
                        onChange={handleCoverLetterChangee}
                        sx={{ width: "100%", height: "100%" }}
                      />
                      <Typography
                        variant="h4"
                        sx={{
                          marginBottom: "12px",
                          textAlign: "left",
                          color: "#a6a6a6",
                          lineHeight: 1.5,
                          fontSize: "18px",
                          display: "inline-block",
                          marginTop: "0px",
                        }}
                      >
                        {500 - coverLetterr.length} of 500 characters remaining
                      </Typography>
                    </div>
                    <div className={classes.field}>
                      <Typography
                        variant="h3"
                        sx={{
                          marginBottom: "8px",
                          color: "#121212",
                          lineHeight: 1.5,
                          fontSize: "18px",
                          fontWeight: 700,
                        }}
                      >
                        Do you want to recommend this company to your friends?
                        <span
                          style={{
                            paddingLeft: "10px",
                            color: "#f60d00",
                            lineHeight: 1.5,
                            fontSize: "18px",
                            fontWeight: 700,
                          }}
                        >
                          *
                        </span>
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                        }}
                      >
                        <div className={classes.check}>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={yes}
                                  onChange={handleChange}
                                  name="yes"
                                />
                              }
                              label="Yes"
                            />
                          </FormGroup>
                        </div>
                        <div className={classes.check}>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={no}
                                  onChange={handleChange}
                                  name="no"
                                />
                              }
                              label="No"
                            />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                    <div>
                      <RenderButton
                        text="Send my REview"
                        color="#ed1b2f"
                        variant="contained"
                        sxOverrides={{ width: "100%" }} // Set width to 100%
                      />
                    </div>
                  </Box>
                </div>
              </div>
              <div className={classes.containerRight}>
                <div className={classes.note}>
                  <div className={classes.title}>
                    <Typography
                      variant="h2"
                      sx={{
                        padding: 0,
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#121212",
                      }}
                    >
                      Review Guidelines & Conditions
                    </Typography>
                  </div>
                  <div className={classes.text}>
                    <p className={classes.text1}>
                      In order for a review to be displayed on the website, it
                      must adhere to the Guidelines & Conditions for reviews.
                    </p>
                    <p className={classes.text1}>Please ensure that:</p>
                    <ul className={classes.ul}>
                      <li className={classes.li}>
                        Do not use offensive or derogatory language
                      </li>
                      <li className={classes.li}>
                        Do not provide personal information
                      </li>
                      <li className={classes.li}>
                        Do not provide confidential or proprietary business
                        information
                      </li>
                    </ul>
                    <p className={classes.text1}>
                      In order for a review to be displayed on the website, it
                      must adhere to the Guidelines & Conditions for reviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
