import React from "react";
import classes from "./CompanyReview.module.css";
import Typography from "@mui/material/Typography";
import { renderButton } from "../components/RenderButton";
import { Rate } from "antd";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

import 'react-circular-progressbar/dist/styles.css';
import CircularProgress from "../components/CircularProgress ";

export default function CompanyReview() {
  // const location = useLocation();
  // const companyData: Company | null = location.state || null;



  return (
    <>
      <div className={classes.overview}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: 1.5,
            // borderBottom: "1px dashed #dedede",
            // paddingBottom: "16px",
          }}
        >
          OverRall rating
        </Typography>

        <div className={classes.percent}>
          <div className={classes.percentleft}>
            <div className={classes.percent1}>
              <div className={classes.percent2}>
                <div className={classes.percent3}>
                  <p
                    style={{
                      color: "#121212",
                      fontSize: "36px",
                      fontWeight: 700,
                      marginTop: "0px",
                      marginBottom: "0px",
                      lineHeight: 1,
                    }}
                  >
                    3.4
                  </p>
                  <div className={classes.rate1}>
                    <Rate defaultValue={3} disabled style={{ marginTop: 5 }} />
                  </div>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    268 reviews
                  </Typography>
             
                </div>
              </div>
              <div className={classes.line}></div>
            </div>
       
          </div>
          <div className={classes.percentRight}>
    
            <div className={classes.percentRight1}>
            <CircularProgress/>
            <Typography
                    variant="body1"
                    sx={{ fontSize: "16px", fontWeight: 400 ,paddingLeft:'12px'}}
                  >
        Recommend working here to a friend
                  </Typography>
            </div>
       
          </div>
        </div>
      </div>
      <div className={classes.review}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: 1.5,
            // borderBottom: "1px dashed #dedede",
            // paddingBottom: "16px",
          }}
        >
          Let your voice be heard.
        </Typography>
        <div className={classes.buttonreview}>
          {renderButton("Write review", "#ed1b2f", "contained", {
            width: "100%",
          })}
        </div>
      </div>
      <div className={classes.overview}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: 1.5,
            borderBottom: "1px dashed #dedede",
            paddingBottom: "16px",
          }}
        >
          106 employee Reviews
        </Typography>

        <div className={classes.comment}>
          <div className={classes.comment1}>
            <span
              style={{ fontWeight: 400, fontSize: "14px", color: "#a6a6a6" }}
            >
              July 2024
            </span>
            <Typography
              variant="h3"
              sx={{
                color: "#121212",
                lineHeight: 1.5,
                fontSize: "18px",
                fontWeight: 700,
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              The working environment is comfortable, convenient, equipment is
              provided fully.
            </Typography>
            <div className={classes.rate}>
              <div className={classes.rate1}>
                <Rate defaultValue={3} disabled style={{ marginTop: 5 }} />
                <span
                  style={{
                    marginLeft: "12px",
                    marginRight: "4px",
                    marginTop: "0px",
                    marginBottom: "0px",
                    color: "#121212",
                  }}
                >
                  4
                </span>
              </div>
              <div className={classes.like}>
                <ThumbUpOutlinedIcon
                  sx={{
                    position: "relative",
                    top: "2px",
                    width: "16px",
                    height: "16px",
                    color: "#0ab305",
                    marginRight: "5px",
                  }}
                />
                Recommend
              </div>
            </div>

            <div className={classes.comment2}>
              <Typography
                variant="h4"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I liked:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 400,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I love about this company is the comfortable working
                environment, provided with the company's computer and supporting
                equipment. Each floor is equipped with a filtered water system
                and is located in a suitable location. The company has a canteen
                with designated dishes every day of the week, also categorized
                for people who like vegetarian, light meals.
              </Typography>
            </div>

            <div className={classes.comment2}>
              <Typography
                variant="h4"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                Suggestions for improvement:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 400,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I love about this company is the comfortable working
                environment, provided with the company's computer and supporting
                equipment. Each floor is equipped with a filtered water system
                and is located in a suitable location. The company has a canteen
                with designated dishes every day of the week, also categorized
                for people who like vegetarian, light meals.
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.comment}>
          <div className={classes.comment1}>
            <span
              style={{ fontWeight: 400, fontSize: "14px", color: "#a6a6a6" }}
            >
              July 2024
            </span>
            <Typography
              variant="h3"
              sx={{
                color: "#121212",
                lineHeight: 1.5,
                fontSize: "18px",
                fontWeight: 700,
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              The working environment is comfortable, convenient, equipment is
              provided fully.
            </Typography>
            <div className={classes.rate}>
              <div className={classes.rate1}>
                <Rate defaultValue={3} disabled style={{ marginTop: 5 }} />
                <span
                  style={{
                    marginLeft: "12px",
                    marginRight: "4px",
                    marginTop: "0px",
                    marginBottom: "0px",
                    color: "#121212",
                  }}
                >
                  4
                </span>
              </div>
              <div className={classes.like}>
                <ThumbUpOutlinedIcon
                  sx={{
                    position: "relative",
                    top: "2px",
                    width: "16px",
                    height: "16px",
                    color: "#0ab305",
                  }}
                />
                Recommend
              </div>
            </div>

            <div className={classes.comment2}>
              <Typography
                variant="h4"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I liked:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 400,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I love about this company is the comfortable working
                environment, provided with the company's computer and supporting
                equipment. Each floor is equipped with a filtered water system
                and is located in a suitable location. The company has a canteen
                with designated dishes every day of the week, also categorized
                for people who like vegetarian, light meals.
              </Typography>
            </div>

            <div className={classes.comment2}>
              <Typography
                variant="h4"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                Suggestions for improvement:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 400,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I love about this company is the comfortable working
                environment, provided with the company's computer and supporting
                equipment. Each floor is equipped with a filtered water system
                and is located in a suitable location. The company has a canteen
                with designated dishes every day of the week, also categorized
                for people who like vegetarian, light meals.
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.comment}>
          <div className={classes.comment1}>
            <span
              style={{ fontWeight: 400, fontSize: "14px", color: "#a6a6a6" }}
            >
              July 2024
            </span>
            <Typography
              variant="h3"
              sx={{
                color: "#121212",
                lineHeight: 1.5,
                fontSize: "18px",
                fontWeight: 700,
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              The working environment is comfortable, convenient, equipment is
              provided fully.
            </Typography>
            <div className={classes.rate}>
              <div className={classes.rate1}>
                <Rate defaultValue={3} disabled style={{ marginTop: 5 }} />
                <span
                  style={{
                    marginLeft: "12px",
                    marginRight: "4px",
                    marginTop: "0px",
                    marginBottom: "0px",
                    color: "#121212",
                  }}
                >
                  4
                </span>
              </div>
              <div className={classes.like}>
                <ThumbUpOutlinedIcon
                  sx={{
                    position: "relative",
                    top: "2px",
                    width: "16px",
                    height: "16px",
                    color: "#0ab305",
                  }}
                />
                Recommend
              </div>
            </div>

            <div className={classes.comment2}>
              <Typography
                variant="h4"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I liked:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 400,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I love about this company is the comfortable working
                environment, provided with the company's computer and supporting
                equipment. Each floor is equipped with a filtered water system
                and is located in a suitable location. The company has a canteen
                with designated dishes every day of the week, also categorized
                for people who like vegetarian, light meals.
              </Typography>
            </div>

            <div className={classes.comment2}>
              <Typography
                variant="h4"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                Suggestions for improvement:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "16px",
                  fontWeight: 400,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                What I love about this company is the comfortable working
                environment, provided with the company's computer and supporting
                equipment. Each floor is equipped with a filtered water system
                and is located in a suitable location. The company has a canteen
                with designated dishes every day of the week, also categorized
                for people who like vegetarian, light meals.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
